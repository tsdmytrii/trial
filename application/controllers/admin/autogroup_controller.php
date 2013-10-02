<?php

class Autogroup_controller extends MY_Controller {

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

    public function get_autogroup(){
        $autogroup = new Autogroup();

        $result = $autogroup->get_autogroup();

        $this->return_result($result);
    }

    public function set_autogroup(){
        $autogroup = new Autogroup();

        $result = $autogroup->set_autogroup();

        echo $this->return_result($result);
    }

    public function delete_autogroup(){
        $autogroup = new Autogroup();

        $result = $autogroup->delete_autogroup();

        $this->return_result($result);
    }

    public function delete_automodel(){

        $autogroup = new Autogroup();

        $result = $autogroup->delete_automodel_from_group();

        $this->return_result($result);

    }

}

?>
