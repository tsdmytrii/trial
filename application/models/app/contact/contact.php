<?php

class Contact extends DataMapper {

    public $table = 'contacts';
    public $has_many = array('contact_language');
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
            'rules' => array('required', 'trim', 'min_length' => 8, 'max_length' => 10),
        )
    );

    function __construct($id = NULL) {
        parent::__construct($id);
        if (empty(self::$ci)) {
            self::$ci = &get_instance();
        }
        self::$ci->load->library(array('plugins/image'));
    }

    public function set_from_default($component_id) {
        $contacts = new Contact();

        $contacts->get();

        $contacts->date = date('d-m-Y');

        $contacts->save();

        $contacts_lang = new Contact_language();

        $contacts_lang->set_from_default($contacts->id, 1);
        $contacts_lang->set_from_default($contacts->id, 2);
        $contacts_lang->set_from_default($contacts->id, 3);

        if ($contacts->id)
            return $contacts->id;
        else
            return false;
    }

    public function set_conacts() {
        if (self::$ci->access->check_access(__FUNCTION__) == false)
            return 403;
        
        $contacts = new Contact();

        $contacts_id = self::$ci->input->post('contacts_id');

        $contacts->get_by_id($contacts_id);
        $contacts->date = date('d-m-Y');

        $static_lang = new Contact_language();

        if ($contacts->save()) {
            if ($static_lang->set_contacts_lang($contacts_id))
                return true;
        } else
            return false;
    }

    public function get_contacts() {
        if (self::$ci->access->check_access(__FUNCTION__) == false)
            return 403;

        $contacts_id = self::$ci->input->post('contacts_id') ? self::$ci->input->post('contacts_id') : false;

        $contacts = new Contact();

        if ($contacts_id)
            $contacts->get_by_id($contacts_id);
        else
            $contacts->get();

        $contacts_lang = new Contact_language();

        $result = $contacts->to_array();
        $result['lang'] = $contacts_lang->get_contacts_lang($contacts->id);

        return $result;
    }

    public function get_contacts_for_user($contacts_id, $menu_item_id) {
        $contacts_id = self::$ci->input->post('contacts_id') ? self::$ci->input->post('contacts_id') : $contacts_id;

        $menu_item_id = self::$ci->input->post('menu_item_id') ? self::$ci->input->post('menu_item_id') : $menu_item_id;

        $contacts = new Contact();
        $contacts->get_by_id($contacts_id);

        if (isset($contacts->id)) {
            $menu_item = new Menu_item();

            $contacts_lang = new Contact_language();
            $lang = $contacts_lang->get_contacts_lang($contacts_id);

            $result = $contacts->to_array();
            $result['lang'] = $lang;
            $result['menu_item'] = $menu_item_id != 0 ? $menu_item->get_menu_item_by_id($menu_item_id) : false;

            if ($result['menu_item'] == false) {
                $result['link'] = 'staticcomp/' . $contacts_id . '/0/0/';
            }

            return $result;
        } else {
            return false;
        }
    }

    public function get_contacts_by_id($contacts_id) {

        $contacts = new Contact();
        $contacts->get_by_id($contacts_id);

        $contacts_lang = new Contact_language();
        $lang = $contacts_lang->get_contacts_lang($contacts_id);

        $result = $contacts->to_array();
        $result['lang'] = $lang;

        return $result;
    }

    public function delete_component_content($component_id) {

        $contacts = new Contact();

        $contacts->get_by_id($component_id);

        $contacts_lang = new Contact_language();
        $contacts_lang->delete_contacts_lang($component_id);

        $contacts->delete();

        return array('contacts_id' => $component_id);
    }

    public function search() {

        $component = new Component();

        $component->get_by_component_type_id(1);

        $menu_item = new Menu_item();

//        $menu_item->like('href', 'staticcomp/')->get();
        $menu_item->get_by_related($component);

        $static_comp_id_array = array();

        foreach ($menu_item as $m) {
            $buf = explode('/', $m->href);
            if (!empty($buf[1]) && $buf[1] !== '')
                $static_comp_id_array[] = $buf[1];
        }

        $search_str = self::$ci->input->post('search_str');
        $search_str = str_replace('«', '&laquo;', $search_str);
        $search_str = str_replace('»', '&raquo;', $search_str);
        $search_str = str_replace('–', '&ndash;', $search_str);

        $contacts_lang = new Contact_language();

        $contacts_lang->
                like('title', $search_str)->
                or_like('description_search', $search_str)->
                where(array('language_id' => self::$ci->input->post('lang_id')))->
                where_in('contacts_id', $static_comp_id_array)->
                group_by('title')->
                get();

        $result = false;

        foreach ($contacts_lang as $a) {
            $contacts = new Contact();

            $m_item = new Menu_item();

            $bufer = $contacts->get_contacts_by_id($a->contacts_id);
            $bufer['menu_item'] = $m_item->get_menu_item_by_static_comp_id('staticcomp/' . $a->contacts_id);
            $bufer['href'] = $bufer['menu_item']['href'];
            $bufer['link'] = $bufer['menu_item']['link'];
            $bufer['main'] = $bufer['menu_item']['main'];

            $result[] = $bufer;
        }

        return $result;
    }


}

?>