<?php

class Characteristic_language extends DataMapper {

    public $table = 'characteristic_languages';
    public $has_one = array('characteristic');
    public static $ci;
    public $validation = array(
        array(
            'field' => 'name',
            'label' => 'Name',
            'rules' => array('trim', 'required', 'min_length' => 3, 'max_length' => 200),
        ),
        array(
            'field' => 'description',
            'label' => 'Description',
            'rules' => array('trim', 'required', 'min_length' => 10, 'max_length' => 2000),
        )
    );

    function __construct() {
        parent::__construct();
        if (empty(self::$ci)) {
            self::$ci = &get_instance();
        }
    }

    public function set_characteristic_lang($characteristic_id) {
        $characteristic_lang = new Characteristic_language();

        if (self::$ci->input->post('id') !== '')
            $characteristic_lang->get_by_id(self::$ci->input->post('id'));

        $characteristic_lang->language_id = self::$ci->input->post('language_id');
        $characteristic_lang->characteristic_id = $characteristic_id;
        $characteristic_lang->name = self::$ci->input->post('name');
        $characteristic_lang->description = self::$ci->input->post('description');

        if ($characteristic_lang->save())
            return $characteristic_lang->id;
        else
            return false;
    }

    public function get_characteristic_lang($characteristic_id) {

        $characteristic_lang = new Characteristic_language();

        $characteristic_lang->get_by_characteristic_id($characteristic_id);

        $lang = FALSE;

        foreach ($characteristic_lang as $c_l) {
            switch ($c_l->language_id):
                case 1:
                    $lang['en'] = $c_l->to_array();
                    break;
                case 2:
                    $lang['ru'] = $c_l->to_array();
                    break;
                case 3:
                    $lang['ua'] = $c_l->to_array();
                    break;
            endswitch;
        }

        return $lang;
    }

    public function delete_characteristic_lang($characteristic_id) {
        $characteristic_lang = new Characteristic_language();

        $characteristic_lang->get_by_characteristic_id($characteristic_id);

        $characteristic_lang->delete_all();
    }

}

?>
