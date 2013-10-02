<?php

class Banner extends DataMapper {

    public $table = 'banners';
    public $has_many = array('banner_language', 'banner_image');
    public static $ci;
    public $validation = array(
        array(
            'field' => 'id',
            'label' => 'id',
            'rules' => array('trim', 'numeric', 'max_length' => 5),
        ),
        array(
            'field' => 'top',
            'label' => 'Top',
            'rules' => array('trim', 'max_length' => 5),
        ),
        array(
            'field' => 'left',
            'label' => 'left',
            'rules' => array('trim', 'max_length' => 5),
        ),
        array(
            'field' => 'width',
            'label' => 'width',
            'rules' => array('trim', 'max_length' => 5),
        ),
        array(
            'field' => 'height',
            'label' => 'height',
            'rules' => array('trim', 'max_length' => 5),
        )
    );

    function __construct($id = NULL) {
        parent::__construct($id);
        if (empty(self::$ci)) {
            self::$ci = &get_instance();
        }
    }

    public function set_from_default() {
        return 0;
    }

    public function set_banner() {
        $banner = new Banner();

        if (self::$ci->input->post('id')) {
            $banner->id = self::$ci->input->post('id');
        }

        $banner->display = self::$ci->input->post('display') ? self::$ci->input->post('display') : 0;
        $banner->position = self::$ci->input->post('position');
        $banner->date = date('d-m-Y H:i:s');
        $banner->top = self::$ci->input->post('top');
        $banner->left = self::$ci->input->post('left');
        $banner->width = self::$ci->input->post('width');
        $banner->height = self::$ci->input->post('height');

        $banner_lang = new Banner_language();

        $result = false;

        if ($banner->save()){
            if ($banner_lang->set_banner_lang($banner->id))
                $result = $banner->id;
        }

        return $result;
    }

    public function get_banner($ban_id = false) {
        $banner_id = self::$ci->input->post('banner_id') ? self::$ci->input->post('banner_id') : $ban_id;

        $banner = new Banner();

        if ($banner_id) {

            $banner->get_by_id($banner_id);

            $banner_lang = new Banner_language();

            $banner_img = new Banner_image();

            $result = $banner->to_array();
            $result['lang'] = $banner_lang->get_banner_lang($banner_id);
            $result['img'] = $banner_img->get_img($banner_id);

        } else {

            $banner->get();

            $result = false;

            foreach ($banner as $key => $b) {
                $banner_lang = new Banner_language();

                $banner_img = new Banner_image();

                $result[$key] = $b->to_array();
                $result[$key]['lang'] = $banner_lang->get_banner_lang($b->id);
                $result[$key]['img'] = $banner_img->get_img($b->id);
            }
        }

        return $result;
    }

    public function get_displayed_banners($type = 0) {
        $banner = new Banner();

        $where = array('display' => 1);

        $banner->where($where)->get();

        $result = false;

        foreach ($banner as $b) {
            $ban = new Banner();

            $result[] = $ban->get_banner($b->id, true);
        }

        return $result;
    }

    public function delete_banner($banner_id = false) {

        $banner_id = self::$ci->input->post('banner_id') ? self::$ci->input->post('banner_id') : $banner_id;

        $banner = new Banner();

        $banner->get_by_id($banner_id);

        $banner_image = new Banner_image();

        $banner_image->delete_img($banner_id);

        $banner_lang = new Banner_language();

        $banner_lang->delete_banner_lang($banner_id);

        $banner->delete();

        return array('banner_id' => $banner_id);
    }

}

?>