<?php

class Autobrend_picture extends DataMapper {

    public $table = 'autobrend_pictures';
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
        $autobrend_picture = new Autobrend_picture();

        $result_image = Image::upload_tmp_image(self::$directory, '', 'Filedata');
        $autobrend_picture->name = $result_image['filename'];
        $autobrend_picture->autobrend_id = self::$ci->input->post('autobrend_id');

        $autobrend_picture->save();

        return $autobrend_picture->to_array();
    }

    public function get_img($a_id = false) {
        $autobrend_picture = new Autobrend_picture();

        $autobrend_id = self::$ci->input->post('autobrend_id') ? self::$ci->input->post('autobrend_id') : $a_id;

        $autobrend_picture->get_by_autobrend_id($autobrend_id);

        $result = $autobrend_picture->all_to_array();

        if (count($result) > 0)
            return $result;
        else
            return false;

    }

    public function delete_img($autobrend_id = '', $img_id = false) {
        $autobrend_picture = new Autobrend_picture();

        $image_id = self::$ci->input->post('id') ? self::$ci->input->post('id') : $img_id;

        if ($image_id) {

            $autobrend_picture->get_by_id($image_id);

            Image::unlink_image(self::$directory . '/' . $autobrend_picture->name);

            $autobrend_picture->delete();

            return array('img_id' => $image_id);
        } else {

            $autobrend_picture->get_by_autobrend_id($autobrend_id);

            foreach ($autobrend_picture as $a) {
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