<?php

class Language extends DataMapper {

    public $table = 'languages';
    public $has_many = array('menu_item_language');
    public static $ci;
    public $validation = array(
        array(
            'field' => 'id',
            'label' => 'id',
            'rules' => array('trim', 'numeric', 'max_length' => 5),
        ),
        array(
            'field' => 'name',
            'label' => 'Name',
            'rules' => array('required', 'trim', 'max_length' => 200),
        ),
        array(
            'field' => 'iso_code',
            'label' => 'Iso code',
            'rules' => array('required', 'trim', 'max_length' => 3),
        )
    );

    function __construct($id = NULL) {
        parent::__construct($id);
        if (empty(self::$ci)) {
            self::$ci = &get_instance();
        }
    }

    public function get_language() {
        if (self::$ci->access->check_access(__FUNCTION__) == false)
            return 403;

        $language = new Language();

        $language_id = self::$ci->input->post('language_id') ? self::$ci->input->post('language_id') : false;

        if ($language_id)
            return $language->order_by('position')->get_by_id($language_id)->to_array();
        else
            return false;
    }

    public function get_all_languages() {
        if (self::$ci->access->check_access(__FUNCTION__) == false)
            return 403;

        $language = new Language();

        return $language->order_by('position')->get()->all_to_array();

    }

    public function set_language() {
        if (self::$ci->access->check_access(__FUNCTION__) == false)
            return 403;

        $language = new Language();

        if (self::$ci->input->post('id'))
            $language->get_by_id (self::$ci->input->post('id'));

        $language->name = self::$ci->input->post('name');
        $language->iso_code = self::$ci->input->post('iso_code');
        $language->position = self::$ci->input->post('position');

        if ($language->save())
            return $language->id;
        else
            return false;

    }

    public function delete_language() {
        if (self::$ci->access->check_access(__FUNCTION__) == false)
            return 403;

        $language_id = self::$ci->input->post('language_id') ? self::$ci->input->post('language_id') : false;

        if ($language_id) {

            $language = new Language();

            $language->get_by_id($language_id);

            return $language->delete();

        }

        else return false;

    }


    public function get_all_langs() {
        $language = new Language();

        return $language->order_by('position')->get()->all_to_array();
    }

    public function get_lang_by_id($language_id){
        $language = new Language();

        return $language->get_by_id($language_id)->to_array();

    }

}

?>