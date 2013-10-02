<?php

class Staticcomp_controller extends MY_Controller {

    function __construct() {
        parent::__construct();
        $this->load->helper(array('form', 'url'));
        $this->load->library(array('form_validation', 'plugins/ion_auth'));
//        $this->session->set_userdata('lang', 2);
//        $this->load->library('console');
//        $this->output->enable_profiler(TRUE);

        $this->load->driver('cache');
    }

    public function get_staticcomp($static_component_id = 1, $menu_item_id = 1, $main = 0, $lang_id = 2) {

        $static_component = new Static_component();

        $static_link = 'staticcomp/' . $static_component_id . '/' . $menu_item_id . '/' . $main . '/' . $lang_id;

        $main = $this->check_user_agent() ? $this->check_user_agent() : $main;

        // методю который достает продукт
        $result['data'] = $data = $static_component->get_static_component_for_user($static_component_id, $menu_item_id);

        $lang = $this->get_lang_by_id($lang_id);

        $title = '';

        if ($data['menu_item'] !== false) {
            $title = $data['menu_item']['lang'][$lang]['value'];
        } else {
            $title = $data['lang'][$lang]['title'];
        }

        $this->check_link($data, $result, 'staticcomp', $menu_item_id, $main, $lang_id, $static_link, $title);

    }

}

?>
