<?php

class Complectation_language extends DataMapper {

    public $table = 'complectation_languages';
    public $has_one = array('complectation');
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

    public function set_complectation_lang($complectation_id) {
        $complectation_lang = new Complectation_language();

        if (self::$ci->input->post('id') !== '')
            $complectation_lang->get_by_id(self::$ci->input->post('id'));

        $complectation_lang->language_id = self::$ci->input->post('language_id');
        $complectation_lang->complectation_id = $complectation_id;
        $complectation_lang->name = self::$ci->input->post('name');
        $complectation_lang->description = self::$ci->input->post('description');

        return $complectation_lang->save();
    }

    public function get_complectation_lang($complectation_id) {

        $complectation_lang = new Complectation_language();

        $complectation_lang->get_by_complectation_id($complectation_id);

        $lang = FALSE;

        foreach ($complectation_lang as $c_l) {
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

    public function delete_complectation_lang($complectation_id) {
        $complectation_lang = new Complectation_language();

        $complectation_lang->get_by_complectation_id($complectation_id);

        $complectation_lang->delete_all();
    }

}

?>
