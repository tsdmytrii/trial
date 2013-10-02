<?php

class Category_language extends DataMapper {

    public $table = 'category_languages';
    public $has_one = array('category');
    public static $ci;
    public $validation = array(
        array(
            'field' => 'id',
            'label' => 'id',
            'rules' => array('trim', 'numeric', 'max_length' => 11),
        ),
        array(
            'field' => 'category_id',
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
        ),
        array(
            'field' => 'description',
            'label' => 'Description',
            'rules' => array('trim', 'min_length' => 2, 'max_length' => 2000),
        )
    );

    function __construct() {
        parent::__construct();
        if (empty(self::$ci)) {
            self::$ci = &get_instance();
        }
    }

    public function set_category_language($category_id) {

        $category_lang = new Category_language();

        if (self::$ci->input->post('category_lang_id') !== ''&& self::$ci->input->post('category_lang_id') !== 0)
            $category_lang->get_by_id(self::$ci->input->post('category_lang_id'));

        $category_lang->language_id = self::$ci->input->post('language_id');
        $category_lang->category_id = $category_id;
        $category_lang->name = self::$ci->input->post('name');
        $category_lang->description = self::$ci->input->post('description');

        return $category_lang->save();

    }

    public function get_category_language($category_id, $fields = '*') {

        $category_lang = new Category_language();

//        $category_lang->get_by_category_id($category_id);

        if ($fields)
            $category_lang->select($fields);

        $category_lang->where(array('category_id' => $category_id));

        $category_lang->get();

        $lang = FALSE;

        foreach ($category_lang as $c_l) {

            $language = new Language();

            $language->get_by_id($c_l->language_id);

            $lang[$language->iso_code] = $c_l->to_array();
        }

        return $lang;
    }

    public function delete_category_language($category_id) {
        $category_lang = new Category_language();

        $category_lang->get_by_category_id($category_id);

        return $category_lang->delete_all();
    }

}

?>
