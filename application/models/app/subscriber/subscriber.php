<?php

class Subscriber extends DataMapper {

    public $table = 'subscribers';
    public $has_many = array('subscription');
    public static $ci;
    public $validation = array(
        array(
            'field' => 'id',
            'label' => 'id',
            'rules' => array('trim', 'numeric', 'max_length' => 5),
        ),
        array(
            'field' => 'name',
            'label' => 'Name',
            'rules' => array('trim', 'max_length' => 100),
        ),
        array(
            'field' => 'email',
            'label' => 'Email',
            'rules' => array('required', 'unique', 'trim', 'min_length' => 2, 'max_length' => 200),
        ),
        array(
            'field' => 'date',
            'label' => 'Date',
            'rules' => array('required', 'trim', 'min_length' => 8, 'max_length' => 10),
        ),
        array(
            'field' => 'new',
            'label' => 'New',
            'rules' => array('trim', 'boolean', 'max_length' => 1),
        )
    );

    function __construct($id = NULL) {
        parent::__construct($id);
        if (empty(self::$ci)) {
            self::$ci = &get_instance();
        }
    }

    public function set_subscriber() {
        if (self::$ci->access->check_access(__FUNCTION__) == false)
            return 403;

        $subscriber = new Subscriber();

        if (self::$ci->input->post('id'))
            $subscriber->get_by_id(self::$ci->input->post('id'));

        $subscriber->name = self::$ci->input->post('name');
        $subscriber->email = self::$ci->input->post('email');
        $subscriber->new = self::$ci->input->post('new');
        $subscriber->date = self::$ci->input->post('date') ? self::$ci->input->post('date') : date('d-m-Y');

        $s = self::$ci->input->post('subscriptions');

        $subscription = new Subscription();

        $subscription->get();

        $subscriber->delete($subscription->all);

        foreach ($s as $key => $sub_name) {
            $subscription = new Subscription();
            $subscription->get_by_name($sub_name);
            $subscriber->save($subscription->all);
        }


        if ($subscriber->save()) {
            return true;
        } else
            return false;
    }

    public function get_all_subscribers() {
        if (self::$ci->access->check_access(__FUNCTION__) == false)
            return 403;

        $subscriber = new Subscriber();
        $result = false;
        $subscriber->order_by("new desc, date desc")->get();
        foreach ($subscriber as $key => $s) {

            $subscription = new Subscription();
            $subscription->get_by_related($s);

            $result[$key]['subscriptions'] = $subscription->all_to_array(array('name'));
            $result[$key]['data'] = $s->to_array();
        }

        return $result;
    }

    public function get_subscriber_by_id() {
        if (self::$ci->access->check_access(__FUNCTION__) == false)
            return 403;

        $subscriber = new Subscriber();
        if (self::$ci->input->post('subscriber_id')) {
            $subscriber_id = self::$ci->input->post('subscriber_id');
            $subscriber->get_by_id($subscriber_id);

            $subscription = new Subscription();
            $subscription->get_by_related($subscriber);

            $result['subscriptions']['subscribed'] = $subscription->all_to_array(array('name'));
            $result['subscriptions']['all'] = $subscription->get()->all_to_array(array('name'));
            $result['data'] = $subscriber->to_array();
        } else {
            $result['data'] = "";

            $subscription = new Subscription();

            $result['subscriptions']['subscribed'] = "";
            $result['subscriptions']['all'] = $subscription->get()->all_to_array(array('name'));
        }
        return $result;
    }

    public function delete_subscriber() {
        if (self::$ci->access->check_access(__FUNCTION__) == false)
            return 403;

        $subscriber_id = self::$ci->input->post('subscriber_id');

        $subscriber = new Subscriber();

        $subscriber->get_by_id($subscriber_id);

        $subscription = new Subscription();

        $subscription->get_by_related($subscriber);

        $subscription->delete($subscriber->all);

        return $subscriber->delete() ? array('subscriber_id' => $subscriber_id) : false;
    }
    
    public function change_new_state(){
        
         $subscriber = new Subscriber();
         $subscriber_id = self::$ci->input->post('id');
         $subscriber->get_by_id($subscriber_id);
         
         $new_state = self::$ci->input->post('new');
         if ($new_state === "on") {
             $new = 1;
         } else {
             $new = 0;
         }
         $subscriber->new =  $new;
         
         if($subscriber->save()) {
             return true;
         } else {
             return false;
         }
                 }

}

?>