<!DOCTYPE html>
<html lang="en">
    <head>
        <meta content="text/html; charset=UTF-8" http-equiv="content-type" />
        <?php if (isset($seo)): ?>
            <title><?php if (isset($seo['lang'][$pref]) && !empty($seo['lang'][$pref]) && !empty($seo['lang'][$pref]['title'])) echo $seo['lang'][$pref]['title']; ?></title>
            <meta name="Keywords" content="<?php if (isset($seo['lang'][$pref]) && !empty($seo['lang'][$pref]) && !empty($seo['lang'][$pref]['key_words'])) echo $seo['lang'][$pref]['key_words'] ?>">
            <meta name="Description" content="<?php if (isset($seo['lang'][$pref]) && !empty($seo['lang'][$pref]) && !empty($seo['lang'][$pref]['description'])) echo $seo['lang'][$pref]['description'] ?>">
        <?php endif; ?>

        <?php include(APPPATH . 'views/user/client_script.php');?>
        <?php include(APPPATH . 'views/user/google_code.php');?>

    </head>
    <body>
<?php include(APPPATH . 'views/user/preloader.php');?>