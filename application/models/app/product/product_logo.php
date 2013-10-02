<?php

class Product_logo extends DataMapper {

    public $table = 'product_logoes';
    public $has_one = array('product');
    public static $directory = './uploads/images';
    public static $ci;
    public $validation = array(
        array(
            'field' => 'id',
            'label' => 'id',
            'rules' => array('trim', 'numeric', 'max_length' => 8)
        ),
        array(
            'field' => 'product_id',
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
        $product_logo = new Product_logo();

        $check_product_logo = new Product_logo();
        $check_product_logo->get_by_product_id(self::$ci->input->post('product_id'));

        foreach ($check_product_logo as $c) {
            $this->delete_img('', $c->id);
        }

        $result_image = Image::upload_tmp_image(self::$directory, '', 'Filedata');
        $product_logo->name = $result_image['filename'];
        $product_logo->product_id = self::$ci->input->post('product_id');

        $product_logo->save();

        return $product_logo->to_array();
    }

    public function get_img($a_id = false) {
        $product_logo = new Product_logo();

        $product_id = self::$ci->input->post('product_id') ? self::$ci->input->post('product_id') : $a_id;

        $product_logo->get_by_product_id($product_id);

        $result = $product_logo->to_array();

        if ($result['id'] > 0)
            return $result;
        else
            return false;

    }

    public function delete_img($product_id = '', $img_id = false) {
        $product_logo = new Product_logo();

        $image_id = self::$ci->input->post('id') ? self::$ci->input->post('id') : $img_id;

        if ($image_id) {

            $product_logo->get_by_id($image_id);

            Image::unlink_image(self::$directory . '/' . $product_logo->name);

            $product_logo->delete();

            return array('img_id' => $image_id);
        } else {
            $product_logo->get_by_product_id($product_id);

            foreach ($product_logo as $a) {
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
