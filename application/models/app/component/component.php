<?php
/*
 * Class Component operates with components and components type
 */
class Component extends DataMapper {

    public $table = 'components';
    public $has_one = array('component_type');
    public $has_many = array('menu_item');
    public static $ci;
    public $validation = array(
        array(
            'field' => 'id',
            'label' => 'id',
            'rules' => array('trim', 'numeric', 'max_length' => 5),
        )
    );
    
    /*
     * Constuct func of Component class 
     */
    function __construct($id = NULL) {
        parent::__construct($id);
        if (empty(self::$ci)) {
            self::$ci = &get_instance();
        }
    }

    /*
     * Gets component by its id.
     * 
     * Check for component_id in post array and get component if exists.
     * 
     * @return array 
     */
    public function get_component_by_id($c_id = false) {
        if (self::$ci->access->check_access(__FUNCTION__) == false)
            return 403;

        $component = new Component();

        $component_id = self::$ci->input->post('component_id') ? self::$ci->input->post('component_id') : $c_id;

        $component->get_by_id($component_id);

        return $component->to_array();
    }

    /*
     * Deletes component and its relations
     * 
     * Searchs for components_id in post array. Gets component by this id. 
     * Gets all menu items related to this component and change component_id 
     * atribute to '0'(not related to any component). Then gets all componetn_functions 
     * that have component_type_id of current component and search for delete function.
     */
    public function delete_component($c_id = false) {

        if (self::$ci->access->check_access(__FUNCTION__) == false)
            return 403;

        $component = new Component();

        $component_id = self::$ci->input->post('component_id') ? self::$ci->input->post('component_id') : $c_id;

        $component->get_by_id($component_id);

        $menu_item = new Menu_item();

        $menu_item->get_by_component_id($component_id);

        if ($menu_item->id) {

            foreach ($menu_item as $m) {
                $m->component_id = 0;
                $m->href = '';

                if (!$m->save())
                    return false;
            }
        }
        
        
        $component_type = new Component_type();
        $component_type->get_by_id($component->component_type_id);

        $component_function = new Component_function();
        $component_function->where(array('component_type_id' => $component->component_type_id));
        $component_function->like('name', 'delete');
        $component_function->get();

        $delete_function = $component_function->name;

        $content = new $component_type->library;
//        $content->delete_component_content($component->content_id);
        $status = $content->$delete_function($component->content_id);

        if ($component_type->name == 'article' && intval($menu_item->default_item) == 1 && $menu_item->default_item !== null) {
            $link = new Link();

            $article_id = explode('/', $menu_item->href);

            $link->upd_article_item_link(0, $article_id[1], 13);
        } elseif ($component_type->name == 'baner') {
            $baner = new Baner();

            $baner->get_by_menu_item_id($menu_item->id);

            $baner->menu_item_id = 0;

            $baner->save();
        }

        $component->delete();

        return $status;
    }

    /*
     * Get all components that have tab_id equals 0
     * 
     * Return object with components, their type and menu items
     */
    public function get_components() {

        if (self::$ci->access->check_access(__FUNCTION__) == false)
            return 403;

        $component = new Component();

        $component->get_by_related_component_type('tab_id', 0);

        $result = false;

        foreach ($component as $key => $c) {
            $component_type = new Component_type();
            $component_type->get_by_id($c->component_type_id);

            $menu_item = new Menu_item();

            $result[$key] = $c->to_array();
            $result[$key]['component_type'] = $component_type->to_array();
            $result[$key]['menu_item'] = $menu_item->get_menu_item_by_component_id($c->id);
        }
        
        return $result;
    }

    /*
     * Set/edit component
     * 
     * Get component_type by its id from post array. Check multi property 
     * (if multi=0 this component is unique and can be only 1 on page). If 
     * component isn't unique get id from post array for edit or create 
     * empty component for creation with properties from post array. 
     */
    public function set_component() {

        if (self::$ci->access->check_access(__FUNCTION__) == false)
            return 403;

        $component_type = new Component_type();

        $component_type->get_by_id(self::$ci->input->post('component_type_id'));

        $check_component_id = false;

        if ($component_type->multi == 0) {
            $check_component = new Component();
            $check_component->get_by_component_type_id(self::$ci->input->post('component_type_id'));

            if ($check_component->id)
                $check_component_id = true;
        }   

        if ($check_component_id == false) {
            $component = new Component();

            $component_id = self::$ci->input->post('id') ? self::$ci->input->post('id') : false;

            if ($component_id !== false)
                $component->get_by_id($component_id);

            $component->name = self::$ci->input->post('name');
            $component->component_type_id = self::$ci->input->post('component_type_id');
            $component->update_date = date('Y-m-d H:i:s');

            if ($component->save()) {
                if ($component_id == false) {

                    $content = new $component_type->library;
                    $content_id = $content->set_from_default($component->id);

                    $component->content_id = $content_id;

                    if ($component->save())
                        return $component->id;
                }

                return $component->id;
            } else {
                return false;
            }
        } else {
            return array('unique' => true);
        }
    }

