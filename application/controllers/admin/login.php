<?php

class Login extends MY_Controller {

    function __construct() {
        parent::__construct();
        $this->load->library(array('core/login_class'));
    }

    function index() {
        if ($this->authorized() === false) {

            $lang = new Language();
            $data['lang'] = $lang->get_all_langs();

            $data['layout_title'] = 'Arsenal admin:: Login';
            $this->load->view('admin/header', $data);
            $this->load->view('admin/login/toper');
            $this->load->view('admin/login/login');
        } else {
            $this->redirect_to_main();
        }
    }

    function process() {
        if ($this->ion_auth->identity_check(($this->input->post('login'))) !== false) {
            //var_dump($this->login_class->isset_admin_user($this->input->post('login'), $this->input->post('password')));
            $this->authorize();
        } else {
            redirect(base_url() . 'admin/login', 'location', 302);
        }
    }

    function set_password() {
        $this->load->model('plugins/ion_auth_model');
        $this->ion_auth->update(1, array('password' => 'password'));
    }

    function logout() {
        $this->ion_auth->logout();
        redirect(base_url() . 'admin/login', 'refresh');
    }

}

?>
