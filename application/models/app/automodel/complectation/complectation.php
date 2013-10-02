<?php

class Complectation extends DataMapper {

    public $table = 'complectations';
    public $has_one = array('automodel');
    public $has_many = array('complectation_language', 'complectation_logo');
    public static $ci;
    public $validation = array(
        array(
            'field' => 'id',
            'label' => 'id',
            'rules' => array('trim', 'numeric', 'max_length' => 11),
        ),

        array(
            'field' => 'automodel_id',
            'label' => 'Complectation id',
            'rules' => array('trim', 'numeric', 'max_length' => 11),
        ),

        array(
            'field' => 'year',
            'label' => 'Year',
            'rules' => array('trim', 'max_length' => 12),
        ),

        array(
            'field' => 'price',
            'label' => 'Price',
            'rules' => array('trim', 'max_length' => 12),
        ),

        array(
            'field' => 'position',
            'label' => 'Position',
            'rules' => array('trim', 'numeric', 'max_length' => 11),
        ),

        array(
            'field' => 'date',
            'label' => 'Date',
            'rules' => array('trim', 'min_length' => 2, 'max_length' => 20),
        )
    );

    function __construct($id = NULL) {
        parent::__construct($id);
        if (empty(self::$ci)) {
            self::$ci = &get_instance();
        }
        self::$ci->load->library(array('plugins/image'));
    }

    public function set_complectation() {
        if (self::$ci->access->check_access(__FUNCTION__) == false)
            return 403;

        $complectation = new Complectation();

        if (self::$ci->input->post('complectation_id'))
            $complectation->get_by_id(self::$ci->input->post('complectation_id'));

        $complectation->automodel_id = self::$ci->input->post('automodel_id');
        $complectation->year = self::$ci->input->post('year');
        $complectation->price = self::$ci->input->post('price');
        $complectation->position = self::$ci->input->post('position');
        $complectation->date = date('d-m-Y H:i:s');

        $complectation_lang = new Complectation_language();

        if ($complectation->save()) {
            if ($complectation_lang->set_complectation_lang($complectation->id))
                return $complectation->id;
        } else
            return false;
    }

    public function get_complectation($comp_id = false) {

        if (self::$ci->access->check_access(__FUNCTION__) == false)
            return 403;

        $complectation_id = self::$ci->input->post('complectation_id') ? self::$ci->input->post('complectation_id') : $comp_id;

        $complectation = new Complectation();
        $complectation->get_by_id($complectation_id);

        $complectation_lang = new Complectation_language();

        $result = $complectation->to_array();
        $result['lang'] = $complectation_lang->get_complectation_lang($complectation_id);

        $complectation_logo = new Complectation_logo();
        $result['logo'] = $complectation_logo->get_img($complectation_id);

        return $result;
    }

    public function get_all_complectations($ab_id = false) {

        if (self::$ci->access->check_access(__FUNCTION__) == false)
            return 403;

        $automodel_id = self::$ci->input->post('automodel_id') ? self::$ci->input->post('automodel_id') : $ab_id;

        $complectation = new Complectation();

        $where = array('automodel_id' => $automodel_id);

        $complectation->where($where)->order_by('position')->get();

        $result = false;

        foreach ($complectation as $key => $a) {
            $complectation_lang = new Complectation_language();

            $result[$key] = $a->to_array();
            $result[$key]['lang'] = $complectation_lang->get_complectation_lang($a->id);
        }

        return $result;
    }

    public function delete_complectation($comp_id = false) {

        if (self::$ci->access->check_access(__FUNCTION__) == false)
            return 403;

        $component_id = self::$ci->input->post('complectation_id') ? self::$ci->input->post('complectation_id') : $comp_id;

        $complectation = new Complectation();

        $complectation->get_by_id($component_id);

        $complectation_lang = new Complectation_language();
        $complectation_lang->delete_complectation_lang($component_id);

        $complectation_logo = new Complectation_logo();
        $complectation_logo->delete_img($component_id);

        $complectation->delete();

        return array('complectation_id' => $component_id);
    }

    public function get_complectation_for_user($complectation_id) {

        $complectation_id = self::$ci->input->post('complectation_id') ? self::$ci->input->post('complectation_id') : $complectation_id;

        $complectation = new Complectation();
        $complectation->get_by_id($complectation_id);

        if (isset($complectation->id)) {

            $complectation_lang = new Complectation_language();
            $lang = $complectation_lang->get_complectation_lang($complectation_id);

            $result = $complectation->to_array();
            $result['lang'] = $lang;

            return $result;
        } else {
            return false;
        }
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
//        $complectation_lang = new Complectation_language();
//
//        $complectation_lang->
//                like('title', $search_str)->
//                or_like('description_search', $search_str)->
//                where(array('language_id' => self::$ci->input->post('lang_id')))->
//                where_in('complectation_id', $static_comp_id_array)->
//                group_by('title')->
//                get();
//
//        $result = false;
//
//        foreach ($complectation_lang as $a) {
//            $complectation = new Complectation();
//
//            $m_item = new Menu_item();
//
//            $bufer = $complectation->get_complectation_by_id($a->complectation_id);
//            $bufer['menu_item'] = $m_item->get_menu_item_by_static_comp_id('staticcomp/' . $a->complectation_id);
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