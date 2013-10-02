<?php

class Product extends DataMapper {

    public $table = 'products';
    public $has_one = array('producer', 'unit');
    public $has_many = array('product_language', 'product_logo', 'product_photo', 'category', 'product_block', 'quality_variant');
    public static $ci;
    public $validation = array(
        array(
            'field' => 'id',
            'label' => 'id',
            'rules' => array('trim', 'numeric', 'max_length' => 11),
        ),
        array(
            'field' => 'price',
            'label' => 'Price',
            'rules' => array('trim', 'required', 'max_length' => 11),
        ),
        array(
            'field' => 'quantity',
            'label' => 'Quantity',
            'rules' => array('trim', 'required', 'max_length' => 11),
        ),
        array(
            'field' => 'discount_price',
            'label' => 'discountPrice',
            'rules' => array('trim', 'max_length' => 11),
        )
    );

    function __construct($id = NULL) {
        parent::__construct($id);
        if (empty(self::$ci)) {
            self::$ci = &get_instance();
        }
        self::$ci->load->library(array('plugins/image'));
    }

    /*
     * --------------------------------ADMIN------------------------------------
     */


    /*
     * Set functions
     */

    public function set_from_default() {
        return 0;
    }

    public function set_product() {

        if (self::$ci->access->check_access(__FUNCTION__) == false)
            return 403;

        $product = new Product();

        if (self::$ci->input->post('product_id'))
            $product->get_by_id(self::$ci->input->post('product_id'));

        $product->producer_id = self::$ci->input->post('producer_id');
        $product->unit_id = self::$ci->input->post('unit_id');
        $product->price = self::$ci->input->post('price');
        $product->discount_price = self::$ci->input->post('discount_price');
        $product->new_product = self::$ci->input->post('new_product');
        $product->top_product = self::$ci->input->post('top_product');
        $product->wait_product = self::$ci->input->post('wait_product');
        $product->quantity = self::$ci->input->post('quantity');

        $product_lang = new Product_language();

        if ($product->save()) {

            $product_lang_id = $product_lang->set_product_lang($product->id);

            if ($product_lang_id)
                return array('product_id' => $product->id, 'product_lang_id' => $product_lang_id);
            else
                return false;
        } else
            return false;
    }

    public function set_category() {

        if (self::$ci->access->check_access(__FUNCTION__) == false)
            return 403;

        $product = new Product();

        $product->get_by_id(self::$ci->input->post('product_id'));

        $category = new Category();

        $category->get_by_id(self::$ci->input->post('category_id'));

        return $product->save($category);
    }

    public function set_attribute_value() {

        if (self::$ci->access->check_access(__FUNCTION__) == false)
            return 403;

        $category_attribute = new Category_attribute();

        $category_attribute->get_by_id(self::$ci->input->post('category_attribute_id'));

        if ($category_attribute->type == 1) {

            $product_quantity_value = new Product_quantity_value();

            return $product_quantity_value->set_product_quantity_value();

        } else {

            $product = new Product();

            $product->get_by_id(self::$ci->input->post('product_id'));

            $quality_variant = new Quality_variant();

            $quality_variant->where(array('category_attribute_id' => $category_attribute->id))->get_by_related($product);

            if ($quality_variant->exists()) {
                $product->delete($quality_variant->all);
            }

            $quality_variant->clear();

            if (intval($category_attribute->direct) == 1) {

                $quality_variant->get_by_id(self::$ci->input->post('quality_variant_id'));

                return $product->save($quality_variant);

            } else {

                $quality_variant->where_in('id', self::$ci->input->post('quality_variant_id'))->get();

                foreach ($quality_variant as $val) {

                    $product->save($val);

                }

                return true;

            }

        }

    }


    /*
     * Get functions
     */

    public function get_product($product_id = false, $short = false) {

        if (self::$ci->access->check_access(__FUNCTION__) == false)
            return 403;

        $product_id = self::$ci->input->post('product_id') ? self::$ci->input->post('product_id') : $product_id;

        $product = new Product();
        $product->get_by_id($product_id);

        $product_lang = new Product_language();

        $result = $product->to_array();
        $result['lang'] = $product_lang->get_product_language($product_id);

        if ($short == false) {
            $producer = new Producer();
            $result['producer'] = $producer->get_producer($product->producer_id);

            $product_logo = new Product_logo();
            $result['logo'] = $product_logo->get_img($product_id);

            $category = new Category();

            $category->get_by_related($product);

            foreach($category as $key => $val) {

                $categoryItem = new Category();

                $result['category'][$key] = $categoryItem->get_category_by_id_for_product($val->id, $product_id);

            }

        }

        return $result;
    }

    public function get_product_category_attribute($product_id = false) {

        if (self::$ci->access->check_access(__FUNCTION__) == false)
            return 403;

        $product_id = self::$ci->input->post('product_id') ? self::$ci->input->post('product_id') : $product_id;

        $product = new Product();
        $product->get_by_id($product_id);

        $category = new Category();

        $category->get_by_related($product);

        $result = false;

        foreach($category as $key => $val) {

            $categoryItem = new Category();

            $result[$key] = $categoryItem->get_category_by_id_for_product($val->id, $product_id);

        }

        return $result;

    }

