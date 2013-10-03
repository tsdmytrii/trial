<?php

class Category_controller extends MY_Controller {

    function __construct() {
        parent::__construct();
        $this->load->helper(array('form', 'url'));
//        $this->load->library(array('form_validation', 'upload', 'plugins/image'));
        $this->load->library(array('form_validation'));
        $this->session->set_userdata('lang', 2);
    }

    public function get_category(){

        $category = new Category();

        $result = $category->get_category_by_id();

        $this->return_result($result);

    }

    public function get_all_categories(){

        $category = new Category();

        $result = $category->get_all_categories();

        $this->return_result($result);

    }

    public function set_category(){

        $category = new Category();

        $result = $category->set_category();

        $this->return_result($result);

    }

    public function set_attribute(){

        $category = new Category_attribute();

        $result = $category->set_category_attribute();

        $this->return_result($result);

    }

    public function delete_category(){

        $category = new Category();

        $result = $category->delete_category();

        $this->return_result($result);

    }

    public function delete_category_attribute(){

        $category_attr = new Category_attribute();

        $result = $category_attr->delete_category_attribute();

        $this->return_result($result);

    }

    public function set_quality_variant(){

        $quality_variant = new Quality_variant();

        $result = $quality_variant->set_quality_variant();

        $this->return_result($result);

    }

    public function delete_quality_variant(){

        $quality_variant = new Quality_variant();

        $result = $quality_variant->delete_quality_variant();

        $this->return_result($result);

    }


}

?>
