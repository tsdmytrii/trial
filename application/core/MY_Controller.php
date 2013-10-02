<?php

class MY_Controller extends CI_Controller {

    function __construct() {
        parent::__construct();
        //check if user tries to access restricted area
        if ($this->uri->segment(1) == 'admin' && $this->uri->segment(2) != 'login') {

//            if ($this->authorized() === FALSE && ) {
            if ($this->authorized() === FALSE ) {
                $this->request_authorize();
            }

        }

        $this->load->library(array("user_agent", 'plugins/ion_auth'));
        $this->load->model(array('core/lang_model'));
    }

    /*
     * Authorization functions
     */

    function authorized() {
        if ($this->ion_auth->logged_in() === TRUE && $this->ion_auth->is_admin() === TRUE)
//        if ($this->ion_auth->logged_in() === TRUE)
            return true;
        else
            return false;
    }

    function redirect_to_main() {
        if ($this->request_link)
            redirect(base_url() . $this->request_link, 'location', '302');
        else
            redirect(base_url() . 'admin/menu', 'location', '302');
    }

    function request_authorize() {
        //if user makes xhr, we just send header
        if ($this->input->is_ajax_request() === TRUE) {
            $this->output->set_status_header(401);
            //and clear output
            $this->output->set_output('');
        } else {
            redirect(base_url() . 'admin/login', 'location', 302);
        }
    }

    function authorize() {
        $this->ion_auth->login($this->input->post('login'), $this->input->post('password'));

        $this->redirect_to_main();
    }

    function check_auth() {
        if ($this->session->userdata('logged') === false) {
            redirect(base_url() . 'admin/login', 'location', 302);
        }
    }

    /*
     * Admin functions
     */

    function load_header($page) {
        $data['layout_title'] = $this->get_title($page['lang']['name']);
        $data['current'] = $page;

        $lang = new Language();
        $data['lang'] = $lang->get_all_langs();

        $this->load->view('admin/header', $data);
    }

    function load_footer() {
        $this->load->view('admin/footer');
    }

    function load_menu($current) {
        $tab = new Tab();
        $data['menu'] = $tab->get_all_tabs();
        $user = new User();
        $data['user'] = $user->get_user();
        $data['current'] = $current;
        $this->load->view('admin/menu', $data);
    }

    function load_index() {
        $this->load->view('admin/index');
    }

    function get_title($page) {
        return 'CMS 2.0 Admin::' . ucfirst($page);
    }

    /*
     * User functions
     */

    function get_user_lang() {
        //here we should make retrieving user lang based on account settings or geographical position
        //in development mode we just return id of russian lang
        return 2;
    }

    function check_user_agent() {

        $main = 1;

        if ($this->agent->browser() == 'Internet Explorer' AND in_array($this->agent->version(), array('6.0', '7.0', '8.0', '9.0'))) {
            $main = 0;
        } elseif ($this->agent->is_mobile() || $this->agent->is_mobile('iPad')) {
            $main = 0;
        }


        return $main;
    }

    function link_redirect($static_link, $lang_id, $lang) {

        $new_link = explode('/', $static_link);
        $new_link_main = $new_link[0] . '/' . $new_link[1] . '/' . $new_link[2] . '/1/' . $new_link[4];
        $new_link_window = $new_link[0] . '/' . $new_link[1] . '/' . $new_link[2] . '/0/' . $new_link[4];

        if (intval($lang_id) != 2) {
            $new_link_main = $lang . '/' . $new_link_main;
            $new_link_window = $lang . '/' . $new_link_window;
        }

        if ($this->uri->uri_string() == $new_link_main || $this->uri->uri_string() == $new_link_window) {

            $link = new Link();

            $link_for_comp = $link->get_link_by_url($new_link_main);

            if ($link_for_comp) {
                if (intval($lang_id) != 2) {
                    redirect(base_url() . $lang . '/' . $link_for_comp);
                } else {
                    redirect(base_url() . $link_for_comp);
                }
            }

            $link_for_comp = $link->get_link_by_url($new_link_window);

            if ($link_for_comp) {
                if (intval($lang_id) != 2) {
                    redirect(base_url() . $lang . '/' . $link_for_comp);
                } else {
                    redirect(base_url() . $link_for_comp);
                }
            }
        }
    }

    function is_ajax_request($result, $view, $menu_item_id, $main, $lang_id, $static_link, $title, $tab) {

        if ($this->input->is_ajax_request()) {

            return $this->return_result($result['data']);

        } else {

            $all_data = $this->load_data($lang_id);

            $result['pref'] = $this->get_lang_by_id($lang_id);

            $this->link_redirect($static_link, $lang_id, $result['pref']);

            $result['all_data'] = $all_data['all_data'];
            $result['maximise'] = 1;
            $result['lang_id'] = $lang_id;
            $result['menu_item_id'] = $menu_item_id;
            $result['tab'] = $tab;
            $result['static_link'] = $static_link;

            $result['view'] = $view;
            $result['component_name'] = $static_link;

            $this->load_head($result, $result['view'], $static_link, $title);

            $result = $result + $all_data;

            $this->load->view('user/content', $result);
        }
    }

    function load_head($data = '', $view = '', $componentName = '', $title = '') {
        $response['data'] = $data['data'];
        $response['all_data'] = $data['all_data'];
        $response['lang_id'] = $data['lang_id'];
        $response['response'] = json_encode(array('success' => true, 'componentName' => $componentName, 'title' => $title));
        $response['lang'] = $data['pref'];
        $this->load->view('user/components/' . $view . '/head.php', $response);
    }

    public function is_cashed_data($cashe_name) {
        if ($this->cache->file->get($cashe_name)) {
            $result = $this->cache->file->get($cashe_name);
        } else {
            $result = false;
        }

        return $result;
    }

