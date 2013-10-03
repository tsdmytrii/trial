<script type="text/javascript">
    var component_types,
        component_to_load = <?= json_encode($data);?>;
    steal('components/admin/core')
    .then('components/admin/menu')
    .then(function(){
        $('body').navigation(component_to_load);
    });
</script>
</head>
<body>