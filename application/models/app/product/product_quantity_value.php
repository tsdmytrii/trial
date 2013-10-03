<?php

class Product_quantity_value extends DataMapper {

    public $table = 'product_quantity_values';
//    public $has_one = array('product, category_attribute');
    public static $ci;
    public $validation = array(
        array(
            'field' => 'id',
            'label' => 'id',
            'rules' => array('trim', 'numeric', 'max_length' => 11),
        ),
        array(
            'field' => 'product_id',
            'label' => 'Product_quantity_value id',
            'rules' => array('trim', 'required', 'max_length' => 11),
        ),
        array(
            'field' => 'category_attribute_id',
            'label' => 'Category attribute id',
            'rules' => array('trim', 'required', 'max_length' => 11),
        ),
        array(
            'field' => 'value',
            'label' => 'Value',
            'rules' => array('trim', 'required', 'max_length' => 11),
        )
    );

    function __construct($id = NULL) {
        parent::__construct($id);
        if (empty(self::$ci)) {
            self::$ci = &get_instance();
        }
        self::$ci->load->library(array('plugins/image'));
    }

    /*
     * --------------------------------ADMIN------------------------------------
     */

    public function set_product_quantity_value() {
        $product_quantity_value = new Product_quantity_value();

        if (self::$ci->input->post('id'))
            $product_quantity_value->get_by_id(self::$ci->input->post('id'));

        $product_quantity_value->product_id = self::$ci->input->post('product_id');
        $product_quantity_value->category_attribute_id = self::$ci->input->post('category_attribute_id');
        $product_quantity_value->value = self::$ci->input->post('value');

        if ($product_quantity_value->save()) {
            return $product_quantity_value->id;
        } else
            return false;
    }

    public function get_product_quantity_value($product_quantity_value_id = false, $short = false) {

    }

    public function delete_product_quantity_value($product_id = false, $category_id = false) {

        $product_id = self::$ci->input->post('product_id') ? self::$ci->input->post('product_id') : $product_id;

        $category_id = self::$ci->input->post('category_id') ? self::$ci->input->post('category_id') : $category_id;

        $category_attribute = new Category_attribute();

        $category_attribute->where(array('type' => 1, 'category_id' => $category_id))->get();

        if ($category_attribute->exists()) {
            foreach ($category_attribute as $c) {
                $product_quantity_value = new Product_quantity_value();

                $product_quantity_value->where(array('product_id' => $product_id, 'category_attribute_id' => $c->id))->get();

                if ($product_quantity_value->exists()) {
                    $product_quantity_value->delete();
                }
            }
        }

        return true;

    }



}

?>