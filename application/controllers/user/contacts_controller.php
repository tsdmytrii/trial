<?php

class Contacts_controller extends MY_Controller {

    function __construct() {
        parent::__construct();
        $this->load->helper(array('form', 'url'));
        $this->load->library(array('form_validation', 'plugins/ion_auth'));
//        $this->session->set_userdata('lang', 2);
//        $this->load->library('console');
//        $this->output->enable_profiler(TRUE);

        $this->load->driver('cache');
    }

    public function get_contacts($contacts_id = 1, $menu_item_id = 1, $main = 1, $lang_id = 2) {

        $static_link = 'contacts/' . $contacts_id . '/' . $menu_item_id . '/' . $main . '/' . $lang_id;

        $main = 1;

        $header = new Menu_item();
        $menuItem = $header->get_menu_item_by_block(1);

        $lang = $this->get_lang_by_id($lang_id);

        foreach ($menuItem as $mI) {
            if (intval($mI['component_type_id']) == 28) {
                $title = $mI['lang'][$lang]['value'];
            }
        }

        $contact = new Contact();

        $result['data'] = $data = $contact->get_contacts();

        $this->check_link($data, $result, 'contacts', 0, $main, $lang_id, $static_link, $title);
    }

}
?>
