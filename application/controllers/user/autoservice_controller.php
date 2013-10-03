<?php

class Autoservice_controller extends MY_Controller {

    function __construct() {
        parent::__construct();
        $this->load->helper(array('form', 'url'));
        $this->load->library(array('form_validation'));
        $this->session->set_userdata('lang', 2);
        $this->load->driver('cache');
    }

    public function get_autoservice($autoservice_id, $menu_item_id, $main, $lang_id){

        $autoservice = new Autoservice();

        $main = 1;

        $static_link = 'autoservice/' . $autoservice_id . '/' . $menu_item_id . '/' . $main . '/' . $lang_id;

        $result['data'] = $data = $autoservice->get_autoservice_for_user($autoservice_id, $menu_item_id);

        $lang = $this->get_lang_by_id($lang_id);

        $this->check_link($data, $result, 'autoservice', $menu_item_id, $main, $lang_id, $static_link, $data['menu_item']['lang'][$lang]['value']);

    }

}

?>
