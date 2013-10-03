<?php

class Complectation_controller extends MY_Controller {

    function __construct() {
        parent::__construct();
        $this->load->helper(array('form', 'url'));
        $this->load->library(array('form_validation', 'upload', 'plugins/image'));
        $this->session->set_userdata('lang', 2);
    }

    public function index() {
//		$data['total'] = $this->funds_article->count_articles();
//		$this->load->view('admin/header', $data);
//        $this->load->view('admin/header');
//        $this->load->view('admin/menu/toper');
//        $data['current'] = 'menu_controller';
//        $this->load_menu($data);
//        $this->load->view('admin/index');
//        $this->load->view('admin/footer');
    }

    public function set_complectation(){
        $complectation = new Complectation();

        $result = $complectation->set_complectation();

        echo $this->return_result($result);
    }

    public function get_all_complectations(){
        $complectation = new Complectation();

        $result = $complectation->get_all_complectations();

        $this->return_result($result);
    }

    public function get_complectation(){
        $complectation = new Complectation();

        $result = $complectation->get_complectation();

        $this->return_result($result);
    }

    public function delete_complectation(){
        $complectation = new Complectation();

        $result = $complectation->delete_complectation();

        echo $this->return_result($result);
    }


}

?>
