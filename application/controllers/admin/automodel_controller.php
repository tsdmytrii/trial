<?php

class Automodel_controller extends MY_Controller {

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

    public function set_automodel(){
        $automodel = new Automodel();

        $result = $automodel->set_automodel();

        echo $this->return_result($result);
    }

    public function get_all_automodels(){
        $automodel = new Automodel();

        $result = $automodel->get_all_automodels();

        $this->return_result($result);
    }

    public function get_automodel(){
        $automodel = new Automodel();

        $result = $automodel->get_automodel();

        $this->return_result($result);
    }

    public function delete_automodel(){
        $automodel = new Automodel();

        $result = $automodel->delete_automodel();

        echo $this->return_result($result);
    }

    public function automodel_autocomplete(){
        $automodel = new Automodel();

        $result = $automodel->automodel_autocomplete();

        echo json_encode($result);
    }

}

?>
