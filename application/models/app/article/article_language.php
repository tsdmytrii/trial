<?php

class Article_language extends DataMapper {

    public $table = 'article_languages';
    public $has_one = array('article');
    public static $ci;
    public $validation = array(
        array(
            'field' => 'description',
            'label' => 'Description',
            'rules' => array('trim', 'max_length' => 2000),
        ),
        array(
            'field' => 'description_btm',
            'label' => 'Description bottom',
            'rules' => array('trim', 'max_length' => 4000),
        ),
        array(
            'field' => 'key_words',
            'label' => 'Key words',
            'rules' => array('trim', 'max_length' => 1000),
        ),
        array(
            'field' => 'seo_description',
            'label' => 'Seo description',
            'rules' => array('trim', 'max_length' => 4000),
        ),
        array(
            'field' => 'seo_title',
            'label' => 'Seo description',
            'rules' => array('trim', 'max_length' => 4000),
        )
    );

    function __construct() {
        parent::__construct();
        if (empty(self::$ci)) {
            self::$ci = &get_instance();
        }
        self::$ci->load->model(array('core/lang_model'));
    }

    public function set_article_lang() {
        if (self::$ci->access->check_access(__FUNCTION__)) {
            $article_lang = new Article_language();

            if (self::$ci->input->post('article_lang_id') !== '')
                $article_lang->id = self::$ci->input->post('article_lang_id');

            $link_id = false;

            if (self::$ci->input->post('link')) {

                $menu_item = new Menu_item();

                $link = new Link();

                $link_id = $link->set_article_link($menu_item->get_menu_item_id(self::$ci->input->post('article_id'), self::$ci->input->post('component_type_id')), self::$ci->input->post('article_id'), self::$ci->input->post('component_type_id'));

            }

            $article_lang->language_id = self::$ci->input->post('language_id');
            $article_lang->article_id = self::$ci->input->post('article_id');
            $article_lang->description = self::$ci->input->post('description');
            $article_lang->description_btm = self::$ci->input->post('description_btm');
            $article_lang->description_search = strip_tags(self::$ci->input->post('description')) . ' ' . strip_tags(self::$ci->input->post('description_btm'));

            $article_lang->seo_description = self::$ci->input->post('seo_description');
            $article_lang->seo_title = self::$ci->input->post('seo_title');
            $article_lang->key_words = self::$ci->input->post('key_words');

            if ($article_lang->save())
                return array('article_lang_id' => $article_lang->id, 'link_id' => $link_id);
            else
                return false;
        }
        else
            return 403;
    }

    public function get_article_lang($article_id) {

        $article_lang = new Article_language();

        $article_lang->get_by_article_id($article_id);

        $lang = FALSE;

        foreach ($article_lang as $c_l) {
            switch ($c_l->language_id):
                case 1:
                    $lang['en'] = $c_l->to_array();
                    break;
                case 2:
                    $lang['ru'] = $c_l->to_array();
                    break;
                case 3:
                    $lang['ua'] = $c_l->to_array();
                    break;
            endswitch;
        }


        return $lang;
    }

    public function delete_article_lang($article_lang_id) {
        $article_lang = new Article_language();

        $article_lang->get_by_article_id($article_lang_id);

        $article_lang->delete_all();
    }

}

?>
