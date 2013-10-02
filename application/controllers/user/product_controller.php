<?php

class Product_controller extends MY_Controller {

    function __construct() {
        parent::__construct();
        $this->load->helper(array('form', 'url'));
        $this->load->library(array('form_validation', 'plugins/ion_auth'));
//        $this->session->set_userdata('lang', 2);
//        $this->load->library('console');
//        $this->output->enable_profiler(TRUE);

        $this->load->driver('cache');
    }

    public function get_product($product_id = 1, $menu_item_id = 1, $main = 0, $lang_id = 2) {

        $product = new Product();

        $static_link = 'product/' . $product_id . '/' . $menu_item_id . '/' . $main . '/' . $lang_id;

        $main = $this->check_user_agent() ? $this->check_user_agent() : $main;

        // методю который достает продукт
        $result['data'] = $data = $product->get_product_for_user($product_id, $menu_item_id);

        $lang = $this->get_lang_by_id($lang_id);

        $title = '';

        if ($data['menu_item'] !== false) {
            $title = $data['menu_item']['lang'][$lang]['value'];
        } else {
            $title = $data['lang'][$lang]['title'];
        }

        $this->check_link($data, $result, 'product', $menu_item_id, $main, $lang_id, $static_link, $title);

    }

}

?>
