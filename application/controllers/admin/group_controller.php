<?php

class Group_controller extends MY_Controller {

    function __construct() {
        parent::__construct();
        $this->load->helper(array('form', 'url'));
//        $this->load->library(array('form_validation', 'upload', 'plugins/image'));
        $this->load->library(array('form_validation'));
        $this->session->set_userdata('lang', 2);
    }

    public function get_group(){

        $group = new Group();

        $result = $group->get_group();

        $this->return_result($result);

    }

    public function get_all_group(){

        $group = new Group();

        $result = $group->get_all_group();

        $this->return_result($result);

    }

    public function set_group(){

        $group = new Group();

        $result = $group->set_group();

        $this->return_result($result);

    }

    public function delete_group(){

        $group = new Group();

        $result = $group->delete_component_content();

        $this->return_result($result);

    }

    public function get_component_functions() {

        $group = new Group();

        $this->return_result($group->get_components_and_functions());

    }

    public function set_permissions() {

        $group = new Group();

        $this->return_result($group->set_permissions());

    }

}

?>
