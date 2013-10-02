<?php

class Seo_language extends DataMapper {

    public $table = 'seo_languages';
    public $has_one = array('seo');
    public static $ci;
    public $validation = array(
        array(
            'field' => 'title',
            'label' => 'Title',
            'rules' => array('required', 'trim', 'min_length' => 5, 'max_length' => 500),
        ),
        array(
            'field' => 'description',
            'label' => 'Description',
            'rules' => array('required', 'trim', 'min_length' => 20, 'max_length' => 12000),
        ),
        array(
            'field' => 'key_words',
            'label' => 'Key words',
            'rules' => array('required', 'trim', 'min_length' => 5, 'max_length' => 1000),
        )
    );

    function __construct() {
        parent::__construct();
        if (empty(self::$ci)) {
            self::$ci = &get_instance();
        }
        self::$ci->load->model(array('core/lang_model'));
    }

    public function set_seo_lang($seo_id) {

        $seo_lang = new Seo_language();

        if (self::$ci->input->post('seo_lang_id') !== '')
            $seo_lang->id = self::$ci->input->post('seo_lang_id');

        $seo_lang->language_id = self::$ci->input->post('language_id');
        $seo_lang->seo_id = $seo_id;
        $seo_lang->title = self::$ci->input->post('title');
        $seo_lang->description = self::$ci->input->post('description');
        $seo_lang->key_words = self::$ci->input->post('key_words');

        if ($seo_lang->save())
            return true;
        else
            return false;
    }

    public function get_seo_lang($seo_id) {

        $seo_lang = new Seo_language();

        $seo_lang->get_by_seo_id($seo_id);

        $lang = FALSE;

        foreach ($seo_lang as $c_l) {
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

}

?>
