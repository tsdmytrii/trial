$.Controller.extend('product',
    /* @Static */
    {

        defaults : {
            viewpath: '//components/user/product/views/',
            commonViewPath: '//components/user/common_views/',
            pref: 'ru'
        }
    },
    /* @Prototype */
    {
        init: function(selector, id, menu_item_id, main, lang_id){

            this.selector = $(selector);

            this.$falseWind = $('.false_window');

            this.elementId = this.element.attr('id');

            // string_param = id
            var string_param = id+'/'+menu_item_id+'/'+main+'/'+lang_id;
            
            // -
//            this.id = 'staticcomp-'+string_param.replace(/[\/]+/g,'-');

            if (this.$falseWind.length) {

                $('#'+this.elementId+' .window_preload').hide();

                this.contentGeted(false);

            } else {

                Product_model.get_content(string_param, this.callback('contentGeted'), this.callback('error'));

            }

        },

        contentGeted: function(data) {
            // функция из хелпера /js/resourses/helper
            var pref = chose_lang_pref(),
            
            obj = this
            
            if (data !== false) {

                var html = $.View(this.Class.defaults.viewpath+'index.tmpl', {
                    our_data: data.data,
                    site_url: base_url,
                    id: this.id,
                    windTabWrap: windTabWrap,
                    className: this.innerNavOptions.blockClass,
                    openInTab: this.componentOpenedInTab,
                    pref: pref
                });

                if (this.componentOpenedInTab === false) {
                    $('#'+this.elementId+' .winContWrap').append(html);
                } 
                
                if(data.data.lang[pref])

                    if ($('#'+this.elementId).data("state") !== "minimized"){

                        Windows.currentTabHistoryStep++;
// только первый параметр
                        Windows.setHeadTitle(data.data.lang[pref].seo_title);

                    }
// data = false
            } else {
   //+
   $('#'+this.elementId+' .winContWrap').append(this.$falseWind.find('.winContWrap').children());

                this.$falseWind.remove();
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

