<?php

class Seo extends DataMapper {

    public $table = 'seoes';
    public $has_many = array('seo_language');
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
            'field' => 'display',
            'label' => 'Display',
            'rules' => array('trim', 'max_length' => 1),
        )
    );

    function __construct($id = NULL) {
        parent::__construct($id);
        if (empty(self::$ci)) {
            self::$ci = &get_instance();
        }
    }

    public function set_from_default() {
        return 0;
    }

    public function set_seo() {

        if (!self::$ci->access->check_access(__FUNCTION__))
            return 403;

        $seo = new Seo();

        if (self::$ci->input->post('id'))
            $seo->get_by_id(self::$ci->input->post('id'));

        $seo->date = date("d-m-Y H:i:s");

        $seo_lang = new Seo_language();

        if ($seo->save()) {
            if ($seo_lang->set_seo_lang($seo->id))
                return true;
        }
        else
            return false;

    }

    public function get_seo() {

        if (!self::$ci->access->check_access(__FUNCTION__))
            return 403;

        $seo = new Seo();
        $seo->get();

        $seo_lang = new Seo_language();

        $result = $seo->to_array();
        $result['lang'] = $seo_lang->get_seo_lang($seo->id);

        return $result;

    }

}

?>