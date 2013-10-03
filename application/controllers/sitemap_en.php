<?php

@ini_set('display_errors', 1);
error_reporting(7);

class Sitemap_en extends CI_Controller {

	function __construct() {
		parent::__construct();
		$this->load->library('sitemaps');
	}

	function index() {
		$item = array(
		    "loc" => base_url("en"),
		    // ISO 8601 format - date("c") requires PHP5
		 //     "lastmod" => date("c", strtotime((time()))),
		    "changefreq" => "hourly",
		    "priority" => "1"
		);
		$this->sitemaps->add_item($item);

		$item = array(
			    "loc" => base_url("kalendararchive/1/1"),
			    // ISO 8601 format - date("c") requires PHP5
			    "changefreq" => "hourly",
			    "priority" => "0.95"
			);
		$this->sitemaps->add_item($item);
		$item = array(
			    "loc" => base_url("kalendararchive/2/1"),
			    // ISO 8601 format - date("c") requires PHP5
			    "changefreq" => "hourly",
			    "priority" => "0.95"
			);
		$this->sitemaps->add_item($item);
		$item = array(
			    "loc" => base_url("kalendararchive/3/1"),
			    // ISO 8601 format - date("c") requires PHP5
			    "changefreq" => "hourly",
			    "priority" => "0.95"
			);
		$this->sitemaps->add_item($item);		
		$item = array(
			    "loc" => base_url("kalendararchive/4/1"),
			    // ISO 8601 format - date("c") requires PHP5
			    
			    "changefreq" => "hourly",
			    "priority" => "0.95"
			);		
		$this->sitemaps->add_item($item);		
		$item = array(
			    "loc" => base_url("newsararchive/1/1"),
			    // ISO 8601 format - date("c") requires PHP5
			    
			    "changefreq" => "hourly",
			    "priority" => "0.95"
			);
		$this->sitemaps->add_item($item);		
		$item = array(
			    "loc" => base_url("newsarchive/2/1"),
			    // ISO 8601 format - date("c") requires PHP5
			    
			    "changefreq" => "hourly",
			    "priority" => "0.95"
			);
		$this->sitemaps->add_item($item);
		$item = array(
			    "loc" => base_url("newsarchive/3/1"),
			    // ISO 8601 format - date("c") requires PHP5
			    
			    "changefreq" => "hourly",
			    "priority" => "0.95"
			);
		$this->sitemaps->add_item($item);
		$item = array(
			    "loc" => base_url("newsarchive/4/1"),
			    // ISO 8601 format - date("c") requires PHP5
			    
			    "changefreq" => "hourly",
			    "priority" => "0.95"
			);
		$this->sitemaps->add_item($item);
		$item = array(
			    "loc" => base_url("analyticarchive/1/1"),
			    // ISO 8601 format - date("c") requires PHP5
			    
			    "changefreq" => "hourly",
			    "priority" => "0.95"
			);
		$this->sitemaps->add_item($item);		
		$item = array(
			    "loc" => base_url("analyticarchive/2/1"),
			    // ISO 8601 format - date("c") requires PHP5
			    
			    "changefreq" => "hourly",
			    "priority" => "0.95"
			);
		$this->sitemaps->add_item($item);
		$item = array(
			    "loc" => base_url("analyticarchive/3/1"),
			    // ISO 8601 format - date("c") requires PHP5
			    
			    "changefreq" => "hourly",
			    "priority" => "0.95"
			);
		$this->sitemaps->add_item($item);
		$item = array(
			    "loc" => base_url("analyticarchive/4/1"),
			    // ISO 8601 format - date("c") requires PHP5
			   
			    "changefreq" => "hourly",
			    "priority" => "0.95"
			);
		$this->sitemaps->add_item($item);			
		
		$this->load->model(array('app/funds_article_model', 'app/currencies_article_model', 'app/rm_article_model', 'app/ufm_article_model'));
		$posts = $this->funds_article_model->get_articles_sitemap(1);
		//$posts = $this->funds_article->get
		foreach ($posts AS $key => $post) {
			$item = array(
			    "loc" => base_url("funds/" . $post['id'] ."/1"),
			    // ISO 8601 format - date("c") requires PHP5
			    "lastmod" => date("c", strtotime($post['date'])),
			    "changefreq" => "monthly",
			    "priority" => "0.8"
			);

			$this->sitemaps->add_item($item);
		}
		$posts = $this->currencies_article_model->get_articles_sitemap(1);
		//$posts = $this->funds_article->get
		foreach ($posts AS $key => $post) {
			$item = array(
			    "loc" => base_url("currencies/" . $post['id'] ."/1"),
			    // ISO 8601 format - date("c") requires PHP5
			    "lastmod" => date("c", strtotime($post['date'])),
			    "changefreq" => "monthly",
			    "priority" => "0.8"
			);

			$this->sitemaps->add_item($item);
		}
		$posts = $this->rm_article_model->get_articles_sitemap(1);
		//$posts = $this->funds_article->get
		foreach ($posts AS $key => $post) {
			$item = array(
			    "loc" => base_url("commodities/" . $post['id'] ."/1"),
			    // ISO 8601 format - date("c") requires PHP5
			    "lastmod" => date("c", strtotime($post['date'])),
			    "changefreq" => "monthly",
			    "priority" => "0.8"
			);

			$this->sitemaps->add_item($item);
		}
		$posts = $this->ufm_article_model->get_articles_sitemap(1);
		//$posts = $this->funds_article->get
	
		
	//	$sitemap->add_item($item); //Append the item to the sitemap object
		//	$sitemap->build("./sitemap.xml"); //Build it...
		//	//Let's compress it to gz
		//	$data = implode("", file("./sitemap.xml"));
		//	$gzdata = gzencode($data, 9);
		//	$fp = fopen("./sitemap.xml.gz", "w");
		//	fwrite($fp, $gzdata);
		//	fclose($fp);
		//Let's Ping google
		//	$this->_pingGoogleSitemaps(base_url() . "/sitemap.xml.gz");
		$file_name = $this->sitemaps->build("sitemap_en.xml");
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
