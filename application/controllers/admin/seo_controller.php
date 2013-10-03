<?php

class Seo_controller extends MY_Controller {

    function __construct() {
        parent::__construct();
        $this->load->helper(array('form', 'url'));
        $this->load->library(array('form_validation', 'upload', 'plugins/image'));
    }

    public function get_seo(){
        $seo = new Seo();

        $result = $seo->get_seo();

        $this->return_result($result);
    }

    public function set_seo(){
        $seo = new Seo();

        $result = $seo->set_seo();

        $this->return_result($result);
    }

}

?>
