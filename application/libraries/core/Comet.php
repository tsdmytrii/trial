<?php

if (!defined('BASEPATH'))
	exit('No direct script access allowed');

class Comet {
	var $ci;
	public function __construct() {
		
		$this->ci = &get_instance();
		$this->ci->load->config('realplexor', true);
		//$params = array('host' => $this->ci->config->item('host', 'realplexor'), 'port' => $this->ci->config->item('port', 'realplexot'), 'namespace' => $this->ci->config->item('namespace', 'realplexor'), 'identifier' => $this->ci->config->item('identifier', $this->ci->config->item('identifier', 'realplexor')));
		$params = array('host' => '127.0.0.1', 'port' => '10010', 'namespace' => null, 'identifier' => 'identifier');
		
		$this->ci->load->library('third_party/dklab_realplexor', $params);
		//print_r($this->ci->dklab_realplexor->cmdOnline());
	}

	public function send($idsAndCursors, $data, $showOnlyForIds = null) {
		
		return $this->ci->dklab_realplexor->send($idsAndCursors, $data, $showOnlyForIds);
	}

}

?>
