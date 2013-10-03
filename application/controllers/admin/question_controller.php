<?php

class Question_controller extends MY_Controller {

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

    public function set_question_variant(){
        $question = new Question_variant();

        $result = $question->set_question_variant();

        echo $this->return_result($result);
    }

    public function get_question_variant(){
        $question_variant = new Question_variant();

        $result = $question_variant->get_question_variant();

        $this->return_result($result);
    }

    public function get_question_variant_by_id(){
        $question_variant = new Question_variant();

        $result = $question_variant->get_question_variant_by_id();

        $this->return_result($result);
    }

    public function delete_question_variant(){
        $question_variant = new Question_variant();

        $result = $question_variant->delete_question_variant();

        echo $this->return_result($result);
    }


}

?>
