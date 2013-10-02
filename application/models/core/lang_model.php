<?php

class Lang_model extends CI_Model {

	var $table;

	function __construct() {
		parent::__construct();
		$this->table = 'languages';
	}

	function get_langs($where = false, $columns = 'id, name, iso_code') {
		$this->db->select($columns);
		if ($where !== FALSE) {
			$this->db->where($where);
		}
		$query = $this->db->get($this->table);
		return $query->result_array();
	}

}

?>