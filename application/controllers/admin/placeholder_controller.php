<?php

class Placeholder_controller extends MY_Controller {

    function __construct() {
        parent::__construct();
        $this->load->helper(array('form', 'url', 'file'));
        $this->load->library(array('form_validation'));
        $this->session->set_userdata('lang', 2);
    }

    public function index() {
        $name = 'placeholders';

        $tab = new Tab();

        $data['data'] = $tab->get_tab_by_name($name);

        if (!$this->input->is_ajax_request()) {
            $this->load_header($data['data']);
            $this->load->view('admin/toper', $data);
            $this->load_menu($data['data']);
            $this->load_index();
            $this->load_footer();
        }
        else
            $this->output->set_output(json_encode($data['data']));
    }

    public function set_placeholder() {
        $placeholder = new Placeholder();

        $this->return_result($placeholder->set_placeholder());
    }

    public function get_placeholder() {
        $placeholder = new Placeholder();

        $this->return_result($placeholder->get_placeholder());
    }

    public function get_placeholders() {
        $placeholder = new Placeholder();

        $this->return_result($placeholder->get_all_placeholders());
    }

    public function delete_placeholder() {
        $placeholder = new Placeholder();

        $this->return_result($placeholder->delete_placeholder());
    }

    public function set_attribute() {
        $attribute = new Attribute();

        $this->return_result($attribute->set_placeholder_attribute());
    }

    public function delete_attribute() {
        $attribute = new Attribute();

        $this->return_result($attribute->delete_placeholder_attribute());
    }

    public function set_mini_block() {
        $placeholder = new Placeholder();

        $this->return_result($placeholder->set_placeholder_mini_block());
    }

    public function delete_miniblock() {
        $placeholder = new Placeholder();

        $this->return_result($placeholder->delete_placeholder_miniblock());
    }

    public function set_product_block() {
        $placeholder = new Placeholder();

        $this->return_result($placeholder->set_placeholder_product_block());
    }

    public function delete_product_block() {
        $placeholder = new Placeholder();

        $this->return_result($placeholder->delete_placeholder_product_block());
    }

}

?>
