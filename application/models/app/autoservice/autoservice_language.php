<?php

class Autoservice_language extends DataMapper {

    public $table = 'autoservice_languages';
    public $has_one = array('autoservice');
    public static $ci;
    public $validation = array(
        array(
            'field' => 'contacts',
            'label' => 'Contacts',
            'rules' => array('trim', 'required', 'min_length' => 2, 'max_length' => 1000),
        ),
        array(
            'field' => 'description',
            'label' => 'Description',
            'rules' => array('trim', 'required', 'min_length' => 2, 'max_length' => 5000),
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

    public function set_from_default($autoservice_id, $language_id = 2) {

        $autoservice_lang = new Autoservice_language();
        $autoservice_lang->autoservice_id = $autoservice_id;
        $autoservice_lang->contacts = 'New contacts New contacts';
        $autoservice_lang->description = 'New description New description New description';
        $autoservice_lang->language_id = $language_id;

        if ($autoservice_lang->save())
            return $autoservice_lang->to_array();
        else
            return false;
    }

    public function set_autoservice_lang($autoservice_id) {
        $autoservice_lang = new Autoservice_language();

        if (self::$ci->input->post('id') !== '')
            $autoservice_lang->id = self::$ci->input->post('id');

        $autoservice_lang->language_id = self::$ci->input->post('language_id');
        $autoservice_lang->autoservice_id = $autoservice_id;
        $autoservice_lang->contacts = self::$ci->input->post('contacts');
        $autoservice_lang->description = self::$ci->input->post('description');
        $autoservice_lang->description_search = strip_tags(self::$ci->input->post('description'));
        $autoservice_lang->seo_description = self::$ci->input->post('seo_description');
        $autoservice_lang->seo_title = self::$ci->input->post('seo_title');
        $autoservice_lang->key_words = self::$ci->input->post('key_words');

        if ($autoservice_lang->save())
            return true;
        else
            return false;
    }

    public function get_autoservice_lang($autoservice_id) {

        $autoservice_lang = new Autoservice_language();

        $autoservice_lang->get_by_autoservice_id($autoservice_id);

        $lang = FALSE;

        foreach ($autoservice_lang as $c_l) {
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

    public function delete_autoservice_lang($autoservice_lang_id) {
        $autoservice_lang = new Autoservice_language();

        $autoservice_lang->get_by_autoservice_id($autoservice_lang_id);

        $autoservice_lang->delete_all();
    }

}

?>
