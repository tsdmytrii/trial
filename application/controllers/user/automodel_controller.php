<?php

class Automodel_controller extends MY_Controller {

    function __construct() {
        parent::__construct();
        $this->load->helper(array('form', 'url'));
        $this->load->library(array('form_validation', 'plugins/ion_auth'));

        $this->load->driver('cache');
    }

    public function get_automodel($automodel_id = 1, $autobrend_id = 1, $main = 0, $lang_id = 2, $tab = 'description') {

        $automodel = new Automodel();

        $static_link = 'automodel/' . $automodel_id . '/' . $autobrend_id . '/' . $main . '/' . $lang_id;

        $main = $this->check_user_agent() ? $this->check_user_agent() : $main;

        switch ($tab) {
            case 'characteristic':
                $result['data'] = $data = $automodel->get_automodel_characteristic($automodel_id, $lang_id);
                $title = $data['name'];
                break;
            case 'description':
                $result['data'] = $data = $automodel->get_automodel_description($automodel_id, $lang_id);
                $title = $data['name'];
                break;
        }

        $result['data']['automodel'] = $automodel->get_by_id($automodel_id)->to_array();

        $automodel_seo = new Automodel_language();

        $result['data']['seo'] = $automodel_seo->
                where(array('automodel_id' => $automodel_id, 'language_id' => $lang_id))->
                get()->
                to_array(array('seo_title', 'key_words', 'seo_description'));

//        $result['data'] = $data = $automodel->get_automodel_for_user($automodel_id, true);

        $this->check_link($data, $result, 'automodel', 0, $main, $lang_id, $static_link, $title, $tab);

    }

    public function get_automodels($automodel_id = 0, $menu_item_id = 1, $main = 1, $lang_id = 2) {

        $static_link = 'automodels/' . $automodel_id . '/' . $menu_item_id . '/' . $main . '/' . $lang_id;

        $main = 1;

        $header = new Menu_item();
        $menuItem = $header->get_menu_item_by_block(1);

        $lang = $this->get_lang_by_id($lang_id);

        foreach ($menuItem as $mI) {
            if (intval($mI['component_type_id']) == 26) {
                $title = $mI['lang'][$lang]['value'];
            }
        }

        $result['data'] = $data = true;

        $this->check_link($data, $result, 'automodels', 0, $main, $lang_id, $static_link, $title);

    }

}

?>
