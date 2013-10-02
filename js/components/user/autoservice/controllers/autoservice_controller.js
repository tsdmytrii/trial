$.Controller.extend('Autoservice', {

    defaults: {
        viewpath:'//components/user/autoservice/views/',
        pref: 'ru'
    }

}, {

    init: function(selector, automodel_id, menu_item_id, main, lang_id){

        this.$falseWind = $('.false_window');

        this.Class.container = $('.'+this.Class.fullName.toLowerCase());

        this.elementId = this.Class.container.attr('id');

        this.window = $('#'+this.elementId);

        var string_param = automodel_id+'/'+menu_item_id+'/'+main+'/'+lang_id;

        if (this.$falseWind.length) {

            $('#'+this.elementId+' .window_preload').hide();

            this.autoserviceGeted(false);

        } else {

            Autoservice_model.get_autoservice(string_param, this.callback('autoserviceGeted'), this.callback('error'));

        }

    },

    autoserviceGeted: function(data){

        var obj = this;

        if (data !== false) {
            var html = $.View(this.Class.defaults.viewpath+'autoservice.tmpl', {
                site_url: base_url,
                our_data: data.data,
                pref: chose_lang_pref()
            });

            $('#'+this.elementId+' .winContWrap').append(html);

        } else {

            $('#'+this.elementId+' .winContWrap').append(this.$falseWind.find('.winContWrap').children());

            this.$falseWind.remove();

        }


        $('#'+this.elementId+' .aSBaner').waitForImages(function(){
            $.window_scroller($('#'+obj.elementId+' .aSDescriptionContent'));

            if (data != false)
                $('#'+obj.elementId+' .window_preload').fadeOut(200);
            else {
                $('#preloader').fadeOut(200);
            }

        });

    },

    'windNormalToMaxi subscribe': function(event, id){
        if (id == this.elementId) {

            var api = $('#'+this.elementId+' .aSDescriptionContent').data('jsp');

            api.reinitialise();

        }
    },

    'windMaxiToNormal subscribe': function(event, id){

        if (id == this.elementId) {

            var api = $('#'+this.elementId+' .aSDescriptionContent').data('jsp');

            api.reinitialise();

        }

    },

    '.aSGroupMenuItem click': function(el){

        var $amSection = $(el).parent();

        if (!$amSection.hasClass('active')){
            var index = $(el).attr('data-index'),
            targetImg, i,
            activeNow = $('.aSMenuSection.active');

            for (i = 0; i < $('.aSBanerImg').length; i++) {
                if (i == index) {
                    targetImg = $('.aSBanerImg:eq('+i+')');
                }
            }

            activeNow.children('.bg, .aSMenuItemsWrap').fadeOut(300, function(){
                activeNow.removeClass('active');
                $amSection.children('.bg, .aSMenuItemsWrap').fadeIn(300, function(){
                    $amSection.addClass('active');
                });

                targetImg.css('z-index', 10).fadeIn(300, function(){
                    $('.aSBanerImg').css('z-index', 0).removeClass('active');
                    targetImg.addClass('active');
                    $('.aSBanerImg:not(.active)').hide();
                });
            });

        }
    },

    error: function(response){
        show_error(response.data?response.data:response);
    }

}
);