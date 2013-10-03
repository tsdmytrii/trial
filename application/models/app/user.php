<?php
/*
 * Use class 
 * 
 * Set/edit/delete users
 */
class User extends DataMapper {

    public $table = 'users';
    public $has_many = array('group');
    public static $ci;
    public $validation = array(
        array(
            'field' => 'id',
            'label' => 'id',
            'rules' => array('trim', 'numeric', 'max_length' => 5),
        ),
        array(
            'field' => 'username',
            'label' => 'username',
            'rules' => array('trim', 'max_length' => 100),
        ),
        array(
            'field' => 'password',
            'label' => 'password',
            'rules' => array('trim', 'max_length' => 40),
        ),
        array(
            'field' => 'first_name',
            'label' => 'first_name',
            'rules' => array('trim', 'max_length' => 50),
        ),
        array(
            'field' => 'last_name',
            'label' => 'last_name',
            'rules' => array('trim', 'max_length' => 50),
        ),
        array(
            'field' => 'company',
            'label' => 'company',
            'rules' => array('trim', 'max_length' => 100),
        ),
        array(
            'field' => 'phone',
            'label' => 'phone',
            'rules' => array('trim', 'max_length' => 20),
        ),
    );

    function __construct($id = NULL) {
        parent::__construct($id);
        if (empty(self::$ci)) {
            self::$ci = &get_instance();
            self::$ci->load->library('plugins/ion_auth');
        }
    }

    function get_all_user() {

        if (self::$ci->access->check_access(__FUNCTION__) == false)
            return 403;

        return self::$ci->ion_auth->users()->result_array();
    }

    function check_email($email) {
        return self::$ci->ion_auth->email_check($email);
    }

    function set_user() {

        if (self::$ci->access->check_access(__FUNCTION__) == false)
            return 403;

        $user_id = self::$ci->input->post('id');
        if ($user_id && !empty($user_id)) {
            return $this->update_user();
        }
        else
            return $this->add_user();
    }

    function add_user() {

        $user_id = self::$ci->ion_auth->register(self::$ci->input->post('username'), self::$ci->input->post('password'), self::$ci->input->post('email'), array(
                    'active' => self::$ci->input->post('active'),
                    'first_name' => (self::$ci->input->post('name')) ? self::$ci->input->post('name') : '',
                    'last_name' => (self::$ci->input->post('surname')) ? self::$ci->input->post('surname') : '',
                    'phone' => (self::$ci->input->post('phone')) ? self::$ci->input->post('phone') : '',
                    'date_active' => date('Y-m-d H:i:s')
                ));

        return $user_id;

    }

    function update_user() {

        $user_id = self::$ci->input->post('id');

        $group_id = self::$ci->input->post('group_id');

        $password = self::$ci->input->post('passsword');

        $data = array(
            'username' => self::$ci->input->post('username'),
            'email' => self::$ci->input->post('email'),
            'active' => self::$ci->input->post('active'),
            'first_name' => (self::$ci->input->post('name')) ? self::$ci->input->post('name') : '',
            'last_name' => (self::$ci->input->post('surname')) ? self::$ci->input->post('surname') : '',
            'phone' => (self::$ci->input->post('phone')) ? self::$ci->input->post('phone') : ''
        );



        if ($password && !empty($password)) {
            $data['password'] = self::$ci->input->post('password');
        }

        if ($group_id && $group_id !== 0) {

            $user = new User();
            $user->get_by_id($user_id);

            $group = new Group();

            $group->get_by_related($user);

            if ($group->exists()) {
                $user->delete($group->all);
                $group->clear();
            }

            $group->get_by_id($group_id);

            $user->save($group);

        }

        return self::$ci->ion_auth->update($user_id, $data);

    }

    function get_user($user_id = false) {

        if (self::$ci->access->check_access(__FUNCTION__) == false)
            return 403;

        if (!$user_id)
            $user_id = self::$ci->session->userdata('user_id');
        $user = self::$ci->ion_auth->user($user_id)->row_array();

        $group = new Group();

        $group->get_by_related_user('id', $user_id);

        $user['group'] = $group->exists() ? $group->to_array() : false;

        return $user;
    }

    function delete_user() {

        if (self::$ci->access->check_access(__FUNCTION__) == false)
            return 403;

        $user_id = self::$ci->input->post('id');

        $user = new User();

        $user->get_by_id($user_id);

        $group = new Group();

        $group->get_by_related($user);

        if ($group->exists()) {

            $user->delete($group->all);

        }

        return self::$ci->ion_auth->delete_user($user_id);

    }

    function set_activation_user($user_id, $prognose_line_id, $status = 1, $type = 1) {

        $user = new User();

        $user->get_by_id($user_id);

        $activation_date = new DateTime($user->date_active);

        if ($status == 1){
            if ($type == 1)
                $activation_date->modify('+1 month');

            $data['chosen_prognose_line'] = $prognose_line_id;
            $data['current_prognose_line'] = $prognose_line_id;
        }
        else{

            $invoice = new Invoice();

            $last_invoice = $invoice->get_last_user_invoice($user_id);

            if ($type == 1)
                $activation_date->modify('-1 month');

            if ($last_invoice !== false) {
                $data['current_prognose_line'] = $last_invoice['prognose_line_id'];
            } else {
                $data['chosen_prognose_line'] = 0;
                $data['current_prognose_line'] = 0;
            }
        }

        $data['date_active'] = $activation_date->format('Y-m-d H:i:s');
        return self::$ci->ion_auth->update($user_id, $data);
    }

}

?>