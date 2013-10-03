<?php

class MY_Model extends CI_Model {

	//var $table;
	function __construct() {
		parent::__construct();
		//$this->table = $table;
	}

	function get_row($where, $fields, $table) {
		$query = $this->db->select($fields)->where($where)->get($table);
		if ($query->num_rows() > 0) {
			return $query->row_array();
		}
		else
			return false;
	}

	function insert_row($data, $table) {
		$this->db->insert($table, $data);
		return $this->db->insert_id();
	}

	function get_collection($where = false, $fields = '*', $table, $limit = false, $offset = false) {

		$this->db->select($fields);

		$this->db->from($table);
		if ($where !== false) {
			$this->db->where($where);
		}
		$query = $this->db->get();

		if ($query->num_rows() !== 0) {
			return $query->result_array();
		} else {
			return false;
		}
	}
	function update_row($data, $where, $table){
		return $this->db->update($table, $data, $where);
	}
	function delete_row($where, $table){
		return $this->db->delete($table, $where);
	}
	function array_sort_by_column(&$arr, $col, $dir = SORT_ASC) {
		$sort_col = array();
		foreach ($arr as $key => $row) {
			$sort_col[$key] = $row[$col];
		}

		array_multisort($sort_col, $dir, $arr);
	}
}

?>
