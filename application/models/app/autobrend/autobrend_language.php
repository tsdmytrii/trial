<?php

class Autobrend_language extends DataMapper {

    public $table = 'autobrend_languages';
    public $has_one = array('autobrend');
    public static $ci;
    public $validation = array(
        array(
            'field' => 'name',
            'label' => 'Name',
            'rules' => array('trim', 'required', 'min_length' => 3, 'max_length' => 40),
        ),
        array(
            'field' => 'description',
            'label' => 'Description',
            'rules' => array('trim', 'required', 'min_length' => 10, 'max_length' => 3000),
        ),
        array(
            'field' => 'moto',
            'label' => 'Moto',
            'rules' => array('trim', 'min_length' => 2, 'max_length' => 200),
        ),
        array(
            'field' => 'baner_name',
            'label' => 'Baner name',
            'rules' => array('trim', 'min_length' => 2, 'max_length' => 200),
        ),
        array(
            'field' => 'key_words',
            'label' => 'Key words',
            'rules' => array('trim', 'max_length' => 500),
        ),
        array(
            'field' => 'seo_description',
            'label' => 'Seo description',
            'rules' => array('trim', 'max_length' => 1000),
        ),
        array(
            'field' => 'seo_title',
            'label' => 'Seo description',
            'rules' => array('trim', 'max_length' => 200),
        )
    );

    function __construct() {
        parent::__construct();
        if (empty(self::$ci)) {
            self::$ci = &get_instance();
        }
    }

    public function set_from_default($static_id, $language_id = 2) {

        $autobrend_lang = new Autobrend_language();
        $autobrend_lang->autobrend_id = $static_id;
        $autobrend_lang->name = 'New title title';
        $autobrend_lang->description = 'New description New description New description';
        $autobrend_lang->language_id = $language_id;

        if ($autobrend_lang->save())
            return $autobrend_lang->to_array();
        else
            return false;
    }

    public function set_autobrend_lang($autobrend_id) {
        $autobrend_lang = new Autobrend_language();

        if (self::$ci->input->post('id') !== '')
            $autobrend_lang->get_by_id(self::$ci->input->post('id'));

        $autobrend_lang->language_id = self::$ci->input->post('language_id');
        $autobrend_lang->autobrend_id = $autobrend_id;
        $autobrend_lang->name = self::$ci->input->post('name');
        $autobrend_lang->description = self::$ci->input->post('description');
        $autobrend_lang->description_search = strip_tags(self::$ci->input->post('title') . ' ' . self::$ci->input->post('description'));
        $autobrend_lang->moto = self::$ci->input->post('moto');
        $autobrend_lang->baner_name = self::$ci->input->post('baner_name');
        $autobrend_lang->seo_description = self::$ci->input->post('seo_description');
        $autobrend_lang->seo_title = self::$ci->input->post('seo_title');
        $autobrend_lang->key_words = self::$ci->input->post('key_words');

        return $autobrend_lang->save();
    }

    public function get_autobrend_lang($autobrend_id) {

        $autobrend_lang = new Autobrend_language();

        $autobrend_lang->get_by_autobrend_id($autobrend_id);

        $lang = FALSE;

        foreach ($autobrend_lang as $c_l) {
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

    public function delete_autobrend_lang($autobrend_id) {
        $autobrend_lang = new Autobrend_language();

        $autobrend_lang->get_by_autobrend_id($autobrend_id);

        $autobrend_lang->delete_all();
    }

}

?>
