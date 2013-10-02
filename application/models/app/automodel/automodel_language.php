<?php

class Automodel_language extends DataMapper {

    public $table = 'automodel_languages';
    public $has_one = array('automodel');
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

    public function set_automodel_lang($automodel_id) {
        $automodel_lang = new Automodel_language();

        if (self::$ci->input->post('id') !== '')
            $automodel_lang->get_by_id(self::$ci->input->post('id'));

        $automodel_lang->language_id = self::$ci->input->post('language_id');
        $automodel_lang->automodel_id = $automodel_id;
        $automodel_lang->name = self::$ci->input->post('name');
        $automodel_lang->description = self::$ci->input->post('description');
        $automodel_lang->description_search = strip_tags(self::$ci->input->post('description'));
        $automodel_lang->seo_title = self::$ci->input->post('seo_title');
        $automodel_lang->key_words = self::$ci->input->post('key_words');
        $automodel_lang->seo_description = self::$ci->input->post('seo_description');

        return $automodel_lang->save();
    }

    public function get_automodel_lang($automodel_id) {

        $automodel_lang = new Automodel_language();

        $automodel_lang->get_by_automodel_id($automodel_id);

        $lang = FALSE;

        foreach ($automodel_lang as $c_l) {
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

    public function delete_automodel_lang($automodel_id) {
        $automodel_lang = new Automodel_language();

        $automodel_lang->get_by_automodel_id($automodel_id);

        $automodel_lang->delete_all();
    }

}

?>
