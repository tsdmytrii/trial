<?php

class Automodel_logo extends DataMapper {

    public $table = 'automodel_logoes';
    public $has_one = array('automodel');
    public static $directory = './uploads/images';
    public static $ci;
    public $validation = array(
        array(
            'field' => 'id',
            'label' => 'id',
            'rules' => array('trim', 'numeric', 'max_length' => 8)
        ),
        array(
            'field' => 'automodel_id',
            'label' => 'id',
            'rules' => array('trim', 'numeric', 'max_length' => 8)
        ),
        array(
            'field' => 'name',
            'label' => 'Logo name',
            'rules' => array('trim', 'min_length' => 3, 'max_length' => 100)
        )
    );

    function __construct() {
        parent::__construct();
        if (empty(self::$ci)) {
            self::$ci = &get_instance();
        }
        self::$ci->load->library(array('plugins/image'));
    }

    public function set_img() {
        $automodel_logo = new Automodel_logo();

        $check_automodel_logo = new Automodel_logo();
        $check_automodel_logo->get_by_automodel_id(self::$ci->input->post('automodel_id'));

        foreach ($check_automodel_logo as $c) {
            $this->delete_img('', $c->id);
        }

        $result_image = Image::upload_tmp_image(self::$directory, '', 'Filedata');
        $automodel_logo->name = $result_image['filename'];
        $automodel_logo->automodel_id = self::$ci->input->post('automodel_id');

        $automodel_logo->save();

        return $automodel_logo->to_array();
    }

    public function get_img($a_id = false) {
        $automodel_logo = new Automodel_logo();

        $automodel_id = self::$ci->input->post('automodel_id') ? self::$ci->input->post('automodel_id') : $a_id;

        $automodel_logo->get_by_automodel_id($automodel_id);

        $result = $automodel_logo->to_array();

        if ($result['id'] > 0)
            return $result;
        else
            return false;

    }

    public function delete_img($automodel_id = '', $img_id = false) {
        $automodel_logo = new Automodel_logo();

        $image_id = self::$ci->input->post('id') ? self::$ci->input->post('id') : $img_id;

        if ($image_id) {

            $automodel_logo->get_by_id($image_id);

            Image::unlink_image(self::$directory . '/' . $automodel_logo->name);

            $automodel_logo->delete();

            return array('img_id' => $image_id);
        } else {
            $automodel_logo->get_by_automodel_id($automodel_id);

            foreach ($automodel_logo as $a) {
                if ($a->name !== null && $a->name !== '') {
                    Image::unlink_image(self::$directory . '/' . $a->name);
                    $a->delete();
                }
            }

            return true;
        }
    }

}

?>
