<?php

class Producer_controller extends MY_Controller {

    function __construct() {
        parent::__construct();
        $this->load->helper(array('form', 'url'));
//        $this->load->library(array('form_validation', 'upload', 'plugins/image'));
        $this->load->library(array('form_validation'));
        $this->session->set_userdata('lang', 2);
    }

    public function get_producer(){

        $producer = new Producer();

        $result = $producer->get_producer();

        $this->return_result($result);

    }

    public function get_all_producers(){

        $producer = new Producer();

        $result = $producer->get_all_producers();

        $this->return_result($result);

    }

    public function set_producer(){

        $producer = new Producer();

        $result = $producer->set_producer();

        $this->return_result($result);

    }

    public function delete_producer(){

        $producer = new Producer();

        $result = $producer->delete_component_content();

        $this->return_result($result);

    }

    public function producer_autocomplete() {
        $producer = new Producer();

        $result = $producer->producer_autocomplete();

        echo json_encode($result);
    }

}

?>
