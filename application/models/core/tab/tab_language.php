<?php

class Tab_language extends DataMapper {

    public $table = 'tab_languages';
    public $has_one = array('tab');
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
            'rules' => array('required', 'trim', 'max_length' => 5),
        )
    );

    function __construct($id = NULL) {
        parent::__construct($id);
        if (empty(self::$ci)) {
            self::$ci = &get_instance();
        }
    }

    public function get_tab_name($tab_id, $lang_id = false) {
        $tab_lang = new Tab_language();

        if ($lang_id == false) {
            $tab_lang->get_by_tab_id($tab_id);

            $result = false;

            $lang = new Language();

            $all_lang = $lang->get_all_langs();

            foreach ($tab_lang as $t) {
                foreach($all_lang as $l) {
                    if ($t->language_id == $l['id']){
                        $result[$l['iso_code']] = $t->to_array();
                    }
                }
            }
        } else {
            $where = array('tab_id' => $tab_id, 'language_id' => $lang_id);

            $tab_lang->where($where)->get();

            $result = $tab_lang->to_array();
        }

        return $result;
    }


}

?>