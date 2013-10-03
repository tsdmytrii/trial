<?php

class User_controller extends MY_Controller {

    function __construct() {
        parent::__construct();
        $this->load->helper(array('form', 'url'));
        $this->load->library(array('form_validation', 'plugins/ion_auth'));
//        $this->session->set_userdata('lang', 2);
//        $this->load->library('console');
//        $this->output->enable_profiler(TRUE);

        $this->load->driver('cache');
    }

    function index($lang = 'ru') {
        if ($lang == 'ru')
            $lang_id = 2;
        else
            $lang_id = 1;

        $result['pref'] = $lang;
        $result['lang_id'] = $lang_id;
        $result = $result + $this->load_data($lang_id);

        $content = $this->load->view('user/head', $result, true) . $this->load->view('user/content', $result, true);

        $this->output->append_output($content);
    }

    public function redirect_to_base_url() {
        redirect(base_url());
    }

    public function ask_quest(){
        $email = $this->input->post('email');
        $name = $this->input->post('name');
        $question = $this->input->post('question');
        $question_variant_id = $this->input->post('question_variant_id');

        $question_variant = new Question_variant();
        $question_variant->get_by_id($question_variant_id);

        $email_to = new Email();
        $email_to->get_by_id($question_variant->email_id);

        $title_message = $name . ' - ' . $email;
        $text_message = 'От: ' . $name . '<br />' . 'Електронный адрес: ' . $email . '<br />' . 'Тема вопроса: ' . $question_variant->question_theme . '<br />' . 'Вопрос: ' . $question . '<br />' ;
        $text_message = '<html> <head> <title>' . $title_message . '</title> </head> <body> <p>' . $text_message . '</p> </body> </html>';

        $headers = "Content-type: text/html; charset=UTF-8 \r\n" . "From: " . $email . "\r\n" . "Bcc: " . $email . "\r\n";

        mail($email_to->email, $title_message, $text_message, $headers);

        echo json_encode(array('success' => true, 'result' => $text_message));
    }
}

?>
