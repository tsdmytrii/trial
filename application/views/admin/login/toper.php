<script type="text/javascript">
	steal('components/admin/core').then('components/admin/bootstrap', 'components/admin/login').then(
	function(){
		$(function(){
			$('body').login();
		});
	});

</script>
</head>