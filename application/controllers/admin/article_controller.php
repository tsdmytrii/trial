<?php

class Article_controller extends MY_Controller {

    function __construct() {
        parent::__construct();
        $this->load->helper(array('form', 'url'));
        $this->load->library(array('form_validation', 'upload', 'plugins/image'));
        $this->session->set_userdata('lang', 2);
    }

    public function get_article_seo (){

        $article = new Article();

        $this->return_result($article->get_article_seo());

    }

    public function set_article_seo (){

        $article = new Article_language();

        $this->return_result($article->set_article_lang());

    }

    public function get_article(){
        $article = new Article_item();

        $this->return_result($article->get_article_item());
    }

    public function set_article(){
        $article = new Article_item();

        $this->return_result($article->set_article_item());
    }

    public function set_article_language(){
        $article = new Article_language();

        $this->return_result($article->set_article_lang());
    }

    public function get_all_article(){
        $article = new Article_item();

        $this->return_result($article->get_all_articles());
    }

    public function delete_article(){
        $article = new Article_item();

        $this->return_result($article->delete_article_item());
    }

}

?>
