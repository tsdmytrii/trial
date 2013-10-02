<?php

class Menu_item_old extends DataMapper {

    public $db_params = 'default';
    public $table = 'menu_items';
    public $has_one = array('component');
    public $has_many = array('menu_block', 'link', 'menu_item_language');
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

    public function set_menu_item() {
        if (self::$ci->access->check_access(__FUNCTION__) == false)
            return 403;

        $menu_item = new Menu_item();

        $menu_item_id = self::$ci->input->post('id') ? self::$ci->input->post('id') : false;

        $component_type_id = self::$ci->input->post('component_type_id') ? self::$ci->input->post('component_type_id') : '0';

        $component_type = new Component_type();

        $component_type->get_by_id($component_type_id);

        $check_component_id = false;

        if ($component_type->multi == 0) {

            $check_component = new Component();

            $check_component->get_by_component_type_id($component_type_id);

            if ($check_component->id && $menu_item_id == false)
                $check_component_id = true;
        }

        if ($check_component_id == false) {
            $href = false;

            if ($menu_item_id) {

                $menu_item->get_by_id($menu_item_id);

                $href = $menu_item->href;
                $component_id = $menu_item->component_id;

                $m_i_lang = new Menu_item_language();

                $m_i_lang->get_by_menu_item_id($menu_item_id);

                $m_i_lang->delete_all();
            }

            if (self::$ci->input->post('component_id'))
                $component_id = self::$ci->input->post('component_id');
            else
                $component_id = 0;

            if ($component_type_id != '0') {
                $component_type = new Component_type();
                $component_type->get_by_id($component_type_id);

                if ($href == false || $href == '') {

                    if ($component_id == 0) {

                        $component = new Component();
                        $component_id = $component->set_component_from_menu_item(0, false);

                        $content = new $component_type->library;
                        $content_id = $content->set_from_default($component_id);

                        $component->set_component_from_menu_item($content_id, $component_id);
                    } else {
                        $component = new Component();
                        $component->get_by_id($component_id);

                        $content_id = $component->content_id;
                    }

                    $menu_item->href = $component_type->name . '/' . $content_id;
                } else {
                    $menu_item->href = $href;
                    $content_id = explode('/', $href);
                    $content_id = $content_id[1];
                }
            } else {
                $menu_item->href = '';
            }

            $menu_item->parent_id = self::$ci->input->post('parent_id');
            $menu_item->component_id = $component_id;

            $main = self::$ci->input->post('window') == 1 ? 0 : 1;

            $menu_item->window = self::$ci->input->post('window') == 1 ? 1 : 0;
            $menu_item->main = $main;
            $menu_item->position = self::$ci->input->post('position');
            $menu_item->inner_navigation = self::$ci->input->post('inner_navigation');
            $menu_item->child_inner_navigation = self::$ci->input->post('child_inner_navigation');

            if ($menu_item->save()) {

                if (self::$ci->input->post('default_item') == 1) {
                    $this->set_menu_item_default($menu_item->id, $component_id);
                }

                if ($component_type_id != '0') {
                    $link = new Link();

                    $link->set_link($menu_item->id, $component_type->name, $content_id, $component_type_id, $main);

                    if ($component_type->name == 'article' && self::$ci->input->post('default_item') == 1) {
                        $link = new Link();

                        $article_id = explode('/', $menu_item->href);

                        $link->upd_article_link($menu_item->id, $article_id[1], 13);
                    }
                }

                $menu_block = new Menu_block();

                $menu_block->get_by_id(self::$ci->input->post('menu_block_id'));

                $menu_item->save($menu_block);

                $m_item = $menu_item->to_array();

                $m_item_lang = new Menu_item_language();

                $langs = $m_item_lang->set_menu_item_language($menu_item->id);

                $m_item['lang'] = $langs;
                $m_item['menu_block_id'] = $menu_block->id;

                return $m_item;
            }

            else
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
                if ($component_type->name == 'article') {
                    $link = new Link();

                    $article_id = explode('/', $m_i->href);

                    if (isset($article_id[1]))
                        $link->upd_article_link($m_i->id, $article_id[1], 13);
                }
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

    public function get_menu_item() {
        if (self::$ci->access->check_access(__FUNCTION__) == false)
            return 403;

        $menu_item_id = self::$ci->input->post('menu_item_id');
        $menu_block_id = self::$ci->input->post('menu_block_id');

        $menu_item = new Menu_item();
        $menu_item->get_by_id($menu_item_id);

        $menu_item_lang = new Menu_item_language();

        $result = false;

        $menu_block = new Menu_block();
        $menu_block->get_by_id($menu_block_id);

        $menu_item_relation = new Menu_item_relation();

        $link = new Link();

        $component = new Component();
        $component->get_by_id($menu_item->component_id);

        $result = array(
            'menu_block' => $menu_block->to_array(),
            'menu_item' => $menu_item->to_array(),
            'component_type_id' => $component->component_type_id,
            'component_name' => $component->name,
            'component_id' => $component->id,
            'lang' => $menu_item_lang->get_menu_item_language($menu_item_id),
            'parent' => $menu_item->get_menu_item_for_parent($menu_item_id, true),
            'related' => $menu_item_relation->get_menu_item_relation(),
            'links' => $link->get_link($menu_item_id)
        );

        return $result;
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

    public function get_menu_item_by_block($menu_bl_id = false) {
        if (self::$ci->access->check_access(__FUNCTION__) == false)
            return 403;

        $menu_block_id = self::$ci->input->post('menu_block_id') ? self::$ci->input->post('menu_block_id') : $menu_bl_id;

        $menu_block = new Menu_block();

        $menu_block->get_by_id($menu_block_id);

        $menu_item = new Menu_item();

        $menu_item->order_by('position')->get_by_related($menu_block);

        $result = false;

        $component_type = new Component_type();
        $component_type->get();

        foreach ($menu_item as $m_i) {
            $menu_item_lang = new Menu_item_language();

            $link = new Link();

            $menu_item_with_lang = $m_i->to_array();

            $component_type_id = 0;

            if (intval($m_i->component_id) != 0) {

                $component = new Component();

                $component->get_by_id($m_i->component_id);

                $component_type_id = $component->component_type_id;
            }

            $menu_item_with_lang['component_type_id'] = $component_type_id;
            $menu_item_with_lang['lang'] = $menu_item_lang->get_menu_item_language($m_i->id);
            $menu_item_with_lang['link'] = $link->get_link($m_i->id);

            $result[] = $menu_item_with_lang;
        }

        return $result;
    }

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

                $link->upd_article_link(0, $article_id[1], 13);
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

    /* ------------------------BUILD LEFT MENU------------------------ */

    public function get_data_left_menu($data, $menu_item_id) {

        self::$ci->benchmark->mark('REC_start');

        foreach ($data as $key => $val) {
            if ($val['id'] == $menu_item_id)
                $menu_item_current = $val;
        }

        if (isset($menu_item_current) && !empty($menu_item_current)) {
            if (isset($menu_item_current['parent_id']) && $menu_item_current['parent_id'] == 0) {
                $result['parent'] = $menu_item_current;

                $this->get_menu_items_child($data, $menu_item_current['id'], 0);

                if ($this->child_menu_items)
                    $result['neibors'][0]['child'] = $this->child_menu_items;

                $related = $this->get_menu_items_related($data, $menu_item_id);
                if ($related)
                    $result['neibors'][0]['related'] = $related;
            } else {
                $result['parent'] = $this->get_menu_items_parent($data, $menu_item_current['parent_id']);

                $this->get_menu_items_child($data, $menu_item_current['id'], 0);

                $result['neibors'] = $this->get_menu_items_neibors($data, $menu_item_current['parent_id'], $menu_item_id);

                foreach ($result['neibors'] as $key => $n) {
                    if ($result['neibors'][$key]['id'] != $menu_item_id) {
                        $result['neibors'][$key]['current'] = 0;
                    } else {
                        $result['neibors'][$key]['current'] = 1;
                        $result['neibors'][$key]['child'] = $this->child_menu_items;
                        $result['neibors'][$key]['related'] = $this->get_menu_items_related($data, $menu_item_id);
                    }
                }
            }

            self::$ci->benchmark->mark('REC_end');

            return $result;
        } else {
            return;
        }
    }

    public function get_menu_items_parent($data, $parent_id) {

        $result = false;

        foreach ($data as $key => $val) {
            if ($val['id'] == $parent_id) {
                $result = $val;
            }
        }

        return $result;
    }

    public function get_menu_items_neibors($data, $parent_id, $menu_item_id) {

        $result = false;

        foreach ($data as $key => $val) {
            if ($val['parent_id'] == $parent_id) {
                $result[] = $val;
            }
        }

        return $result;
    }

    public function get_menu_items_child($data, $parent_id, $lvl) {
        $lvl++;

        $result = false;

        foreach ($data as $key => $val) {
            if ($val['parent_id'] == $parent_id) {
                $bufer = $val;
                $bufer['lvl'] = $lvl;
                $result[] = $bufer;
            }
        }


        if ($result) {

            foreach ($result as $key => $val) {
                $this->child_menu_items[] = $val;
                $this->get_menu_items_child($data, $val['id'], $lvl);
            }
        }
    }

    public function get_menu_items_related($data, $menu_item_id) {
        $menu_item_relation = new Menu_item_relation();

        $related = $menu_item_relation->get_menu_item_relation();

        $result = false;

        foreach ($related as $r) {
            foreach ($data as $d) {
                if ($menu_item_id == $r['menu_item_id']) {
                    if ($r['related_menu_item_id'] == $d['id']) {
                        $result[] = $d;
                    }
                }
            }
        }

        return $result;
    }

}

?>