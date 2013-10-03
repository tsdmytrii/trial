<?php

class Attribute_language extends DataMapper {

    public $table = 'attribute_languages';
    public $has_one = array('attribute');
    public static $ci;
    public $validation = array(
        array(
            'field' => 'language_id',
            'label' => 'Language ID',
            'rules' => array('trim', 'required', 'max_length' => 1)
        ),
        array(
            'field' => 'name',
            'label' => 'Name',
            'rules' => array('trim', 'required', 'max_length' => 10)
        ),
        array(
            'field' => 'attribute_id',
            'label' => 'Attribute ID',
            'rules' => array('trim', 'min_length' => 3, 'max_length' => 100),
        )
    );

    function __construct() {
        parent::__construct();
        if (empty(self::$ci)) {
            self::$ci = &get_instance();
        }
    }

    public function set_attribute_lang($attribute_id) {
        $attribute_lang = new Attribute_language();

        if (self::$ci->input->post('attribute_lang_id'))
            $attribute_lang->get_by_id(self::$ci->input->post('product_lang_id'));

        $attribute_lang->language_id = self::$ci->input->post('language_id');
        $attribute_lang->attribute_id = $attribute_id;
        $attribute_lang->name = self::$ci->input->post('name');
        $attribute_lang->description = self::$ci->input->post('description');

        if ($attribute_lang->save()) {
            return $attribute_lang->id;
        } else {
            return false;
        }
    }

    public function get_attribute_language($attribute_id, $fields = '*') {

        $attribute_lang = new Attribute_language();

        if ($fields)
            $attribute_lang->select($fields);

        $attribute_lang->where(array('attribute_id' => $attribute_id));

        $attribute_lang->get();

        $lang = FALSE;

        foreach ($attribute_lang as $c_l) {

            $language = new Language();

            $language->get_by_id($c_l->language_id);

            $lang[$language->iso_code] = $c_l->to_array();
        }

        return $lang;
    }

    public function delete_attribute_lang($attribute_id) {
        $attribute_lang = new Attribute_language();

        $attribute_lang->get_by_attribute_id($attribute_id);

        $attribute_lang->delete_all();
    }

}