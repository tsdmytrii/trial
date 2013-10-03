<?php

class Autobrend_autologo extends DataMapper {

    public $table = 'autobrend_autologoes';
    public $has_one = array('autobrend');
    public static $directory = './uploads/images';
    public static $ci;
    public $validation = array(
        array(
            'field' => 'id',
            'label' => 'id',
            'rules' => array('trim', 'numeric', 'max_length' => 8)
        ),
        array(
            'field' => 'autobrend_id',
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
        $autobrend_autologo = new Autobrend_autologo();

        $check_autobrend_autologo = new Autobrend_autologo();
        $check_autobrend_autologo->get_by_autobrend_id(self::$ci->input->post('autobrend_id'));

        foreach ($check_autobrend_autologo as $c) {
            $this->delete_img('', $c->id);
        }

        $result_image = Image::upload_tmp_image(self::$directory, '', 'Filedata');
        $autobrend_autologo->name = $result_image['filename'];
        $autobrend_autologo->autobrend_id = self::$ci->input->post('autobrend_id');

        $autobrend_autologo->save();

        return $autobrend_autologo->to_array();
    }

    public function get_img($a_id = false) {
        $autobrend_autologo = new Autobrend_autologo();

        $autobrend_id = self::$ci->input->post('autobrend_id') ? self::$ci->input->post('autobrend_id') : $a_id;

        $autobrend_autologo->get_by_autobrend_id($autobrend_id);

        $result = $autobrend_autologo->to_array();

        if ($result['id'] > 0)
            return $result;
        else
            return false;

    }

    public function delete_img($autobrend_id = '', $img_id = false) {
        $autobrend_autologo = new Autobrend_autologo();

        $image_id = self::$ci->input->post('id') ? self::$ci->input->post('id') : $img_id;

        if ($image_id) {

            $autobrend_autologo->get_by_id($image_id);

            Image::unlink_image(self::$directory . '/' . $autobrend_autologo->name);

            $autobrend_autologo->delete();

            return array('img_id' => $image_id);
        } else {
            $autobrend_autologo->get_by_autobrend_id($autobrend_id);

            foreach ($autobrend_autologo as $a) {
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
