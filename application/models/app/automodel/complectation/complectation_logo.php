<?php

class Complectation_logo extends DataMapper {

    public $table = 'complectation_logoes';
    public $has_one = array('complectation');
    public static $directory = './uploads/images';
    public static $ci;
    public $validation = array(
        array(
            'field' => 'id',
            'label' => 'id',
            'rules' => array('trim', 'numeric', 'max_length' => 8)
        ),
        array(
            'field' => 'complectation_id',
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
        $complectation_logo = new Complectation_logo();

        $check_complectation_logo = new Complectation_logo();
        $check_complectation_logo->get_by_complectation_id(self::$ci->input->post('complectation_id'));

        foreach ($check_complectation_logo as $c) {
            $this->delete_img('', $c->id);
        }

        $result_image = Image::upload_tmp_image(self::$directory, '', 'Filedata');
        $complectation_logo->name = $result_image['filename'];
        $complectation_logo->complectation_id = self::$ci->input->post('complectation_id');

        $complectation_logo->save();

        return $complectation_logo->to_array();
    }

    public function get_img($a_id = false) {
        $complectation_logo = new Complectation_logo();

        $complectation_id = self::$ci->input->post('complectation_id') ? self::$ci->input->post('complectation_id') : $a_id;

        $complectation_logo->get_by_complectation_id($complectation_id);

        $result = $complectation_logo->to_array();

        if ($result['id'] > 0)
            return $result;
        else
            return false;

    }

    public function delete_img($complectation_id = '', $img_id = false) {
        $complectation_logo = new Complectation_logo();

        $image_id = self::$ci->input->post('id') ? self::$ci->input->post('id') : $img_id;

        if ($image_id) {

            $complectation_logo->get_by_id($image_id);

            Image::unlink_image(self::$directory . '/' . $complectation_logo->name);

            $complectation_logo->delete();

            return array('img_id' => $image_id);
        } else {
            $complectation_logo->get_by_complectation_id($complectation_id);

            foreach ($complectation_logo as $c) {
                if ($c->name !== null && $c->name !== '') {
                    Image::unlink_image(self::$directory . '/' . $c->name);
                    $c->delete();
                }
            }

            return true;
        }
    }

}

?>
