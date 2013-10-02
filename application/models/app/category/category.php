<?php

class Category extends DataMapper {

    public $table = 'categories';
    public $has_many = array('category_language', 'category_logo', 'category_attribute', 'product');
    public static $ci;
    public $validation = array(
        array(
            'field' => 'id',
            'label' => 'id',
            'rules' => array('trim', 'numeric', 'max_length' => 5),
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

    public function get_category_by_id($c_id = false) {

        if (self::$ci->access->check_access(__FUNCTION__) == false)
            return 403;

        $category = new Category();

        $category_id = self::$ci->input->post('id') ? self::$ci->input->post('id') : $c_id;

        $category->get_by_id($category_id);

        $category_language = new Category_language();

        $result = $category->to_array();

        $category_logo = new Category_logo();

        $category_attribute = new Category_attribute();

        $result['lang'] = $category_language->get_category_language($category->id);

        $result['logo'] = $category_logo->get_img($category->id);

        $result['attr'] = $category_attribute->get_all_category_attributes($category->id);

        return $result;
    }

    public function get_category_by_id_for_product($c_id = false, $product_id = false) {
        $category = new Category();

        $category_id = self::$ci->input->post('id') ? self::$ci->input->post('id') : $c_id;

        $category->get_by_id($category_id);

        $category_language = new Category_language();

        $result = $category->to_array();

        $category_attribute = new Category_attribute();

        $result['lang'] = $category_language->get_category_language($category->id);

        $result['attr'] = $category_attribute->get_attributes_with_product($category->id, $product_id);

        return $result;
    }

    public function set_category() {

        if (self::$ci->access->check_access(__FUNCTION__) == false)
            return 403;

        $category = new Category();

        if (self::$ci->input->post('category_id'))
            $category->get_by_id(self::$ci->input->post('category_id'));

        $category->position = self::$ci->input->post('position');
        $category->parent_id = self::$ci->input->post('parent_id');
        $category->date = date('d-m-Y H:i:s');

        if ($category->save()) {

            $category_lang = new Category_language();

            if ($category_lang->set_category_language($category->id))
                return $category->id;
            else
                return false;

        }

        else
            return false;
    }

    public function get_all_categories() {

        if (self::$ci->access->check_access(__FUNCTION__) == false)
            return 403;

        $category = new Category();

        $category->get();

        $result = false;

        foreach ($category as $key => $m) {

            $category_lang = new Category_language();

            $result[$key] = $m->to_array();

            $result[$key]['lang'] = $category_lang->get_category_language($m->id);
        }

        return $result;
    }

    public function delete_category($c_id = false) {
        if (self::$ci->access->check_access(__FUNCTION__) == false)
            return 403;
        
        $category = new Category();

        $category_id = self::$ci->input->post('id') ? self::$ci->input->post('id') : $c_id;

        $category->get_by_id($category_id);

        $category_lang = new Category_language();
        $category_lang->delete_category_language($category_id);

        $category_logo = new Category_logo();
        $category_logo->delete_img($category_id);

        $category->delete();

        return $category_id;
    }

    public function get_category_for_product($refresh = false) {

        $category = new Category();

        $category->order_by('position')->get();

        $result = false;

        $product = new Product();

        foreach ($category as $key => $c) {

            $category_lang = new Category_language();

            $categoryResult[$key] = $c->to_array();

            $categoryResult[$key]['lang'] = $category_lang->get_category_language($c->id, 'language_id, name');

            $categoryResult[$key]['productCount'] = count($product->get_by_related($c)->all_to_array());

            $product->clear();

        }

        $result['category'] = $categoryResult;

        if ($refresh == false) {
            $result['product'] = $product->get_all_products($category->id);
            $product->clear();
        }

        $result['allProductCount'] = $product->get()->count();

        return $result;

    }

}

?>