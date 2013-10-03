<?php

class User_model extends MY_Model{
	var $table;
	function __construct() {
		$this->table = 'user';
		parent::__construct();
	}
	function get_user($where){
		return $this->get_row($where, '*', $this->table);
	}
}
?>
