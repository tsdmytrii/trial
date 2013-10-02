$.Controller.extend('Search',{
    defaults: {
        viewpath:'//components/user/search/views/',
        pref: 'ru'
    }

},{

    init: function(selector, automodel_id, menu_item_id, main, lang_id, searchStr){

        if (searchStr == undefined)
            searchStr = '';


        this.Class.container = $('.'+this.Class.fullName.toLowerCase());

        this.elementId = this.Class.container.attr('id');

        this.window = $('#'+this.elementId);

        this.automodel_id = automodel_id;

        $('#'+this.elementId+' .winContWrap').css('overflow', 'hidden');

        this.$falseWind = $('div.window-container[data-false_window="search"]');

        var bodyTmpl = $.View(this.Class.defaults.viewpath+'body.tmpl', {
            searchStr: searchStr
        });

        $('#'+this.elementId).find('.winContWrap').append(bodyTmpl);

        if (searchStr == '' || searchStr.length < 5) {

            var results = $.View(this.Class.defaults.viewpath+'results.tmpl', {
                searchStr: searchStr,
                our_data: 0
            });

            $('#searchResultWrap').append(results);

        } else {

            this.search(searchStr);

        }

        if (this.$falseWind.length) {

//            this.automodelGeted(false);

        } else {

            $('#'+this.elementId+' .window_preload').fadeOut(200);

//            var string_param = automodel_id+'/'+menu_item_id+'/'+main+'/'+lang_id;
//
//            var head = $.View(this.Class.defaults.viewpath+'head.tmpl', {
//                automodel_id: automodel_id
//            });
//
//            $('#'+this.elementId+' .window-titleBar-content').html(head);
//
//            Automodel_model.get_automodel(string_param, this.callback('automodelGeted'), this.callback('error'));
        }

    },

    search: function(searchStr, params){

        if (params == undefined)
            params = 0;

        Search_model.search({
            searchStr: searchStr,
            lang_id: $.cookie('lang'),
            components: params
        }, this.callback('searchResult'), this.callback('error'));

    },

    searchResult: function(data){
        console.log(data);
    },

    automodelGeted: function(data){
        var obj = this,
        images = [];

        if (data == false) {

            if (parseInt(init_data.data.windowOn)) {

                $('#'+this.elementId+' .window-titleBar-content').html(this.$falseWind.find('.window-titleBar-content').children());

                this.window.append(this.$falseWind.find('.autoModelListWrap')).append(this.$falseWind.find('.charNavWrap'));

                $('#'+this.elementId+' .winContWrap').html(this.$falseWind.find('.winContWrap').children());

                this.$falseWind.remove();

            } else {

                Windows.checkMaximised(true, true);

                Windows.findMaxWindPosition($('#'+this.elementId));

            }

            $('#'+this.elementId+' .window_preload').hide();

            $.each($('.galeryPhoto', '#'+this.elementId), function(i){
                var href = $(this).attr('href');

                images[images.length] = href.split(base_url+'uploads/images/')[1];
            });

            this.lazyLoad(images);

        } else {

            var automodels = jlinq.from(init_data.data.autobrend).equals("id", parseInt(data.data.autobrend_id)).select()[0],

            dataObject = {
                our_data: data.data,
                automodels: automodels,
                automodel_id: this.automodel_id,
                pref: chose_lang_pref(),
                lang_id: $.cookie('lang'),
                site_url: base_url
            },

            html = $.View(this.Class.defaults.viewpath+'automodel.tmpl', dataObject),

            side_menu = $.View(this.Class.defaults.viewpath+'automodel_menu.tmpl', dataObject);

            $('#'+this.elementId+' .winContWrap').html(html);

            images = jlinq.from(data.data.photo).select(function(r){
                var image = r.name;
                return image;
            });

            this.lazyLoad(images);

            this.window.append(side_menu);

        }

        $.window_scroller($('#'+this.elementId+' .descriptionAutoModel'));

        if (data !== false)
            $('#'+obj.elementId+' .window_preload').fadeOut(200);
        else {
            $('#preloader').fadeOut(200);
        }

    },

    '.searchForm submit': function(el, ev){
        ev.preventDefault();

        var checked = [],
        checkElement = $([0]);

        $(".compSearchCheck:checked").each(function (){

            checkElement[0] = this;
            checked.push(parseInt(checkElement.val()));

        });

        this.search($('#searchStr').val(), checked);

    },

    'windNormalToMaxi subscribe': function(event, id){
        if (id == this.elementId) {

            if ($('#'+this.elementId+' .charContWrap').is(':visible')){

                $('#'+this.elementId+' .charContainer').css('padding', 0);

                var api = $('#'+this.elementId+' .charContWrap').data('jsp');

                this.emptyBlockHeight();

                api.reinitialise();
            }

            $('#'+this.elementId+' .descriptionAutoModelWrap').css({
                'margin': '0.5% 0 0 0',
                'width': '100%'
            });

            if ($('#'+this.elementId+' .descriptionAutoModel').is(':visible')){

                api = $('#'+this.elementId+' .descriptionAutoModel').data('jsp');

                api.reinitialise();

            }

        }
    },

    'windMaxiToNormal subscribe': function(event, id){

        if (id == this.elementId) {

            $('#'+this.elementId+' .charContainer').css('padding', '0 20px');

            if ($('#'+this.elementId+' .charContWrap').is(':visible')){

                var api = $('#'+this.elementId+' .charContWrap').data('jsp');

                this.emptyBlockHeight();

                api.reinitialise();
            }

            $('#'+this.elementId+' .descriptionAutoModelWrap').css({
                'margin': '0.5% 0 0 1%',
                'width': '99%'
            });

            if ($('#'+this.elementId+' .descriptionAutoModel').is(':visible')){

                api = $('#'+this.elementId+' .descriptionAutoModel').data('jsp');
                api.reinitialise();

            }

        }

    },

    error: function(response){
        show_error(response.data?response.data:response);
    }

}
);