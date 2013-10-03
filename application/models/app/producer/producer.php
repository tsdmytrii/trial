<?php

class Producer extends DataMapper {

    public $table = 'producers';
    public $has_many = array('producer_language', 'producer_logo', 'producer_photo', 'product');
    public static $ci;
    public $validation = array(
        array(
            'field' => 'id',
            'label' => 'id',
            'rules' => array('trim', 'numeric', 'max_length' => 11),
        ),
        array(
            'field' => 'date',
            'label' => 'Date',
            'rules' => array('trim', 'min_length' => 2, 'max_length' => 19),
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

    public function set_from_default() {
        return 0;
    }

    public function set_producer() {
        if (self::$ci->access->check_access(__FUNCTION__) == false)
            return 403;

        $producer = new Producer();

        if (self::$ci->input->post('producer_id'))
            $producer->get_by_id(self::$ci->input->post('producer_id'));

        $producer->date = date('d-m-Y H:i:s');

        $producer_lang = new Producer_language();

        if ($producer->save()) {

            if ($producer_lang->set_producer_lang($producer->id))
                return $producer->id;
            else
                return false;
        } else
            return false;
    }

    public function get_producer($producer_id = false, $short = false) {
        if (self::$ci->access->check_access(__FUNCTION__) == false)
            return 403;

        $producer_id = self::$ci->input->post('producer_id') ? self::$ci->input->post('producer_id') : $producer_id;

        $producer = new Producer();
        $producer->get_by_id($producer_id);

        $producer_lang = new Producer_language();

        $result = $producer->to_array();
        $result['lang'] = $producer_lang->get_producer_language($producer_id);

        if ($short == false) {
            $producer_logo = new Producer_logo();
            $result['logo'] = $producer_logo->get_img($producer_id);

            $producer_photo = new Producer_photo();
            $result['photo'] = $producer_photo->get_img($producer_id);
        }

        return $result;
    }

    public function get_all_producers() {

        if (self::$ci->access->check_access(__FUNCTION__) == false)
            return 403;

        $producer = new Producer();
        $producer->get();

        $result = false;

        foreach ($producer as $key => $a) {
            $producer_lang = new Producer_language();

            $result[$key] = $a->to_array();

            $result[$key]['lang'] = $producer_lang->get_producer_language($a->id);
        }

        return $result;
    }

    public function delete_producer($comp_id = false) {

        if (self::$ci->access->check_access(__FUNCTION__) == false)
            return 403;

        $producer_id = self::$ci->input->post('producer_id') ? self::$ci->input->post('producer_id') : $comp_id;

        $producer = new Producer();

        $producer->get_by_id($producer_id);

        $producer_lang = new Producer_language();
        $producer_lang->delete_producer_lang($producer_id);

        $producer_logo = new Producer_logo();
        $producer_logo->delete_img($producer_id);

        $producer_photo = new Producer_photo();
        $producer_photo->delete_img($producer_id);

        $producer->delete();

        return array('producer_id' => $producer_id);
    }

    public function producer_autocomplete() {

        $producer_language = new Producer_language();

        $query = self::$ci->input->post('query');

        $producer_language->like('name', $query)->get();
        foreach ($producer_language as $p) {
            $suggestions[] = $p->name;
            $data[] = $p->producer_id;
        }

        return array('query' => $query, 'suggestions' => $suggestions, 'data' => $data);

    }


    /*
     * ---------------------------------USER------------------------------------
     */

}

?>