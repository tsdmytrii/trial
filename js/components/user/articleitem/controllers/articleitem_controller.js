$.Controller.extend('Articleitem',{
    defaults: {
        viewpath:'//components/user/articleitem/views/',
        lang: '',
        pref: 'ru'
    }

},{

    init:function(selector, article_item_id, menu_item_id, main, lang_id){

        this.$falseWind = $('.false_window');

        this.Class.container = $('.'+this.Class.fullName.toLowerCase());

        this.elementId = this.Class.container.attr('id');

        var string_param = article_item_id+'/'+menu_item_id+'/'+main+'/'+lang_id;

        if (this.$falseWind.length) {

            $('#'+this.elementId+' .window_preload').hide();

            this.articleGeted(false);

        } else {

            Articleitem_model.get_article(string_param, this.callback('articleGeted'), this.callback('error'));

        }

    },

    articleGeted: function(data){


        var pref = chose_lang_pref(),
        obj = this;

        if (data !== false) {

            if(data.data.lang[pref])
                if ($('#'+this.elementId).data("state") !== "minimized")
                    Windows.setHeadTitle(data.data.lang[pref].seo_title);

            var html = $.View(this.Class.defaults.viewpath+'article.tmpl', {
                our_data: data.data,
                site_url: base_url,
                pref: pref
            });

            $('#'+this.elementId+' .winContWrap').append(html);

        } else {
            $('#'+this.elementId+' .winContWrap').append(this.$falseWind.find('.winContWrap').children());

            this.$falseWind.remove();
        }

        $.window_scroller($('#'+this.elementId+' .articleItemContent'));

        $('#'+this.elementId+' .articleItemWrap').waitForImages(function(){

            if (data != false)
                $('#'+obj.elementId+' .window_preload').fadeOut(200);
            else {
                $('#preloader').fadeOut(200);
            }

        });

    },

    'windNormalToMaxi subscribe': function(event, id){
        if (id == this.elementId) {

            var api = $('#'+this.elementId+' .articleItemContent').data('jsp');

            api.reinitialise();

        }
    },

    'windMaxiToNormal subscribe': function(event, id){

        if (id == this.elementId) {

            var api = $('#'+this.elementId+' .articleItemContent').data('jsp');

            api.reinitialise();

        }

    },

    error: function(response){
        show_error(response.data?response.data:response);
    }

}
);