<?php

class Sender {

	var $ci;

	function __construct() {
		$this->ci = &get_instance();
//		$this->ci->load->library(array('app/funds_article', 'app/currencies_article', 'app/rm_article'));
	}

	function send_article($article_id, $action, $market) {

		$this->send_article_to_public($article_id, $action, $market);

	}

	function send_indexes($data, $action, $chanel) {

            $this->ci->comet->send($chanel, array('data' => $data));

	}


	function send_article_to_public($article_id, $action, $market) {

		$class = $this->select_class($market);
		switch ($action) {

			case 'add':
			case 'update': {
					//echo $action;
					$langs = $this->ci->language->get_langs();
					foreach ($langs as $key => $lang) {
						//		print_r($lang);
						if ($class->get_article_lang($article_id, $lang['id'], TRUE) !== false) {
							//			echo 1;
							$this->ci->comet->send($market . '_' . $lang['iso_code'], array('type' => $action, 'data' => $class->get_article_by_id($article_id, $lang['id'])));
						}
					}
				}
				break;
			case 'delete': {
					$langs = $this->ci->language->get_langs();
					foreach ($langs as $key => $lang) {
						//if ($class->get_article_lang($article_id, $lang['id'], TRUE) !== false)
						$this->ci->comet->send($market . '_' . $lang['iso_code'], array('type' => $action, 'data' => $article_id));
					}
				}
				break;
		}
	}

	function select_class_by_id($market) {
		switch ($market) {
			case '1':
				$class = $this->ci->funds_article;
				break;
			case '2';
				$class = $this->ci->currencies_article;
				break;
			case '3':
				$class = $this->ci->rm_article;
				break;
			case '4':
				$class = $this->ci->ufm_article;
				break;
		}
		return $class;
	}
	function select_class($market) {
		switch ($market) {
			case 'funds':
				$class = $this->ci->funds_article;
				break;
			case 'currencies';
				$class = $this->ci->currencies_article;
				break;
			case 'rm':
				$class = $this->ci->rm_article;
				break;
			case 'ufm':
				$class = $this->ci->ufm_article;
				break;
		}
		return $class;
	}
	function send_update($article_id, $market_id, $type, $action) {

		$class = $this->select_class_by_id($market_id);
		switch ($action) {
			case 'update': {
					$langs = $this->ci->language->get_langs();
					foreach ($langs as $key => $lang) {
						if ($class->get_article_lang($article_id, $lang['id'], TRUE) !== false) {
							$article = $class->get_article_by_id($article_id, $lang['id']);
							$article['market_id'] = $market_id;
							$this->ci->comet->send($type . '_' . $lang['iso_code'], array('type' => $action, 'data' => $article));
						}
					}
				}
		}
	}

}

?>