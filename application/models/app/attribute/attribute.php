<?php

class Attribute extends DataMapper {

    public $db_params = 'default';
    public $table = 'attributes';
    public $has_many = array('attribute_language');
    public static $ci;
    public $validation = array(
        array(
            'field' => 'id',
            'label' => 'Id',
            'rules' => array('trim', 'numeric', 'max_length' => 10),
        ),
        array(
            'field' => 'influence_type',
            'label' => 'Influence Type',
            'rules' => array('required', 'trim', 'min_length' => 1, 'max_length' => 1),
        ),
        array(
            'field' => 'measurement_type',
            'label' => 'Measurement Type',
            'rules' => array('required', 'trim', 'min_length' => 1, 'max_length' => 1),
        ),
        array(
            'field' => 'strict',
            'label' => 'Strict',
            'rules' => array('required', 'trim', 'min_length' => 1, 'max_length' => 1),
        )
    );

    function __construct($id = NULL) {
        parent::__construct($id);
        if (empty(self::$ci)) {
            self::$ci = &get_instance();
        }
    }

    public function set_attribute() {
        if (self::$ci->access->check_access(__FUNCTION__) == false)
            return 403;

        $attribute = new Attribute();

        if (self::$ci->input->post('id')) {
            $attribute->get_by_id(self::$ci->input->post('id'));
        }

        $attribute->name = self::$ci->input->post('name');
        $attribute->name = self::$ci->input->post('influence_type');
        $attribute->name = self::$ci->input->post('measurement_type');
        $attribute->name = self::$ci->input->post('strict');

        if ($subscription_id_array = self::$ci->input->post('subscribe')) {
            foreach ($subscription_id_array as $key => $value) {
                $subscription = new Subscription();
                $subscription->get_by_id($value);
                $attribute->save($subscription->all);
            }
        }

        if ($attribute->save())
            return $attribute->to_array();
        else
            return false;
    }

    public function get_attribute($attribute_id = false) {
        if (self::$ci->access->check_access(__FUNCTION__) == false)
            return 403;

        $input_id = self::$ci->input->post('attribute_id');
        $attribute_id = $input_id ? $input_id : $attribute_id;

        if ($attribute_id) {

            $attribute = new Attribute();
            $attribute_language = new Attribute_language();

            $attribute_copy = new Attribute();
            $attribute_copy->get_by_id($attribute_id);

            return array(
                $attribute->get_by_id($attribute_id)->to_array(),
                $attribute_copy->$attribute_language->get()->all_to_array()
            );

        } else
            return false;

    }

    public function get_all_attribute() {
        if (self::$ci->access->check_access(__FUNCTION__) == false)
            return 403;

        $attribute = new Attribute();
        $result = false;
        $attribute->get();
        foreach ($attribute as $key => $attribute_unit) {

            $attribute_language = new Attribute_language();
            $test = $attribute_language->get_by_related($attribute_unit);

            $result[$key]['attribute_languages'] = $attribute_language->all_to_array(array('name'));
            $result[$key]['attribute'] = $attribute_unit->to_array();
        }

        return $result;
    }

    public function delete_attribute() {
        if (self::$ci->access->check_access(__FUNCTION__) == false)
            return 403;

        $attribute_id = self::$ci->input->post('attribute_id');

        $attribute = new Attribute();
        $attribute->get_by_id($attribute_id);

        $attribute_language = new Attribute_language();
        $attribute_language->where('attribute_id', $attribute->id)->get();
        $attribute_language->delete();

        return $attribute->delete() ? array('attribute_id' => $attribute_id) : false;
    }

}