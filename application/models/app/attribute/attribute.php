<?php

class Article extends DataMapper {

    public $db_params = 'default';
    public $table = 'articles';
    public $has_many = array('article_languages');
    public static $ci;
    public $validation = array(
        array(
            'field' => 'id',
            'label' => 'Id',
            'rules' => array('trim', 'numeric', 'max_length' => 10),
        ),
        array(
            'field' => 'name',
            'label' => 'Name',
            'rules' => array('required', 'trim', 'min_length' => 3, 'required', 'max_length' => 100),
        ),
        array(
            'field' => 'email',
            'label' => 'E-mail',
            'rules' => array('required', 'trim', 'unique', 'min_length' => 6)
        ),
        array(
            'field' => 'date',
            'label' => 'Date',
            'rules' => array('trim', 'max_length' => 10),
        ),
        array(
            'field' => 'new',
            'label' => 'New',
            'rules' => array('trim', 'min_length' => 0, 'max_length' => 1),
        )
    );

    function __construct($id = NULL) {
        parent::__construct($id);
        if (empty(self::$ci)) {
            self::$ci = &get_instance();
        }
    }

    public function set_article() {
        if (self::$ci->access->check_access(__FUNCTION__) == false)
            return 403;

        $article = new Article();

        if (self::$ci->input->post('id')) {
            $article->get_by_id(self::$ci->input->post('id'));
        }

        $article->name = self::$ci->input->post('name');
        $article->name = self::$ci->input->post('influence_type');
        $article->name = self::$ci->input->post('measurement_type');
        $article->name = self::$ci->input->post('strict');

        if ($subscription_id_array = self::$ci->input->post('subscribe')) {
            foreach ($subscription_id_array as $key => $value) {
                $subscription = new Subscription();
                $subscription->get_by_id($value);
                $article->save($subscription->all);
            }
        }

        if ($article->save())
            return $article->to_array();
        else
            return false;
    }

    public function get_article($article_id = false) {
        if (self::$ci->access->check_access(__FUNCTION__) == false)
            return 403;

        $input_id = self::$ci->input->post('article_id');
        $article_id = $input_id ? $input_id : $article_id;

        if ($article_id) {

            $article = new Article();
            $subscription = new Subscription();

            $article_copy = new Article();
            $article_copy->get_by_id($article_id);

            return array(
                $article->get_by_id($article_id)->to_array(),
                $article_copy->subscription->get()->all_to_array() // паліво
            );

        } else
            return false;

    }

    public function get_all_articles() {
        if (self::$ci->access->check_access(__FUNCTION__) == false)
            return 403;

        $article = new Article();
        $article->order_by("name")->get();

        foreach ($article as $key => $value) {
            $subscription = new Subscription();
            $result[$key] = $value->to_array();
            $result[$key]['subscription'] = $subscription->where_related('article', 'id', $value->id)->get()->all_to_array();
        }

        return $result;
    }

    public function delete_article() {
        if (self::$ci->access->check_access(__FUNCTION__) == false)
            return 403;

        $article_id = self::$ci->input->post('article_id');

        $article = new Article();
        $article->get_by_id($article_id);

        $subscription = new Subscription();
        $subscription->get_by_related($article);

        $subscription->delete($article->all);

        return $article->delete() ? array('article_id' => $article_id) : false;
    }

}