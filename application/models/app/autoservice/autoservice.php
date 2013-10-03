<?php

class Autoservice extends DataMapper {

    public $table = 'autoservices';
    public $has_many = array('autoservice_language');
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
            'rules' => array('required', 'trim', 'min_length' => 8, 'max_length' => 19),
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
        $autoservice = new Autoservice();

        $autoservice->menu_block_id = 0;
        $autoservice->date = date('d-m-Y H:i:s');

        $autoservice->save();

        $autoservice_lang = new Autoservice_language();

        $autoservice_lang->set_from_default($autoservice->id, 2);

        if ($autoservice->id)
            return $autoservice->id;
        else
            return false;
    }

    public function set_autoservice() {

        if (self::$ci->access->check_access(__FUNCTION__) == false)
            return 403;

        $autoservice = new Autoservice();

        $autoservice_id = self::$ci->input->post('autoservice_id');

        $autoservice->get_by_id($autoservice_id);
        $autoservice->date = date('d-m-Y H:i:s');

        $autoservice_lang = new Autoservice_language();

        if ($autoservice->save()) {
            if ($autoservice_lang->set_autoservice_lang($autoservice_id))
                return true;
        } else
            return false;
    }

    public function get_autoservice() {

        if (self::$ci->access->check_access(__FUNCTION__) == false)
            return 403;

        $autoservice_id = self::$ci->input->post('autoservice_id') ? self::$ci->input->post('autoservice_id') : false;

        $autoservice = new Autoservice();
        $autoservice->get_by_id($autoservice_id);

        $autoservice_pict = new Autoservice_picture();

        $autoservice_lang = new Autoservice_language();

        $result = $autoservice->to_array();
        $result['lang'] = $autoservice_lang->get_autoservice_lang($autoservice_id);
        $result['picture'] = $autoservice_pict->get_img($autoservice_id);

        return $result;
    }

    public function get_autoservice_for_user($autoservice_id, $menu_item_id) {

        $autoservice = new Autoservice();
        $autoservice->get_by_id($autoservice_id);

        if (isset($autoservice->id)) {
            $menu_item = new Menu_item();

            $autoservice_picture = new Autoservice_picture();

            $autoservice_lang = new Autoservice_language();

            $result = $autoservice->to_array();

            $result['lang'] = $autoservice_lang->get_autoservice_lang($autoservice_id);

            $result['menu_item'] = $menu_item_id != 0 ? $menu_item->get_menu_item_by_id($menu_item_id) : false;

            $result['menu'] = $menu_item->get_menu_item_by_block($autoservice->menu_block_id);

            $result['bg'] = $autoservice_picture->get_img($autoservice_id);

            if ($result['menu_item'] == false) {
                $result['link'] = 'autoservice/' . $autoservice_id . '/0/0/';
            }

            return $result;
        } else {
            return false;
        }
    }

    public function get_autoservice_by_id($autoservice_id) {

        $autoservice = new Autoservice();
        $autoservice->get_by_id($autoservice_id);

        $autoservice_lang = new Autoservice_language();
        $lang = $autoservice_lang->get_autoservice_lang($autoservice_id);

        $result = $autoservice->to_array();
        $result['lang'] = $lang;

        return $result;
    }

    public function delete_autoservice($component_id) {

        if (self::$ci->access->check_access(__FUNCTION__) == false)
            return 403;

        $autoservice = new Autoservice();

        $autoservice->get_by_id($component_id);

        $autoservice_lang = new Autoservice_language();
        $autoservice_lang->delete_autoservice_lang($component_id);

        $autoservice->delete();

        return array('autoservice_id' => $component_id);
    }

    public function search() {

        $menu_item = new Menu_item();

        $menu_item->like('href', 'autoservice/')->get();
//        $menu_item->get_by_related($component);

        $autoservice_id_array = array();

        foreach ($menu_item as $m) {
            $buf = explode('/', $m->href);
            if (!empty($buf[1]) && $buf[1] !== '')
                $autoservice_id_array[] = $buf[1];
        }

        $search_str = self::$ci->input->post('searchStr');
        $search_str = str_replace('«', '&laquo;', $search_str);
        $search_str = str_replace('»', '&raquo;', $search_str);
        $search_str = str_replace('–', '&ndash;', $search_str);

        $autoservice_lang = new Autoservice_language();

        $autoservice_lang->
                like('title', $search_str)->
                or_like('description_search', $search_str)->
                where(array('language_id' => self::$ci->input->post('lang_id')))->
                where_in('autoservice_id', $autoservice_id_array)->
                group_by('title')->
                get();

        $result = false;

        foreach ($autoservice_lang as $a) {

            $bufer = $a->to_array(array('id', 'autoservice_id', 'title', 'description'));

            $bufer['id'] = intval($bufer['autoservice_id']);
            $bufer['description'] = strip_tags($bufer['description']);

            $m_item = new Menu_item();

            $menu_item = $m_item->get_menu_item_by_autoservice_id('autoservice/' . $a->autoservice_id);

            $bufer['href'] = $menu_item['href'];
            $bufer['link'] = $menu_item['link'];
            $bufer['main'] = $menu_item['main'];

            $result[] = $bufer;
        }

        return $result;
    }

}

?>