<?php

class Characteristic extends DataMapper {

    public $table = 'characteristics';
    public $has_one = array('automodel');
    public $has_many = array('characteristic_language');
    public static $ci;
    public $validation = array(
        array(
            'field' => 'id',
            'label' => 'id',
            'rules' => array('trim', 'numeric', 'max_length' => 11),
        ),

        array(
            'field' => 'automodel_id',
            'label' => 'Automodel id',
            'rules' => array('trim', 'numeric', 'max_length' => 11),
        ),

        array(
            'field' => 'type_id',
            'label' => 'Type',
            'rules' => array('trim', 'max_length' => 2),
        )
    );

    function __construct($id = NULL) {
        parent::__construct($id);
        if (empty(self::$ci)) {
            self::$ci = &get_instance();
        }
        self::$ci->load->library(array('plugins/image'));
    }

    public function set_characteristic() {

        if (self::$ci->access->check_access(__FUNCTION__) == false)
            return 403;

        $characteristic = new Characteristic();

        if (self::$ci->input->post('characteristic_id'))
            $characteristic->get_by_id(self::$ci->input->post('characteristic_id'));

        $characteristic->automodel_id = self::$ci->input->post('automodel_id');
        $characteristic->type_id = self::$ci->input->post('type_id');

        $characteristic_lang = new Characteristic_language();

        if ($characteristic->save()) {

            $characteristic_lang_id = $characteristic_lang->set_characteristic_lang($characteristic->id);

            if ($characteristic_lang_id)
                return array('id' => $characteristic->id, 'characteristic_lang_id' => $characteristic_lang_id);
        } else
            return false;
    }

    public function get_characteristic($char_id = false) {

        if (self::$ci->access->check_access(__FUNCTION__) == false)
            return 403;

        $characteristic_id = self::$ci->input->post('characteristic_id') ? self::$ci->input->post('characteristic_id') : $char_id;

        $characteristic = new Characteristic();
        $characteristic->get_by_id($characteristic_id);

        $characteristic_lang = new Characteristic_language();

        $result = $characteristic->to_array();
        $result['lang'] = $characteristic_lang->get_characteristic_lang($characteristic_id);

        return $result;
    }

    public function get_characteristic_for_user($characteristic_id) {

        $characteristic_id = self::$ci->input->post('characteristic_id') ? self::$ci->input->post('characteristic_id') : $characteristic_id;

        $characteristic = new Characteristic();
        $characteristic->get_by_id($characteristic_id);

        if (isset($characteristic->id)) {

            $characteristic_lang = new Characteristic_language();
            $lang = $characteristic_lang->get_characteristic_lang($characteristic_id);

            $result = $characteristic->to_array();
            $result['lang'] = $lang;

            return $result;
        } else {
            return false;
        }
    }

    public function get_all_characteristics($ab_id = false) {

        if (self::$ci->access->check_access(__FUNCTION__) == false)
            return 403;

        $automodel_id = self::$ci->input->post('automodel_id') ? self::$ci->input->post('automodel_id') : $ab_id;

        $characteristic = new Characteristic();
        $characteristic->get_by_automodel_id($automodel_id);

        $result = false;

        foreach ($characteristic as $key => $a) {
            $characteristic_lang = new Characteristic_language();

            $result[$key] = $a->to_array();
            $result[$key]['lang'] = $characteristic_lang->get_characteristic_lang($a->id);
        }

        return $result;
    }

    public function delete_characteristic($comp_id = false) {

        if (self::$ci->access->check_access(__FUNCTION__) == false)
            return 403;

        $component_id = self::$ci->input->post('characteristic_id') ? self::$ci->input->post('characteristic_id') : $comp_id;

        $characteristic = new Characteristic();

        $characteristic->get_by_id($component_id);

        $characteristic_lang = new Characteristic_language();
        $characteristic_lang->delete_characteristic_lang($component_id);

        $characteristic->delete();

        return array('characteristic_id' => $component_id);
    }

    public function search() {

//        $component = new Component();
//
//        $component->get_by_component_type_id(1);
//
//        $menu_item = new Menu_item();
//
////        $menu_item->like('href', 'staticcomp/')->get();
//        $menu_item->get_by_related($component);
//
//        $static_comp_id_array = array();
//
//        foreach ($menu_item as $m) {
//            $buf = explode('/', $m->href);
//            if (!empty($buf[1]) && $buf[1] !== '')
//                $static_comp_id_array[] = $buf[1];
//        }
//
//        $search_str = self::$ci->input->post('search_str');
//        $search_str = str_replace('«', '&laquo;', $search_str);
//        $search_str = str_replace('»', '&raquo;', $search_str);
//        $search_str = str_replace('–', '&ndash;', $search_str);
//
//        $characteristic_lang = new Characteristic_language();
//
//        $characteristic_lang->
//                like('title', $search_str)->
//                or_like('description_search', $search_str)->
//                where(array('language_id' => self::$ci->input->post('lang_id')))->
//                where_in('characteristic_id', $static_comp_id_array)->
//                group_by('title')->
//                get();
//
//        $result = false;
//
//        foreach ($characteristic_lang as $a) {
//            $characteristic = new Characteristic();
//
//            $m_item = new Menu_item();
//
//            $bufer = $characteristic->get_characteristic_by_id($a->characteristic_id);
//            $bufer['menu_item'] = $m_item->get_menu_item_by_static_comp_id('staticcomp/' . $a->characteristic_id);
//            $bufer['href'] = $bufer['menu_item']['href'];
//            $bufer['link'] = $bufer['menu_item']['link'];
//            $bufer['main'] = $bufer['menu_item']['main'];
//
//            $result[] = $bufer;
//        }
//
//        return $result;
    }

}

?>