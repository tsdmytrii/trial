<?php

class Static_component_language extends DataMapper {

    public $table = 'static_components_languages';
    public $has_one = array('static_component');
    public static $ci;
    public $validation = array(
        array(
            'field' => 'title',
            'label' => 'Title',
            'rules' => array('trim', 'required', 'min_length' => 5, 'max_length' => 500),
        ),
        array(
            'field' => 'author',
            'label' => 'Author',
            'rules' => array('trim', 'required', 'min_length' => 5, 'max_length' => 100),
        ),
        array(
            'field' => 'description',
            'label' => 'Description',
            'rules' => array('trim', 'required', 'min_length' => 5, 'max_length' => 12000),
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

    public function set_from_default($static_id, $language_id = 2) {

        $static_component_lang = new Static_component_language();
        $static_component_lang->static_component_id = $static_id;
        $static_component_lang->title = 'New title title';
        $static_component_lang->description = 'New description New description New description';
        $static_component_lang->author = 'Author';
        $static_component_lang->language_id = $language_id;

        if ($static_component_lang->save())
            return $static_component_lang->to_array();
        else
            return false;
    }

    public function set_static_component_lang($static_component_id) {
        $static_component_lang = new Static_component_language();

        if (self::$ci->input->post('id') !== '')
            $static_component_lang->id = self::$ci->input->post('id');

        $static_component_lang->language_id = self::$ci->input->post('language_id');
        $static_component_lang->static_component_id = $static_component_id;
        $static_component_lang->title = self::$ci->input->post('title');
        $static_component_lang->author = self::$ci->input->post('author');
        $static_component_lang->description = self::$ci->input->post('description');
        $static_component_lang->description_search = strip_tags(self::$ci->input->post('description'));
        $static_component_lang->seo_description = self::$ci->input->post('seo_description');
        $static_component_lang->seo_title = self::$ci->input->post('seo_title');
        $static_component_lang->key_words = self::$ci->input->post('key_words');

        if ($static_component_lang->save())
            return true;
        else
            return false;
    }

    public function get_static_component_lang($static_component_id) {

        $static_component_lang = new Static_component_language();

        $static_component_lang->get_by_static_component_id($static_component_id);

        $lang = FALSE;

        foreach ($static_component_lang as $c_l) {
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

    public function delete_static_component_lang($static_component_lang_id) {
        $static_component_lang = new Static_component_language();

        $static_component_lang->get_by_static_component_id($static_component_lang_id);

        $static_component_lang->delete_all();
    }

}

?>
