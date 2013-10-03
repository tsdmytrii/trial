<?php

class Unit_controller extends MY_Controller {

    function __construct() {
        parent::__construct();
        $this->load->helper(array('form', 'url'));
//        $this->load->library(array('form_validation', 'upload', 'plugins/image'));
        $this->load->library(array('form_validation'));
        $this->session->set_userdata('lang', 2);
    }

    public function get_unit(){

        $unit = new Unit();

        $result = $unit->get_unit();

        $this->return_result($result);

    }

    public function get_all_units(){

        $unit = new Unit();

        $result = $unit->get_all_units();

        $this->return_result($result);

    }

    public function set_unit(){

        $unit = new Unit();

        $result = $unit->set_unit();

        $this->return_result($result);

    }

    public function delete_unit(){

        $unit = new Unit();

        $this->return_result($unit->delete_unit());

    }


}

?>
