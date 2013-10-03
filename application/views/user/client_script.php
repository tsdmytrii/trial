
<!--<script type="text/javascript"
      src="http://maps.googleapis.com/maps/api/js?key=AIzaSyDaJxQBrJVKcGoh2CqyJx2y-RaiZVHPdT0&sensor=false">
    </script>-->

    <script type="text/javascript">
           var geocoder;
            var map;

        function initializeMap(mapName) {

//            geocoder = new google.maps.Geocoder();
//            var latlng = new google.maps.LatLng(50.4875078, 30.50989149999998);
//            var mapOptions = {
//              zoom: 15,
//              center: latlng,
//              panControl: true,
//              zoomControl: true,
//              mapMaker: true,
//              scaleControl: true,
//              mapTypeId: google.maps.MapTypeId.ROADMAP
//            }
//            map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
////            setTimeout(function(){
//                codeAddress();
////            }, 1000);
          }

          function codeAddress() {
            var address = 'Московский проспект, 22, Киев, город Киев, Украина';
            geocoder.geocode( { 'address': address}, function(results, status) {

              if (status == google.maps.GeocoderStatus.OK) {
                map.setCenter(results[0].geometry.location);
                var marker = new google.maps.Marker({
                    map: map,
                    position: results[0].geometry.location
                });
              } else {
                alert("Geocode was not successful for the following reason: " + status);
              }
    });
  }
    </script>
<noscript>
    <link rel="stylesheet" type="text/css" href="<?= base_url();?>js/css/plugins/960/reset.css">
    <link rel="stylesheet" type="text/css" href="<?= base_url();?>js/css/plugins/windows-engine/jquery.windows-engine.css">
    <link rel="stylesheet" type="text/css" href="<?= base_url();?>js/resources/plugins/jquery.jscrollpane/jquery.jscrollpane.css">
    <link rel="stylesheet" type="text/css" href="<?= base_url();?>js/components/user/core/navigation/css/jquery.contextMenu.css">
    <link rel="stylesheet" type="text/css" href="<?= base_url();?>js/components/user/core/navigation/css/button_panel.css">
    <link rel="stylesheet" type="text/css" href="<?= base_url();?>js/classes/windows/windows.css">
    <link rel="stylesheet" type="text/css" href="<?= base_url();?>js/css/user/main/main.css">
</noscript>

<script type='text/javascript' src='<?= base_url(); ?>js/steal/steal.js'></script>
<script type='text/javascript'>

    <?php
        include(APPPATH . 'language/location.php');
        $language = $localization;
        echo 'lang = ' . json_encode($language);
    ?>

    var base_url = '<?= base_url(); ?>',
    maxi = false,
    route = true;

    navigation_component = false;
//    cashe = true;

    <?php
        if (isset($response)) {
            echo 'navigation_component = ' . $response . '; ';
        }
        echo 'init_data = ' . $all_data . ';';
    ?>
    routing = init_data.data.link;

   if (steal.options.env === 'development'){
        steal('components/user/core')
        .then('components/user/main').then(function(){
            <?php echo "$.cookie.defaults = {path: '/', expires: 365};"; ?>
            <?php echo '$.cookie("lang", ' . $lang_id . ');'; ?>
            $('body').main();
            $('body').addClass('sideBar');
        });
    } else {
        steal('components/user/core/production/production.css', 'components/user/main/production/production.css')
        .then('components/user/core/production')
        .then('components/user/main/production').then(function(){
            <?php echo "$.cookie.defaults = {path: '/', expires: 365};"; ?>
            <?php echo '$.cookie("lang", ' . $lang_id . ');'; ?>
            $('body').main();
            $('body').addClass('sideBar');
        });
    }

</script>