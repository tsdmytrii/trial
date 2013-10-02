<?php

class Article_controller extends MY_Controller {

    function __construct() {
        parent::__construct();
        $this->load->helper(array('form', 'url'));
        $this->load->library(array('form_validation', 'plugins/ion_auth'));
//        $this->session->set_userdata('lang', 2);
//        $this->load->library('console');
//        $this->output->enable_profiler(TRUE);

        $this->load->driver('cache');
    }

    public function get_article_list($article_id = 1, $menu_item_id = 1, $main = 0, $lang_id = 2) {
        $article = new Article();

        $static_link = 'article/' . $article_id . '/' . $menu_item_id . '/' . $main . '/' . $lang_id;

        $main = $this->check_user_agent() ? $this->check_user_agent() : $main;

        $result['data'] = $data = $article->get_all_displayed_article($article_id, true, $menu_item_id);

        $lang = $this->get_lang_by_id($lang_id);

        $title = '';

        if (isset($result['data']['menu_item']['lang'][$lang]['value'])) {
            $title = $result['data']['menu_item']['lang'][$lang]['value'];
        }

        $this->check_link($data, $result, 'articles', $menu_item_id, $main, $lang_id, $static_link, $title);

    }

    public function get_article($article_item_id = false, $menu_item_id = false, $main = 0, $lang_id = 2) {

        $article = new Article_item();

        $static_link = 'articleitem/' . $article_item_id . '/' . $menu_item_id . '/' . $main . '/' . $lang_id;

        $main = $this->check_user_agent() ? $this->check_user_agent() : $main;

        $result['data'] = $data = $article->get_article_item_for_user($article_item_id);

        $lang = $this->get_lang_by_id($lang_id);

        $title = $data['lang'][$lang]['title'];

        $this->check_link($data, $result, 'article', $menu_item_id, $main, $lang_id, $static_link, $title);

    }


}

?>
