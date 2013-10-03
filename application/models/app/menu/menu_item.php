<?php
/*
 * Menu item class. 
 * 
 * Describes params, validation and relations with menu items
 * 
 * @param $dp_params string Describes params set's name
 * @param $has_one array Describes relations 'to one' with tables inside brackets 
 * @param $has_many array Describes relations 'to many' with tables inside brackets
 * @param $validation array Describes validation rules on Menu_item tables's fields
 */
class Menu_item extends DataMapper {

    public $db_params = 'default';
    public $table = 'menu_items';
    public $has_one = array('component');
    public $has_many = array('menu_block', 'menu_item_language');
    public static $ci;
    public $validation = array(
        array(
            'field' => 'id',
            'label' => 'id',
            'rules' => array('trim', 'numeric', 'max_length' => 5),
        ),
        array(
            'field' => 'component_id',
            'label' => 'Component id',
            'rules' => array('trim', 'numeric', 'max_length' => 5),
        ),
        array(
            'field' => 'menu_block_id',
            'label' => 'Menu block id',
            'rules' => array('trim', 'numeric', 'max_length' => 5),
        ),
        array(
            'field' => 'parent_id',
            'label' => 'Parent id',
            'rules' => array('trim', 'numeric', 'max_length' => 5),
        ),
        array(
            'field' => 'position',
            'label' => 'Position',
            'rules' => array('trim', 'numeric', 'max_length' => 5),
        ),
        array(
            'field' => 'main',
            'label' => 'Main',
            'rules' => array('trim', 'numeric', 'max_length' => 1),
        ),
        array(
            'field' => 'window',
            'label' => 'Window',
            'rules' => array('trim', 'numeric', 'max_length' => 1),
        ),
    );

    /*
     * Fucntion constructor
     * 
     * Loads model core/lang_model and sets few properties
     */
    function __construct($id = NULL) {
        parent::__construct($id);
        if (empty(self::$ci)) {
            self::$ci = &get_instance();
        }
        self::$ci->load->model(array('core/lang_model'));
        $this->child_menu_items = array();
        $this->related_menu_items = array();
        $this->parent_menu_items = array();
    }


    /*
     * ----------------------- Menu Item SET functions -------------------------
     */

    /*
     *  Function sets menu item into database
     * 
     * Checks for access, id and componnent type id are in post array. Gets component type by component_type_id.
     * If $component_type->multi == 0 says that there is can be only one instanse of this component type.
     * If $component_id == 0, we create new component.
     * menu_item->* sets menu item's properties()parent_id, component_id) etc.
     * $menu_item->save($menu_block) links menu_item and menu_block
     * 
     * @return object with menu_item_id and its language if validation was successfull,
     * validation=> failed if not. 
     */ 
    public function set_menu_item() {
        if (self::$ci->access->check_access(__FUNCTION__) == false)
            return 403;

        $menu_item = new Menu_item();

        if (self::$ci->input->post('id'))
                $menu_item->get_by_id(self::$ci->input->post('id'));

        $component_type_id = self::$ci->input->post('component_type_id') ? self::$ci->input->post('component_type_id') : '0';

        $component_type = new Component_type();

        $component_type->get_by_id($component_type_id);

        $check_component_id = false;

        if ($component_type->multi == 0 && $component_type_id !== '0') {
            $component_type->component->get();

            if ($component_type->component->exist())
                $check_component_id = true;
        }

        if ($check_component_id == false) {

            if (self::$ci->input->post('component_id'))
                $component_id = self::$ci->input->post('component_id');
            else
                $component_id = 0;

            if ($component_type->exists()) {
                if ($component_id == 0) {
                    $component = new Component();
                    //???
                    $component_id = $component->set_component_from_menu_item(0, false);

                    $content = new $component_type->library;
                    $content_id = $content->set_from_default($component_id);

                    $component->set_component_from_menu_item($content_id, $component_id);
                }
            }

            $menu_item->parent_id = self::$ci->input->post('parent_id');
            $menu_item->component_id = $component_id;
            $menu_item->window = intval(self::$ci->input->post('window')) == 1 ? 1 : 0;
            $menu_item->main = intval(self::$ci->input->post('window')) == 1 ? 0 : 1;
            $menu_item->position = self::$ci->input->post('position');
            $menu_item->inner_navigation = self::$ci->input->post('inner_navigation');
            $menu_item->child_inner_navigation = self::$ci->input->post('child_inner_navigation');

            if ($menu_item->save()) {

                if (self::$ci->input->post('default_item') == 1) {
                    $this->set_menu_item_default($menu_item->id, $component_id);
                }

                $menu_block = new Menu_block();

                $menu_block->get_by_id(self::$ci->input->post('menu_block_id'));

                $menu_item->save($menu_block);

                $m_item_lang = new Menu_item_language();

                $result['menu_item_id'] = $menu_item->id;
                $result['menu_item_lang_id'] = $m_item_lang->set_menu_item_language($menu_item->id);

                return $result;
            } else
                return array('validation' => false);
        } else {
            return array('unique' => true);
        }
    }

