<?php

class Placeholder extends DataMapper {

    public $table = 'placeholders';
    public $has_many = array('attribute', 'mini_block', 'product_block');
    public static $ci;
    public $validation = array(
        array(
            'field' => 'id',
            'label' => 'id',
            'rules' => array('trim', 'numeric', 'max_length' => 11),
        ),
        array(
            'field' => 'name',
            'label' => 'Name',
            'rules' => array('required', 'trim', 'min_length' => 2, 'max_length' => 200),
        ),
        array(
            'field' => 'description',
            'label' => 'Description',
            'rules' => array('required', 'trim', 'min_length' => 2, 'max_length' => 2000),
        ),
        array(
            'field' => 'identificator',
            'label' => 'Identificator',
            'rules' => array('required', 'trim', 'min_length' => 2, 'max_length' => 20),
        ),
        array(
            'field' => 'width',
            'label' => 'Width',
            'rules' => array('trim', 'max_length' => 6),
        ),
        array(
            'field' => 'height',
            'label' => 'Height',
            'rules' => array('trim', 'max_length' => 6),
        ),
        array(
            'field' => 'width_param',
            'label' => 'Width percent',
            'rules' => array('required', 'trim', 'max_length' => 2),
        ),
        array(
            'field' => 'height_param',
            'label' => 'Height percent',
            'rules' => array('required', 'trim', 'max_length' => 2),
        ),
        array(
            'field' => 'height_param',
            'label' => 'Height percent',
            'rules' => array('trim', 'max_length' => 300),
        ),
    );

    function __construct($id = NULL) {
        parent::__construct($id);
        if (empty(self::$ci)) {
            self::$ci = &get_instance();
        }
    }

    public function set_from_default() {

        $placeholder = new Placeholder();

        $placeholder->name = 'New placeholder';
        $placeholder->description = 'New placeholder description';

        if ($placeholder->save()) {
            return $placeholder->id;
        }
        else
            return false;
    }

    public function set_placeholder() {
        if (self::$ci->access->check_access(__FUNCTION__) == false)
            return 403;

        $placeholder = new Placeholder();

        if (self::$ci->input->post('id'))
            $placeholder->get_by_id(self::$ci->input->post('id'));

        $placeholder->name = self::$ci->input->post('name');
        $placeholder->description = self::$ci->input->post('description');
        $placeholder->identificator = self::$ci->input->post('identificator');
        $placeholder->position = self::$ci->input->post('position');
        $placeholder->width = self::$ci->input->post('width');
        $placeholder->width_param = self::$ci->input->post('width_param');
        $placeholder->height = self::$ci->input->post('height');
        $placeholder->height_param = self::$ci->input->post('height_param');
        $placeholder->view = self::$ci->input->post('view');

        $this->make_css_file();

        if ($placeholder->save())
            return $placeholder->id;
        else
            return false;
    }

    public function get_all_placeholders() {

        if (self::$ci->access->check_access(__FUNCTION__) == false)
            return 403;

        $placeholder = new Placeholder();

        return $placeholder->get()->all_to_array();
    }

    public function get_placeholder() {

        if (self::$ci->access->check_access(__FUNCTION__) == false)
            return 403;

        $placeholder = new Placeholder();

        $placeholder_id = self::$ci->input->post('id');

        $result = $placeholder->get_by_id($placeholder_id)->to_array();

        $placeholder_attribute = new Attribute();
        $result['attributes'] = $placeholder_attribute->get_placeholder_attribute($placeholder_id);

        $mini_block = new Mini_block();
        $result['mini_blocks'] = $mini_block->get_mini_block_by_placeholder($placeholder_id);

        $product_block = new Product_block();

        $result['product_blocks'] = $product_block->get_product_block_by_placeholder($placeholder_id);

        return $result;
    }

    public function delete_placeholder() {

        if (self::$ci->access->check_access(__FUNCTION__) == false)
            return 403;

        $placeholder = new Placeholder();

        $placeholder_id = self::$ci->input->post('placeholder_id');

        $placeholder->get_by_id($placeholder_id);

        $placeholder_attribute = new Attribute();

        $placeholder_attribute->delete_placeholder_attribute($placeholder->id);

        return $placeholder->delete();
    }

    /*
     * Mini block
     */

    public function set_placeholder_mini_block() {

        if (self::$ci->access->check_access(__FUNCTION__) == false)
            return 403;

        $placeholder = new Placeholder();

        $placeholder->get_by_id(self::$ci->input->post('placeholder_id'));

        $mini_block = new Mini_block();

        $mini_block->get_by_id(self::$ci->input->post('mini_block_id'));

        return $placeholder->save($mini_block);
    }

    public function delete_placeholder_miniblock() {

        if (self::$ci->access->check_access(__FUNCTION__) == false)
            return 403;

        $placeholder = new Placeholder();

        $placeholder->get_by_id(self::$ci->input->post('placeholder_id'));

        $mini_block = new Mini_block();

        $mini_block->get_by_id(self::$ci->input->post('mini_block_id'));

        return $placeholder->delete($mini_block);
    }

    public function make_css_file() {

        $placeholder = new Placeholder();

        $placeholder->get();

        $data = '';

        foreach ($placeholder as $p) {
            $placeholder_attr = new Attribute();

            $placeholder_attr->get_by_placeholder_id($p->id);

            $data .= '#' . $p->identificator . ' {'."\n";

            if ($p->width_param == 0) {
                $data .= '    width: ' . $p->width . '%;'."\n";
            }

            if ($p->height_param == 0) {
                $data .= '    height: ' . $p->height . '%;'."\n";
            }

            foreach ($placeholder_attr as $attr) {
                $data .= '    ' . $attr->key . ': ' . $attr->value . ';'."\n";
            }

            $data .= '}'."\n";
        }

        return write_file('./js/components/user/core/css/core.css', $data);
    }


    /*
     * Product Block
     */

    public function set_placeholder_product_block() {
        if (self::$ci->access->check_access(__FUNCTION__) == false)
            return 403;

        $placeholder = new Placeholder();

        $placeholder->get_by_id(self::$ci->input->post('placeholder_id'));

        $product_block = new Product_block();

        $product_block->get_by_id(self::$ci->input->post('product_block_id'));

        return $placeholder->save($product_block);

    }

    public function delete_placeholder_product_block() {
        if (self::$ci->access->check_access(__FUNCTION__) == false)
            return 403;
        
        $placeholder = new Placeholder();

        $placeholder->get_by_id(self::$ci->input->post('placeholder_id'));

        $product_block = new Product_block();

        $product_block->get_by_id(self::$ci->input->post('product_block_id'));

        return $placeholder->delete($product_block);

    }

    /*
     * USER
     */

    public function get_placeholders_for_user() {

        $placeholder = new Placeholder();

        $placeholder->order_by('position')->get();

        $result = false;

        foreach ($placeholder as $key => $p){

            $mini_block = new Mini_block();
            $product_block = new Product_block();

            $result[$key] = $p->to_array();
            $result[$key]['mini_block'] = $mini_block->get_mini_block_to_user($p->id);
            $result[$key]['product_block'] = $product_block->get_product_block_to_user($p->id);

        }

        return $result;

    }

}

?>