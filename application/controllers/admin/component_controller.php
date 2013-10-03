<?php

class Component_controller extends MY_Controller {

    /*
     * Construct fuction of Component_controller class.
     * 
     * Loads helpers, libraries and session.
     */
    function __construct() {
        parent::__construct();
        $this->load->helper(array('form', 'url'));
//        $this->load->library(array('form_validation', 'upload', 'plugins/image'));
        $this->load->library(array('form_validation'));
        $this->session->set_userdata('lang', 2);
    }

    /*
     * Default function of components_controller class
     * 
     * Gets pages tab and loads admin/toper view with this tab
     */
    public function index() {
        $name = 'pages';

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

    public function get_component_by_id() {
        $component = new Component();

        $result = $component->get_component_by_id();

        $this->return_result($result);
    }

    public function set_component() {
        $component = new Component();

        $result = $component->set_component();

        $this->return_result($result);
    }

    public function get_components() {
        $component = new Component();

        $result = $component->get_components();

        $this->return_result($result);
    }

    public function get_componen_types() {
        $component_type = new Component_type();

        $result = $component_type->get_all_component_type();

        $this->return_result($result);
    }

    public function get_component_types_for_nav() {
        $component_type = new Component_type();

        $result = $component_type->get_component_types_for_nav();

        $this->return_result($result);
    }

    public function get_display_component_types() {
        $component_type = new Component_type();

        $result = $component_type->get_display_component_types();

        $this->return_result($result);
    }

    public function delete_component() {
        $component = new Component();

        $this->return_result($component->delete_component());
    }

    public function set_conect_menu_item() {
        $component = new Component();

        $result = $component->set_conect_menu_item();

        $this->return_result($result);
    }

    public function disconect_menu_item() {
        $component = new Component();

        $result = $component->disconect_menu_item();

        $this->return_result($result);
    }

    public function component_autocomplete() {
        $component = new Component();

        $result = $component->component_autocomplete();

        echo json_encode($result);
    }

    public function component_autocomplete_mini_block() {
        $component = new Component();

        $result = $component->component_autocomplete_mini_block();

        echo json_encode($result);
    }

}

?>
