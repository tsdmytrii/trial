<?php

class Email extends DataMapper {

    public $table = 'emails';
    public static $ci;
    public $has_many = array('question_variant');
    public $validation = array(
        array(
            'field' => 'id',
            'label' => 'id',
            'rules' => array('trim', 'numeric', 'max_length' => 5),
        ),
        array(
            'field' => 'date',
            'label' => 'Date',
            'rules' => array('required', 'trim', 'min_length' => 8, 'max_length' => 19),
        ),
        array(
            'field' => 'email',
            'label' => 'Email',
            'rules' => array('required', 'trim', 'min_length' => 2, 'max_length' => 200),
        ),
        array(
            'field' => 'department',
            'label' => 'Department',
            'rules' => array('required', 'trim', 'min_length' => 2, 'max_length' => 200),
        ),
        array(
            'field' => 'description',
            'label' => 'Description',
            'rules' => array('trim', 'min_length' => 2, 'max_length' => 1000),
        )
    );

    function __construct($id = NULL) {
        parent::__construct($id);
        if (empty(self::$ci)) {
            self::$ci = &get_instance();
        }
        self::$ci->load->library(array('plugins/image'));
    }

    public function set_from_default() {
        return 0;
    }

    public function set_email() {
        if (self::$ci->access->check_access(__FUNCTION__) == false)
            return 403;

        $email = new Email();

        if (self::$ci->input->post('id'))
            $email->get_by_id(self::$ci->input->post('id'));

        $email->date = date('d-m-Y H:i:s');
        $email->email = self::$ci->input->post('email');
        $email->department = self::$ci->input->post('department');
        $email->description = self::$ci->input->post('description');

        return $email->save();
    }

    public function get_emails() {
        if (self::$ci->access->check_access(__FUNCTION__) == false)
            return 403;
        $email = new Email();

        return $email->get()->all_to_array();
    }

    public function get_email_by_id($email_id = false) {

        if (self::$ci->access->check_access(__FUNCTION__) == false)
            return 403;

        $email_id = self::$ci->input->post('email_id') ? self::$ci->input->post('email_id') : $email_id;

        $email = new Email();

        return $email->get_by_id($email_id)->to_array();
    }

    public function delete_email($email_id = false) {

        if (self::$ci->access->check_access(__FUNCTION__) == false)
            return 403;

        $email_id = self::$ci->input->post('email_id') ? self::$ci->input->post('email_id') : $email_id;

        $email = new Email();

        $email->get_by_id($email_id);

        return $email->delete();
    }

    public function email_autocomplete() {
        $email = new Email();
        $query = self::$ci->input->post('query');

        $email->like('email', $query)->or_like('department', $query)->get();
        foreach ($email as $e) {
            $data[] = $e->id;
            $suggestions[] = $e->department;
        }

        return array('query' => $query, 'suggestions' => $suggestions, 'data' => $data);
    }

}

?>