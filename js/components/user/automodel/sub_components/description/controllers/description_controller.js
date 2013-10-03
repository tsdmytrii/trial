$.Controller.extend('Description', {

    defaults: {
        viewpath:'//components/user/automodel/sub_components/description/views/',
        pref: 'ru'
    }

},{

    init: function(selector, automodel_id, autobrend_id, main, lang_id, window_id) {

        this.selector = $(selector);

        this.window_id = window_id

        this.automodel_id = automodel_id;

        var stringParam = automodel_id+'/'+autobrend_id+'/'+main+'/'+lang_id+'/description';

        if (this.selector.hasClass('serverLoad')) {

            this.descriptionGeted(false);

        } else {

            Description_model.get_automodel_description(stringParam, this.callback('descriptionGeted'), this.callback('error'));

        }

    },

    descriptionGeted: function(data){
        var obj = this,
        images = [];

        if (data !== false) {
            var html = $.View(this.Class.defaults.viewpath+'description.tmpl', {
                our_data: data.data,
                automodel_id: this.automodel_id,
                site_url: base_url
            });

            this.selector.html(html);

            images = data.data.photo ? jlinq.from(data.data.photo).select(function(r){
                var image = r.name;
                return image;
            }) : [];
        } else {
            $.each($('.galeryPhoto', '#'+this.window_id), function(i){
                var href = $(this).attr('href');

                images[images.length] = href.split(base_url+'uploads/images/')[1];
            });
        }

        if (images.length)
            this.lazyLoad(images);

        this.fancyBox();

        $.window_scroller($('#'+this.window_id+' .descriptionAutoModel'));

        var api = $($('#'+this.window_id+' .descriptionAutoModel')).data('jsp');
        if (api) {
            if ($.browser.msie) {
                // IE fires multiple resize events while you are dragging thebrowser window which
                // causes it to crash if you try to update the scrollpane on everyone. So we need
                // to throttle it to fire a maximum of once every 50 milliseconds...
                var throttleTimeout;
                if (!throttleTimeout) {
                    throttleTimeout = setTimeout(
                        function() {
                            api.reinitialise();
                            throttleTimeout = null;
                        },
                        50);
                }
            }
        }

        this.selector.find('.galeryWrap').waitForImages(function(){

            if (data !== false)
                $('#'+obj.window_id+' .window_preload').fadeOut(200);
            else {
                $('#preloader').fadeOut(200);
            }

        });
    },

    fancyBox: function(){
        this.selector.find("a:has(img)").fancybox({
            overlayShow: true,
            overlayOpacity: 0.5,
            zoomSpeedIn: 200,
            zoomSpeedOut: 200,
            transitionIn:'elastic',
            transitionOut:'elastic'
        });
    },

    lazyLoad: function(images){
        $.each(images, function(){
            $([base_url+'uploads/images/'+this]).preload();
        });
    },

    'windNormalToMaxi subscribe': function(event, id){
        if (id == this.window_id) {

            $('#'+this.window_id+' .descriptionAutoModelWrap').css({
                'margin': '0.5% 0 0 0',
                'width': '100%'
            });

            if (this.selector.hasClass('current')) {
                var api = $('#'+this.window_id+' .descriptionAutoModel').data('jsp');

                api.reinitialise();

            }

        }
    },

    'windMaxiToNormal subscribe': function(event, id){

        if (id == this.window_id) {

            $('#'+this.window_id+' .descriptionAutoModelWrap').css({
                'margin': '0.5% 0 0 1%',
                'width': '99%'
            });

            if (this.selector.hasClass('current')) {

                var api = $('#'+this.window_id+' .descriptionAutoModel').data('jsp');

                api.reinitialise();

            }

        }

    },

    error: function(response){
        show_error(response.data?response.data:response);
    }

}
);