<?php

class Category_logo extends DataMapper {

    public $table = 'category_logoes';
    public $has_one = array('category');
    public static $directory = './uploads/images';
    public static $ci;
    public $validation = array(
        array(
            'field' => 'id',
            'label' => 'id',
            'rules' => array('trim', 'numeric', 'max_length' => 8)
        ),
        array(
            'field' => 'category_id',
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
        $category_logo = new Category_logo();

        $check_category_logo = new Category_logo();
        $check_category_logo->get_by_category_id(self::$ci->input->post('category_id'));

        foreach ($check_category_logo as $c) {
            $this->delete_img('', $c->id);
        }

        $result_image = Image::upload_tmp_image(self::$directory, '', 'Filedata');
        $category_logo->name = $result_image['filename'];
        $category_logo->category_id = self::$ci->input->post('category_id');

        $category_logo->save();

        return $category_logo->to_array();
    }

    public function get_img($a_id = false) {
        $category_logo = new Category_logo();

        $category_id = self::$ci->input->post('category_id') ? self::$ci->input->post('category_id') : $a_id;

        $category_logo->get_by_category_id($category_id);

        $result = $category_logo->to_array();

        if ($category_logo->id)
            return $result;
        else
            return false;

    }

    public function delete_img($category_id = '', $img_id = false) {
        $category_logo = new Category_logo();

        $image_id = self::$ci->input->post('id') ? self::$ci->input->post('id') : $img_id;

        if ($image_id) {

            $category_logo->get_by_id($image_id);

            Image::unlink_image(self::$directory . '/' . $category_logo->name);

            $category_logo->delete();

            return array('img_id' => $image_id);
        } else {
            $category_logo->get_by_category_id($category_id);

            foreach ($category_logo as $a) {
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
