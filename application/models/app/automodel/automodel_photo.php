<?php

class Automodel_photo extends DataMapper {

    public $table = 'automodel_photoes';
    public $has_one = array('automodel');
    public static $directory = './uploads/images';
    public static $ci;
    public $validation = array(
        array(
            'field' => 'id',
            'label' => 'id',
            'rules' => array('trim', 'numeric', 'max_length' => 8)
        ),
        array(
            'field' => 'automodel_id',
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
        $automodel_photo = new Automodel_photo();

        $result_image = Image::upload_tmp_image(self::$directory, '', 'Filedata');

        $image = explode('.', $result_image['filename']);

        Image::resize_image(self::$directory.'/' . $result_image['filename'], self::$directory.'/' . $image[0] . '_m.' . $image[1], 300, 156, $image[1]);

        $automodel_photo->name = $result_image['filename'];
        $automodel_photo->name_mini = $image[0] . '_m' . '.' . $image[1];
        $automodel_photo->automodel_id = self::$ci->input->post('automodel_id');

        $automodel_photo->save();

        return $automodel_photo->to_array();
    }

    public function get_img($a_id = false) {
        $automodel_photo = new Automodel_photo();

        $automodel_id = self::$ci->input->post('automodel_id') ? self::$ci->input->post('automodel_id') : $a_id;

        $automodel_photo->get_by_automodel_id($automodel_id);

        $result = $automodel_photo->all_to_array();

        if (count($result) > 0)
            return $result;
        else
            return false;

    }

    public function delete_img($automodel_id = '', $img_id = false) {
        $automodel_photo = new Automodel_photo();

        $image_id = self::$ci->input->post('id') ? self::$ci->input->post('id') : $img_id;

        if ($image_id) {

            $automodel_photo->get_by_id($image_id);

            $name = $automodel_photo->name;

            $preview = explode('.', $name);

            Image::unlink_image(self::$directory . '/' . $automodel_photo->name);

            Image::unlink_image(self::$directory . '/' . $preview[0].'_m.'.$preview[1]);

            $automodel_photo->delete();

            return array('img_id' => $image_id);
        } else {
            $automodel_photo->get_by_automodel_id($automodel_id);

            foreach ($automodel_photo as $a) {
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