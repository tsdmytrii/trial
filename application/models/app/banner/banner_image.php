<?php

class Banner_image extends DataMapper {

    public $table = 'banner_images';
    public $has_one = array('banner');
    public static $directory = './uploads/images';
    public static $ci;
    public $validation = array(
        array(
            'field' => 'id',
            'label' => 'id',
            'rules' => array('trim', 'numeric', 'max_length' => 8)
        ),
        array(
            'field' => 'banner_id',
            'label' => 'id',
            'rules' => array('trim', 'numeric', 'max_length' => 8)
        ),
        array(
            'field' => 'name',
            'label' => 'Logo name',
            'rules' => array('trim', 'min_length' => 3, 'max_length' => 100),
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
        $banner_image = new Banner_image();

        $check_img = new Banner_image();

        $banner_id = self::$ci->input->post('banner_id');

        $check_img->delete_img($banner_id);

        $result_image = Image::upload_tmp_image(self::$directory, '', 'Filedata');
        $banner_image->name = $result_image['filename'];
        $banner_image->banner_id = $banner_id;

        $banner_image->save();

        return $banner_image->to_array();
    }

    public function get_img($ban_id = false) {
        $banner_image = new Banner_image();

        $banner_id = self::$ci->input->post('banner_id') ? self::$ci->input->post('banner_id') : $ban_id;

        $banner_image->get_by_banner_id($banner_id);

        $result = $banner_image->to_array();

        if ($banner_image->id == null) {
            $result = false;
        }

        return $result;
    }

    public function delete_img($banner_id = '', $img_id = false) {
        $banner_image = new Banner_image();

        $image_id = self::$ci->input->post('id') ? self::$ci->input->post('id') : $img_id;

        if ($image_id) {

            $banner_image->get_by_id($image_id);

            Image::unlink_image(self::$directory . '/' . $banner_image->name);

            $banner_image->delete();

            return array('img_id' => $image_id);
        } else {
            $banner_image->get_by_banner_id($banner_id);

            if ($banner_image->name !== null && $banner_image->name !== '') {

                Image::unlink_image(self::$directory . '/' . $banner_image->name);
                $banner_image->delete();
            }

            return true;
        }
    }

}

?>
