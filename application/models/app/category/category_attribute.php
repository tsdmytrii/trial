<?php

class Category_attribute extends DataMapper {

    public $table = 'category_attributes';
    public $has_one = array('category');
    public $has_many = array('category_attribute_language');
    public static $ci;
    public $validation = array(
        array(
            'field' => 'id',
            'label' => 'id',
            'rules' => array('trim', 'numeric', 'max_length' => 11),
        )
    );

    function __construct($id = NULL) {
        parent::__construct($id);
        if (empty(self::$ci)) {
            self::$ci = &get_instance();
        }
    }

    public function set_category_attribute() {

        if (self::$ci->access->check_access(__FUNCTION__) == false)
            return 403;

        $category_attribute = new Category_attribute();

        if (self::$ci->input->post('category_attribute_id'))
            $category_attribute->get_by_id(self::$ci->input->post('category_attribute_id'));

        $category_attribute->category_id = self::$ci->input->post('category_id');
        $category_attribute->type = self::$ci->input->post('type');
        $category_attribute->direct = intval(self::$ci->input->post('type')) == 2 ? self::$ci->input->post('direct') : 0;

        if ($category_attribute->save()) {

            $category_attribute_lang = new Category_attribute_language();

            $lang = $category_attribute_lang->set_category_attribute_language($category_attribute->id);

            $range = true;

            if (self::$ci->input->post('min') || self::$ci->input->post('max')) {

                $category_attribute_range = new Category_attribute_range();

                $range = $category_attribute_range->set_category_attribute_range($category_attribute->id);

            }

            if ($lang && $range) {
                return $category_attribute->id;
            } else {
                return false;
            }

        }

        else
            return false;
    }

    public function get_all_category_attributes($category_id) {
        $category_attribute = new Category_attribute();

        $category_attribute->get_by_category_id($category_id);

        $result = false;

        foreach ($category_attribute as $key => $m) {

            $category_attribute_lang = new Category_attribute_language();

            $category_attribute_range = new Category_attribute_range();

            $quality_variant = new Quality_variant();

            $result[$key] = $m->to_array();

            $result[$key]['lang'] = $category_attribute_lang->get_category_attribute_language($m->id);

            $result[$key]['range'] = $category_attribute_range->get_category_attribute_range($m->id);

            $result[$key]['quality_variant'] = $quality_variant->get_all_quality_variants($m->id);

        }

        return $result;
    }

    public function get_attributes_with_product($category_id, $product_id) {
        $category_attribute = new Category_attribute();

        $category_attribute->get_by_category_id($category_id);

        $result = false;

        foreach ($category_attribute as $key => $m) {

            $category_attribute_lang = new Category_attribute_language();

            $category_attribute_range = new Category_attribute_range();

            $quality_variant = new Quality_variant();

            $result[$key] = $m->to_array();

            $result[$key]['lang'] = $category_attribute_lang->get_category_attribute_language($m->id);

            $result[$key]['range'] = $category_attribute_range->get_category_attribute_range($m->id);

            $result[$key]['quality_variant'] = $quality_variant->get_all_quality_variants($m->id);

            $result[$key]['test'] = intval($m->type);

            if (intval($m->type) == 1) {

                $product_quantity_value = new Product_quantity_value();

                $result[$key]['productValue'] = $product_quantity_value->where(array('product_id' => $product_id, 'category_attribute_id' => $m->id))->get()->to_array();

            } else {

                $product = new Product();

                $product->get_by_id($product_id);

                $product_quality_variant = new Quality_variant();

                $product_quality_variant->where(array('category_attribute_id' => $m->id))->get_by_related($product);

                $result[$key]['productValue'] = $product_quality_variant->exists() ? $product_quality_variant->all_to_array() : 0;

            }

        }

        return $result;
    }

    public function delete_category_attribute($category_id = false) {
        if (self::$ci->access->check_access(__FUNCTION__) == false)
            return 403;
        
        $category_attribute = new Category_attribute();

        if ($category_id)
            $category_attribute->get_by_category_id($category_id);
        else
            $category_attribute->get_by_id(self::$ci->input->post('id'));

        foreach ($category_attribute as $c_a) {
            $category_attribute_lang = new Category_attribute_language();
            $category_attribute_lang->delete_category_attribute_language($c_a->id);

            $category_attribute_range = new Category_attribute_range();
            $category_attribute_range->delete_category_attribute_range($c_a->id);
        }

        return $category_attribute->delete_all();
    }

}

?>