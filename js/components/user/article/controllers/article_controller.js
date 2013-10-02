$.Controller.extend('Article',{
    defaults: {
        viewpath:'//components/user/article/views/',
        commonViewPath: '//components/user/common_views/',
        lang: '',
        pref: 'ru',
        quant: 10
    }

},{

    init:function(selector, article_id, menu_item_id, main, lang_id){

        this.selector = $(selector);

        this.componentOpenedInTab = false;

        if (this.selector.hasClass('windTabCont')) {
            this.componentOpenedInTab = true;
        }

        this.$falseWind = $('.false_window');

        if (this.componentOpenedInTab === false) {

            this.elementId = $('.'+this.Class.fullName.toLowerCase()).attr('id');

        } else {

            this.elementId = this.selector.parents('.window-container').attr('id');

        }

        this.innerNavOptions = {
            isWindow: init_data.data.windowOn,
            controllerBlock: this.elementId+' .window-titleBar-content',
            divControlledWrap: this.elementId,
            divWrapper: '#'+this.elementId+' .winContWrap',
            base_url: base_url,
            serverLoad: this.$falseWind.length ? true : false,
            defaultComponent: false,
            blockClass: 'windTabCont',
            params: false
        };

        var string_param = article_id+'/'+menu_item_id+'/'+main+'/'+lang_id;

        this.id = 'article-'+string_param.replace(/[\/]+/g,'-');

        if (this.$falseWind.length) {

            $('#'+this.elementId+' .window_preload').hide();

            this.articleGeted(false);

        } else {

            Article_model.get_all_article(string_param, this.callback('articleGeted'), this.callback('error'));

        }

    },

    articleGeted: function(data){

        var obj = this,
        windTabWrap = false,
        pref = chose_lang_pref(),
        dataHistory = {};
        dataHistory.href = document.location.href;
        dataHistory.type = 'bookmark';
        dataHistory.componentBlock = '#'+this.id;
        dataHistory.sameBlocks = this.innerNavOptions.divWrapper+' .'+this.innerNavOptions.blockClass;
        dataHistory.divWrapper = this.innerNavOptions.divWrapper;
        dataHistory.controllerBlock = this.innerNavOptions.controllerBlock;

        if (data !== false){
            var our_data = data.data.data;

            if (data.data.menu !== false && !$('#'+this.elementId+' .inner_navigation').length) {

                var head = $.View(this.Class.defaults.commonViewPath+'head.tmpl', {
                    our_data: data.data.menu,
                    site_url: base_url,
                    lang_id: $.cookie('lang'),
                    pref: pref
                });

                windTabWrap = true;

                $('#'+this.elementId+' .window-titleBar-content').html(head);

                this.innerNavigationInit();

            } else {
                $('#'+this.elementId+' .window-titleBar-content').css({
                    'color': '#000',
                    'padding-left': '15px'
                });
            }

            for (var i = 0; i < our_data.length; i++) {
                our_data[i].lang[pref].description = our_data[i].lang[pref].description.slice(0, 200);
                var lastSpace = our_data[i].lang[pref].description.lastIndexOf(' ');
                our_data[i].lang[pref].description = our_data[i].lang[pref].description.slice(0, lastSpace);
            }

            var html = $.View(this.Class.defaults.viewpath+'all_article.tmpl', {
                our_data: data.data.data,
                pref: this.Class.defaults.pref,
                id: this.id,
                windTabWrap: windTabWrap,
                className: this.innerNavOptions.blockClass,
                openInTab: this.componentOpenedInTab,
                menu_item: data.data.menu_item,
                lang_id: $.cookie('lang'),
                site_url: base_url,
                seo: data.data.seo
            });

            if (this.componentOpenedInTab === false) {
                $('#'+this.elementId+' .winContWrap').append(html);
            } else {
                this.selector.append(html);
            }

            if (data.data.seo[this.Class.defaults.pref]){

                if ($('#'+this.elementId).data("state") !== "minimized") {

                    Windows.currentTabHistoryStep++;

                    dataHistory.history_tab_step = Windows.currentTabHistoryStep;

                    Windows.setHeadTitle(data.data.seo[pref].seo_title, dataHistory);

                }

            }

        } else {

            $('#'+this.elementId+' .window-titleBar-content').html(this.$falseWind.find('.window-titleBar-content').children());
            $('#'+this.elementId+' .winContWrap').append(this.$falseWind.find('.winContWrap').children());

            this.$falseWind.remove();

            if ($('#'+this.elementId+' .windHeadItem').length) {

                this.innerNavigationInit();

                Windows.currentTabHistoryStep++;

                dataHistory.history_tab_step = Windows.currentTabHistoryStep;

                Windows.setHistoryLink(document.location.href, '', false, '', this.elementId.split('_window')[0], false, dataHistory);
            } else {
                $('#'+this.elementId+' .window-titleBar-content').css({
                    'color': '#000',
                    'padding-left': '15px'
                });
            }

        }

        this.selector.waitForImages(function(){

            $.window_scroller($('#'+obj.id+' .articleWrap'));

            if (data !== false)
                $('#'+obj.elementId+' .window_preload').fadeOut(200);
            else {
                $('#preloader').fadeOut(200);
            }

        });
    },

    innerNavigationInit: function(){

        $('#'+this.elementId+' .window-titleBar-content').inner_navigation(this.innerNavOptions);

    },

    scrollerReInit: function(){
        var api = false;

        if (this.componentOpenedInTab === false) {

            if ($('#'+this.id).hasClass('current'))

                api = $('#'+this.id+' .staticCompContent').data('jsp');

        }

        if (api !== false)
            api.reinitialise();
    },


    'windNormalToMaxi subscribe': function(event, id){
        if (id === this.elementId) {

            var api = $('#'+this.elementId+' .articleWrap').data('jsp');

            api.reinitialise();

        }
    },

    'windMaxiToNormal subscribe': function(event, id){

        if (id === this.elementId) {

            var api = $('#'+this.elementId+' .articleWrap').data('jsp');

            api.reinitialise();

        }

    },

    error: function(response){
        show_error(response.data?response.data:response);
    }

}
);