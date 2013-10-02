<?php

class Sitemap_controller extends MY_Controller {

	function __construct() {
		parent::__construct();
                $this->load->helper(array('form', 'url'));
		$this->load->library('core/sitemaps');
	}

	function create_sitemap() {
		//	$sitemap = new google_sitemap; //Create a new Sitemap Object
		//	$item = new google_sitemap_item(base_url(), date("Y-m-d"), 'weekly', '0.8'); //Create a new Item
		$item = array(
		    "loc" => base_url(),
		    "changefreq" => "weekly",
		    "priority" => "1"
		);
                $this->sitemaps->add_item($item);
//
//                $item = array(
//		    "loc" => base_url("en"),
//		    "changefreq" => "weekly",
//		    "priority" => "1"
//		);
//		$this->sitemaps->add_item($item);

                $item = array(
		    "loc" => base_url("question/0"),
		    "changefreq" => "weekly",
		    "priority" => "0.3"
		);
		$this->sitemaps->add_item($item);

		$menu_item = new Menu_item();
                $posts = $menu_item->get_menu_item_sitemap();

		foreach ($posts AS $key => $post) {
			$item = array(
			    "loc" => base_url($post),
			    "changefreq" => "monthly",
			    "priority" => "0.8"
			);
			$this->sitemaps->add_item($item);
		}


                $article_item = new Article_item();
                $posts = $article_item->get_article_items_sitemap();

		foreach ($posts AS $key => $post) {
			$item = array(
			    "loc" => base_url($post),
			    "changefreq" => "monthly",
			    "priority" => "0.8"
			);
			$this->sitemaps->add_item($item);
		}

		$news_online = new News_online();
                $posts = $news_online->get_news_online_sitemap();

		foreach ($posts AS $key => $post) {
			$item = array(
			    "loc" => base_url($post),
			    "changefreq" => "monthly",
			    "priority" => "0.8"
			);
			$this->sitemaps->add_item($item);
		}


		$file_name = $this->sitemaps->build("sitemap.xml");

                echo 'sitemap created: ' . date("d.m.yy") . ' ' . date("H:i:s");
	}

	function _pingGoogleSitemaps($url_xml) {
		$status = 0;
		$google = 'www.google.com';
		if ($fp = @fsockopen($google, 80)) {
			$req = 'GET /webmasters/sitemaps/ping?sitemap=' .
				urlencode($url_xml) . " HTTP/1.1\r\n" .
				"Host: $google\r\n" .
				"User-Agent: Mozilla/5.0 (compatible; " .
				PHP_OS . ") PHP/" . PHP_VERSION . "\r\n" .
				"Connection: Close\r\n\r\n";
			fwrite($fp, $req);
			while (!feof($fp)) {
				if (@preg_match('~^HTTP/\d\.\d (\d+)~i', fgets($fp, 128), $m)) {
					$status = intval($m[1]);
					break;
				}
			}
			fclose($fp);
		}
		return( $status );
	}

}