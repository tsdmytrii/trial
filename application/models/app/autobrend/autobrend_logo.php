<?php

class Autobrend_logo extends DataMapper {

    public $table = 'autobrend_logoes';
    public $has_one = array('autobrend');
    public static $directory = './uploads/images';
    public static $ci;
    public $validation = array(
        array(
            'field' => 'id',
            'label' => 'id',
            'rules' => array('trim', 'numeric', 'max_length' => 8)
        ),
        array(
            'field' => 'autobrend_id',
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
        $autobrend_logo = new Autobrend_logo();

        $result_image = Image::upload_tmp_image(self::$directory, '', 'Filedata');
        $autobrend_logo->name = $result_image['filename'];
        $autobrend_logo->autobrend_id = self::$ci->input->post('autobrend_id');

        $autobrend_logo->save();

        return $autobrend_logo->to_array();
    }

    public function get_img($a_id = false) {
        $autobrend_logo = new Autobrend_logo();

        $autobrend_id = self::$ci->input->post('autobrend_id') ? self::$ci->input->post('autobrend_id') : $a_id;

        $autobrend_logo->get_by_autobrend_id($autobrend_id);

        $result = $autobrend_logo->all_to_array();

        if (count($result) > 0)
            return $result;
        else
            return false;

    }

    public function delete_img($autobrend_id = '', $img_id = false) {
        $autobrend_logo = new Autobrend_logo();

        $image_id = self::$ci->input->post('id') ? self::$ci->input->post('id') : $img_id;

        if ($image_id) {

            $autobrend_logo->get_by_id($image_id);

            Image::unlink_image(self::$directory . '/' . $autobrend_logo->name);

            $autobrend_logo->delete();

            return array('img_id' => $image_id);
        } else {
            $autobrend_logo->get_by_autobrend_id($autobrend_id);

            foreach ($autobrend_logo as $a) {
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
