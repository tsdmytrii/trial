$.Controller.extend('Static_comp',
    /* @Static */
    {

        defaults : {
            viewpath: '//components/user/static_comp/views/',
            commonViewPath: '//components/user/common_views/',
            pref: 'ru'
        }
    },
    /* @Prototype */
    {
        init: function(selector, id, menu_item_id, main, lang_id){

            this.selector = $(selector);
// -
            this.componentOpenedInTab = false;
// -
            if (this.selector.hasClass('windTabCont')) {
                this.componentOpenedInTab = true;
            }

            this.$falseWind = $('.false_window');
// -
// this.element.attr('id);
            if (this.componentOpenedInTab === false) {

                this.elementId = $('.'+this.Class.fullName.toLowerCase()).attr('id');

            } else {

                this.elementId = this.selector.parents('.window-container').attr('id');

            }
// -
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
// string_param = id
            var string_param = id+'/'+menu_item_id+'/'+main+'/'+lang_id;
// -
            this.id = 'staticcomp-'+string_param.replace(/[\/]+/g,'-');

            if (this.$falseWind.length) {

                $('#'+this.elementId+' .window_preload').hide();

                this.contentGeted(false);

            } else {

                Static_comp_model.get_content(string_param, this.callback('contentGeted'), this.callback('error'));

            }

        },

        contentGeted: function(data) {
// фнкция из хелпера /js/resourses/helper
            var pref = chose_lang_pref(),
            //-
            windTabWrap = false,
            
            obj = this,
            //-
            dataHistory = {};
            dataHistory.href = document.location.href;
            dataHistory.type = 'bookmark';
            dataHistory.componentBlock = '#'+this.id;
            dataHistory.sameBlocks = this.innerNavOptions.divWrapper+' .'+this.innerNavOptions.blockClass;
            dataHistory.divWrapper = this.innerNavOptions.divWrapper;
            dataHistory.controllerBlock = this.innerNavOptions.controllerBlock;

            
            if (data !== false) {

                //-
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

                }

                var html = $.View(this.Class.defaults.viewpath+'index.tmpl', {
                    our_data: data.data,
                    site_url: base_url,
                    id: this.id,
                    windTabWrap: windTabWrap,
                    className: this.innerNavOptions.blockClass,
                    openInTab: this.componentOpenedInTab,
                    pref: pref
                });
// +
                if (this.componentOpenedInTab === false) {
                    $('#'+this.elementId+' .winContWrap').append(html);
                } else {
                    // -
                    this.selector.append(html);
                }


                if(data.data.lang[pref])

                    if ($('#'+this.elementId).data("state") !== "minimized"){

                        Windows.currentTabHistoryStep++;
//-
                        dataHistory.history_tab_step = Windows.currentTabHistoryStep;
// только первый параметр
                        Windows.setHeadTitle(data.data.lang[pref].seo_title, dataHistory);

                    }

// data = false
            } else {
//-
$('#'+this.elementId+' .window-titleBar-content').html(this.$falseWind.find('.window-titleBar-content').children());
   //+
   $('#'+this.elementId+' .winContWrap').append(this.$falseWind.find('.winContWrap').children());

                this.$falseWind.remove();
//-
                if ($('#'+this.elementId+' .windHeadItem').length) {

                    this.innerNavigationInit();

                    Windows.currentTabHistoryStep++;

                    dataHistory.history_tab_step = Windows.currentTabHistoryStep;

                    Windows.setHistoryLink(document.location.href, '', false, '', this.elementId.split('_window')[0], false, dataHistory);
                }

            }


            $.window_scroller($('#'+this.id+' .staticCompContent'));

            this.selector.waitForImages(function(){

                if (data !== false)
                    $('#'+obj.elementId+' .window_preload').fadeOut(200);
                else
                    $('#preloader').fadeOut(200);


            });

        },

//-
        innerNavigationInit: function(){

            $('#'+this.elementId+' .window-titleBar-content').inner_navigation(this.innerNavOptions);

        },

        'windNormalToMaxi subscribe': function(event, id){
            if (id === this.elementId) {

                this.scrollerReInit();

            }
        },

        'windMaxiToNormal subscribe': function(event, id){

            if (id === this.elementId) {

                this.scrollerReInit();

            }

        },

        scrollerReInit: function(){
            var api = false;

            if ($('#'+this.id).hasClass('current'))

                api = $('#'+this.id+' .staticCompContent').data('jsp');



            if (api !== false)
                api.reinitialise();
        },

        error: function(data){
            alert('Sorry for the technical work carried out online');
        }
    });

