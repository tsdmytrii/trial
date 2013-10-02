<?php

class Article_item extends DataMapper {

    public $table = 'article_items';
    public $has_one = array('article');
    public $has_many = array('article_item_language', 'article_item_image', 'link');
    public static $ci;
    public $validation = array(
        array(
            'field' => 'id',
            'label' => 'id',
            'rules' => array('trim', 'numeric', 'max_length' => 5),
        ),
        array(
            'field' => 'menu_item_id',
            'label' => 'Menu item id',
            'rules' => array('trim', 'min_length' => 1, 'max_length' => 11),
        )
    );

    function __construct($id = NULL) {
        parent::__construct($id);
        if (empty(self::$ci)) {
            self::$ci = &get_instance();
        }
        self::$ci->load->library(array('plugins/image'));
    }

    public function set_article_item() {
        if (self::$ci->access->check_access(__FUNCTION__) == false)
            return 403;

        $article_item = new Article_item();

        if (self::$ci->input->post('id')) {
            $article_item->id = self::$ci->input->post('id');
        }

        $component = new Component_type();
        $component->get_by_id(13);

        $main = self::$ci->input->post('main') ? self::$ci->input->post('main') : 0;

        $article_item->article_id = self::$ci->input->post('article_id');
        $article_item->date = self::$ci->input->post('date');
        $article_item->time = self::$ci->input->post('time');
        $article_item->display = self::$ci->input->post('display') ? self::$ci->input->post('display') : 0;
        $article_item->main = $main;
        $article_item->href = $component->name . '/';

        if ($article_item->save()) {
            $link = new Link();

            $article = new Article();
            $article->get_by_id(self::$ci->input->post('article_id'));

            $menu_item = new Menu_item();
            $menu_item->get_by_component_id($article->component_id);

            $menu_item_id = 0;

            foreach ($menu_item as $m_i) {
                if (intval($m_i->default_item) == 1)
                    $menu_item_id = $m_i->id;
            }

            $link_id = $link->set_article_item_link($menu_item_id, $article_item->id, 13, $main);

            $article_item_lang = new Article_item_language();
            $langs = $article_item_lang->set_article_item_lang($article_item->id);

            $result = array('article_item_id' => $article_item->id, 'article_item_lang_id' => $langs, 'link_id' => $link_id);

            return $result;
        }
        else
            return false;
    }

    public function get_all_articles($article_id = false) {

        if (self::$ci->access->check_access(__FUNCTION__) == false)
            return 403;

        $article_id = self::$ci->input->post('article_id') ? self::$ci->input->post('article_id') : $article_id;

        if ($article_id != false) {

            $article_item = new Article_item();

            $article_item->order_by('date', 'desc')->order_by('time', 'desc');

            if (self::$ci->input->post('limit'))
                $article_item->limit(self::$ci->input->post('limit'));

            if (self::$ci->input->post('offset'))
                $article_item->offset(self::$ci->input->post('offset'));

            $article_item->get_by_article_id($article_id);

            $article = false;

            foreach ($article_item as $key => $a) {

                $article_item_lang = new Article_item_language();

                $article[$key] = $a->to_array();

                $article[$key]['lang'] = $article_item_lang->get_article_item_lang($a->id);

            }

            $article_item->clear();

            $result['data'] = $article;
            $result['articleItemQuant'] = $article_item->get_by_article_id($article_id)->result_count();

            return $result;

        } else
             return false;


    }

    public function get_article_item($article_item_id = false, $strip_tags = false) {

        if (self::$ci->access->check_access(__FUNCTION__) == false)
            return 403;

        $article_item_id = self::$ci->input->post('article_item_id') ? self::$ci->input->post('article_item_id') : $article_item_id;

        $article_item = new Article_item();

        $article_item->get_by_id($article_item_id);

        $article_item_lang = new Article_item_language();
        $lang = $article_item_lang->get_article_item_lang($article_item_id, $strip_tags);

        $article_item_img = new Article_item_image();

        $link = new Link();

        $result = $article_item->to_array();
        $result['lang'] = $lang;
        $result['links'] = $link->get_article_item_link($article_item_id);
        $result['img'] = $article_item_img->get_img();

        return $result;
    }

    public function get_article_item_for_user($article_item_id = false, $strip_tags = false) {
        $article_item_id = self::$ci->input->post('article_item_id') ? self::$ci->input->post('article_item_id') : $article_item_id;
        $article_item = new Article_item();
        $article_item->get_by_id($article_item_id);

        $article_item_lang = new Article_item_language();
        $article_item_link = new Link();
        $article_item_img = new Article_item_image();

        $result = $article_item->to_array();
        $result['lang'] = $article_item_lang->get_article_item_lang($article_item_id, $strip_tags);
        $result['link'] = $article_item_link->get_article_link_for_user($article_item_id);
        $result['img'] = $article_item_img->get_img($article_item_id);

        return $result;
    }