    function load_data($lang_id) {

        $result['seo'] = $this->is_cashed_data('seo');
        if ($result['seo'] == false) {
            $seo = new Seo();
            $result['seo'] = $seo->get_seo();
            $this->cache->file->save('seo', $result['seo'], 5000);
        }

        $result['header'] = $this->is_cashed_data('header');
        if ($result['header'] == false) {
            $header = new Menu_item();
            $result['header'] = $header->get_menu_item_by_block(10);
            $this->cache->file->save('header', $result['header'], 5000);
        }
        $result['footer'] = $this->is_cashed_data('footer');
        if ($result['footer'] == false) {
            $footer = new Menu_item();
            $result['footer'] = $footer->get_menu_item_by_block(11);
            $this->cache->file->save('footer', $result['footer'], 5000);
        }

        $result['placeholders'] = $this->is_cashed_data('placeholders');
        if ($result['placeholders'] == false) {
            $placeholder = new Placeholder();
            $result['placeholders'] = $placeholder->get_placeholders_for_user();
            $this->cache->file->save('placeholders', $result['placeholders'], 5000);
        }

        $result['marking'] = $this->is_cashed_data('marking');
        if ($result['marking'] == false) {
            $marking = new Marking();
            $result['marking'] = $marking->get_marking();
            $this->cache->file->save('marking', $result['marking'], 5000);
        }

        $result['link'] = $this->is_cashed_data('link_data');
        if ($result['link'] == false) {
            $link = new Link();
            $result['link'] = $link->get_link_to_user();
            $this->cache->file->save('link_data', $result['link'], 5000);
        }

//        $result['autobrend'] = $this->is_cashed_data('autobrend_data');
//        if ($result['autobrend'] == false) {
//            $autobrend = new Autobrend();
//            $result['autobrend'] = $autobrend->get_autobrends_to_user($lang_id);
//            $this->cache->file->save('autobrend_data', $result['autobrend'], 5000);
//        }
        
        $result['banners'] = $this->is_cashed_data('banners_data');
        if ($result['banners'] == false) {
            $banners = new Banner();
            $result['banners'] = $banners->get_displayed_banners();
            $this->cache->file->save('banners_data', $result['banners'], 5000);
        }

        $result['mini_block'] = $this->is_cashed_data('mini_block_data');
        if ($result['mini_block'] == false) {
            $mini_block = new Mini_block();
            $result['mini_block'] = $mini_block->get_mini_block_to_user();
            $this->cache->file->save('mini_block_data', $result['mini_block'], 5000);
        }

        $result['contacts'] = $this->is_cashed_data('contacts_data');
        if ($result['contacts'] == false) {
            $contacts = new Contact();
            $result['contacts'] = $contacts->get_contacts();
            $this->cache->file->save('contacts_data', $result['contacts'], 5000);
        }

        $result['questVariant'] = $this->is_cashed_data('questVariant_data');
        if ($result['questVariant'] == false) {
            $question_variant = new Question_variant();
            $result['questVariant'] = $question_variant->get_question_variant();
            $this->cache->file->save('questVariant_data', $result['contacts'], 5000);
        }

        $result['innerMenuItem'] = $this->is_cashed_data('innerMenuItem_data');
        if ($result['innerMenuItem'] == false) {
            $menu_item = new Menu_item();
            $result['innerMenuItem'] = $menu_item->get_inner_menu_items();
            $this->cache->file->save('innerMenuItem_data', $result['innerMenuItem'], 5000);
        }

        $result['mobile'] = $this->isMobile();

        $result['windowOn'] = $this->check_user_agent();

        if (isset($_SERVER['HTTP_REFERER']))
            $result['referer'] = $_SERVER['HTTP_REFERER'];
        else
            $result['referer'] = '';

        $result['lang_id'] = $lang_id;

        $all_data = json_encode(array('success' => true, 'data' => $result));

        $result['all_data'] = $all_data;

        return $result;
    }

    public function check_link($data, $result, $comp_name, $menu_item_id, $main, $lang_id, $static_link, $title = '', $tab = false) {

        if ($data !== false && ($main == 0 || $main == 1) && ($lang_id == 1 || $lang_id == 2)) {
            $this->is_ajax_request($result, $comp_name, $menu_item_id, $main, $lang_id, $static_link, $title, $tab);
        } else {
            $this->show_404_error();
        }

    }

    public function show_404_error($static_component_id = 32, $menu_item_id = 56, $main = 1, $lang_id = 2) {
        $this->output->set_status_header('404');

        $static_component = new Static_component();

        $static_link = 'staticcomp/' . $static_component_id . '/' . $menu_item_id . '/' . $main . '/' . $lang_id;

        $result['data'] = $static_component->get_static_component_for_user($static_component_id, $menu_item_id);
        $result['data']['trilan'] = $this->get_trilan_link($menu_item_id, $lang_id);

        $this->is_ajax_request($result, 'staticcomp', $menu_item_id, $main, $lang_id, $static_link);
    }

    /*
     * Common functions
     */

    function isMobile() {
        $mobile = 0;

        if ($this->agent->is_mobile())
            $mobile = 1;

        return $mobile;
    }

    function get_lang_by_id($lang_id) {
        $langs = $this->lang_model->get_langs();

        foreach ($langs as $l) {
            if ($l['id'] == $lang_id) {
                return $l['iso_code'];
            }
        }
    }

    function return_result($result) {
        echo json_encode(array(
            'success' => $result ? true : false,
            'message' => $result === 403 ? 403 : false,
            'data' => $result ? $result : false
        ));
    }


}

?>
