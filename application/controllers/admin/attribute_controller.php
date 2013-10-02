<?php

class Attribute_controller extends MY_Controller {

    function __construct() {
        parent::__construct();
    }

    public function index() {
        $name = 'attribute';

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

    public function set_attribute(){

        $attribute = new Attribute();
        $result = $attribute->set_attribute();
        $this->return_result($result);
    }

    public function get_attribute(){

        $attribute = new Attribute();
        $this->return_result($attribute->get_attribute());
    }

    public function get_all_attributes(){
        $attribute = new Attribute();

        $this->return_result($attribute->get_all_attributes());
    }

    public function delete_attribute(){
        $attribute = new Attribute();

        $result = $attribute->delete_attribute();

        $this->return_result($result);
    }

    public function check_link(){
        $link = new Link();

        $result = $link->check_link();

        echo $result;
    }

    public function get_navigationoption(){
        $option = new Navigation_option();

        $result = $option->get_navigation_option();

        echo $this->return_result($result);
    }

    public function set_navigationoption(){
        $option = new Navigation_option();

        $result = $option->set_navigation_option();

        echo $this->return_result($result);
    }

}
