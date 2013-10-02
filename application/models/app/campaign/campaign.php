<?php

class Campaign extends DataMapper {

    public $db_params = 'default';
    public $table = 'campaigns';
    public $has_many = array('subscription');
    public static $ci;
    public $validation = array(
        array(
            'field' => 'id',
            'label' => 'id',
            'rules' => array('trim', 'max_length' => 10),
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
            'rules' => array('trim', 'min_length' => 1, 'max_length' => 1),
        ),
        array(
            'field' => 'date',
            'label' => 'Date',
            'rules' => array('trim', 'min_length' => 4, 'max_length' => 10),
        ),
        array(
            'field' => 'frequency',
            'label' => 'Frequency',
            'rules' => array('trim', 'min_length' => 1, 'max_length' => 1),
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
        if (self::$ci->access->check_access(__FUNCTION__) == false)
            return 403;

        $campaign = new Campaign();

        if (self::$ci->input->post('id')) {
            $campaign->get_by_id(self::$ci->input->post('id'));
        }

        $campaign->name = self::$ci->input->post('name');
        $campaign->title = self::$ci->input->post('title');
        $campaign->html = self::$ci->input->post('html');
        $campaign->active = self::$ci->input->post('active');
        $campaign->type = self::$ci->input->post('type');
        $campaign->type = self::$ci->input->post('subscription');
        $campaign->date = self::$ci->input->post('date');
        $campaign->frequency = self::$ci->input->post('frequency');
        $campaign->ready = self::$ci->input->post('ready');

        $config = array(
            'apikey' => 'dfb9dd30d33b508cbb168feb7a5d9b97-us7',
            'opts' => array()
        );
        $this->load->library('Mailchimp', $config, 'mail_chimp');
        $api = new Mailchimp($config);

        if(self::$ci->input->post('active') == true && self::$ci->input->post('ready') == true) {
            $subscription = new Subscription();
            $subscription->get_by_id(self::$ci->input->post('subscription'));
             var_dump(self::$ci->input->post('subscription'));
            $list_id = $subscription->list_id;
        } else {
            $list_id = "training";
        }
       
        $result = $api->call('campaigns/create', array(
            'apikey' => 'dfb9dd30d33b508cbb168feb7a5d9b97-us7',
            'type' => 'regular',
            'options' => array(
                'list_id' =>  $list_id,
                'subject' => 'Checkout our new web site WebInnovativeLab',
                'from_email' => 'apelmon666@mail.ru',
                'from_name' => 'Tsybrii Dmytro',
                'to_name' => 'Dear Sir',
                'title' => self::$ci->input->post('title'),
            ),
            'content' => array(
                'html' => self::$ci->input->post('html'),
                'text' => 'Our new website will be the best website you ever seen!!'
            )
                ));

        if ($result) {
//            var_dump($result['id']);
            
            if (self::$ci->input->post('type') === '0') {
                $send = $api->call('campaigns/send', array('apikey' => 'dfb9dd30d33b508cbb168feb7a5d9b97-us7', 'cid' => $result['id']));
            }
            
            $campaign->id_campaign = $result['id'];
            if ($campaign->save())
                return $campaign->to_array();
            else
                return $campaign->error->all;
        } else {
            return "mailcimp error";
        }
//        var_dump($result);
       
    }

    public function get_campaign($campaign_id = false) {
        if (self::$ci->access->check_access(__FUNCTION__) == false)
            return 403;

        $input_id = self::$ci->input->post('subscribe_id');
        $campaign_id = $input_id ? $input_id : $campaign_id;

        if ($campaign_id) {

            $config = array(
                'apikey' => 'fce6f6bcfc217db49038b80b5bb6dd95-us7',
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
        $result['instantaneous'] = $campaign->where("type", '0')->get()->all_to_array();
        $result['planned'] = $campaign->where("type", '1')->get()->all_to_array();
        $result['regular'] = $campaign->where("type", '2')->get()->all_to_array();

        return $result;
    }

    public function delete_campaign() {
        if (self::$ci->access->check_access(__FUNCTION__) == false)
            return 403;

        $campaign_id = self::$ci->input->post('subscribe_id');

        $campaign = new Campaign();
        $campaign->get_by_id($campaign_id);

        $subscriber = new Subscriber();
        $subscriber->get_by_related($campaign);

        $subscriber->delete($campaign->all);

        return $campaign->delete() ? array('subscribe_id' => $campaign_id) : false;
    }

}