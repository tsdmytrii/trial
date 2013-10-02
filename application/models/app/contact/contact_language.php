<?php

class Contact_language extends DataMapper {

    public $table = 'contact_languages';
    public $has_one = array('contact');
    public static $ci;
    public $validation = array(
        array(
            'field' => 'title',
            'label' => 'Title',
            'rules' => array('trim', 'required', 'min_length' => 3, 'max_length' => 500),
        ),
        array(
            'field' => 'author',
            'label' => 'Author',
            'rules' => array('trim', 'required', 'min_length' => 3, 'max_length' => 100),
        ),
        array(
            'field' => 'description',
            'label' => 'Description',
            'rules' => array('trim', 'required', 'min_length' => 3, 'max_length' => 12000),
        ),
        array(
            'field' => 'description_short',
            'label' => 'Description',
            'rules' => array('trim', 'required', 'min_length' => 3, 'max_length' => 2000),
        ),
        array(
            'field' => 'key_words',
            'label' => 'Key words',
            'rules' => array('trim', 'max_length' => 1000),
        ),
        array(
            'field' => 'seo_description',
            'label' => 'Seo description',
            'rules' => array('trim', 'max_length' => 4000),
        ),
        array(
            'field' => 'seo_title',
            'label' => 'Seo description',
            'rules' => array('trim', 'max_length' => 500),
        )
    );

    function __construct() {
        parent::__construct();
        if (empty(self::$ci)) {
            self::$ci = &get_instance();
        }
    }

    public function set_from_default($contacts_id, $language_id = 2) {

        $contacts_lang = new Contact_language();
        $contacts_lang->contact_id = $contacts_id;
        $contacts_lang->title = 'New title title';
        $contacts_lang->description = 'New description New description New description';
        $contacts_lang->description_short = 'Short description in popUp block';
        $contacts_lang->author = 'Author';
        $contacts_lang->language_id = $language_id;

        if ($contacts_lang->save())
           return $contacts_lang->to_array();
        else
            return false;
    }

    public function set_contacts_lang($contacts_id) {
        $contacts_lang = new Contact_language();

        if (self::$ci->input->post('id') !== '')
            $contacts_lang->id = self::$ci->input->post('id');

        $contacts_lang->language_id = self::$ci->input->post('language_id');
        $contacts_lang->contact_id = $contacts_id;
        $contacts_lang->title = self::$ci->input->post('title');
        $contacts_lang->author = self::$ci->input->post('author');
        $contacts_lang->description = self::$ci->input->post('description');
        $contacts_lang->description_short = self::$ci->input->post('description_short');
        $contacts_lang->description_search = strip_tags(self::$ci->input->post('description'));
        $contacts_lang->seo_description = self::$ci->input->post('seo_description');
        $contacts_lang->seo_title = self::$ci->input->post('seo_title');
        $contacts_lang->key_words = self::$ci->input->post('key_words');

        if ($contacts_lang->save())
            return true;
        else
            return false;
    }

    public function get_contacts_lang($contacts_id) {

        $contacts_lang = new Contact_language();

        $contacts_lang->get_by_contact_id($contacts_id);

        $lang = FALSE;

        foreach ($contacts_lang as $c_l) {
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

    public function delete_contacts_lang($contacts_id) {
        $contacts_lang = new Contact_language();

        $contacts_lang->get_by_contact_id($contacts_id);

        return $contacts_lang->delete_all();
    }

}

?>
