<?php

class Access {

    function __construct() {
        $this->ci = &get_instance();
    }

    function check_access($func_name) {

        $id = $this->ci->session->userdata('user_id');

        $group = new Group();

        $group->get_by_related_user('id', $id);

        if ($group->name === 'admin')
            return true;

        $component_function = new Component_function();

        $component_function->get_by_related($group);

        $result = false;

        foreach ($component_function as $c) {

            if ($c->name == $func_name)
                $result = true;

        }

        return $result;

    }

}

?>
