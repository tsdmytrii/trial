<?php

class Menu_item_language extends DataMapper {

    public $table = 'menu_item_languages';
    public $has_one = array('menu_item');
    public static $ci;
    public $validation = array(
        array(
            'field' => 'name_ru',
            'label' => 'Name ru',
            'rules' => array('trim', 'min_length' => 3, 'max_length' => 100),
        ),
        array(
            'field' => 'description_ru',
            'label' => 'Description ru',
            'rules' => array('trim', 'min_length' => 10, 'max_length' => 1000),
        ),
        array(
            'field' => 'name_ua',
            'label' => 'Name ua',
            'rules' => array('trim', 'min_length' => 3, 'max_length' => 100),
        ),
        array(
            'field' => 'description_ua',
            'label' => 'Description ua',
            'rules' => array('trim', 'min_length' => 10, 'max_length' => 1000),
        ),
        array(
            'field' => 'name_en',
            'label' => 'Name ua',
            'rules' => array('trim', 'min_length' => 3, 'max_length' => 100),
        ),
        array(
            'field' => 'description_en',
            'label' => 'Description en',
            'rules' => array('trim', 'min_length' => 10, 'max_length' => 1000),
        )
    );

    function __construct() {
        parent::__construct();
        if (empty(self::$ci)) {
            self::$ci = &get_instance();
        }
    }

    public function set_menu_item_language($menu_item_id) {
        $langs = self::$ci->lang_model->get_langs();

        foreach ($langs as $lang) {

            $name = self::$ci->input->post('name_' . $lang['iso_code']);
            if ($name !== FALSE AND !empty($name)) {

                $menu_item_language = new Menu_item_language();

                $menu_item_language->value = self::$ci->input->post('name_' . $lang['iso_code']);
                $menu_item_language->menu_item_id = $menu_item_id;
                $menu_item_language->language_id = $lang['id'];

                $menu_item_language->save();

                $arr =  $menu_item_language->to_array();

                $menu_item_languages[$lang['iso_code']] = $arr;
            }
        }

        return $menu_item_languages;

    }

    public function get_menu_item_language($menu_item_id) {

        $menu_item_lang = new Menu_item_language();

        $menu_item_lang->get_by_menu_item_id($menu_item_id);

        $lang = FALSE;

        foreach ($menu_item_lang as $c_l) {
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

    public function delete_menu_item_language($menu_item_id) {
        $menu_item_lang = new Menu_item_language();

        $menu_item_lang->get_by_menu_item_id($menu_item_id);

        $menu_item_lang->delete_all();
    }

}

?>
