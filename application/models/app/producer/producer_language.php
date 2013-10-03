<?php

class Producer_language extends DataMapper {

    public $table = 'producer_languages';
    public $has_one = array('producer');
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

    public function set_producer_lang($producer_id) {
        $producer_lang = new Producer_language();

        if (self::$ci->input->post('id') !== '')
            $producer_lang->get_by_id(self::$ci->input->post('id'));

        $producer_lang->language_id = self::$ci->input->post('language_id');
        $producer_lang->producer_id = $producer_id;
        $producer_lang->name = self::$ci->input->post('name');
        $producer_lang->description = self::$ci->input->post('description');

        return $producer_lang->save();
    }

    public function get_producer_language($producer_id, $fields = '*') {

        $producer_lang = new Producer_language();

        if ($fields)
            $producer_lang->select($fields);

        $producer_lang->where(array('producer_id' => $producer_id));

        $producer_lang->get();

        $lang = FALSE;

        foreach ($producer_lang as $c_l) {

            $language = new Language();

            $language->get_by_id($c_l->language_id);

            $lang[$language->iso_code] = $c_l->to_array();
        }

        return $lang;
    }

    public function delete_producer_lang($producer_id) {
        $producer_lang = new Producer_language();

        $producer_lang->get_by_producer_id($producer_id);

        $producer_lang->delete_all();
    }

}

?>
