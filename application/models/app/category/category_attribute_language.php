<?php

class Category_attribute_language extends DataMapper {

    public $table = 'category_attribute_languages';
    public $has_one = array('category_attribute');
    public static $ci;
    public $validation = array(
        array(
            'field' => 'id',
            'label' => 'id',
            'rules' => array('trim', 'numeric', 'max_length' => 11),
        ),
        array(
            'field' => 'category_attribute_id',
            'label' => 'Miniblock id',
            'rules' => array('trim', 'numeric', 'max_length' => 11),
        ),
        array(
            'field' => 'language_id',
            'label' => 'Language id',
            'rules' => array('trim', 'numeric', 'max_length' => 11),
        ),
        array(
            'field' => 'name',
            'label' => 'Name',
            'rules' => array('trim', 'min_length' => 2, 'max_length' => 200),
        )
    );

    function __construct() {
        parent::__construct();
        if (empty(self::$ci)) {
            self::$ci = &get_instance();
        }
    }

    public function set_category_attribute_language($category_attribute_id) {

        $category_attribute_lang = new Category_attribute_language();

        if (self::$ci->input->post('category_attribute_lang_id') !== ''&& self::$ci->input->post('category_attribute_lang_id') !== 0)
            $category_attribute_lang->get_by_id(self::$ci->input->post('category_attribute_lang_id'));

        $category_attribute_lang->language_id = self::$ci->input->post('language_id');
        $category_attribute_lang->category_attribute_id = $category_attribute_id;
        $category_attribute_lang->name = self::$ci->input->post('name');

        return $category_attribute_lang->save();

    }

    public function get_category_attribute_language($category_attribute_id, $fields = '*') {

        $category_attribute_lang = new Category_attribute_language();

        if ($fields)
            $category_attribute_lang->select($fields);

        $category_attribute_lang->where(array('category_attribute_id' => $category_attribute_id));

        $category_attribute_lang->get();

        $lang = FALSE;

        foreach ($category_attribute_lang as $c_l) {

            $language = new Language();

            $language->get_by_id($c_l->language_id);

            $lang[$language->iso_code] = $c_l->to_array();
        }

        return $lang;
    }

    public function delete_category_attribute_language($category_attribute_id) {
        $category_attribute_lang = new Category_attribute_language();

        $category_attribute_lang->get_by_category_attribute_id($category_attribute_id);

        return $category_attribute_lang->delete_all();
    }

}

?>
