<?php

class Campaigns extends MY_Controller {

    function __construct() {
        parent::__construct();

        $config = array(
            'apikey' => 'e916a4bdc3f7af2832631bc14b668a1a-us7',
            'opts' => array()
        );
        $this->load->library('Mailchimp', $config, 'mail_chimp');
    }

    public function index() {
        $name = 'campaigns';

        $tab = new Tab();

        $data['data'] = $tab->get_tab_by_name($name);

        if (!$this->input->is_ajax_request()) {
            $this->load_header($data['data']);
            $this->load->view('admin/toper', $data);
            $this->load_menu($data['data']);
            $this->load_index();
            $this->load_footer();
        }
        else
            $this->output->set_output(json_encode($data['data']));
    }

    public function getLists() {
        $config = array(
                'apikey' => 'dfb9dd30d33b508cbb168feb7a5d9b97-us7',
                'opts' => array()
            );
    
        $this->load->library('Mailchimp', $config, 'mail_chimp');

            $api = new Mailchimp($config);
            
            var_dump($api->call('lists/list', array('apikey'=>'dfb9dd30d33b508cbb168feb7a5d9b97-us7')));
    }
    
//    public function set_campaign(){
//        $campaign = new Campaign();
/*        $result = $campaign->set_campaign();*/

/*        $campaign_array = array(
            'apikey' => 'e916a4bdc3f7af2832631bc14b668a1a-us7',
            'type' => 'regular',
            'options' => array(
                'list_id' => 'c763abbd1b',
                'subject' => 'Our dear Newsletter',
                'from_email' => 'yuriy.kabay@outlook.com',
                'from_name' => 'Yuriy',
                'to_name' => 'Tsybrii Dmytro',
                "title"=> "Title"
            ),
            "content"=> array(
                "html"=> "new html",
                "text"=> "my text"
            )
        );

        $result = $this->mail_chimp->call('campaigns/create', $campaign_array);*/

/*        $campaign = $this->mail_chimp->call('campaigns/list',array('apikey'=>'fce6f6bcfc217db49038b80b5bb6dd95-us7'));
        var_dump($campaign);*/

//        $result = $this->mail_chimp->call('campaigns/send', array(
//            'apikey'=>'e916a4bdc3f7af2832631bc14b668a1a-us7',
//            'cid'=>'8f1dd6935f'
//        ));
//
//        var_dump($result);
//        $this->return_result($result);
//    }

    public function set_campaign(){
        
        $campaign = new Campaign();

        $result = $campaign->set_campaign();
       $this->return_result($result);
    }
    
    public function get_campaign(){

        $campaign = new Campaign();
        $this->return_result($campaign->get_campaign());
    }

    public function get_all_campaigns(){
        $campaign = new Campaign();

        $this->return_result($campaign->get_all_campaigns());
    }

    public function delete_campaign(){
        $campaign = new Campaign();

        $result = $campaign->delete_campaign();

        $this->return_result($result);
    }

    public function check_link(){
        $link = new Link();

        $result = $link->check_link();

        echo $result;
    }

    public function get_navigationoption(){
        $option = new Navigation_option();

        $result = $option->get_navigation_option();

        echo $this->return_result($result);
    }

    public function set_navigationoption(){
        $option = new Navigation_option();

        $result = $option->set_navigation_option();

        echo $this->return_result($result);
    }

}
