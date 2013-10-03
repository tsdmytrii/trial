<?php

if (!defined('BASEPATH'))
	exit('No direct script access allowed');

$config['rss_en'] = array(

    'fxstreet' => array(

	    'channels' => array(
		array(
		    'channel' => 'http://feeds.fxstreet.com/fundamental/economic-calendar',
		    'type' => 'short',
		    'lang' => 1,
		    'lang_iso' => 'en'
		)
	    ),

            'class'=> 'calendar'
    )
);
$config['rss_ru'] = array(

    'teletrade' => array(

	    'channels' => array(
		array(
		    'channel' => 'http://rssportal.ru/feed/168791.xml',
		    'type' => 'short',
		    'lang' => 1,
		    'lang_iso' => 'ru'
		)
	    ),

            'class'=> 'calendar'
    )
);
?>