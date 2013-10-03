<?php
/* 
 * class Menu_controller 
 * 
 * Operates with all menu elements 
 */
class Menu_controller extends MY_Controller {

    /*
     * Construct func of Menu_controller class 
     * 
     * Loads helpers and libraries, lets language for session
     */
    function __construct() {
        parent::__construct();
        $this->load->helper(array('form', 'url'));
        $this->load->library(array('form_validation'));
        $this->session->set_userdata('lang', 2);
    }

    /*
     * Defaults func of Menu_controller.
     * 
     * Loads 'admin/toper' view with menu tab data or outputs it by json.
     *  
     * @var string $name Tab's name for load. 
     */
    public function index() {
        $name = 'menu';

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

    /*
     * Create/edit menu block 
     */
    public function set_menu_block(){
        $menu_block = new Menu_block();

        $result = $menu_block->set_menu_block();

        $this->return_result($result);
    }

    /*
     * Get exactly menu block 
     */
    public function get_menu_block(){
        $menu_block = new Menu_block();

        $this->return_result($menu_block->get_menu_block());
    }

    
    public function get_all_menu_blocks(){
        $menu_block = new Menu_block();

        $this->return_result($menu_block->get_all_menu_blocks());
    }

    public function delete_menu_block(){
        $menu_block = new Menu_block();

        $result = $menu_block->delete_menu_block();

        $this->return_result($result);
    }

    /*
     * Create/edit menu item
     */
    public function set_menu_item(){
        $menu_item = new Menu_item();

        $result = $menu_item->set_menu_item();

        $this->return_result($result);
    }

    
    public function set_related_menu_item(){
        $menu_item = new Menu_item();

        $result = $menu_item->set_related_menu_item();

        echo $this->return_result($result);
    }

    public function set_menu_item_relation(){
        $menu_item = new Menu_item_relation();

        $result = $menu_item->set_menu_item_relation();

        $this->return_result($result);
    }

    public function get_menu_item(){
        $menu_item = new Menu_item();

        $result = $menu_item->get_menu_item();

        echo $this->return_result($result);
    }

    public function get_menu_item_for_parent(){
        $menu_item = new Menu_item();

        $result = $menu_item->get_menu_item_for_parent();

        echo $this->return_result($result);
    }

    /*
     * Get menu item by parent menu block id
     */
    public function get_menu_item_by_block(){
        $menu_item = new Menu_item();

        $result = $menu_item->get_menu_item_by_block();

        echo $this->return_result($result);
    }

    public function delete_menu_item(){
        $menu_item = new Menu_item();

        $result = $menu_item->delete_menu_item();

        echo $this->return_result($result);
    }

    public function minus_menu_item(){
        $menu_item = new Menu_item();

        $result = $menu_item->minus_menu_item();

        echo $this->return_result($result);
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

    /*
     * Autocompletes menu item's name
     */
    public function menu_item_autocomplete(){
        $menu_item = new Menu_item();

        $result = $menu_item->get_menu_item_autocomplete();

        echo json_encode($result);
    }
}
?>
