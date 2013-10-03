<?php

class Marking_controller extends MY_Controller {

    function __construct() {
        parent::__construct();
        $this->load->helper(array('form', 'url'));
        $this->load->library(array('form_validation'));
        $this->session->set_userdata('lang', 2);
    }

    public function set_marking() {
        $marking = new Marking();

        $result = $marking->set_marking();

        echo $this->return_result($result);
    }

    public function get_marking() {
        $marking = new Marking();

        $result = $marking->get_marking();

        $this->return_result($result);
    }
    
}

?>
