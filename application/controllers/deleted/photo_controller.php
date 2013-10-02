<?php

class Photo_controller extends MY_Controller {

    function __construct() {
        parent::__construct();
        $this->load->helper(array('form', 'url'));
        $this->load->library(array('form_validation', 'upload', 'plugins/image'));
        $this->session->set_userdata('lang', 2);
    }

    public function set_automodel_photo() {
        $photo = new Automodel_photo();

        $result = $photo->set_img();

        $this->return_result($result);
    }

    public function delete_photo() {
        $photo = new Automodel_photo();

        $result = $photo->delete_img();

        $this->return_result($result);
    }

    public function set_producer_photo(){

        $producer_photo = new Producer_photo();

        $result = $producer_photo->set_img();

        $this->return_result($result);

    }

    public function delete_producer_photo() {

        $producer_photo = new Producer_photo();

        $result = $producer_photo->delete_img();

        $this->return_result($result);

    }

    public function set_product_photo(){

        $product_photo = new Product_photo();

        $result = $product_photo->set_img();

        $this->return_result($result);

    }

    public function delete_product_photo() {

        $product_photo = new Product_photo();

        $result = $product_photo->delete_img();

        $this->return_result($result);

    }

}

?>
