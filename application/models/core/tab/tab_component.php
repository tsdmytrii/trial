<?php

class Tab_component extends DataMapper {

    public $table = 'tab_components';
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

    public function get_tab_component($tab_id) {
        $tab_component = new Tab_component();

        return $tab_component->get_by_tab_id($tab_id)->to_array();
    }


}

?>