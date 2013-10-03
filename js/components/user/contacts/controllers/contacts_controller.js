$.Controller.extend('Contacts',
    /* @Static */
    {

        defaults : {
            viewpath: '//components/user/contacts/views/',
            pref: 'ru'
        }
    },
    /* @Prototype */
    {
        init: function(data, id, menu_item_id, main, lang_id){

            this.id = id;

            this.Class.defaults.pref = chose_lang_pref_by_lang_id(lang_id);

            var container = $('.'+this.Class.fullName.toLowerCase()),
            hideP = false,
            obj = this;

            this.elementId = container.attr('id');

            var fakeWind = $('div.window-container[data-false_window="contacts"]');

            if (fakeWind.length) {

                hideP = true;

                if (parseInt(init_data.data.windowOn)) {
                    $('#'+this.elementId+' .window_preload').hide();

                    $('#'+this.elementId+' .winContWrap').html(fakeWind.find('.winContWrap').children());

                    fakeWind.remove();

                } else {

                    Windows.checkMaximised(true, true);

                    Windows.findMaxWindPosition($('#'+this.elementId));

                }

            } else {

                var html = $.View(this.Class.defaults.viewpath+'index.tmpl', {
                    our_data: init_data.data.contacts,
                    site_url: base_url,
                    lang_id: $.cookie('lang'),
                    pref: chose_lang_pref()
                });

                $('#'+this.elementId+' .winContWrap').html(html);
            }

            this.loadMap();

            $('#'+this.elementId).waitForImages(function(){
                if (hideP == false)
                    $('#'+obj.elementId+' .window_preload').fadeOut(200);
                else
                    hidePreloader();
            });


        },

        loadMap: function(){
            if ($('#'+this.elementId).css('display') == 'none') {
                visibilityToggle($('#'+this.elementId), true);
            }

            var geocoder = new google.maps.Geocoder();
            var latlng = new google.maps.LatLng(50.4875078, 30.50989149999998);
            var mapOptions = {
                zoom: 15,
                center: latlng,
                panControl: true,
                zoomControl: true,
                mapMaker: true,
                scaleControl: true,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            }
            var map = new google.maps.Map(document.getElementById("bigMapWrap"), mapOptions);

            var address = 'Московский проспект, 22, Киев, город Киев, Украина';
            geocoder.geocode( {
                'address': address
            }, function(results, status) {

                if (status == google.maps.GeocoderStatus.OK) {
                    map.setCenter(results[0].geometry.location);
                    var marker = new google.maps.Marker({
                        map: map,
                        position: results[0].geometry.location,
                        title:"Автоцентр на Московском"
                    });


                    var contentString = '<div style="width: 250px;" id="content">'+
                    '<div id="siteNotice">'+
                    '</div>'+
                    '<h2 id="firstHeading" class="firstHeading">Автоцентр на Московском</h2>'+
                    '<div id="bodyContent">'+
                    '<p>Московский просп., 22, Киев, город Киев, 04655, Украина<br />(044) 206 2002</p><br />'+
                    '<img src="'+base_url+'js/images/logo.png">'+
                    '<img src="'+base_url+'js/images/autocentr_g.jpg">'+
                    '</div>'+
                    '</div>';

                    var infowindow = new google.maps.InfoWindow({
                        content: contentString
                    });

                    infowindow.open(map,marker);

                } else {
                    alert("Geocode was not successful for the following reason: " + status);
                }
            });

        },

        error: function(data){
            alert('Sorry for the technical work carried out online');
        }
    })

