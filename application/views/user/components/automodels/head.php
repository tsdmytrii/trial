<!DOCTYPE html>
<html lang="en">
    <head>
        <meta content="text/html; charset=UTF-8" http-equiv="content-type" />

        <?php

        $header_data = json_decode($all_data, true);

        $header_data = $header_data['data']['header'];

        foreach ($header_data as $h) {
            if (intval($h['component_type_id']) == 26) {
                $menu_item = $h;
            }
        }

        ?>

        <title><?= $menu_item['lang'][$lang]['value']?></title>

        <?php include(APPPATH . 'views/user/client_script.php');?>
        <?php include(APPPATH . 'views/user/google_code.php');?>

    </head>
    <body>
<?php include(APPPATH . 'views/user/preloader.php');?>