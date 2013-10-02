<?php

class Article_item_language extends DataMapper {

    public $table = 'article_item_languages';
    public $has_one = array('article_item');
    public static $ci;
    public $validation = array(
        array(
            'field' => 'title',
            'label' => 'Title',
            'rules' => array('required', 'trim', 'min_length' => 5, 'max_length' => 500),
        ),
        array(
            'field' => 'author',
            'label' => 'Author',
            'rules' => array('required', 'trim', 'min_length' => 5, 'max_length' => 100),
        ),
        array(
            'field' => 'description',
            'label' => 'Description',
            'rules' => array('required', 'trim', 'min_length' => 5, 'max_length' => 12000),
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
            'label' => 'Seo title',
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

    public function set_article_item_lang($article_item_id) {

        $article_item_lang = new Article_item_language();

        if (self::$ci->input->post('article_lang_id') !== '')
            $article_item_lang->id = self::$ci->input->post('article_lang_id');

        $article_item_lang->language_id = self::$ci->input->post('language_id');
        $article_item_lang->article_item_id = $article_item_id;
        $article_item_lang->title = self::$ci->input->post('title');
        $article_item_lang->author = self::$ci->input->post('author');
        $article_item_lang->description = self::$ci->input->post('description');
        $article_item_lang->description_search = strip_tags(self::$ci->input->post('description'));
        $article_item_lang->seo_description = self::$ci->input->post('seo_description');
        $article_item_lang->seo_title = self::$ci->input->post('seo_title');
        $article_item_lang->key_words = self::$ci->input->post('key_words');

        if ($article_item_lang->save())
            return $article_item_lang->id;
        else
            return false;
    }

    public function get_article_item_lang($article_item_id, $strip_tags = false) {

        $article_item_lang = new Article_item_language();

        $article_item_lang->get_by_article_item_id($article_item_id);

        $lang = FALSE;

        if ($strip_tags) {
            foreach ($article_item_lang as $c_l) {
                switch ($c_l->language_id):
                    case 1:
                        $buf_lang = $c_l->to_array();
                        $buf_lang['description'] = strip_tags($buf_lang['description']);
                        $buf_lang['description'] = trim($buf_lang['description']);
                        $buf_lang['description'] = str_replace('&nbsp;', '', $buf_lang['description']);
                        $lang['en'] = $buf_lang;
                        break;
                    case 2:
                        $buf_lang = $c_l->to_array();
                        $buf_lang['description'] = strip_tags($buf_lang['description']);
                        $lang['ru'] = $buf_lang;
                        break;
                    case 3:
                        $buf_lang = $c_l->to_array();
                        $buf_lang['description'] = strip_tags($buf_lang['description']);
                        $lang['ua'] = $buf_lang;
                        break;
                endswitch;
            }
        } else {
            foreach ($article_item_lang as $c_l) {
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
        }

        return $lang;
    }

    public function delete_article_item_lang($article_item_lang_id) {
        $article_item_lang = new Article_item_language();

        $article_item_lang->get_by_article_item_id($article_item_lang_id);

        $article_item_lang->delete_all();
    }

}

?>
