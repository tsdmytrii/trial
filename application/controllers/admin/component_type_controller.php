<?php

class Component_type_controller extends MY_Controller {

    function __construct() {
        parent::__construct();
        $this->load->helper(array('form', 'url'));
        $this->load->library(array('form_validation', 'upload', 'plugins/image'));
        $this->session->set_userdata('lang', 2);
    }

    public function get_component_type(){
        $component_type = new Component_type();

        $this->return_result($component_type->get_component_type());
    }

    public function set_component_type(){
        $component_type = new Component_type();

        $this->return_result($component_type->set_component_type());
    }

    public function get_all_component_type(){
        $component_type = new Component_type();

        $this->return_result($component_type->get_all_component_type());
    }


    /*
     * COMPONENT TYPE FUNCTION
     */

    public function set_component_function() {

        $component_function = new Component_function();

        $this->return_result($component_function->set_component_function());

    }

    public function get_all_component_function() {

        $component_function = new Component_function();

        $this->return_result($component_function->get_all_component_function());

    }

    public function delete_component_function() {

        $component_function = new Component_function();

        $this->return_result($component_function->delete_component_function());

    }

}

?>
