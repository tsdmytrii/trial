<?php

class Product_language extends DataMapper {

    public $table = 'product_languages';
    public $has_one = array('product');
    public static $ci;
    public $validation = array(
        array(
            'field' => 'name',
            'label' => 'Name',
            'rules' => array('trim', 'required', 'min_length' => 3, 'max_length' => 100),
        ),
        array(
            'field' => 'description',
            'label' => 'Description',
            'rules' => array('trim', 'required', 'min_length' => 3, 'max_length' => 3000),
        )
    );

    function __construct() {
        parent::__construct();
        if (empty(self::$ci)) {
            self::$ci = &get_instance();
        }
    }

    public function set_product_lang($product_id) {
        $product_lang = new Product_language();

        if (self::$ci->input->post('product_lang_id'))
            $product_lang->get_by_id(self::$ci->input->post('product_lang_id'));

        $product_lang->language_id = self::$ci->input->post('language_id');
        $product_lang->product_id = $product_id;
        $product_lang->name = self::$ci->input->post('name');
        $product_lang->description = self::$ci->input->post('description');

        if ($product_lang->save()) {
            return $product_lang->id;
        } else {
            return false;
        }
    }

    public function get_product_language($product_id, $fields = '*') {

        $product_lang = new Product_language();

        if ($fields)
            $product_lang->select($fields);

        $product_lang->where(array('product_id' => $product_id));

        $product_lang->get();

        $lang = FALSE;

        foreach ($product_lang as $c_l) {

            $language = new Language();

            $language->get_by_id($c_l->language_id);

            $lang[$language->iso_code] = $c_l->to_array();
        }

        return $lang;
    }

    public function delete_product_lang($product_id) {
        $product_lang = new Product_language();

        $product_lang->get_by_product_id($product_id);

        $product_lang->delete_all();
    }

}

?>
