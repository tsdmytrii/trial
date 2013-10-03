<?php

class Baner_image_controller extends MY_Controller {

    function __construct() {
        parent::__construct();
        $this->load->helper(array('form', 'url'));
        $this->load->library(array('form_validation', 'upload', 'plugins/image'));
        $this->session->set_userdata('lang', 2);
    }

    public function set_img_banner() {
        $banner = new Banner_image();

        $this->return_result($banner->set_img());
    }

    public function delete_img_banner() {
        $banner = new Banner_image();

        $this->return_result($banner->delete_img());
    }
}

?>
