<?php

class Attribute extends DataMapper {

    public $table = 'placeholder_attributes';
    public $has_one = array('placeholder');
    public static $ci;
    public $validation = array(
        array(
            'field' => 'id',
            'label' => 'id',
            'rules' => array('trim', 'numeric', 'max_length' => 5),
        ),
        array(
            'field' => 'placeholder_id',
            'label' => 'Placeholder id',
            'rules' => array('required', 'trim', 'max_length' => 11),
        ),
        array(
            'field' => 'key',
            'label' => 'Key',
            'rules' => array('required', 'min_length' => 2, 'max_length' => 50),
        ),
        array(
            'field' => 'value',
            'label' => 'Value',
            'rules' => array('required', 'min_length' => 2, 'max_length' => 200),
        )
    );

    function __construct($id = NULL) {
        parent::__construct($id);
        if (empty(self::$ci)) {
            self::$ci = &get_instance();
        }
    }

    public function set_placeholder_attribute() {
        $placeholder_attribute = new Attribute();

        if (self::$ci->input->post('id'))
            $placeholder_attribute->get_by_id (self::$ci->input->post('id'));

        $placeholder_attribute->placeholder_id = self::$ci->input->post('placeholder_id');
        $placeholder_attribute->key = self::$ci->input->post('key');
        $placeholder_attribute->value = self::$ci->input->post('value');

        if ($placeholder_attribute->save())
            return $placeholder_attribute->id;
        else
            return false;
    }

    public function get_placeholder_attribute($placeholder_id) {
        $placeholder_attribute = new Attribute();

        return $placeholder_attribute->get_by_placeholder_id($placeholder_id)->all_to_array();
    }

    public function delete_placeholder_attribute($placeholder_id = false) {

        $placeholder_attribute = new Attribute();

        if ($placeholder_id == false) {

            $placeholder_attribute->get_by_id(self::$ci->input->post('placeholder_attribute_id'));

            return $placeholder_attribute->delete();

        } else {

            $placeholder_attribute->get_by_placeholder_id($placeholder_id);

            return $placeholder_attribute->delete_all();

        }

    }

}

?>