    public function set_menu_item_default($menu_item_id, $component_id) {
        $menu_item = new Menu_item();

        $menu_item->get_by_component_id($component_id);

        $component = new Component();

        $component->get_by_id($component_id);

        $component_type = new Component_type();

        $component_type->get_by_id($component->component_type_id);

        foreach ($menu_item as $m_i) {

            $m_i->default_item = 0;

            if ($m_i->id == $menu_item_id) {
                $m_i->default_item = 1;
            }

            $m_i->save();
        }
    }

    public function set_related_menu_item() {

        $menu_block = new Menu_block();
        $menu_block->get_by_id(self::$ci->input->post('menu_block_id'));

        $other_menu_block = new Menu_block();
        $other_menu_block->where(array('id !=' => self::$ci->input->post('menu_block_id')))->get();

        foreach ($other_menu_block as $o) {
            $menu_item_for_delete = new Menu_item();
            $menu_item_for_delete->get_by_related($o);

            foreach ($menu_item_for_delete as $m) {
                $menu_block->delete($m);
            }
        }

        $menu_item = new Menu_item();
        $menu_item->where_in('id', self::$ci->input->post('related_menu_item'))->get();

        $menu_block->save($menu_item->all);

        return $menu_block->all_to_array();
    }

    /*
     * ----------------------- Menu Item GET functions -------------------------
     */

    /*
     * Function gets menu items by its parent menu block id
     * 
     * Check if menu_block_id exists in post array.If it is - get menu_block and related to it menu items.
     * Foreach menu item get its components_type name and id and save it into multidimensional array $result.
     * Also save component id, content_id and component_type_id into $result[menu item]['component] and same with language.
     *  
     * @return object Consists of menu item properties, component(id, content_type_id, content_id), component_type(id, name)
     * and lang(language properies)
     */
    public function get_menu_item_by_block($menu_bl_id = false) {
        if (self::$ci->access->check_access(__FUNCTION__) == false)
            return 403;

        $menu_block_id = self::$ci->input->post('menu_block_id') ? self::$ci->input->post('menu_block_id') : $menu_bl_id;

        if ($menu_block_id) {

            $menu_block = new Menu_block();

            $menu_block->get_by_id($menu_block_id);

            $menu_item = new Menu_item();

            $menu_item->order_by('position')->get_by_related($menu_block);

            $result = false;

            $component_type = new Component_type();
            $component_type->select('id, name')->get();

            foreach ($menu_item as $key => $m_i) {

                $menu_item_lang = new Menu_item_language();

                if (intval($m_i->component_id) != 0) {

                    $component = new Component();

                    $component->select('id, component_type_id, content_id')->get_by_id($m_i->component_id);

                    $component_type_id = $component->component_type_id;

                    foreach ($component_type as $c) {
                        if ($c->id == $component_type_id) {
                            $component_type_result = $c->to_array(array('id', 'name'));
                        }
                    }

                }
                $link = new Link();
                $result[$key] = $m_i->to_array();
                $result[$key]['component_type'] = intval($m_i->component_id) != 0 ? $component_type_result : false;
                $result[$key]['component'] = intval($m_i->component_id) != 0 ? $component->to_array(array('id', 'component_type_id', 'content_id')) : false;
                $result[$key]['lang'] = $menu_item_lang->get_menu_item_language($m_i->id);
                $result[$key]['link'] = $link->get_link($m_i->id);
            }
            return $result;

        } else
             return false;
    }

    /*
     * Function  
     * 
     */
    public function get_menu_item_for_parent($menu_item_id = '', $get_just_parent = false) {
        $menu_block_id = self::$ci->input->post('menu_block_id');

        $menu_block = new Menu_block();
        $menu_block->get_by_id($menu_block_id);

        $menu_item = new Menu_item();
        $menu_item->get_by_related($menu_block);

        $bufer = false;

        foreach ($menu_item as $m_i) {

            if ($m_i->id != $menu_item_id) {

                $m_i_lang = new Menu_item_language();

                $menu_item_arr = $m_i->to_array();
                $menu_item_arr['lang'] = $m_i_lang->get_menu_item_language($m_i->id);

                $bufer[] = $menu_item_arr;
            }
        }

        if ($get_just_parent) {

            $result = array(
                'parent' => $bufer
            );

        } else {

            $related_menu_item = new Menu_item();

            $result = array(
                'parent' => $bufer,
                'related' => $related_menu_item->get_menu_item_for_related(),
            );

        }

        $component = new Component_type();
        $component->get_by_display('1');
        $result['component'] = $component->all_to_array();

        return $result;
    }

