<?php

class Link extends DataMapper {

    public $db_params = 'default';
    public $table = 'links';
    public $has_many = array('menu_item', 'article', 'article_item', 'automodel', 'static_component');
    public static $ci;
    public $validation = array(
    );

    function __construct() {
        parent::__construct();
        if (empty(self::$ci)) {
            self::$ci = &get_instance();
        }
        self::$ci->load->model(array('core/lang_model'));
        $this->sorted_menu_items = array();
    }

    public function set_from_default() {
        return 0;
    }

    /*
     * ---------------------------- Menu items links ---------------------------
     */

    public function set_link($menu_item_id, $component_name, $content_id, $component_id, $main) {

        $menu_item = new Menu_item();
        $menu_item->get_by_id($menu_item_id);

        $check_link = new Link();
        $check_link->get_by_related($menu_item);
        $check_link->delete_all();

        if ($component_id) {
            $component = new Component_type();
            $component->get_by_id($component_id);

            $langs = self::$ci->lang_model->get_langs();
            $links = false;
            foreach ($langs as $lang) {

                $name = self::$ci->input->post('link_' . $lang['iso_code']);
                if ($name !== FALSE AND !empty($name)) {

                    $link = new Link();

                    $link->link = self::$ci->input->post('link_' . $lang['iso_code']);
                    $link->url = $component_name . '/' . $content_id . '/' . $menu_item_id . '/' . $main . '/' . $lang['id'];
                    $link->server_method = $component->server_controller . '/' . $content_id . '/' . $menu_item_id . '/' . $main . '/' . $lang['id'];
                    $link->main = $main;
                    $link->language_id = $lang['id'];

                    $link->save();

                    $link->save($menu_item);

                    $arr = $link->to_array();

                    $links[$lang['iso_code']] = $arr;
                }
            }
            return $links;
        } else {
            return false;
        }
    }

    public function get_link($menu_item_id, $short = false) {
        $menu_item = new Menu_item();

        $menu_item->get_by_id($menu_item_id);

        $link = new Link();

        $link->get_by_related($menu_item);

        $links = FALSE;

        foreach ($link as $l) {
            switch ($l->language_id):
                case 1:
                    $links['en'] = $short == false ? $l->to_array() : $l->to_array(array('url', 'link'));
                    break;
                case 2:
                    $links['ru'] = $short == false ? $l->to_array() : $l->to_array(array('url', 'link'));
                    break;
                case 3:
                    $links['ua'] = $short == false ? $l->to_array() : $l->to_array(array('url', 'link'));
                    break;
            endswitch;
        }
        return $links;
    }

    public function check_link() {
        $link = new Link();

//        $link->get();
//
//        $result = 0;
//
//        foreach ($link as $l) {
//            if ($l->link == self::$ci->input->post('link') && $l->id == self::$ci->input->post('link_id')) {
//                $result = 0;
//            } else if ($l->link == self::$ci->input->post('link') && $l->language_id != self::$ci->input->post('language_id')) {
//                $result = 0;
//            } else {
//                $result = 1;
//            }
//        }

        $link->like('link', self::$ci->input->post('link'))->get();

        $result = 0;

        if ($link->exists()) {

            foreach ($link as $l) {
                if ($l->id == self::$ci->input->post('link_id')) {
                    $result = 0;
                } else if ($l->language_id != self::$ci->input->post('language_id')) {
                    $result = 0;
                } else {
                    $result = 1;
                }
            }
        }

        return $result;
    }

    public function get_component_name($menu_item_id, $language_id) {
        $menu_item = new Menu_item();

        $menu_item->get_by_id($menu_item_id);

        $link = new Link();

        $link->get_by_related($menu_item);

        $component_name = false;

        foreach ($link as $l) {
            if ($l->language_id == $language_id) {
                $component_name = $l->link;
            }
        }


        return $component_name;
    }

    public function delete_link($menu_item_id) {
        $menu_item = new Menu_item();
        $menu_item->get_by_id($menu_item_id);

        $check_link = new Link();
        $check_link->get_by_related($menu_item);
        $check_link->delete_all();
    }

    /*
     * ----------------------- Static component links --------------------------
     */

