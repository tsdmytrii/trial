<?php

class Profiling_controller extends MY_Controller {

    function __construct() {
        parent::__construct();
        $this->load->helper(array('form', 'url'));
        $this->load->library(array('form_validation', 'upload', 'plugins/image'));
    }

    public function get_productivity() {
        $productivity = new Productivity();

        $result['data'] = $productivity->get_productivity();

        $this->load->view('profiling/profile.php', $result);
    }

}

?>