    public function get_menu_item_for_related($menu_item_id = '') {
        $menu_block_id = self::$ci->input->post('menu_block_id');

        $menu_block = new Menu_block();

        $menu_block->where(array('id !=' => $menu_block_id))->get();

        $menu_item_array = false;

        foreach ($menu_block as $key => $m_b) {
            $menu_item = new Menu_item();

            $menu_item->get_by_related($m_b);

            foreach ($menu_item as $m) {
                $menu_item_array[] = $m->to_array();
            }
        }


        $menu_block_current = new Menu_block();
        $menu_block_current->get_by_id($menu_block_id);

        $menu_item_related_obj = new Menu_item();
        $menu_item_related_obj->get_by_related($menu_block_current);
        $menu_item_related = $menu_item_related_obj->all_to_array();

        $result = false;

        if ($menu_item_array !== false) {
            foreach ($menu_item_array as $m_i) {

                $relation = false;

                foreach ($menu_item_related as $key => $m_i_r) {
                    if ($m_i_r['id'] == $m_i['id']) {
                        $relation = true;
                        unset($menu_item_related[$key]);
                    }
                }

                $m_i_lang = new Menu_item_language();

                $result[] = array(
                    'menu_item' => $m_i,
                    'lang' => $m_i_lang->get_menu_item_language($m_i['id']),
                    'relation' => $relation
                );
            }

            return $result;
        } else {
            return false;
        }
    }

    
    /*
     * Get menu item by id
     * 
     * Checks access first. Gets menu item by id if exists in the post array.
     * Gets language, relations and component of this menu item, puts them into 
     * array and returns this array. Returns false if there is no menu item id
     * in post array. 
     */
    public function get_menu_item() {
        if (self::$ci->access->check_access(__FUNCTION__) == false)
            return 403;

        $menu_item_id = self::$ci->input->post('menu_item_id');

        if ($menu_item_id) {

            $menu_item = new Menu_item();
            $menu_item->get_by_id($menu_item_id);

            $menu_item_lang = new Menu_item_language();

            $menu_item_relation = new Menu_item_relation();

            $component = new Component();
            $component->get_by_id($menu_item->component_id);

            $result = $menu_item->to_array();

            $result['component'] = $component->to_array(array('id', 'component_type_id', 'name'));
            $result['lang'] = $menu_item_lang->get_menu_item_language($menu_item_id);
            $result['related'] =  $menu_item_relation->get_menu_item_relation();

            return $result;

        } else {
            return false;
        }
    }

    public function get_menu_item_by_id($m_i_id) {
        $m_item_id = self::$ci->input->post('menu_item_id') ? self::$ci->input->post('menu_item_id') : $m_i_id;
        $menu_item = new Menu_item();
        $menu_item->get_by_id($m_item_id);

        $menu_item_lang = new Menu_item_language();

        $menu_item_link = new Link();

        $result = $menu_item->to_array();
        $result['lang'] = $menu_item_lang->get_menu_item_language($m_item_id);
        $result['link'] = $menu_item_link->get_link($m_item_id);

        return $result;
    }

    public function get_menu_item_by_static_comp_id($href) {

        $menu_item = new Menu_item();
        $menu_item->get_by_href($href);

        $menu_item_lang = new Menu_item_language();

        $menu_item_link = new Link();

        $result = $menu_item->to_array();
        $result['lang'] = $menu_item_lang->get_menu_item_language($menu_item->id);
        $result['link'] = $menu_item_link->get_link($menu_item->id, true);

        return $result;
    }

    /*
     * Function deletes menu items
     * 
     * Gets menu item by id. Deletes all relations to menu_block. 
     * 
     */
    public function delete_menu_item() {
        $menu_item_id = self::$ci->input->post('menu_item_id');

        $menu_item = new Menu_item();

        $menu_item->get_by_id($menu_item_id);

        $menu_item_lang = new Menu_item_language();

        $menu_block = new Menu_block();
        $menu_block->get();
        $menu_item->delete($menu_block->all);

        if ($menu_item->component_id != 0) {

            $component = new Component();
            $component->get_by_id($menu_item->component_id);

            $component_type = new Component_type();
            $component_type->get_by_id($component->component_type_id);

            if ($component_type->name == 'article' && int_val($menu_item->default_item) == 1) {
                $link = new Link();

                $article_id = explode('/', $menu_item->href);

                $link->upd_article_item_link(0, $article_id[1], 13);
            } elseif ($component_type->name == 'baner') {
                $baner = new Baner();

                $baner->get_by_menu_item_id($menu_item_id);

                $baner->menu_item_id = 0;

                $baner->save();
            }
        }

        $link = new Link();
        $link->delete_link($menu_item_id);

        $menu_item_lang->delete_menu_item_language($menu_item_id);

        $menu_item->delete();

        return array('menu_item_id' => $menu_item_id);
    }

