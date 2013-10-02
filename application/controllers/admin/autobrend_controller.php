<?php

class Autobrend_controller extends MY_Controller {

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

    public function set_autobrend(){
        $autobrend = new Autobrend();

        $result = $autobrend->set_autobrend();

        echo $this->return_result($result);
    }

    public function get_autobrend(){
        $autobrend = new Autobrend();

        $result = $autobrend->get_autobrend();

        $this->return_result($result);
    }

    public function delete_autobrend(){
        $autobrend = new Autobrend();

        $result = $autobrend->delete_autobrend();

        echo $this->return_result($result);
    }


}

?>
