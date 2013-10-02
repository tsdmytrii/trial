<?php

class campaign extends DataMapper {

    public $db_params = 'default';
    public $table = 'campaigns';
    public $has_many = array('subscription');
    public static $ci;
    public $validation = array(
        array(
            'field' => 'id',
            'label' => 'id',
            'rules' => array('trim', 'numeric', 'max_length' => 10),
        ),
        array(
            'field' => 'name',
            'label' => 'Name',
            'rules' => array('trim', 'min_length' => 2, 'required', 'max_length' => 150),
        ),
        array(
            'field' => 'title',
            'label' => 'Title',
            'rules' => array('trim', 'min_length' => 3, 'max_length' => 150),
        ),
        array(
            'field' => 'html',
            'label' => 'HTML',
            'rules' => array(),
        ),
        array(
            'field' => 'active',
            'label' => 'Active',
            'rules' => array(),
        ),
        array(
            'field' => 'type',
            'label' => 'Type',
            'rules' => array(),
        ),
        array(
            'field' => 'date',
            'label' => 'Date',
            'rules' => array('trim', 'min_length' => 4, 'max_length' => 10),
        ),
        array(
            'field' => 'frequency',
            'label' => 'Frequency',
            'rules' => array(),
        ),
        array(
            'field' => 'ready',
            'label' => 'Ready',
            'rules' => array(),
        )
    );

    function __construct($id = NULL) {
        parent::__construct($id);
        if (empty(self::$ci)) {
            self::$ci = &get_instance();
        }
    }

    public function set_campaign() {
//        if (self::$ci->access->check_access(__FUNCTION__) == false)
//            return 403;

        $campaign = new Campaign();

        if (self::$ci->input->post('id')) {
            $campaign->get_by_id(self::$ci->input->post('id'));
        }

        $campaign->name = self::$ci->input->post('name');
        $campaign->title = self::$ci->input->post('title');
        $campaign->html = self::$ci->input->post('html');
        $campaign->active = self::$ci->input->post('active');
        $campaign->type = self::$ci->input->post('type');
        $campaign->subscription = self::$ci->input->post('subscription');
        $campaign->date = self::$ci->input->post('date');
        $campaign->frequency = self::$ci->input->post('frequency');
        $campaign->ready = self::$ci->input->post('ready');
        if ($campaign->save()) {

            $config = array(
                'apikey' => '7ff522349ba2ec8bf1182c94c9c222dd-us7',
                'opts' => array()
            );

            $this->load->library('Mailchimp', $config, 'mail_chimp');

            $api = new Mailchimp($config);

            $params = array(
                'apikey' => '7ff522349ba2ec8bf1182c94c9c222dd-us7',
                'type' => 'regular',
                'options' => array(
                    'list_id' => '3f6f884105',
                    'subject' => 'example subject',
                    'from_email' => 'tsybriidmytro@gmail.com',
                    'from_name' => 'Tsybrii Dmyro',
                    'to_name' => 'Your name',
                    'title' => 'emaple title 1',
                ),
                'content' => array(
                    'html' => 'example html',
                    'text' => 'example text'
                )
            );

            $result = $api->call('campaigns/create', $params);

            if (self::$ci->input->post('type') == '1') {
                $result['lists'] = $api->call('campaigns/send', array('apikey' => '7ff522349ba2ec8bf1182c94c9c222dd-us7', 'cid' => '1fb4fb6c5a'));
            }

            return $result;
        } else {
            return $campaign->error->all;
        }
    }
    
    public function get_campaign_by_id() {
        if (self::$ci->access->check_access(__FUNCTION__) == false)
            return 403;

        $campaign = new Subscriber();
        if (self::$ci->input->post('campaign_id')) {
            $campaign_id = self::$ci->input->post('campaign_id');
            $campaign->get_by_id($campaign_id);

            $subscription = new Subscription();
            $subscription->get_by_related($campaign);

            $result['subscription'] = $subscription->all_to_array(array('name'));
            $result['data'] = $campaign->to_array();
            $result['subscriptions']['all'] = $subscription->get()->all_to_array(array('name'));
       
            } else {
            
            $subscription = new Subscription();

            $result['data'] = "";
            $result['subscription'] = "";
            $result['subscriptions']['all'] = $subscription->get()->all_to_array(array('name'));
        }
        return $result;
    }

    public function send_campaign() {
        
    }

    public function get_campaign($campaign_id = false) {
        if (self::$ci->access->check_access(__FUNCTION__) == false)
            return 403;
        $input_id = self::$ci->input->post('subscribe_id');
        $campaign_id = $input_id ? $input_id : $campaign_id;

        if ($campaign_id) {
            $config = array(
                'apikey' => '7ff522349ba2ec8bf1182c94c9c222dd-us7',
                'opts' => array()
            );
            $this->load->library('Mailchimp', $config, 'mail_chimp');
            $api = new Mailchimp($config);

            $result['lists'] = $api->call('lists/list', array());
            $campaign = new Campaign();
            $result['campaigns'] = $campaign->get_by_id($campaign_id)->to_array();
            return $result;
        } else
            return false;
    }

    public function get_all_campaigns() {
        if (self::$ci->access->check_access(__FUNCTION__) == false)
            return 403;

        $campaign = new Campaign();
        $result['campaign'] = $campaign->order_by("position")->get()->all_to_array();

        return $result;
    }

    public function delete_campaign() {
        if (self::$ci->access->check_access(__FUNCTION__) == false)
            return 403;

        $campaign_id = self::$ci->input->post('subscribe_id');

        $campaign = new Campaign();
        $campaign->get_by_id($campaign_id);

        $campaign = new Subscriber();
        $campaign->get_by_related($campaign);

        $campaign->delete($campaign->all);

        return $campaign->delete() ? array('subscribe_id' => $campaign_id) : false;
    }

}
