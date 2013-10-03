<!DOCTYPE html>
<html lang="en">
    <head>
        <meta content="text/html; charset=UTF-8" http-equiv="content-type" />

        <title>
            <?php if (isset($data['lang'][$lang]['seo_title'])) echo $data['lang'][$lang]['seo_title'];?>
        </title>
        <meta name="Keywords" content="<?php if (isset($data['lang'][$lang]['key_words'])) echo $data['lang'][$lang]['key_words'];?>">
        <meta name="Description" content="<?php if (isset($data['lang'][$lang]['seo_description'])) echo $data['lang'][$lang]['seo_description'];?>">

        <?php include(APPPATH . 'views/user/client_script.php');?>
        <?php include(APPPATH . 'views/user/google_code.php');?>

    </head>
    <body>
<?php include(APPPATH . 'views/user/preloader.php');?>