    public function delete_article_item($a_i_id = false) {

        if (self::$ci->access->check_access(__FUNCTION__) == false)
            return 403;

        $article_item_id = self::$ci->input->post('article_item_id') ? self::$ci->input->post('article_item_id') : $a_i_id;

        $article_item = new Article_item();

        $article_item->get_by_id($article_item_id);

        $article_item_lang = new Article_item_language();
        $article_item_lang->delete_article_item_lang($article_item_id);

        $link = new Link();
        $link->delete_article_item_link();

        $article_item_image = new Article_item_image();
        $article_item_image->delete_img($article_item_id);

        $article_item->delete();

        return array('article_item_id' => $article_item_id);
    }

    public function delete_article_item_by_article($article_id) {
        $article_item = new Article_item();

        $article_item->get_by_article_id($article_id);

        foreach ($article_item as $a) {
            $a->delete_article_item($a->id);
        }

        return true;
    }

    public function init_search() {
        $article = new Article();
        $article->get();

        $search_str = self::$ci->input->post('search_str');
        $search_str = str_replace('«', '&laquo;', $search_str);
        $search_str = str_replace('»', '&raquo;', $search_str);
        $search_str = str_replace('–', '&ndash;', $search_str);

        $result = false;

        foreach ($article as $a) {

            $article_item = new Article_item();
            $bufer = $article_item->search_func($a->id, $search_str);

            if ($bufer !== false) {

                $menu_item = new Menu_item();

                $where = array('component_id' => $a->component_id, 'default_item' => 1);

                $menu_item->where($where)->get();

                $menu_item_instance = $menu_item->get_menu_item_by_id($menu_item->id);

                foreach ($bufer as $b) {
                    $prepare_result = $b;
                    $prepare_result['menu_item'] = $menu_item_instance;
                    $result[] = $prepare_result;
                }
            }
        }

        return $result;
    }

    public function search() {

        $article_item_lang = new Article_item_language();

        $search_str = self::$ci->input->post('searchStr');
        $search_str = str_replace('«', '&laquo;', $search_str);
        $search_str = str_replace('»', '&raquo;', $search_str);
        $search_str = str_replace('–', '&ndash;', $search_str);

        $article_item_lang->like('title', $search_str)->
                or_like('description_search', $search_str)->
                where(array('language_id' => self::$ci->input->post('lang_id')))->
                group_by('title')->get();

        $result = false;

        foreach ($article_item_lang as $a_i_l) {
            $bufer = $a_i_l->to_array(array('id', 'article_item_id', 'title', 'description'));

            $bufer['id'] = $bufer['article_item_id'];
            $bufer['description'] = strip_tags($bufer['description']);
            $bufer['main'] = 0;
            $bufer['href'] = 'articleitem/' . $bufer['article_item_id'];

            $article_item_link = new Link();

            $bufer['link'] = $article_item_link->get_article_link_for_user($a_i_l->article_item_id);

            $result[] = $bufer;
        }

        return $result;
    }

    public function get_article_items_sitemap() {
        $article_item = new Article_item();

        $article_item->get();

        $result = false;

        foreach ($article_item as $a) {
            $a->article_item_language->get();

            foreach ($a->article_item_language as $l) {
                if ($l->language_id != 3 && $l->language_id != 1) {
                    $a->link->where(array('language_id' => $l->language_id))->get();

                    if (isset($a->link->link)) {
                        $result[] = $a->link->link;
                    } else {

                        $a->article->get();

                        if (isset($a->href) && !empty($a->href)) {
                            $result[] = $a->href . $a->id . '/' . $a->article->menu_item_id . '/' . $a->main . '/' . $l->language_id;
                        }
                    }
                }
            }
        }

        return $result;
    }

    public function get_article_item_by_behavior($article_id, $component_id, $limit) {
        $article_item = new Article_item();

        $where = array('article_id' => $article_id);

        $article_item->where($where)->order_by('date', 'desc')->order_by('time', 'desc')->limit($limit)->get();

        $result = false;

        foreach ($article_item as $key => $a) {

            $article_item_language = new Article_item_language();
            $article_item_link = new Link();
            $menu_item = new Menu_item();

            $where = array('component_id' => $component_id, 'default_item' => 1);
            $menu_item->where($where)->get();
            $menu_item_id = 0;
            if ($menu_item->id)
                $menu_item_id = $menu_item->id;


            $result[$key] = $a->to_array();
            $result[$key]['lang'] = $article_item_language->get_article_item_lang($a->id);
            $result[$key]['link'] = $article_item_link->get_article_link_for_user($a->id);
            $result[$key]['menu_item'] = $menu_item_id;
        }

        return $result;
    }

}

?>