<?php

class Logo_controller extends MY_Controller {

    function __construct() {
        parent::__construct();
        $this->load->helper(array('form', 'url'));
        $this->load->library(array('form_validation', 'upload', 'plugins/image'));
        $this->session->set_userdata('lang', 2);
    }

    public function set_logo_image() {
        $logo = new Autobrend_logo();

        $result = $logo->set_img();

        $this->return_result($result);
    }

    public function delete_logo() {
        $logo = new Autobrend_logo();

        $result = $logo->delete_img();

        $this->return_result($result);
    }

    public function set_autologo_image() {
        $logo = new Autobrend_autologo();

        $result = $logo->set_img();

        $this->return_result($result);
    }

    public function delete_autologo() {
        $logo = new Autobrend_autologo();

        $result = $logo->delete_img();

        $this->return_result($result);
    }

    public function set_automodel_logo() {
        $logo = new Automodel_logo();

        $result = $logo->set_img();

        $this->return_result($result);
    }

    public function delete_automodel_logo() {
        $logo = new Automodel_logo();

        $result = $logo->delete_img();

        $this->return_result($result);
    }

    public function set_complectation_logo() {
        $logo = new Complectation_logo();

        $result = $logo->set_img();

        $this->return_result($result);
    }

    public function delete_complectation_logo() {
        $logo = new Complectation_logo();

        $result = $logo->delete_img();

        $this->return_result($result);
    }

    public function set_mini_block_img() {
        $mini_block_img = new Mini_block_image();

        $result = $mini_block_img->set_img();

        $this->return_result($result);
    }

    public function delete_mini_block_img() {
        $mini_block_img = new Mini_block_image();

        $result = $mini_block_img->delete_img();

        $this->return_result($result);
    }

    public function set_mini_block_tooltip() {

        $mini_block_tooltip = new Mini_block_tooltip();

        $result = $mini_block_tooltip->set_img();

        $this->return_result($result);

    }

    public function delete_mini_block_tooltip() {
        $mini_block_tooltip = new Mini_block_tooltip();

        $result = $mini_block_tooltip->delete_img();

        $this->return_result($result);
    }

    public function set_category_img() {

        $category_logo = new Category_logo();

        $result = $category_logo->set_img();

        $this->return_result($result);

    }

    public function delete_category() {

        $category_logo = new Category_logo();

        $result = $category_logo->delete_img();

        $this->return_result($result);

    }

    public function set_producer_logo() {
        $producer_logo = new Producer_logo();

        $result = $producer_logo->set_img();

        $this->return_result($result);

    }

    public function delete_producer_logo() {

        $producer_logo = new Producer_logo();

        $result = $producer_logo->delete_img();

        $this->return_result($result);

    }

    public function set_product_logo() {
        $product_logo = new Product_logo();

        $result = $product_logo->set_img();

        $this->return_result($result);

    }

    public function delete_product_logo() {

        $product_logo = new Product_logo();

        $result = $product_logo->delete_img();

        $this->return_result($result);

    }

}

?>
