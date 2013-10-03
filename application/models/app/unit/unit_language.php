<?php

class Unit_language extends DataMapper {

    public $table = 'unit_languages';
    public $has_one = array('unit');
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
            'rules' => array('trim', 'required', 'min_length' => 10, 'max_length' => 3000),
        )
    );

    function __construct() {
        parent::__construct();
        if (empty(self::$ci)) {
            self::$ci = &get_instance();
        }
    }

    public function set_unit_lang($unit_id) {
        $unit_lang = new Unit_language();

        if (self::$ci->input->post('unit_lang_id'))
            $unit_lang->get_by_id(self::$ci->input->post('unit_lang_id'));

        $unit_lang->language_id = self::$ci->input->post('language_id');
        $unit_lang->unit_id = $unit_id;
        $unit_lang->name = self::$ci->input->post('name');
        $unit_lang->short_name = self::$ci->input->post('short_name');
        $unit_lang->description = self::$ci->input->post('description');

        if ($unit_lang->save()) {
            return $unit_lang->id;
        } else {
            return false;
        }
    }

    public function get_unit_language($unit_id, $fields = '*') {

        $unit_lang = new Unit_language();

        if ($fields)
            $unit_lang->select($fields);

        $unit_lang->where(array('unit_id' => $unit_id));

        $unit_lang->get();

        $lang = FALSE;

        foreach ($unit_lang as $c_l) {

            $language = new Language();

            $language->get_by_id($c_l->language_id);

            $lang[$language->iso_code] = $c_l->to_array();
        }

        return $lang;
    }

    public function delete_unit_lang($unit_id) {
        $unit_lang = new Unit_language();

        $unit_lang->get_by_unit_id($unit_id);

        $unit_lang->delete_all();
    }

}

?>
