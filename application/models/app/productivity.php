<?php

class Productivity extends DataMapper {

    public $table = 'productivities';
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

    public function set_productivity() {

        $productivity = new Productivity();

        if (self::$ci->input->post('id')) {
            $productivity->id = self::$ci->input->post('id');
        }

        $productivity->date_time = self::$ci->input->post('date_time');
        $productivity->base_classes = self::$ci->input->post('base_classes');
        $productivity->method_name = self::$ci->input->post('method_name');
        $productivity->controller = self::$ci->input->post('controller');
        $productivity->total = self::$ci->input->post('total');
        $productivity->bencmarks = self::$ci->input->post('bencmarks');
        $productivity->query_time = self::$ci->input->post('query_time');
        $productivity->query_quant = self::$ci->input->post('query_quant');
        $productivity->query_quant = self::$ci->input->post('query_quant');
        $productivity->memory_usage = self::$ci->input->post('memory_usage');
        $productivity->files = self::$ci->input->post('files');

        if ($productivity->save())
            return $productivity->to_array();
        else
            return false;
    }

    public function get_productivity() {
        $productivity = new Productivity();
        $productivity->get();
        return $productivity->all_to_array();
    }

    public function delete_productivity() {
        $productivity_id = self::$ci->input->post('productivity_id');

        $productivity = new Productivity();
        $productivity->id = $productivity_id;

        $productivity->delete();

        return array('productivity_id' => $productivity_id);
    }

    public function delete_all_productivity() {
        $productivity_id = self::$ci->input->post('productivity_id');

        $productivity = new Productivity();
        $productivity->id = $productivity_id;

        $productivity->delete();

        return array('productivity_id' => $productivity_id);
    }

}

?>