<?php

class Quality_variant_language extends DataMapper {

    public $table = 'quality_variant_languages';
    public $has_one = array('quality_variant');
    public static $ci;
    public $validation = array(
        array(
            'field' => 'id',
            'label' => 'id',
            'rules' => array('trim', 'numeric', 'max_length' => 11),
        ),
        array(
            'field' => 'quality_variant_id',
            'label' => 'Miniblock id',
            'rules' => array('trim', 'numeric', 'max_length' => 11),
        ),
        array(
            'field' => 'language_id',
            'label' => 'Language id',
            'rules' => array('trim', 'numeric', 'max_length' => 11),
        ),
        array(
            'field' => 'value',
            'label' => 'Value',
            'rules' => array('trim', 'min_length' => 2, 'max_length' => 200),
        )
    );

    function __construct() {
        parent::__construct();
        if (empty(self::$ci)) {
            self::$ci = &get_instance();
        }
    }

    public function set_quality_variant_language($quality_variant_id) {

        $quality_variant_lang = new Quality_variant_language();

        if (self::$ci->input->post('quality_variant_lang_id') !== ''&& self::$ci->input->post('quality_variant_lang_id') !== 0)
            $quality_variant_lang->get_by_id(self::$ci->input->post('quality_variant_lang_id'));

        $quality_variant_lang->language_id = self::$ci->input->post('language_id');
        $quality_variant_lang->quality_variant_id = $quality_variant_id;
        $quality_variant_lang->value = self::$ci->input->post('value');

        if ($quality_variant_lang->save()) {
            return $quality_variant_lang->id;
        } else {
            return false;
        }

    }

    public function get_quality_variant_language($quality_variant_id, $fields = '*') {

        $quality_variant_lang = new Quality_variant_language();

        if ($fields)
            $quality_variant_lang->select($fields);

        $quality_variant_lang->where(array('quality_variant_id' => $quality_variant_id));

        $quality_variant_lang->get();

        $lang = FALSE;

        foreach ($quality_variant_lang as $c_l) {

            $language = new Language();

            $language->get_by_id($c_l->language_id);

            $lang[$language->iso_code] = $c_l->to_array();
        }

        return $lang;
    }

    public function delete_quality_variant_language($quality_variant_id) {
        $quality_variant_lang = new Quality_variant_language();

        $quality_variant_lang->get_by_quality_variant_id($quality_variant_id);

        return $quality_variant_lang->delete_all();
    }

}

?>
