<?php

class Autoservice_picture extends DataMapper {

    public $table = 'autoservice_pictures';
    public $has_one = array('autoservice');
    public static $directory = './uploads/images';
    public static $ci;
    public $validation = array(
        array(
            'field' => 'id',
            'label' => 'id',
            'rules' => array('trim', 'numeric', 'max_length' => 8)
        ),
        array(
            'field' => 'autoservice_id',
            'label' => 'id',
            'rules' => array('trim', 'numeric', 'max_length' => 8)
        ),
        array(
            'field' => 'name',
            'label' => 'Logo name',
            'rules' => array('trim', 'min_length' => 3, 'max_length' => 100)
        ),
        array(
            'field' => 'position',
            'label' => 'Position',
            'rules' => array('trim', 'min_length' => 1, 'max_length' => 2)
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
        $autoservice_picture = new Autoservice_picture();

        $result_image = Image::upload_tmp_image(self::$directory, '', 'Filedata');
        $autoservice_picture->name = $result_image['filename'];
        $autoservice_picture->autoservice_id = self::$ci->input->post('autoservice_id');
        $autoservice_picture->position = 9;

        $autoservice_picture->save();

        return $autoservice_picture->to_array();
    }

    public function get_img($a_id = false) {
        $autoservice_picture = new Autoservice_picture();

        $autoservice_id = self::$ci->input->post('autoservice_id') ? self::$ci->input->post('autoservice_id') : $a_id;

        $autoservice_picture->order_by('position')->get_by_autoservice_id($autoservice_id);

        $result = $autoservice_picture->all_to_array();

        if (count($result) > 0)
            return $result;
        else
            return false;

    }

    public function delete_img($autoservice_id = '', $img_id = false) {
        $autoservice_picture = new Autoservice_picture();

        $image_id = self::$ci->input->post('id') ? self::$ci->input->post('id') : $img_id;

        if ($image_id) {

            $autoservice_picture->get_by_id($image_id);

            Image::unlink_image(self::$directory . '/' . $autoservice_picture->name);

            $autoservice_picture->delete();

            return array('img_id' => $image_id);
        } else {

            $autoservice_picture->get_by_autoservice_id($autoservice_id);

            foreach ($autoservice_picture as $a) {
                if ($a->name !== null && $a->name !== '') {
                    Image::unlink_image(self::$directory . '/' . $a->name);
                    $a->delete();
                }
            }

            return true;
        }
    }

    public function set_autoservice_picture_order(){

        if (self::$ci->access->check_access(__FUNCTION__) == false)
            return 403;

        $result = true;

        foreach (self::$ci->input->post('order') as $p) {

            $autoservice_img = new Autoservice_picture();

            $autoservice_img->get_by_id($p['id']);

            $autoservice_img->position = $p['position'];

            if ($autoservice_img->save() == false)
                $result = false;

        }

        return true;

    }
}

?>