    public function set_component_from_menu_item($content_id = 0, $component_id = false) {
        $component = new Component();

        if ($component_id !== false) {
            $component->get_by_id($component_id);

            $component->name = self::$ci->input->post('value');
            $component->component_type_id = self::$ci->input->post('component_type_id');
            $component->content_id = $content_id;
            $component->update_date = date('Y-m-d H:i:s');
        } else {

            $component->content_id = $content_id;
            $component->update_date = date('Y-m-d H:i:s');

        }

        if ($component->save()) {
            return $component->id;
        } else {
            return false;
        }
    }

    public function get_page_data() {
        $component_type = new Component_type();

        $component_type->get_by_id(self::$ci->input->post('component_type_id'));

        $content = new $component_type->library;
        $content->get_by_component_id(self::$ci->input->post('component_id'));

        $result = $component_type->to_array();
        $result['content'] = $content->to_array();

        return $result;
    }

    /*
     * Connects component and menu item
     * 
     * Get component id. Get its component type. Change component_id and href 
     * property in menu_item got by menu_item_id. 
     */
    public function set_conect_menu_item() {
        $component = new Component();

        $component_id = self::$ci->input->post('component_id');

        $component->get_by_id($component_id);

        $component_type = new Component_type();

        $component_type->get_by_id($component->component_type_id);

        $menu_item = new Menu_item();

        $menu_item_id = self::$ci->input->post('menu_item_id');

        $menu_item->get_by_id($menu_item_id);

        $menu_item->component_id = $component_id;
        $menu_item->href = $component_type->name . '/' . $component->content_id;

        if ($menu_item->save()) {
            $menu_item->set_menu_item_default($menu_item->id, $component_id);
            return true;
        } else
            return false;
    }

    /*
     * Disconnects menu item and component
     * 
     * Symply get menu item by id and change component_id property to 0.
     */
    public function disconect_menu_item() {

        if (self::$ci->access->check_access(__FUNCTION__) == false)
            return 403;

        $menu_item = new Menu_item();

        $menu_item_id = self::$ci->input->post('menu_item_id');

        $menu_item->get_by_id($menu_item_id);

        $component_id = $menu_item->component_id;
        $href = $menu_item->href;

        $menu_item->component_id = 0;
        $menu_item->href = '';

        if ($menu_item->save()) {

            $component = new Component();

            $component->get_by_id($component_id);

            $component_type = new Component_type();

            $component_type->get_by_id($component->component_type_id);

            if ($component_type->name == 'article') {
                $link = new Link();

                $article_id = explode('/', $href);

                $link->upd_article_item_link(0, $article_id[1], 13);
            }

            return true;
        }
        else
            return false;
    }

    /*
     * Autocompletes component name
     * 
     * Return array with all components and their id and component_type_id 
     * where name is similar to chars in post array.
     */
    public function component_autocomplete() {
        $component = new Component();
        $query = self::$ci->input->post('query');

        $component->like('name', $query)->get();

        foreach ($component as $c) {
            $suggestions[] = $c->name;
            $data[] = array(
                'id' => $c->id,
                'component_type_id' => $c->component_type_id
            );
        }

        return array('query' => $query, 'suggestions' => $suggestions, 'data' => $data);
    }

    public function component_autocomplete_mini_block() {
        $component = new Component();
        $query = self::$ci->input->post('query');

        $component->like('name', $query)->get();

        foreach ($component as $c) {
            if ($c->component_type_id == '1' || $c->component_type_id == '7') {
                $suggestions[] = $c->name;
                $data[] = array(
                    'id' => $c->id,
                    'content_id' => $c->content_id,
                    'component_type_id' => $c->component_type_id
                );
            }
        }

        return array('query' => $query, 'suggestions' => $suggestions, 'data' => $data);
    }

}

?>