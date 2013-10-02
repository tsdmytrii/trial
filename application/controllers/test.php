<?php

class Test extends CI_Controller {

    public function index() {
        $config = array(
            'apikey' => '7ff522349ba2ec8bf1182c94c9c222dd-us7', // Insert your api key
            'opts' => array()   // Optional (defaults to FALSE)
        );
        $this->load->library('Mailchimp', $config, 'mail_chimp');

        
//        $result = $this->mail_chimp->call('campaigns/list', array());
//        
//            var_dump($result);
    
        $result2 = $this->mail_chimp->call('campaigns/content', array('cid'=>'286014dfdd'));
            
            var_dump($result2);
        
    }
    
    

}

?>
