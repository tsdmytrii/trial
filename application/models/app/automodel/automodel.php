<?php

class Automodel extends DataMapper {

    public $table = 'automodels';
    public $has_one = array('autobrend');
    public $has_many = array('automodel_language', 'automodel_logo', 'automodel_photo', 'link', 'autogroup');
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
            'rules' => array('trim', 'min_length' => 2, 'max_length' => 20),
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

    public function set_automodel() {
        if (self::$ci->access->check_access(__FUNCTION__) == false)
            return 403;

        $automodel = new Automodel();

        if (self::$ci->input->post('automodel_id'))
            $automodel->get_by_id(self::$ci->input->post('automodel_id'));

        $automodel->autobrend_id = self::$ci->input->post('autobrend_id');
        $automodel->main = self::$ci->input->post('main') ? self::$ci->input->post('main') : 0;
        $automodel->price = self::$ci->input->post('price');
        $automodel->date = date('d-m-Y H:i:s');

        $automodel_lang = new Automodel_language();

        if ($automodel->save()) {

            $link = new Link();
            $link->set_automodel_link($automodel->id, 29, $automodel->main);

            if ($automodel_lang->set_automodel_lang($automodel->id))
                return $automodel->id;
        } else
            return false;
    }

    public function get_automodel($automodel_id = false, $short = false) {
        if (self::$ci->access->check_access(__FUNCTION__) == false)
            return 403;

        $automodel_id = self::$ci->input->post('automodel_id') ? self::$ci->input->post('automodel_id') : $automodel_id;

        $automodel = new Automodel();
        $automodel->get_by_id($automodel_id);

        $automodel_lang = new Automodel_language();

        $result = $automodel->to_array();
        $result['lang'] = $automodel_lang->get_automodel_lang($automodel_id);

        if ($short == false) {
            $automodel_logo = new Automodel_logo();
            $result['logo'] = $automodel_logo->get_img($automodel_id);

            $automodel_photo = new Automodel_photo();
            $result['photo'] = $automodel_photo->get_img($automodel_id);

            $autogroup = new Autogroup();
            $result['autogroup'] = $autogroup->get_autogroup($automodel_id);

            $link = new Link();
            $result['link'] = $link->get_automodel_link($automodel_id, 2, true);
        }

        return $result;
    }

    public function get_all_automodels($ab_id = false) {

        if (self::$ci->access->check_access(__FUNCTION__) == false)
            return 403;

        $autobrend_id = self::$ci->input->post('autobrend_id') ? self::$ci->input->post('autobrend_id') : $ab_id;

        $automodel = new Automodel();
        $automodel->get_by_autobrend_id($autobrend_id);

        $result = false;

        foreach ($automodel as $key => $a) {
            $automodel_lang = new Automodel_language();

            $result[$key] = $a->to_array();

            $automodel_lang_arr = $automodel_lang->where(array('automodel_id' => $a->id, 'language_id' => 2))->get()->to_array(array('name', 'description'));

            $automodel_lang_arr['description'] = strip_tags($automodel_lang_arr['description']);

            $result[$key]['lang'] = $automodel_lang_arr;
        }

        return $result;
    }

    public function delete_automodel($comp_id = false) {

        if (self::$ci->access->check_access(__FUNCTION__) == false)
            return 403;

        $component_id = self::$ci->input->post('automodel_id') ? self::$ci->input->post('automodel_id') : $comp_id;

        $automodel = new Automodel();

        $automodel->get_by_id($component_id);

        $automodel_lang = new Automodel_language();
        $automodel_lang->delete_automodel_lang($component_id);

        $automodel_logo = new Automodel_logo();
        $automodel_logo->delete_img($component_id);

        $automodel_photo = new Automodel_photo();
        $automodel_photo->delete_img($component_id);

        $complectation = new Complectation();
        $complectation->get_by_automodel_id($component_id);

        foreach ($complectation as $c) {
            $complectation_delete = new Complectation;
            $complectation_delete->delete_component_content($c->id);
        }

        $characteristic = new Characteristic();
        $characteristic->get_by_automodel_id($component_id);

        foreach ($characteristic as $c) {
            $characteristic_delete = new Characteristic;
            $characteristic_delete->delete_component_content($c->id);
        }

        $link = new Link();
        $link->delete_automodel_link($component_id);

        $automodel->delete();

        return array('automodel_id' => $component_id);
    }

    public function automodel_autocomplete() {
        $automodel_language = new Automodel_language();
        $query = self::$ci->input->post('query');

        $automodel_language->like('name', $query)->get();
        foreach ($automodel_language as $a) {
            $suggestions[] = $a->name;
            $data[] = $a->automodel_id;
        }

        return array('query' => $query, 'suggestions' => $suggestions, 'data' => $data);
    }