    public function get_all_products($category_id = false) {

        if (self::$ci->access->check_access(__FUNCTION__) == false)
            return 403;

        $product = new Product();

        $product->limit(self::$ci->input->post('limit'));

        if (self::$ci->input->post('offset')) {
            $product->offset(self::$ci->input->post('offset'));
        }

        $category_id = self::$ci->input->post('category_id') ? self::$ci->input->post('category_id') : $category_id;

        if (intval($category_id) === 0) {

            $product->get();

        } else {

            $category = new Category();

            $category->get_by_id($category_id);

            $product->get_by_related($category);

        }

        $result = false;

        foreach ($product as $key => $p) {
            $product_lang = new Product_language();

            $product_logo = new Product_logo();

            $result[$key] = $p->to_array();

            $result[$key]['lang'] = $product_lang->get_product_language($p->id);

            $result[$key]['logo'] = $product_logo->get_img($p->id);

            $relCategory = new Category();

            $result[$key]['relCategories'] = $relCategory->get_by_related($p)->all_to_array(array('id'));

        }

        if (self::$ci->input->post('refreshCategories')) {
            $categoryRefresh = new Category();

            $categoryResult = $categoryRefresh->get_category_for_product(true);

            $categoryResult['products'] = $result;

            return $categoryResult;
        }

        return $result;
    }

    public function product_autocomplete() {
        $product_language = new Product_language();

        $query = self::$ci->input->post('query');

        $product_language->like('name', $query)->get();

        foreach ($product_language as $a) {
            $suggestions[] = $a->name;
            $data[] = $a->product_id;
        }

        return array('query' => $query, 'suggestions' => $suggestions, 'data' => $data);
    }


    /*
     * Delete Functions
     */

    public function delete_product($comp_id = false) {

        if (self::$ci->access->check_access(__FUNCTION__) == false)
            return 403;

        $product_id = self::$ci->input->post('product_id') ? self::$ci->input->post('product_id') : $comp_id;

        $product = new Product();

        $product->get_by_id($product_id);

        $product_lang = new Product_language();
        $product_lang->delete_product_lang($product_id);

        $product_logo = new Product_logo();
        $product_logo->delete_img($product_id);

        $category = new Category();

        $category->get_by_related($product);

        if ($category->exists()) {

            foreach ($category as $c) {

                $this->delete_category($product_id, $c->id);

            }

        }

        $product->delete();

        return array('product_id' => $product_id);
    }

    public function delete_product_category($product_id = false, $category_id = false) {

        if (self::$ci->access->check_access(__FUNCTION__) == false)
            return 403;

        $product_id = self::$ci->input->post('product_id') ? self::$ci->input->post('product_id') : $product_id;
        $category_id = self::$ci->input->post('category_id') ? self::$ci->input->post('category_id') : $category_id;

        $product = new Product();

        $product->get_by_id($product_id);

        $category = new Category();

        $category->get_by_id($category_id);

        $this->delete_product_attribute_values($product_id, $category_id);

        return $product->delete($category);


    }

    public function delete_product_attribute_values($product_id, $category_id) {

        if (self::$ci->access->check_access(__FUNCTION__) == false)
            return 403;

        $product = new Product();

        $product->get_by_id($product_id);

        $category_attribute = new Category_attribute();

        $category_attribute->get_by_category_id($category_id);

        if ($category_attribute->exists()) {

            foreach($category_attribute as $c_a) {

                if (intval($c_a->type) === 1) {

                    $product_quantity_value = new Product_quantity_value();

                    $product_quantity_value->delete_product_quantity_value($product_id, $category_id);

                } else {

                    $quality_variant = new Quality_variant();

                    $quality_variant->where(array('category_attribute_id' => $c_a->id))->get_by_related($product);

                    if ($quality_variant->exists()) {
                        $product->delete($quality_variant->all);
                    }

                }

            }
        }

    }


    /*
     * ---------------------------------USER------------------------------------
     */

    public function get_products_by_product_block_to_user($product_block_id) {

        $product = new Product();

        $product->get_by_related_product_block('id', $product_block_id);

        $result = false;

        foreach ($product as $key => $p) {

            $product_lang = new Product_language();

            $product_logo = new Product_logo();

            $producer = new Producer();

            $result[$key] = $p->to_array();

            $result[$key]['lang'] = $product_lang->get_product_language($p->id);

            $result[$key]['logo'] = $product_logo->get_img($p->id);

            $result[$key]['producer'] = $producer->get_producer($p->producer_id, true);

            $category = new Category();

            $category->get_by_related($p);

            foreach($category as $k => $val) {

                $categoryItem = new Category();

                $result[$key]['category'][$k] = $categoryItem->get_category_by_id_for_product($val->id, $p->id);

            }

        }

        return $result;

    }
    
    public function get_product_for_user($product_id = false, $menu_item_id = false) {

        if (self::$ci->access->check_access(__FUNCTION__) == false)
            return 403;

        $product = new Product();
        $product->get_by_id($product_id);

        $product_lang = new Product_language();

        $result = $product->to_array();
        $result['lang'] = $product_lang->get_product_language($product_id);

            $producer = new Producer();
            $result['producer'] = $producer->get_producer($product->producer_id);

            $product_logo = new Product_logo();
            $result['logo'] = $product_logo->get_img($product_id);

            $category = new Category();

            $category->get_by_related($product);

            foreach($category as $key => $val) {

                $categoryItem = new Category();

                $result['category'][$key] = $categoryItem->get_category_by_id_for_product($val->id, $product_id);

            }

        return $result;
    }

}

?>