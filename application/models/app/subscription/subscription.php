<?php

class Subscription extends DataMapper {

    public $table = 'subscriptions';
    public $has_many = array('subscriber');
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
            'rules' => array('required', 'trim', 'min_length' => 2, 'max_length' => 100),
        ),
        array(
            'field' => 'description',
            'label' => 'Description',
            'rules' => array('required', 'trim', 'min_length' => 2, 'max_length' => 200),
        ),
        array(
            'field' => 'position',
            'label' => 'Position',
            'rules' => array('required', 'trim', 'max_length' => 2),
        )
    );

    function __construct($id = NULL) {
        parent::__construct($id);
        if (empty(self::$ci)) {
            self::$ci = &get_instance();
        }
    }

    public function set_subscription() {
        if (self::$ci->access->check_access(__FUNCTION__) == false)
            return 403;

        $subscription = new Subscription();

        if (self::$ci->input->post('id'))
            $subscription->get_by_id(self::$ci->input->post('id'));

        $subscription->name = self::$ci->input->post('name');
        $subscription->description = self::$ci->input->post('description');
        $subscription->position = self::$ci->input->post('position');

        if ($subscription->save()) {
            return array('status' => 'success');
        } else
            return $subscription->error->all;
    }

    public function get_all_subscriptions() {
        if (self::$ci->access->check_access(__FUNCTION__) == false)
            return 403;

        $subscription = new Subscription();

        $subscription->order_by("position", "asc")->get();

        return $subscription->all_to_array();
    }

    public function get_subscription_by_id() {
        if (self::$ci->access->check_access(__FUNCTION__) == false)
            return 403;

        $subscription = new Subscription();
        $subscription_id = self::$ci->input->post('subscription_id');

        $subscription->get_by_id($subscription_id);

        $result = $subscription->to_array();

        return $result;
    }

    public function delete_subscription() {

        if (self::$ci->access->check_access(__FUNCTION__) == false)
            return 403;

        $subscription_id = self::$ci->input->post('subscription_id');

        $subscription = new Subscription();
        $subscription->get_by_id($subscription_id);

        $subscriber = new Subscriber();
        $subscriber->get_by_related($subscription);

        $subscriber->delete($subscription->all);

        return $subscription->delete() ? array('subscribe_id' => $subscription_id) : false;
    }

}

?>