<?php

/*
 * Class works with menu-blocks
 * 
 * @var $db_params string Select set of database params
 * @var $table string Set table name
 * @var $has_many array Datamapper variable, show us relation type 'to many'
 * between menu_block and menu_item
 * @var $validation array Validation rules for fields in table menu_block
 * @var @menu_block obj Creates new Datampper object that will be filled with 
 * properties. Used almost in all function in this class. 
 */

class Menu_block extends DataMapper {

    public $db_params = 'default';
    public $table = 'menu_blocks';
    public $has_many = array('menu_item');
    // ci?
    public static $ci;
    public $validation = array(
        array(
            'field' => 'id',
            'label' => 'id',
            'rules' => array('trim', 'numeric', 'max_length' => 5),
        ),
        array(
            'field' => 'name',
            'label' => 'Name',
            'rules' => array('trim', 'min_length' => 3, 'required', 'max_length' => 100),
        )
    );

    function __construct($id = NULL) {
        parent::__construct($id);
        if (empty(self::$ci)) {
            self::$ci = &get_instance();
        }
    }
/*
 * Create new menu_block
 *  
 * Check users's access. Creates new menu_block object. If 'id' had been 
 * transfered by post then get menu_block with this id, else set menu_block 
 * properties and save.
 *  
 * @return array Array with created menu_block properties 
 */
    public function set_menu_block() {
        if (self::$ci->access->check_access(__FUNCTION__) == false)
            return 403;

        $menu_block = new Menu_block();

        if (self::$ci->input->post('id')) {
            $menu_block->get_by_id(self::$ci->input->post('id'));
        }

        $menu_block->name = self::$ci->input->post('name');
        $menu_block->position = self::$ci->input->post('position');

        if ($menu_block->save())
            return $menu_block->to_array();
        else
            return false;
    }

    /*
     * Get menu_block
     * 
     * Check for access first. Check if we had got menu_block_id by post. If 
     * true - return array with menu_block properties with this id, else return
     * false. 
     * 
     * @param #menu_block_id int Simply menu_block's id s. False by default.
     */
    public function get_menu_block($menu_block_id = false) {
        if (self::$ci->access->check_access(__FUNCTION__) == false)
            return 403;

        $menu_block_id = self::$ci->input->post('menu_block_id') ? self::$ci->input->post('menu_block_id') : $menu_block_id;

        if ($menu_block_id) {

            $menu_block = new Menu_block();

            return $menu_block->get_by_id($menu_block_id)->to_array();
        } else
            return false;
    }

    /*
     * Get all menu_blocks
     * 
     * Check for access. 
     * 
     * @return array Array with all menu_blocks ordered by position. 
     */
    public function get_all_menu_blocks() {
        if (self::$ci->access->check_access(__FUNCTION__) == false)
            return 403;

        $menu_block = new Menu_block();

        return $menu_block->order_by("position")->get()->all_to_array();
    }

    
    public function get_footer() {
//        $menu_block_id = self::$ci->input->post('menu_block_id') ? self::$ci->input->post('menu_block_id') : false;
        $menu_block_id = 4;

        $menu_item = new Menu_item();

        $result = $menu_item->get_menu_item_by_block($menu_block_id);

        return $result;
    }
/*
 * Delete menu_block
 * 
 * Check for access. Check for menu_block_id from post. Get menu_block by this 
 * id. Delete menu_block.
 * 
 * @return int, if delete was successfull or return false if it wasn't.
 */
    public function delete_menu_block() {
        if (self::$ci->access->check_access(__FUNCTION__) == false)
            return 403;

        $menu_block_id = self::$ci->input->post('menu_block_id');

        $menu_block = new Menu_block();

        $menu_block->get_by_id($menu_block_id);

        return $menu_block->delete() ? array('menu_block_id' => $menu_block_id) : false;
    }

}

?>