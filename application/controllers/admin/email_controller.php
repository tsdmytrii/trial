<?php

class Email_controller extends MY_Controller {

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

    public function set_email(){
        $email = new Email();

        $result = $email->set_email();

        echo $this->return_result($result);
    }

    public function get_emails(){
        $email = new Email();

        $result = $email->get_emails();

        $this->return_result($result);
    }

    public function get_email_by_id(){
        $email = new Email();

        $result = $email->get_email_by_id();

        $this->return_result($result);
    }

    public function delete_email(){
        $email = new Email();

        $result = $email->delete_email();

        $this->return_result($result);
    }

    public function email_autocomplete(){
        $email = new Email();

        $result = $email->email_autocomplete();

        echo json_encode($result);
    }

}

?>
