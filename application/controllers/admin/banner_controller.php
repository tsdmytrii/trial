<?php

class Banner_controller extends MY_Controller {

    function __construct() {
        parent::__construct();
        $this->load->helper(array('form', 'url'));
        $this->load->library(array('form_validation', 'upload', 'plugins/image'));
        $this->session->set_userdata('lang', 2);
    }

    public function get_banner(){
        $banner = new Banner();

        $this->return_result($banner->get_banner());
    }

    public function set_banner(){
        $banner = new Banner();

        $this->return_result($banner->set_banner());
    }

    public function get_all_banner(){
        $banner = new Banner();

        $this->return_result($banner->get_banner());
    }

    public function delete_banner(){
        $banner = new Banner();

        $this->return_result($banner->delete_banner());
    }

    public function delete_img_banner() {
        $banner = new Banner_image();

        $this->return_result($banner->delete_img());
    }

}

?>
