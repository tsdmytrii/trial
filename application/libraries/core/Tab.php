<?php

class Tab {

	var $ci;

	function __construct() {
		$this->ci = &get_instance();
		$this->ci->load->model(array('core/tab_model', 'core/tab_lang_model', 'core/tab_components_model'));
	}

	public function get_tabs($lang_id) {
		$tabs = $this->ci->tab_model->get_tabs();
		foreach ($tabs as $key => $tab) {
			$name = $this->get_tab_name($tab['id'], $lang_id);
			if ($name !== FALSE)
			{
				$tabs[$key]['name'] = $name;
			}
			else{
				break;
				return false;
			}
		}
		return $tabs;
	}

        public function get_components_by_tab_name($tab_name) {
		//echo $tab_name;
		$tab = $this->ci->tab_model->get_tab(array('alt_name' => $tab_name));
//		var_dump($tab);
		if ($tab !== false) {
			$components = $this->ci->tab_components_model->get_tab_component(array('tab_id' => $tab['id']));
			if ($components !== false) {
				return $components;
			}
			else
				return false;
		}
		else
			return false;
	}

	public function get_tab_name($tab_id, $lang_id) {
		$tab = $this->ci->tab_lang_model->get_tab(array('tab_id' => $tab_id, 'lang_id' => $lang_id));
		if ($tab && $tab[0]) {
			return $tab[0]['name'];
		} else {
			return FALSE;
		}
	}

}

?>