    public function set_static_comp_link($menu_item_id, $content_id, $component_type_id, $main = 0) {

        $static_comp = new Static_component();
        $static_comp->get_by_id($content_id);

        if ($component_type_id) {
            $component = new Component_type();
            $component->get_by_id($component_type_id);

            $language = new Language();

            $language->get_by_id(self::$ci->input->post('language_id'));

            $link = new Link();
            if (self::$ci->input->post('link_id')) {
                $link->get_by_id(self::$ci->input->post('link_id'));
            }

            $link->link = self::$ci->input->post('link');
            $link->url = $component->name . '/' . $content_id . '/' . $menu_item_id . '/' . $main . '/' . $language->id;
            $link->server_method = $component->server_controller . '/' . $content_id . '/' . $menu_item_id . '/' . $main . '/' . $language->id;
            $link->pref = $language->iso_code . '/';
            $link->main = $main;
            $link->language_id = $language->id;

            if ($link->save()) {
                $link->save($static_comp);

                return $link->id;
            }
            else
                return false;
        } else {
            return false;
        }
    }

    public function get_static_comp_link($static_comp_id) {

        $link = new Link();

        $link->get_by_related_static_component('id', $static_comp_id);

        $links = false;

        foreach ($link as $l) {

            $language = new Language();

            $language->get_by_id($l->language_id);

            $links[$language->iso_code] = $l->to_array();
        }

        return $links;

    }

    public function delete_static_comp_link($static_comp_id) {

        $link = new Link();

        $link->get_by_related_static_component('id', $static_comp_id);

        return $link->delete_all();

    }

    /*
     * ---------------------------- Article links ------------------------------
     */

    public function set_article_link($menu_item_id, $content_id, $component_type_id, $main = 0) {

        $article = new Article();
        $article->get_by_id($content_id);

        if ($component_type_id) {
            $component = new Component_type();
            $component->get_by_id($component_type_id);

            $language = new Language();

            $language->get_by_id(self::$ci->input->post('language_id'));

            $link = new Link();
            if (self::$ci->input->post('link_id')) {
                $link->get_by_id(self::$ci->input->post('link_id'));
            }

            $link->link = self::$ci->input->post('link');
            $link->url = $component->name . '/' . $content_id . '/' . $menu_item_id . '/' . $main . '/' . $language->id;
            $link->server_method = $component->server_controller . '/' . $content_id . '/' . $menu_item_id . '/' . $main . '/' . $language->id;
            $link->pref = $language->iso_code . '/';
            $link->main = $main;
            $link->language_id = $language->id;

            if ($link->save()) {
                $link->save($article);

                return $link->id;
            }
            else
                return false;
        } else {
            return false;
        }

    }

    public function get_article_link($article_id) {

        $link = new Link();

        $link->get_by_related_article('id', $article_id);

        $links = false;

        foreach ($link as $l) {

            $language = new Language();

            $language->get_by_id($l->language_id);

            $links[$language->iso_code] = $l->to_array();
        }

        return $links;

    }

    public function delete_article_link($article_id) {

        $link = new Link();

        $link->get_by_related_article('id', $article_id);

        return $link->delete_all();

    }

    /*
     * ---------------------------- Article items links ------------------------
     */

    public function set_article_item_link($menu_item_id, $content_id, $component_id, $main) {

        $article_item = new Article_item();
        $article_item->get_by_id($content_id);

        if ($component_id) {
            $component = new Component_type();
            $component->get_by_id($component_id);

            $language = new Language();

            $language->get_by_id(self::$ci->input->post('language_id'));

            $link = new Link();
            if (self::$ci->input->post('link_id')) {
                $link->get_by_id(self::$ci->input->post('link_id'));
            }

            $link->link = self::$ci->input->post('link');
            $link->url = $component->name . '/' . $content_id . '/' . $menu_item_id . '/' . $main . '/' . self::$ci->input->post('language_id');
            $link->server_method = $component->server_controller . '/' . $content_id . '/' . $menu_item_id . '/' . $main . '/' . self::$ci->input->post('language_id');
            $link->pref = $language->iso_code . '/';
            $link->main = $main;
            $link->language_id = self::$ci->input->post('language_id');

            if ($link->save()) {
                $link->save($article_item);

                return $link->id;
            }
        } else {
            return false;
        }
    }

    public function upd_article_item_link($menu_item_id, $article_id, $component_id) {
        $article_item = new Article_item();

        $article_item->get_by_article_id($article_id);

        if ($component_id) {
            $component = new Component_type();
            $component->get_by_id($component_id);

            foreach ($article_item as $a) {
                $link = new Link();
                $link->get_by_related($a);

                foreach ($link as $l) {

                    $url_parse = explode('/', $l->url);

                    $params = $a->id . '/' . $menu_item_id . '/' . $url_parse[3] . '/' . $url_parse[4];

                    $l->url = $component->name . '/' . $params;
                    $l->server_method = $component->server_controller . '/' . $params;

                    $l->save();
                }
            }

            return true;
        } else {
            return false;
        }
    }

