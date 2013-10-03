<?php

class Quality_variant extends DataMapper {

    public $table = 'quality_variants';
    public $has_many = array('quality_variant_language', 'product');
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

    public function set_quality_variant() {
        if (self::$ci->access->check_access(__FUNCTION__) == false)
            return 403;

        $quality_variant = new Quality_variant();

        if (self::$ci->input->post('quality_variant_id'))
            $quality_variant->get_by_id(self::$ci->input->post('quality_variant_id'));

        $quality_variant->category_attribute_id = self::$ci->input->post('category_attribute_id');
        $quality_variant->date = date('d-m-Y H:i:s');

        if ($quality_variant->save()) {

            $quality_variant_lang = new Quality_variant_language();

            $lang = $quality_variant_lang->set_quality_variant_language($quality_variant->id);

            if ($lang) {
                return array('quality_variant_id' => $quality_variant->id, 'quality_variant_lang_id' => $lang);
            } else {
                return false;
            }
        }

        else
            return false;
    }

    public function get_all_quality_variants($category_attribute_id) {
        $quality_variant = new Quality_variant();

        $quality_variant->get_by_category_attribute_id($category_attribute_id);

        $result = false;

        foreach ($quality_variant as $key => $m) {

            $quality_variant_lang = new Quality_variant_language();

            $result[$key] = $m->to_array();

            $result[$key]['lang'] = $quality_variant_lang->get_quality_variant_language($m->id);

        }

        return $result;
    }

    public function delete_quality_variant($category_attribute_id = false) {
        if (self::$ci->access->check_access(__FUNCTION__) == false)
            return 403;
        
        $quality_variant = new Quality_variant();

        if ($category_attribute_id)
            $quality_variant->get_by_category_attribute_id($category_attribute_id);
        else
            $quality_variant->get_by_id(self::$ci->input->post('id'));

        foreach ($quality_variant as $c_a) {
            $quality_variant_lang = new Quality_variant_language();
            $quality_variant_lang->delete_quality_variant_language($c_a->id);
        }

        return $quality_variant->delete_all();
    }

}

?>