    public function minus_menu_item() {
        $menu_item_id = self::$ci->input->post('menu_item_id');
        $menu_block_id = self::$ci->input->post('menu_block_id');

        $menu_item = new Menu_item();
        $menu_item->get_by_id($menu_item_id);

        $menu_block = new Menu_block();
        $menu_block->get_by_id($menu_block_id);

        $menu_block->delete($menu_item);

        return true;
    }

    public function get_menu_item_sitemap() {
        $menu_block = new Menu_block();

        $menu_block->where_in('id', array(3, 4))->get();

        $result = false;

        foreach ($menu_block as $m_b) {
            $menu_item = new Menu_item();

            $menu_item->get_by_related($m_b);

            foreach ($menu_item as $m) {
                $m->menu_item_language->get();

                foreach ($m->menu_item_language as $l) {
                    if ($l->language_id != 3 && $l->language_id != 1) {
                        $m->link->where(array('language_id' => $l->language_id))->get();

                        if (isset($m->link->link)) {
                            $result[] = $m->link->link;
                        } else {
                            if (isset($m->href) && !empty($m->href)) {
                                $result[] = $m->href . '/' . $m->id . '/' . $m->main . '/' . $l->language_id;
                            }
                        }
                    }
                }
            }
        }

        return $result;
    }

    public function get_menu_item_by_component_id($component_id, $lang_id = 2) {
        $menu_item = new Menu_item();

        $menu_item->get_by_component_id($component_id);

        $result = false;

        foreach ($menu_item as $key => $m) {
            $result[$key] = $m->to_array();
            $m->menu_item_language->where(array('language_id' => $lang_id))->get();
            $result[$key] = $m->menu_item_language->to_array();
        }

        return $result;
    }

    public function get_menu_item_autocomplete() {
        $menu_item_language = new Menu_item_language();
        $query = self::$ci->input->post('query');

        $menu_item_language->like('value', $query)->get();
        foreach ($menu_item_language as $m) {
            $suggestions[] = $m->value;
            $data[] = $m->menu_item_id;
        }

        return array('query' => $query, 'suggestions' => $suggestions, 'data' => $data);
    }

    public function get_menu_items_for_user_components($menu_item_id) {

        $result = false;

        if ($menu_item_id !== 0) {

            $menu_item = new Menu_item();

            $menu_item->get_by_id($menu_item_id);

            if (intval($menu_item->child_inner_navigation) == 1) {
                $parent_id = $menu_item->parent_id;

                if ($parent_id !== 0) {

                    $menu_child = $menu_item->get_by_parent_id($parent_id);

                    foreach ($menu_child as $key => $m) {
                        $menu_child_array[$key] = $this->get_menu_item_by_id($m->id);
                        if ($m->id == $menu_item_id) {
                            $menu_child_array[$key]['current'] = true;
                        }
                    }

                    $result['parent'] = $this->get_menu_item_by_id($parent_id);
                    $result['children'] = $menu_child_array;
                } else {

                    $parent_id = $menu_item->id;

                    $result['parent'] = $this->get_menu_item_by_id($parent_id);
                    $result['parent']['current'] = true;

                    $menu_child = $menu_item->get_by_parent_id($parent_id);

                    foreach ($menu_child as $key => $m) {
                        $menu_child_array[$key] = $this->get_menu_item_by_id($m->id);
                    }

                    $result['children'] = $menu_child_array;
                }
            }
        }

        return $result;
    }

    public function get_inner_menu_items() {
        $menu_item = new Menu_item();
        $menu_item->get_by_inner_navigation(1);

        $result = false;

        foreach ($menu_item as $key => $m) {

            $result[$key] = $m->to_array();

            $link = new Link();

            $result[$key]['link'] = $link->get_link($m->id, true);
        }

        return $result;
    }

    /*
     *
     * ---------------------------- Helper functions ---------------------------
     *
     */

    public function get_menu_item_id($content_id, $component_type_id) {

        $menu_item_id = 0;

        $component = new Component();

        $component
                ->where(
                        array(
                            'content_id' => $content_id,
                            'component_type_id' => $component_type_id
                        )
                )
                ->get();

        if ($component->exists()) {

            $menu_item = new Menu_item();

            $menu_item->get_by_component_id($component->id);

            $menu_item_id = $menu_item->exists() ? $menu_item->id : 0;

        }

        return 0;

    }

}

?>