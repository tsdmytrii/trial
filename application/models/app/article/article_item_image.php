<?php

class Article_item_image extends DataMapper {

    public $table = 'article_item_images';
    public $has_one = array('article_item');
    public static $directory = './uploads/images';
    public static $ci;
    public $validation = array(
        array(
            'field' => 'id',
            'label' => 'id',
            'rules' => array('trim', 'numeric', 'max_length' => 8)
        ),
        array(
            'field' => 'article_item_id',
            'label' => 'id',
            'rules' => array('trim', 'numeric', 'max_length' => 8)
        ),
        array(
            'field' => 'name',
            'label' => 'Logo name',
            'rules' => array('trim', 'min_length' => 3, 'max_length' => 100),
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
        $article_image = new Article_item_image();

        $check_img = new Article_item_image();

        $article_item_id = self::$ci->input->post('id');

        $array = array('article_item_id' => $article_item_id);

        $check_img->get_where($array);

        if ($check_img->id) {
            $check_img->delete_img($article_item_id, $check_img->id);
        }

        $result_image = Image::upload_tmp_image(self::$directory, '', 'Filedata');
        $article_image->name = $result_image['filename'];
        $article_image->article_item_id = $article_item_id;

        $article_image->save();

        return $article_image->to_array();
    }

    public function get_img($a_i_id = false) {
        $article_image = new Article_item_image();

        $article_item_id = self::$ci->input->post('article_item_id') ? self::$ci->input->post('article_item_id') : $a_i_id;

        $article_image->get_by_article_item_id($article_item_id);

        $result = $article_image->to_array();

        if ($article_image->id == null) {
            $result = false;
        }

        return $result;
    }

    public function delete_img($article_item_id = false, $img_id = false) {
        $article_image = new Article_item_image();

        $image_id = self::$ci->input->post('id') ? self::$ci->input->post('id') : $img_id;

        if ($image_id) {

            $article_image->get_by_id($image_id);

            Image::unlink_image(self::$directory . '/' . $article_image->name);

            $article_image->delete();

            return array('img_id' => $image_id);
        } else {
            $article_image->get_by_article_item_id($article_item_id);

            foreach ($article_image as $c) {
                Image::unlink_image(self::$directory . '/' . $c->name);
            }

            $article_image->delete_all();
        }
    }

}

?>