    public function get_article_item_link($article_item_id) {

        $article_item = new Article_item();

        $article_item->get_by_id($article_item_id);

        $link = new Link();

        $link->get_by_related($article_item);

        $links = FALSE;

        foreach ($link as $l) {

            $language = new Language();

            $language->get_by_id($l->language_id);

            $links[$language->iso_code] = $l->to_array();
        }

        return $links;
    }

    public function delete_article_item_link($a_i_id = false) {
        $article_item = new Article_item();

        $article_item_id = self::$ci->input->post('article_item_id') ? self::$ci->input->post('article_item_id') : $a_i_id;

        $article_item->get_by_id($article_item_id);

        $check_link = new Link();
        $check_link->get_by_related($article_item);

        foreach ($check_link as $l) {
            $l->delete();
        }
    }


    /*
     * -------------------------Automodel links-------------------------
     */

    public function set_automodel_link($automodel_id, $component_type_id, $main) {

        $automodel = new Automodel();
        $automodel->get_by_id($automodel_id);

        $check_link = new Link();
        $check_link->get_by_related($automodel);
        $check_link->delete_all();

        if ($automodel_id) {
            $component_type = new Component_type();
            $component_type->get_by_id($component_type_id);

            $link = new Link();

            $link->link = self::$ci->input->post('link');
            $link->url = $component_type->name . '/' . $automodel_id . '/' . $automodel->autobrend_id . '/' . $main . '/' . self::$ci->input->post('language_id');
            $link->server_method = $component_type->server_controller . '/' . $automodel_id . '/' . $automodel->autobrend_id . '/' . $main . '/' . self::$ci->input->post('language_id');
            $link->main = $main;
            $link->language_id = self::$ci->input->post('language_id');

            if ($link->save()) {
                $link->save($automodel);

                return $link->to_array();
            }
        } else {
            return false;
        }
    }

    public function get_automodel_link($automodel_id, $lang_id = 2, $full_format = false) {
        $automodel = new Automodel();

        $automodel->get_by_id($automodel_id);

        $link = new Link();

        $link->get_by_related($automodel);

        $links = false;

        foreach ($link as $l) {

            if ($full_format) {
                switch ($l->language_id):
                    case 1:
                        $links['en'] = $l->to_array();
                        break;
                    case 2:
                        $links['ru'] = $l->to_array();
                        break;
                    case 3:
                        $links['ua'] = $l->to_array();
                        break;
                endswitch;
            } else {
                if ($l->language_id == $lang_id) {
                    $links = $l->to_array(array('link', 'url'));
                }
            }
        }

        return $links;
    }

    public function delete_automodel_link($automodel_id) {
        $automodel = new Automodel();
        $automodel->get_by_id($automodel_id);

        $check_link = new Link();
        $check_link->get_by_related($automodel);
        $check_link->delete_all();
    }

    /*
     * User link functions
     */

    public function get_link_by_url($url) {

        $link = new Link();

        $link->get_by_url($url);

        $links = $link->to_array();

        if (!empty($links) && $links['link'] !== null && $links['link'] !== '') {
            return $links['link'];
        } else {
            return false;
        }
    }

    public function get_link_to_user() {
        $link = new Link();

        $link->select('link, url')->get();

        return $link->all_to_array();
    }

    public function get_article_link_for_user($article_item_id) {

        $article_item = new Article_item();

        $article_item->get_by_id($article_item_id);

        $link = new Link();

        $link->get_by_related($article_item);

        $links = FALSE;

        foreach ($link as $l) {
            switch ($l->language_id):
                case 1:
                    if (!empty($l->link) && $l->link !== '')
                        $links['en'] = array('link' => $l->link, 'url' => $l->url);
                    else
                        $links['en'] = false;
                    break;
                case 2:
                    if (!empty($l->link) && $l->link !== '')
                        $links['ru'] = array('link' => $l->link, 'url' => $l->url);
                    else
                        $links['ru'] = false;
                    break;
                case 3:
                    if (!empty($l->link) && $l->link !== '')
                        $links['ua'] = array('link' => $l->link, 'url' => $l->url);
                    else
                        $links['ua'] = false;
                    break;
            endswitch;
        }

        return $links;
    }

}

?>
