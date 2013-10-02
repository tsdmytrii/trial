<?php

class Unit extends DataMapper {

    public $table = 'units';
    public $has_many = array('unit_language', 'product');
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

    public function set_unit() {

        if (self::$ci->access->check_access(__FUNCTION__) == false)
            return 403;

        $unit = new Unit();

        if (self::$ci->input->post('unit_id'))
            $unit->get_by_id(self::$ci->input->post('unit_id'));

        $unit->date = date('d-m-Y H:i:s');
        $unit->position = self::$ci->input->post('position');

        $unit_lang = new Unit_language();

        if ($unit->save()) {

            $unit_lang_id = $unit_lang->set_unit_lang($unit->id);

            if ($unit_lang_id)
                return array('unit_id' => $unit->id, 'unit_lang_id' => $unit_lang_id);
            else
                return false;
        } else
            return false;
    }

    /*
     * Get functions
     */

    public function get_unit($unit_id = false, $short = false) {
        if (self::$ci->access->check_access(__FUNCTION__) == false)
            return 403;

        $unit_id = self::$ci->input->post('unit_id') ? self::$ci->input->post('unit_id') : $unit_id;

        $unit = new Unit();
        $unit->get_by_id($unit_id);

        $unit_lang = new Unit_language();

        $result = $unit->to_array();
        $result['lang'] = $unit_lang->get_unit_language($unit_id);

        return $result;
    }

    public function get_all_units($category_id = false) {

        if (self::$ci->access->check_access(__FUNCTION__) == false)
            return 403;

        $unit = new Unit();

        $unit->order_by('position')->get();

        $result = false;

        foreach ($unit as $key => $p) {
            $unit_lang = new Unit_language();

            $result[$key] = $p->to_array();

            $result[$key]['lang'] = $unit_lang->get_unit_language($p->id);

        }

        return $result;
    }

    /*
     * Delete Functions
     */

    public function delete_unit($comp_id = false) {

        if (self::$ci->access->check_access(__FUNCTION__) == false)
            return 403;

        $unit_id = self::$ci->input->post('unit_id') ? self::$ci->input->post('unit_id') : $comp_id;

        $unit = new Unit();

        $unit->get_by_id($unit_id);

        $product = new Product();

        $product->get_by_related($unit);

        if ($product->exists()) {

            foreach ($product as $p) {

                $p->unit_id = 0;

                $p->save();

            }

        }

        $unit_lang = new Unit_language();
        $unit_lang->delete_unit_lang($unit_id);

        $unit->delete();

        return array('unit_id' => $unit_id);
    }


    /*
     * ---------------------------------USER------------------------------------
     */

}

?>