    /*
     * ---------------------------------USER------------------------------------
     */

    public function get_automodel_by_autobrend($autobrend_id, $lang_id) {
        $automodel = new Automodel();

        $automodel->get_by_autobrend_id($autobrend_id);

        $result = false;

        foreach ($automodel as $key => $a) {

            $am_lang = new Automodel_language();

            $am_logo = new Automodel_logo();

            $am_photo = new Automodel_photo();

            $link = new Link();

            $result[$key] = $a->to_array();

            $where = array('automodel_id' => $a->id, 'language_id' => $lang_id);

            $result[$key]['lang'] = $am_lang->where($where)->get()->to_array(array('name'));

            $result[$key]['logo'] = $am_logo->get_img($a->id);

            $automodel_photo = $am_photo->get_by_automodel_id($a->id)->to_array();

            $result[$key]['photo'] = $automodel_photo['id'] ? $automodel_photo : false;

            $result[$key]['link'] = $link->get_automodel_link($a->id, $lang_id);

            $autogroup = new Autogroup();
            $autogroup->get_by_related($a);

            $quant = 0;

            if ($autogroup->id) {
                $automodel_count = new Automodel();
                $quant = $automodel_count->get_by_related($autogroup)->result_count();

                $result[$key]['related'] = $automodel_count->all_to_array(array('id'));
            }

            $result[$key]['quant'] = $quant;
        }

        return $result;
    }

    public function get_automodel_for_user($automodel_id) {

        $automodel_id = self::$ci->input->post('automodel_id') ? self::$ci->input->post('automodel_id') : $automodel_id;

        $automodel = new Automodel();
        $automodel->get_by_id($automodel_id);

        if (isset($automodel->id)) {

            $am_lang = new Automodel_language();

            $am_logo = new Automodel_logo();

            $am_photo = new Automodel_photo();

            $characteristic = new Characteristic();

            $complectation = new Complectation();

            $result = $automodel->to_array();

            $result['lang'] = $am_lang->get_automodel_lang($automodel_id);

            $result['logo'] = $am_logo->get_img($automodel_id);

            $result['photo'] = $am_photo->get_img($automodel_id);

            $result['characteristic'] = $characteristic->get_all_characteristics($automodel->id);

            $result['complectation'] = $complectation->get_all_complectations($automodel->id);

            return $result;
        } else {
            return false;
        }
    }

    public function get_automodel_description($automodel_id, $lang_id) {
        $shortFormat = self::$ci->input->is_ajax_request();

        $automodel_lang = new Automodel_language();

        $where = array('automodel_id' => $automodel_id, 'language_id' => $lang_id);

        $automodel_lang->where($where)->get();

        $result = false;

        if ($shortFormat)
            $result = $automodel_lang->to_array(array('name', 'description'));
        else
            $result = $automodel_lang->to_array();

        $am_photo = new Automodel_photo();
        $result['photo'] = $am_photo->get_img($automodel_id);

        return $result;
    }

    public function get_automodel_characteristic($automodel_id, $lang_id) {

        $automodel = new Automodel();
        $automodel->get_by_id($automodel_id);

        if (isset($automodel->id)) {

            $automodel_lang = new Automodel_language();

            $characteristic = new Characteristic();

            $complectation = new Complectation();

            $result = $automodel_lang->get_by_automodel_id()->to_array(array('name'));

            $result['characteristic'] = $characteristic->get_all_characteristics($automodel->id);

            $result['complectation'] = $complectation->get_all_complectations($automodel->id);

            return $result;
        } else {
            return false;
        }
    }

    public function search() {

        $automodel_lang = new Automodel_language();

        $search_str = self::$ci->input->post('searchStr');
        $search_str = str_replace('«', '&laquo;', $search_str);
        $search_str = str_replace('»', '&raquo;', $search_str);
        $search_str = str_replace('–', '&ndash;', $search_str);

        $automodel_lang->
                like('name', $search_str)->
                or_like('description_search', $search_str)->
                where(array('language_id' => self::$ci->input->post('lang_id')))->
                group_by('id')->
                get();

        $result = false;

        foreach ($automodel_lang as $a) {

            $automodel = new Automodel();
            $automodel->get_by_id($a->automodel_id);

            $bufer = $a->to_array(array('id', 'automodel_id', 'name', 'description'));
            $bufer['id'] = $bufer['automodel_id'];
            $bufer['description'] = strip_tags($bufer['description']);
            $bufer['title'] = $bufer['name'];
            $bufer['main'] = 0;
            $bufer['href'] = 'automodel/'.$bufer['id'].'/'.$automodel->autobrend_id;

            $automodel_link = new Link();

            $bufer['link'] = $automodel_link->get_automodel_link($bufer['id']);

            $result[] = $bufer;
        }

        return $result;

    }
}

?>