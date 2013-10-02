<?php
/* 
 * class Menu_controller 
 * 
 * Operates with all menu elements 
 */
class Campaigns_controller extends MY_Controller {

    /*
     * Construct func of Menu_controller class 
     * 
     * Loads helpers and libraries, lets language for session
     */
    function __construct() {
         parent::__construct();
        $this->load->helper(array('form', 'url'));
        $this->load->library(array('form_validation', 'upload', 'plugins/image'));
        $this->session->set_userdata('lang', 2);
        }

    /*
     * Defaults func of Menu_controller.
     * 
     * Loads 'admin/toper' view with menu tab data or outputs it by json.
     *  
     * @var string $name Tab's name for load. 
     */
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

   /**************************************************************************************************
                                                      Subscriber functions
    ***************************************************************************************************/

   /*
     * Get campaign by id
     */
        public function get_campaign_by_id(){
        $campaign = new Campaign();

        $this->return_result($campaign->get_campaign_by_id());
    }
    /*
     * Create/edit subscriber 
     */
        public function set_campaign(){
        $campaign = new Campaign();

        $result = $campaign->set_campaign();
       $this->return_result($result);
//        
        $config = array(
                'apikey' => '7ff522349ba2ec8bf1182c94c9c222dd-us7',
                'opts' => array()
            );
//            
             $this->load->library('Mailchimp', $config, 'mail_chimp');
            $api = new Mailchimp($config);
            $result = $this->mail_chimp->call('campaigns/create', array(
                'apikey' => '7ff522349ba2ec8bf1182c94c9c222dd-us7',
                'type'=>'regular',
                'options' => array(
                    'list_id'=> '3f6f884105',
                    'subject'=> 'example subject',
                    'from_email'=> 'tsybriidmytro@gmail.com',
                    'from_name'=>'Tsybrii Dmyro',
                    'to_name'=> 'Your name',
                    'title'=> 'example title',
                ),
                'content'=> array(
                    'html'=> 'example html',
                    'text'=> 'example text'
                 )
                ));
            
//             $result = $this->mail_chimp->call('campaigns/list', array());
             
//               var_dump($result);
      
    }
    
    public function get_campaign(){
        $campaign = new Campaign();

        $result = $campaign->get_campaign();
        var_dump($result);
//        $this->return_result($result);
    }

    /*
     * Get exactly subscriber 
     */
    public function get_subscriber_by_id(){
        $subscriber = new Subscriber();

        $this->return_result($subscriber->get_subscriber_by_id());
    }

    /*
     * Get all subscribers 
     */
    public function get_all_subscribers(){
        $subscriber = new Subscriber();

        $this->return_result($subscriber->get_all_subscribers());
            }

    /*
     * Delete exactly subscriber 
     */
    public function delete_subscriber(){
        $subscriber = new Subscriber();

        $result = $subscriber->delete_subscriber();

        $this->return_result($result);
    }
    
    public function change_new_state(){
        $subscriber = new Subscriber();
        
        $result = $subscriber->change_new_state();

        $this->return_result($result);
    } 

  /**************************************************************************************************
                                                      Subscription functions
    ***************************************************************************************************/
 
      /*
     * Create/edit subcription
     */
    public function set_subscription(){
       
        $subscription = new Subscription();

        $result = $subscription->set_subscription();

        $this->return_result($result);
    }

    /*
     * Get exactly subscription 
     */


    /*
     * Get all subscriptions
     */
        public function get_all_subscriptions(){
     
            $subscription = new Subscription();

       $this->return_result($subscription->get_all_subscriptions());
            
    }
  

    /*
     * Delete exactly subscription 
     */
    public function delete_subscription(){
        $subscription = new Subscription();

        $result = $subscription->delete_subscription();

        $this->return_result($result);
    }

    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    /*
     * Create/edit menu item
     */
    public function set_menu_item(){
        $menu_item = new Menu_item();

        $result = $menu_item->set_menu_item();

        $this->return_result($result);
    }

    
    public function set_related_menu_item(){
        $menu_item = new Menu_item();

        $result = $menu_item->set_related_menu_item();

        echo $this->return_result($result);
    }

    public function set_menu_item_relation(){
        $menu_item = new Menu_item_relation();

        $result = $menu_item->set_menu_item_relation();

        $this->return_result($result);
    }

    public function get_menu_item(){
        $menu_item = new Menu_item();

        $result = $menu_item->get_menu_item();

        echo $this->return_result($result);
    }

    public function get_menu_item_for_parent(){
        $menu_item = new Menu_item();

        $result = $menu_item->get_menu_item_for_parent();

        echo $this->return_result($result);
    }

    /*
     * Get menu item by parent menu block id
     */
    public function get_menu_item_by_block(){
        $menu_item = new Menu_item();

        $result = $menu_item->get_menu_item_by_block();

        echo $this->return_result($result);
    }

    public function delete_menu_item(){
        $menu_item = new Menu_item();

        $result = $menu_item->delete_menu_item();

        echo $this->return_result($result);
    }

    public function minus_menu_item(){
        $menu_item = new Menu_item();

        $result = $menu_item->minus_menu_item();

        echo $this->return_result($result);
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

    /*
     * Autocompletes menu item's name
     */
    public function menu_item_autocomplete(){
        $menu_item = new Menu_item();

        $result = $menu_item->get_menu_item_autocomplete();

        echo json_encode($result);
    }
}
?>
