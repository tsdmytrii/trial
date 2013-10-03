<?php

class Menu_item_language extends DataMapper {

    public $table = 'menu_item_languages';
    public $has_one = array('menu_item', 'language');
    public static $ci;
    public $validation = array(
        array(
            'field' => 'language_id',
            'label' => 'Language id',
            'rules' => array('trim', 'required', 'max_length' => 3),
        ),
        array(
            'field' => 'menu_item_id',
            'label' => 'Menu item id',
            'rules' => array('trim', 'required', 'max_length' => 3),
        ),
        array(
            'field' => 'value',
            'label' => 'Value',
            'rules' => array('trim', 'min_length' => 3, 'max_length' => 100),
        )
    );

    function __construct() {
        parent::__construct();
        if (empty(self::$ci)) {
            self::$ci = &get_instance();
        }
    }

    public function set_menu_item_language($menu_item_id) {

        $menu_items_language = new Menu_item_language();

        if (self::$ci->input->post('menu_item_lang_id'))
            $menu_items_language->get_by_id(self::$ci->input->post('menu_item_lang_id'));

        $menu_items_language->language_id = self::$ci->input->post('language_id');
        $menu_items_language->menu_item_id = $menu_item_id;
        $menu_items_language->value = self::$ci->input->post('value');

        if ($menu_items_language->save()) {
            return $menu_items_language->id;
        } else {
            return false;
        }

    }

    public function get_menu_item_language($menu_item_id, $fields = "*", $language = false) {

        $menu_items_language = new Menu_item_language();

        if ($fields)
            $menu_items_language->select($fields);

        if ($language)
            $menu_items_language->where(array('language_id' => $language));

        $menu_items_language->get_by_menu_item_id($menu_item_id);

        $lang = false;

        foreach ($menu_items_language as $m) {

            $m->language->get();

            $lang[$m->language->iso_code] = $m->to_array();

        }

        return $lang;
    }

    public function delete_menu_item_language($menu_item_id) {
        $menu_item_lang = new Menu_item_language();

        $menu_item_lang->get_by_menu_item_id($menu_item_id);

        return $menu_item_lang->delete_all();
    }

}

?>
