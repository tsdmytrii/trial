<?php

class Product_controller extends MY_Controller {

    function __construct() {
        parent::__construct();
        $this->load->helper(array('form', 'url'));
//        $this->load->library(array('form_validation', 'upload', 'plugins/image'));
        $this->load->library(array('form_validation'));
        $this->session->set_userdata('lang', 2);
    }

    public function get_product(){

        $product = new Product();

        $result = $product->get_product();

        $this->return_result($result);

    }

    public function get_all_products(){

        $product = new Product();

        $result = $product->get_all_products();

        $this->return_result($result);

    }

    public function set_product(){

        $product = new Product();

        $result = $product->set_product();

        $this->return_result($result);

    }

    public function delete_product(){

        $product = new Product();

        $result = $product->delete_product();

        $this->return_result($result);

    }

    public function get_all_categories() {
        $category = new Category();

        $result = $category->get_category_for_product();

        $this->return_result($result);
    }

    public function set_category(){

        $product = new Product();

        $result = $product->set_category();

        $this->return_result($result);

    }

    public function delete_category(){

        $product = new Product();

        $result = $product->delete_product_category();

        $this->return_result($result);

    }

    public function set_attribute_value() {
        $product = new Product();

        $result = $product->set_attribute_value();

        $this->return_result($result);
    }

    public function get_attribute_values() {
        $product = new Product();

        $result = $product->get_product_category_attribute();

        $this->return_result($result);
    }

    public function product_autocomplete() {

        $product = new Product();

        $result = $product->product_autocomplete();

        echo json_encode($result);

    }

}

?>
