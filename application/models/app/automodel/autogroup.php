<?php

class Autogroup extends DataMapper {

    public $table = 'autogroups';
    public $has_many = array('automodel');
    public static $ci;
    public $validation = array(
        array(
            'field' => 'id',
            'label' => 'id',
            'rules' => array('trim', 'numeric', 'max_length' => 11),
        ),
        array(
            'field' => 'name',
            'label' => 'Name',
            'rules' => array('trim', 'required', 'min_length' => 2, 'max_length' => 200),
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

    public function set_autogroup() {
        if (self::$ci->access->check_access(__FUNCTION__) == false)
            return 403;

        $autogroup = new Autogroup();

        if (self::$ci->input->post('autogroup_id'))
            $autogroup->get_by_id(self::$ci->input->post('autogroup_id'));

        $autogroup->name = self::$ci->input->post('name');
        $autogroup->date = date('d-m-Y H:i:s');

        if ($autogroup->save()) {

            if (self::$ci->input->post('automodel_id')) {
                $automodel = new Automodel();
                foreach (self::$ci->input->post('automodel_id') as $key => $val) {
                    if ($val) {
                        $automodel->get_by_id($val);
                        $automodel->save($autogroup);
                    }
                }
            }

            return $autogroup->to_array();

        } else
            return false;

    }

    public function get_autogroup($automodel_id = false) {
        if (self::$ci->access->check_access(__FUNCTION__) == false)
            return 403;

        $automodel_id = self::$ci->input->post('id') ? self::$ci->input->post('id') : $automodel_id;

        $automodel = new Automodel();
        $automodel->get_by_id($automodel_id);

        $result = false;

        $autogroup = new Autogroup();
        $autogroup->get_by_related($automodel);

        if ($autogroup->id) {

            $result = $autogroup->to_array();

            $automodel->get_by_related($autogroup);

            $result['automodel'] = false;

            foreach ($automodel as $key => $a) {

                $automodelWithLang = new Automodel();
                $result['automodel'][$key] = $automodelWithLang->get_automodel($a->id, true);

            }

        }

        return $result;
    }

    public function delete_autogroup($autogroup_id = false) {

        if (self::$ci->access->check_access(__FUNCTION__) == false)
            return 403;

        $autogroup_id = self::$ci->input->post('autogroup_id') ? self::$ci->input->post('autogroup_id') : $autogroup_id;

        $autogroup = new Autogroup();

        $autogroup->get_by_id($autogroup_id);

        $automodel = new Automodel();

        $automodel->get_by_related($autogroup);

        $automodel->delete($autogroup);

        return $autogroup->delete();
    }

    public function delete_automodel_from_group() {

        if (self::$ci->access->check_access(__FUNCTION__) == false)
            return 403;

        $autogroup_id = self::$ci->input->post('autogroup_id');
        $automodel_id = self::$ci->input->post('automodel_id');

        $autogroup = new Autogroup();
        $autogroup->get_by_id($autogroup_id);

        $automodel = new Automodel();
        $automodel->get_by_id($automodel_id);

        return $automodel->delete($autogroup);
    }

    /*
     * ---------------------------------USER------------------------------------
     */
}

?>