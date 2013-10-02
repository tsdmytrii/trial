<script type="text/javascript">
	var base_url = '<?= base_url();?>';
	var needed_data = <?= json_encode($data);?>;
	steal('components/admin/core')
        .then('components/admin/nav')
        .then(function(){
		$('.navbar').nav_widget(needed_data);
	})
        .then(function(){

	});

</script>
</head>