<?php

class Producer_logo extends DataMapper {

    public $table = 'producer_logoes';
    public $has_one = array('producer');
    public static $directory = './uploads/images';
    public static $ci;
    public $validation = array(
        array(
            'field' => 'id',
            'label' => 'id',
            'rules' => array('trim', 'numeric', 'max_length' => 8)
        ),
        array(
            'field' => 'producer_id',
            'label' => 'id',
            'rules' => array('trim', 'numeric', 'max_length' => 8)
        ),
        array(
            'field' => 'name',
            'label' => 'Logo name',
            'rules' => array('trim', 'min_length' => 3, 'max_length' => 100)
        )
    );

    function __construct() {
        parent::__construct();
        if (empty(self::$ci)) {
            self::$ci = &get_instance();
        }
        self::$ci->load->library(array('plugins/image'));
    }

    public function set_img() {
        $producer_logo = new Producer_logo();

        $check_producer_logo = new Producer_logo();
        $check_producer_logo->get_by_producer_id(self::$ci->input->post('producer_id'));

        foreach ($check_producer_logo as $c) {
            $this->delete_img('', $c->id);
        }

        $result_image = Image::upload_tmp_image(self::$directory, '', 'Filedata');
        $producer_logo->name = $result_image['filename'];
        $producer_logo->producer_id = self::$ci->input->post('producer_id');

        $producer_logo->save();

        return $producer_logo->to_array();
    }

    public function get_img($a_id = false) {
        $producer_logo = new Producer_logo();

        $producer_id = self::$ci->input->post('producer_id') ? self::$ci->input->post('producer_id') : $a_id;

        $producer_logo->get_by_producer_id($producer_id);

        $result = $producer_logo->to_array();

        if ($result['id'] > 0)
            return $result;
        else
            return false;

    }

    public function delete_img($producer_id = '', $img_id = false) {
        $producer_logo = new Producer_logo();

        $image_id = self::$ci->input->post('id') ? self::$ci->input->post('id') : $img_id;

        if ($image_id) {

            $producer_logo->get_by_id($image_id);

            Image::unlink_image(self::$directory . '/' . $producer_logo->name);

            $producer_logo->delete();

            return array('img_id' => $image_id);
        } else {
            $producer_logo->get_by_producer_id($producer_id);

            foreach ($producer_logo as $a) {
                if ($a->name !== null && $a->name !== '') {
                    Image::unlink_image(self::$directory . '/' . $a->name);
                    $a->delete();
                }
            }

            return true;
        }
    }

}

?>
