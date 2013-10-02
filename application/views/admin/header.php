<?php if (!defined('BASEPATH'))
	exit('No direct script access allowed'); ?>
<!DOCTYPE html>
<html>
    <head>
	<meta http-equiv="Content-type" content="text/html; charset=utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge, chrome=1">

        <title><?= (isset($layout_title) ? $layout_title : '') ?></title>
        <meta name="description" content="">
        <meta name="author" content="">

        <meta name="viewport" content="width=device-width, initial-scale=1">

        <link rel="shortcut icon" href="<?= base_url() ?>favicon.ico"/>

        <meta http-equiv="cleartype" content="on">

	<script type='text/javascript'
		src='<?=base_url()?>js/steal/steal.js'>
	</script>

	<script type="text/javascript">
		var img_url = '<?=base_url();?>';
		var base_url = '<?=base_url()?>';
                var lang = <?= json_encode($lang)?>;
	</script>
