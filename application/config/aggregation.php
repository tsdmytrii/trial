<?php

if (!defined('BASEPATH'))
	exit('No direct script access allowed');

$config['rss_en'] = array(

    'forexfactory' => array(

	    'channels' => array(
		array(
		    'channel' => 'http://www.forexfactory.com/rss_feed.php?type=RSS2&forumids=8,107,89,106,108,174&place=fn',
		    'type' => 'short',
		    'lang' => 1,
		    'lang_iso'=>'en'
		)
	    ),

            'class'=> 'news_online'

    )
);
$config['rss_ru'] = array(

    'fxstreet' => array(

	    'channels' => array(
		array(
		    'channel' => 'http://subscriptions.fxstreet.com/xml/news.aspx?c=F84A8A7D184843EEA0F9&i=russiannewscharts',
		    'type' => 'short',
		    'lang' => 2,
		    'lang_iso'=>'ru'
		)
	    ),

            'class'=> 'news_online'

    )
);
?>