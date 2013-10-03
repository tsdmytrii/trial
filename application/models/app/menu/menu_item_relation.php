<?php

class Menu_item_relation extends DataMapper {

    public $table = 'menu_item_relations';
    public static $ci;
    public $validation = array(
        array(
            'field' => 'id',
            'label' => 'id',
            'rules' => array('trim', 'numeric', 'max_length' => 5),
        ),
        array(
            'field' => 'menu_item_id',
            'label' => 'Menu item id',
            'rules' => array('trim', 'numeric', 'max_length' => 5),
        ),
        array(
            'field' => 'related_menu_item_id',
            'label' => 'Related menu item id',
            'rules' => array('trim', 'numeric', 'max_length' => 5),
        )
    );

    function __construct($id = NULL) {
        parent::__construct($id);
        if (empty(self::$ci)) {
            self::$ci = &get_instance();
        }
    }

    public function set_menu_item_relation() {
        if (self::$ci->access->check_access(__FUNCTION__) == false)
            return 403;

        $menu_item_id = self::$ci->input->post('menu_item_id');

        $menu_item_relation_del = new Menu_item_relation();
        $menu_item_relation_del->delete_menu_item_relation($menu_item_id);

        if (self::$ci->input->post('related_menu_item_id')) {
            foreach (self::$ci->input->post('related_menu_item_id') as $m_i_r) {
                $menu_item_relation = new Menu_item_relation();
                $menu_item_relation->menu_item_id = $menu_item_id;
                $menu_item_relation->related_menu_item_id = $m_i_r;

                $menu_item_relation->save();

                $menu_item_relation = new Menu_item_relation();
                $menu_item_relation->menu_item_id = $m_i_r;
                $menu_item_relation->related_menu_item_id = $menu_item_id;

                $menu_item_relation->save();
            }
        }

        return true;
    }

    public function get_menu_item_relation() {

        $menu_item_relation = new Menu_item_relation();
        $menu_item_id = self::$ci->input->post('menu_item_id');

        if ($menu_item_id) {
            $menu_item_relation->get_by_menu_item_id($menu_item_id);

            $result = $menu_item_relation->all_to_array();
        } else {
            $menu_item_relation->get();

            $result = $menu_item_relation->all_to_array();
        }

        if ($menu_item_relation->exists())
            return $result;
        else
            return false;
    }

    public function delete_menu_item_relation($menu_item_id) {
        $menu_item_relation = new Menu_item_relation();
        $where = array('menu_item_id' => $menu_item_id);
        $menu_item_relation->where($where)->get();
        $menu_item_relation->delete_all();

        $menu_item_relation = new Menu_item_relation();
        $where = array('related_menu_item_id' => $menu_item_id);
        $menu_item_relation->where($where)->get();
        $menu_item_relation->delete_all();
    }

}

?>