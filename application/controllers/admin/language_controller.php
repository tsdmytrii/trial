<?php

class Language_controller extends MY_Controller {

    function __construct() {
        parent::__construct();
        $this->load->helper(array('form', 'url'));
//        $this->load->library(array('form_validation', 'upload', 'plugins/image'));
        $this->load->library(array('form_validation'));
        $this->session->set_userdata('lang', 2);
    }

    public function get_language() {

        $language = new Language();

        $this->return_result($language->get_language());

    }

    public function get_all_languages() {

        $language = new Language();

        $this->return_result($language->get_all_languages());

    }

    public function set_language() {

        $language = new Language();

        $this->return_result($language->set_language());

    }

    public function delete_language() {

        $language = new Language();

        $this->return_result($language->delete_language());

    }


}

?>
