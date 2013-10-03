<?php

class Category_attribute_range extends DataMapper {

    public $table = 'category_attribute_ranges';
    public $has_one = array('category_attribute');
    public static $ci;
    public $validation = array(
        array(
            'field' => 'id',
            'label' => 'id',
            'rules' => array('trim', 'numeric', 'max_length' => 11),
        ),
        array(
            'field' => 'category_attribute_id',
            'label' => 'Miniblock id',
            'rules' => array('trim', 'numeric', 'max_length' => 11),
        ),
        array(
            'field' => 'min',
            'label' => 'Min',
            'rules' => array('trim', 'numeric', 'max_length' => 11),
        ),
        array(
            'field' => 'max',
            'label' => 'Max',
            'rules' => array('trim', 'numeric', 'max_length' => 11),
        )
    );

    function __construct() {
        parent::__construct();
        if (empty(self::$ci)) {
            self::$ci = &get_instance();
        }
    }

    public function set_category_attribute_range($category_attribute_id) {

        $category_attribute_range = new Category_attribute_range();

        if (self::$ci->input->post('category_attribute_range_id') !== ''&& self::$ci->input->post('category_attribute_range_id') !== 0)
            $category_attribute_range->get_by_id(self::$ci->input->post('category_attribute_range_id'));

        $category_attribute_range->category_attribute_id = $category_attribute_id;
        $category_attribute_range->min = self::$ci->input->post('min');
        $category_attribute_range->max = self::$ci->input->post('max');

        return $category_attribute_range->save();

    }

    public function get_category_attribute_range($category_attribute_id) {

        $category_attribute_range = new Category_attribute_range();

        $category_attribute_range->where(array('category_attribute_id' => $category_attribute_id))->get();

        return $category_attribute_range->id ? $category_attribute_range->to_array() : false;
    }

    public function delete_category_attribute_range($category_attribute_id) {
        $category_attribute_range = new Category_attribute_range();

        $category_attribute_range->get_by_category_attribute_id($category_attribute_id);

        return $category_attribute_range->delete_all();
    }

}

?>
