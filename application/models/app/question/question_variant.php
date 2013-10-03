<?php

class Question_variant extends DataMapper {

    public $table = 'question_variants';
    public static $ci;
    public $has_one = array('email');
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
            'field' => 'question_theme',
            'label' => 'Question theme',
            'rules' => array('required', 'trim', 'min_length' => 2, 'max_length' => 200),
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

    public function set_question_variant() {
        if (self::$ci->access->check_access(__FUNCTION__) == false)
            return 403;

        $question_variant = new Question_variant();

        if (self::$ci->input->post('id'))
            $question_variant->get_by_id(self::$ci->input->post('id'));

        $question_variant->date = date('d-m-Y H:i:s');
        $question_variant->question_theme = self::$ci->input->post('question_theme');
        $question_variant->email_id = self::$ci->input->post('email_id');

        return $question_variant->save();
    }

    public function get_question_variant() {
        if (self::$ci->access->check_access(__FUNCTION__) == false)
            return 403;

        $question_variant = new Question_variant();

        return $question_variant->get()->all_to_array();
    }

    public function get_question_variant_by_id($question_variant_id = false) {
        if (self::$ci->access->check_access(__FUNCTION__) == false)
            return 403;

        $question_variant_id = self::$ci->input->post('question_variant_id') ? self::$ci->input->post('question_variant_id') : $question_variant_id;

        $question_variant = new Question_variant();

        $result = $question_variant->get_by_id($question_variant_id)->to_array();

        $email = new Email();

        $result['email'] = $email->get_by_id($question_variant->email_id)->to_array();

        return $result;
    }

    public function delete_question_variant($question_variant_id = false) {

        if (self::$ci->access->check_access(__FUNCTION__) == false)
            return 403;

        $question_variant_id = self::$ci->input->post('question_variant_id') ? self::$ci->input->post('question_variant_id') : $question_variant_id;

        $question_variant = new Question_variant();

        $question_variant->get_by_id($question_variant_id);

        return $question_variant->delete();
    }

}

?>