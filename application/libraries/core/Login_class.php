<?php

class Login_class {

    function __construct() {
        $this->ci = &get_instance();
        $this->ci->load->model(array('core/user_model'));
    }

    function isset_admin_user($login, $password) {
        if ($this->get_user_data($login, $password) !== false)
            return true;
        else
            return false;
    }

    function set_data($login, $password) {

        $user = $this->get_user_data($login, $password);
        print_r($user);
        if ($user !== false) {
            $this->ci->session->set_userdata('user_id', $user['id']);
        }
    }

    private function get_user_data($login, $password = false) {
        $where['name'] = $login;
        if ($password !== false) {
            $where['password'] = sha1($password);
        }
        return $this->ci->user_model->get_user($where);
    }

    function get_user_data_by_id($user_id) {
        return $this->ci->user_model->get_user(array('id' => $user_id));
    }

    function is_user_id_accepted($user_id) {
        if ($this->get_user_data_by_id($user_id) !== false)
            return true;
        else
            return false;
    }

}

?>
