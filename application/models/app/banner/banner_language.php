<?php

class Banner_language extends DataMapper {

    public $table = 'banner_languages';
    public $has_one = array('banner');
    public static $ci;
    public $validation = array(
        array(
            'field' => 'title',
            'label' => 'Title',
            'rules' => array('required', 'trim', 'min_length' => 5, 'max_length' => 200),
        ),
        array(
            'field' => 'description',
            'label' => 'Description',
            'rules' => array('trim', 'max_length' => 1000),
        )
    );

    function __construct() {
        parent::__construct();
        if (empty(self::$ci)) {
            self::$ci = &get_instance();
        }
        self::$ci->load->model(array('core/lang_model'));
    }

    public function set_banner_lang($banner_id) {

        $banner_lang = new Banner_language();

        if (self::$ci->input->post('banner_lang_id') !== ''){
            $banner_lang->get_by_id(self::$ci->input->post('banner_lang_id'));
        }

        $banner_lang->language_id = self::$ci->input->post('language_id');
        $banner_lang->banner_id = $banner_id;
        $banner_lang->title = self::$ci->input->post('title');
        $banner_lang->description = self::$ci->input->post('description');

        if ($banner_lang->save())
            return true;
        else
            return false;
    }

    public function get_banner_lang($banner_id) {

        $banner_lang = new Banner_language();

        $banner_lang->get_by_banner_id($banner_id);

        $lang = FALSE;

        foreach ($banner_lang as $c_l) {
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

    public function delete_banner_lang($banner_lang_id) {
        $banner_lang = new Banner_language();

        $banner_lang->get_by_banner_id($banner_lang_id);

        $banner_lang->delete_all();
    }

}

?>
