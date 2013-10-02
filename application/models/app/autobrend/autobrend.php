<?php

class Autobrend extends DataMapper {

    public $table = 'autobrends';
    public $has_many = array('autobrend_language', 'autobrend_logo', 'autobrend_autologo', 'autobrend_picture', 'automodel');
    public static $ci;
    public $validation = array(
        array(
            'field' => 'id',
            'label' => 'id',
            'rules' => array('trim', 'numeric', 'max_length' => 5),
        ),
        array(
            'field' => 'date',
            'label' => 'Date',
            'rules' => array('trim', 'min_length' => 2, 'max_length' => 20),
        ),
        array(
            'field' => 'price',
            'label' => 'Price',
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

    public function set_from_default() {
        $autobrend = new Autobrend();

        $autobrend->date = date('d-m-Y');
        $autobrend->price = '150 000';

        $autobrend->save();

        $autobrend_lang = new Autobrend_language();

        $autobrend_lang->set_from_default($autobrend->id, 1);
        $autobrend_lang->set_from_default($autobrend->id, 2);
        $autobrend_lang->set_from_default($autobrend->id, 3);

        if ($autobrend->id)
            return $autobrend->id;
        else
            return false;
    }

    public function set_autobrend() {

        if (self::$ci->access->check_access(__FUNCTION__) == false)
            return 403;

        $autobrend = new Autobrend();

        $autobrend_id = self::$ci->input->post('autobrend_id');

        $autobrend->get_by_id($autobrend_id);
        $autobrend->date = date('d-m-Y H:i:s');
        $autobrend->price = self::$ci->input->post('price');

        $autobrend_lang = new Autobrend_language();

        if ($autobrend->save()) {
            if ($autobrend_lang->set_autobrend_lang($autobrend_id))
                return true;
        } else
            return false;
    }

    public function get_autobrend() {

        if (self::$ci->access->check_access(__FUNCTION__) == false)
            return 403;

        $autobrend_id = self::$ci->input->post('autobrend_id') ? self::$ci->input->post('autobrend_id') : false;

        $autobrend = new Autobrend();
        $autobrend->get_by_id($autobrend_id);

        $autobrend_lang = new Autobrend_language();

        $result = $autobrend->to_array();
        $result['lang'] = $autobrend_lang->get_autobrend_lang($autobrend_id);

        $autobrend_logo = new Autobrend_logo();
        $result['logo'] = $autobrend_logo->get_img($autobrend_id);

        $autobrend_autologo = new Autobrend_autologo();
        $result['autologo'] = $autobrend_autologo->get_img($autobrend_id);

        $autobrend_picture = new Autobrend_picture();
        $result['picture'] = $autobrend_picture->get_img($autobrend_id);

        return $result;
    }

    public function get_autobrend_for_user($autobrend_id) {

        $autobrend_id = self::$ci->input->post('autobrend_id') ? self::$ci->input->post('autobrend_id') : $autobrend_id;

        $autobrend = new Autobrend();
        $autobrend->get_by_id($autobrend_id);

        if (isset($autobrend->id)) {

            $autobrend_lang = new Autobrend_language();
            $lang = $autobrend_lang->get_autobrend_lang($autobrend_id);

            $result = $autobrend->to_array();
            $result['lang'] = $lang;

            return $result;
        } else {
            return false;
        }
    }

    public function get_autobrends_to_user($lang_id = 2) {
        $autobrend = new Autobrend();

        $autobrend->get();

        $result = false;

        foreach ($autobrend as $key => $a) {

            $ab_language = new Autobrend_language();

            $ab_logo = new Autobrend_logo();

            $ab_autologo = new Autobrend_autologo();

            $ab_picture = new Autobrend_picture();

            $automodel = new Automodel();

            $result[$key] = $a->to_array();

            $result[$key]['lang'] = $ab_language->get_autobrend_lang($a->id);

            $result[$key]['logo'] = $ab_logo->get_img($a->id);

            $result[$key]['autologo'] = $ab_autologo->get_img($a->id);

            $result[$key]['picture'] = $ab_picture->get_img($a->id);

            $result[$key]['automodel'] = $automodel->get_automodel_by_autobrend($a->id, $lang_id);

        }

        return $result;

    }

    public function get_autobrend_by_id($autobrend_id) {

        $autobrend = new Autobrend();
        $autobrend->get_by_id($autobrend_id);

        $autobrend_lang = new Autobrend_language();

        $result = $autobrend->to_array();
        $result['lang'] = $autobrend_lang->get_autobrend_lang($autobrend_id);

        return $result;
    }

    public function delete_autobrend($component_id) {

        if (self::$ci->access->check_access(__FUNCTION__) == false)
            return 403;

        $autobrend = new Autobrend();

        $autobrend->get_by_id($component_id);

        $autobrend_lang = new Autobrend_language();
        $autobrend_lang->delete_autobrend_lang($component_id);

        $autobrend_logo = new Autobrend_logo();
        $autobrend_logo->delete_img($component_id);

        $autobrend_picture = new Autobrend_picture();
        $autobrend_picture->delete_img($component_id);

        $automodel = new Automodel();

        $automodel->get_by_autobrend_id($component_id);

        foreach ($automodel as $a) {
            $automodel_delete = new Automodel();

            $automodel_delete->delete_component_content($a->id);
        }

        $autobrend->delete();

        return array('autobrend_id' => $component_id);
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
//        $autobrend_lang = new Autobrend_language();
//
//        $autobrend_lang->
//                like('title', $search_str)->
//                or_like('description_search', $search_str)->
//                where(array('language_id' => self::$ci->input->post('lang_id')))->
//                where_in('autobrend_id', $static_comp_id_array)->
//                group_by('title')->
//                get();
//
//        $result = false;
//
//        foreach ($autobrend_lang as $a) {
//            $autobrend = new Autobrend();
//
//            $m_item = new Menu_item();
//
//            $bufer = $autobrend->get_autobrend_by_id($a->autobrend_id);
//            $bufer['menu_item'] = $m_item->get_menu_item_by_static_comp_id('staticcomp/' . $a->autobrend_id);
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