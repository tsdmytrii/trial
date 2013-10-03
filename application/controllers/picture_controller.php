<?php

class Picture_controller extends MY_Controller {

    function __construct() {
        parent::__construct();
        $this->load->helper(array('form', 'url'));
        $this->load->library(array('form_validation', 'upload', 'plugins/image'));
        $this->session->set_userdata('lang', 2);
    }

    public function set_picture() {
        $picture = new Autobrend_picture();

        $result = $picture->set_img();

        $this->return_result($result);
    }

    public function delete_picture() {
        $picture = new Autobrend_picture();

        $result = $picture->delete_img();

        $this->return_result($result);
    }

    public function set_autoservice_bg_picture() {
        $picture = new Autoservice_picture();

        $result = $picture->set_img();

        $this->return_result($result);
    }

    public function set_autoservice_picture_order() {
        $picture = new Autoservice_picture();

        $result = $picture->set_autoservice_picture_order();

        $this->return_result($result);
    }

    public function delete_autoservice_bg_picture() {
        $picture = new Autoservice_picture();

        $result = $picture->delete_img();

        $this->return_result($result);
    }

    public function set_article_item_image(){
        $picture = new Article_item_image();

        $result = $picture->set_img();

        $this->return_result($result);
    }

    public function delete_article_item_image(){
        $picture = new Article_item_image();

        $result = $picture->delete_img();

        $this->return_result($result);
    }
}

?>
