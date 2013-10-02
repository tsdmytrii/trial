<?php

class Marking extends DataMapper {

    public $table = 'markings';
    public static $ci;
    public $validation = array(
        array(
            'field' => 'id',
            'label' => 'id',
            'rules' => array('trim', 'numeric', 'max_length' => 5),
        ),
        array(
            'field' => 'min_width',
            'label' => 'Min width',
            'rules' => array('required', 'trim', 'max_length' => 11),
        ),
        array(
            'field' => 'max_width',
            'label' => 'Max width',
            'rules' => array('required', 'trim', 'max_length' => 11),
        ),
        array(
            'field' => 'width',
            'label' => 'width',
            'rules' => array('required', 'trim', 'max_length' => 11),
        ),
        array(
            'field' => 'height',
            'label' => 'height',
            'rules' => array('required', 'trim', 'max_length' => 11),
        ),
        array(
            'field' => 'min_font_size',
            'label' => 'Min font size',
            'rules' => array('required', 'trim', 'max_length' => 11),
        )
    );

    function __construct($id = NULL) {
        parent::__construct($id);
        if (empty(self::$ci)) {
            self::$ci = &get_instance();
        }
        self::$ci->load->library(array('plugins/image'));
    }

    public function set_from_default() {
        return 0;
    }

    public function set_marking() {
        if (self::$ci->access->check_access(__FUNCTION__) == false)
            return 403;

        $marking = new Marking();

        if (self::$ci->input->post('id'))
            $marking->get_by_id(self::$ci->input->post('id'));

        $marking->min_width = self::$ci->input->post('min_width');
        $marking->max_width = self::$ci->input->post('max_width');
        $marking->width = self::$ci->input->post('width');
        $marking->height = self::$ci->input->post('height');
        $marking->min_font_size = self::$ci->input->post('min_font_size');

        return $marking->save();
    }

    public function get_marking() {
        if (self::$ci->access->check_access(__FUNCTION__) == false)
            return 403;
        
        $marking = new Marking();

        $marking->get();

        if ($marking->id)
            return $marking->to_array();
        else
            return false;
    }

}

?>