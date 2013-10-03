<?php
/*
 * Class component_type 
 * 
 * Operates with all actions about component types
 */
class Component_type extends DataMapper {

    public $table = 'component_types';
    public $has_many = array('component', 'component_function');
    public static $ci;
    public $validation = array(
        array(
            'field' => 'id',
            'label' => 'id',
            'rules' => array('trim', 'numeric', 'max_length' => 5),
        )
    );

    /*
     * Construct function of component_type class.
     */
    function __construct($id = NULL) {
        parent::__construct($id);
        if (empty(self::$ci)) {
            self::$ci = &get_instance();
        }
    }

    public function set_from_default() {
        return 0;
    }

    /*
     * Sets component type func
     * 
     * Check for access. Get existing component_type if got id from post array.
     * Set component type properties from post array. If save was successfull,
     * and ther is no id in post array(so its new component_type) creates a list
     * of default fucntions that belong to this component_type by calling
     * set_from_default function. Set_from_dafult function creates 4 functions:
     * get_, get_all, set_, delete_ + 'library' property from post array.(If
     * library property is article it will create get_article etc.). Return 
     * component type id after that or false on failure.  
     */
    public function set_component_type() {

        if (self::$ci->access->check_access(__FUNCTION__) == false)
            return 403;

        $component_type = new Component_type();

        if (self::$ci->input->post('id'))
            $component_type->get_by_id (self::$ci->input->post('id'));

        $component_type->tab_id = self::$ci->input->post('tab_id');
        $component_type->name = self::$ci->input->post('name');
        $component_type->psevdo_name = self::$ci->input->post('psevdo_name');
        $component_type->display = self::$ci->input->post('display') ? self::$ci->input->post('display') == 2 ? 0 : self::$ci->input->post('display') : 1;
        $component_type->library = self::$ci->input->post('library');
        $component_type->admin_client_controller = self::$ci->input->post('admin_client_controller');
        $component_type->client_controller = self::$ci->input->post('client_controller');
        $component_type->server_controller = self::$ci->input->post('server_controller');
        $component_type->button_panel = self::$ci->input->post('button_panel') ? self::$ci->input->post('button_panel') : 0;
        $component_type->settings = self::$ci->input->post('settings') ? self::$ci->input->post('settings') : 0;
        $component_type->minimise = self::$ci->input->post('minimise') ? self::$ci->input->post('minimise') : 0;
        $component_type->maximise = self::$ci->input->post('maximise') ? self::$ci->input->post('maximise') : 0;
        $component_type->multi = intval(self::$ci->input->post('multi')) == 2 ? 0 : 1;

        if ($component_type->save()) {

            if (!self::$ci->input->post('id')) {

                $component_function = new Component_function();

                $component_function->set_from_default($component_type->to_array());

            }

            return $component_type->id;

        } else

            return false;

    }

    /*
     * Gets component type
     * 
     * Check for access. Return component type with all properties if 
     * component type exists in post array or false if not.  
     */
    public function get_component_type($component_type_id = false) {

        if (self::$ci->access->check_access(__FUNCTION__) == false)
            return 403;

        $component_type_id = self::$ci->input->post('component_type_id') ? self::$ci->input->post('component_type_id') : $component_type_id ;

        if ($component_type_id !== false) {

            $component_type = new Component_type();

            $component_type->get_by_id($component_type_id);

            return $component_type->to_array();

        } else {

            return false;

        }

    }

    /*
     * Gets all componetn types 
     * 
     * Check for access. Set offset and limit properties for query id exist.
     * If any of these properties exists return all componet types and quantity
     * (how many component types at all). In other case - return all component 
     * types.
     */
    public function get_all_component_type() {

        if (self::$ci->access->check_access(__FUNCTION__) == false)
            return 403;

        $component_type = new Component_type();

        if (self::$ci->input->post('limit'))
            $component_type->limit(self::$ci->input->post('limit'));

        if (self::$ci->input->post('offset'))
            $component_type->offset(self::$ci->input->post('offset'));

        $component_type->get();

        if (self::$ci->input->post('limit') || self::$ci->input->post('offset')) {

            $result['data'] = $component_type->all_to_array();

            $component_type->clear();

            $result['quantity'] = $component_type->get()->result_count();

            return $result;

        } else

            return $component_type->all_to_array();
    }

    /*
     * Get component types form navigation 
     * 
     * Get all component types. Foreach component type with 'multi' property = 0,
     * (0 = cn be only one)check if any component has current component type id.
     * (if such componen exists - than mark this component type as aleady exist)
     */
    public function get_component_types_for_nav() {

        $component_type = new Component_type();

        $component_type->get();

        $result = false;

        foreach ($component_type as $key => $c) {

            $result[$key] = $c->to_array();

            if (intval($c->multi) == 0) {
                $component = new Component();
                $component->get_by_component_type_id($c->id);

                $result[$key]['exist'] = $component->exists();
            }

        }

        return $result;

    }
/*
 * Get component types for dysplay in nav tabs
 */
    public function get_display_component_types() {
        $component_type = new Component_type();

        $component_type->get_by_display('1');

        return $component_type->all_to_array();
    }

}

?>