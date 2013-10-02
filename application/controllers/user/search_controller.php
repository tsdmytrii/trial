<?php

class Search_controller extends MY_Controller {

    function __construct() {
        parent::__construct();
//        $this->load->helper(array('form', 'url'));
        $this->search_data = array();
        $this->search_components = array(1, 7, 13, 26);

        $this->load->helper(array('form', 'url'));
        $this->load->library(array('form_validation'));

    }


    public function search(){
        if (intval($this->input->post('components')) != 0) {

            $this->search_components = $this->input->post('components');

        }

        foreach ($this->search_components as $component) {
            switch (intval($component)) {
                case 1:
                    $static_comp = new Static_component();
                    $this->prepare_data($static_comp->search());
                    break;
                case 7:
                    $article = new Article();
                    $this->prepare_data($article->search());
                    break;
                case 13:
                    $article_item = new Article_item();
                    $this->prepare_data($article_item->search());
                    break;
                case 26:
                    $automodel = new Automodel();
                    $this->prepare_data($automodel->search());
                    break;
            }
        }

        $this->return_result($this->search_data);
    }


    function start_search($lang_id) {

        $_POST['lang_id'] = $lang_id;

        $main = 0;

        $menu_item_id = 0;

        $static_link = 'search/0';

        if ($this->input->post('all_site') || $this->input->post('article'))
            $result['data']['article_list'] = $this->search(false);
        else
            $result['data']['article_list'] = $this->init_search(false);

        $result['data']['search'] = true;

        $result['data']['search_str'] = $this->input->post('search_str');

        $this->is_ajax_request($result, 'search', $menu_item_id, $main, $lang_id, $static_link);

    }

    function init_search($param = true) {
        $article_item = new Article_item();

        $article_item_result = $article_item->init_search();
        $this->prepare_data($article_item_result);

        $static_comp = new Static_component();
        $static_result = $static_comp->search();

        $this->prepare_data($static_result);

        $article = new Article();
        $article_result = $article->search();

        $this->prepare_data($article_result);

        $calendar = new Calendar();
        $calendar_result = $calendar->search();

        $this->prepare_data($calendar_result);

        $contract = new Contract_language();
        $contract_result = $contract->search();

        $this->prepare_data($contract_result);

        $static_comp_form = new Static_component_form();
        $static_comp_form_result = $static_comp_form->search();

        $this->prepare_data($static_comp_form_result);

        $news_online_seo = new News_online_seo_language();
        $news_online_seo_result = $news_online_seo->search();

        $this->prepare_data($news_online_seo_result);

        if ($param)
            $this->return_result($this->search_data);
        else
            return $this->search_data;
    }

//    function search($param = true) {
//        $article_item = new Article_item();
//        $static_comp = new Static_component();
//        $static_comp_form = new Static_component_form();
//        $article = new Article();
//        $calendar = new Calendar();
//        $contract = new Contract_language();
//        $news_online_seo = new News_online_seo_language();
//
//        $article_item_result = $article_item->search();
//        if ($article_item_result) {
//            $this->prepare_data($article_item_result);
//        }
//
//        if ($this->input->post('all_site') == 1) {
//            $static_result = $static_comp->search();
//            $this->prepare_data($static_result);
//
//            $static_comp_form_result = $static_comp_form->search();
//            $this->prepare_data($static_comp_form_result);
//
//            $article_result = $article->search();
//            $this->prepare_data($article_result);
//
//            $calendar_result = $calendar->search();
//            $this->prepare_data($calendar_result);
//
//            $contract_result = $contract->search();
//            $this->prepare_data($contract_result);
//
//            $news_online_seo_result = $news_online_seo->search();
//            $this->prepare_data($news_online_seo_result);
//
//        }
//
//        if ($param)
//            $this->return_result($this->search_data);
//        else
//            return $this->search_data;
//    }

    function prepare_data($data) {
        if (!empty($data) && $data !== false) {
            $this->search_data = array_merge($this->search_data, $data);
        }
    }

}

?>
