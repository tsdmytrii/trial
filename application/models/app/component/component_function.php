<?php
/*
 * Class component_function 
 * 
 * Operates with functions that belongs for every component type
 */
class Component_function extends DataMapper {

    public $table = 'component_functions';
    public $has_one = array('component_type');
    public $has_many = array('group');
    public static $ci;
    public $validation = array(
        array(
            'field' => 'id',
            'label' => 'id',
            'rules' => array('trim', 'numeric', 'max_length' => 5),
        )
    );

    function __construct($id = NULL) {
        parent::__construct($id);
        if (empty(self::$ci)) {
            self::$ci = &get_instance();
        }
    }

    /*
     * Called on creation of new component type
     * 
     * Creates 4 default functions for every new component type. Function names 
     * are created by join get/get_all/set/delete + libraryname  of component 
     * type. Each fucnction is saved with component_type_id and name. Return 
     * true on success or false if any function can't be created. 
     */
    public function set_from_default($component_type_array = false) {

        if ($component_type_array !== false) {

            $function_name[] = 'get_'.strtolower($component_type_array['library']);
            $function_name[] = 'get_all_'.strtolower($component_type_array['library']);
            $function_name[] = 'set_'.strtolower($component_type_array['library']);
            $function_name[] = 'delete_'.strtolower($component_type_array['library']);

            $result = true;

            foreach($function_name as $key => $f) {

                $component_function = new Component_function();

                $component_function->component_type_id = $component_type_array['id'];
                $component_function->name = $f;

                if (!$component_function->save()) {
                    $result = false;

                    break;
                }

            }

            return $result;
        } else
            return false;
    }

    /*
     * Sets additional function for component type
     * 
     * Check for access. Get existing component function if have any id in post 
     * array. Set properties for this function froom post and save it. REturn
     * component funcion id on success or false on failure.
     */
    public function set_component_function() {

        if (self::$ci->access->check_access(__FUNCTION__) == false)
            return 403;

        $component_function = new Component_function();

        if (self::$ci->input->post('id'))
            $component_function->get_by_id (self::$ci->input->post('id'));

        $component_function->component_type_id = self::$ci->input->post('component_type_id');
        $component_function->name = self::$ci->input->post('name');
        $component_function->clear_name = self::$ci->input->post('clear_name');

        if ($component_function->save()) {

            return $component_function->id;

        } else

            return false;

    }

    /*
     * Gets all component functions 
     * 
     * Check for access. Get component functions by component type id from post,
     * or get all if there is no component type id in post array. Returns array
     * with this functions.
     */
    public function get_all_component_function($component_type_id = false) {

        if (self::$ci->access->check_access(__FUNCTION__) == false)
            return 403;

        $component_type_id = self::$ci->input->post('component_type_id') ? self::$ci->input->post('component_type_id') : $component_type_id;

        $component_function = new Component_function();

        if ($component_type_id) {

            $component_function->get_by_component_type_id($component_type_id);

        } else {

            $component_function->get();

        }

        return $component_function->all_to_array();

    }

    /*
     * Deletes component fnction 
     * 
     * Get function by id. Delete all relation groups with this function. 
     * Delete function from server after. 
     * 
     */
    public function delete_component_function() {

        if (self::$ci->access->check_access(__FUNCTION__) == false)
            return 403;

        $component_function = new Component_function();

        $component_function_id = self::$ci->input->post('component_function_id') ? self::$ci->input->post('component_function_id') : $component_function_id;

        $component_function->get_by_id($component_function_id);

        $group = new Group();

        $group->get_by_related($component_function);

        if ($group->exists()){
            $component_function->delete($group->all);
        }

        return $component_function->delete();

    }

}

?>