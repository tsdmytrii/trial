<?php

class Characteristic_controller extends MY_Controller {

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

    public function set_characteristic(){
        $characteristic = new Characteristic();

        $result = $characteristic->set_characteristic();

        echo $this->return_result($result);
    }

    public function get_all_characteristics(){
        $characteristic = new Characteristic();

        $result = $characteristic->get_all_characteristics();

        $this->return_result($result);
    }

    public function get_characteristic(){
        $characteristic = new Characteristic();

        $result = $characteristic->get_characteristic();

        $this->return_result($result);
    }

    public function delete_characteristic() {
        $characteristic = new Characteristic();

        $result = $characteristic->delete_characteristic();

        echo $this->return_result($result);
    }


}

?>
