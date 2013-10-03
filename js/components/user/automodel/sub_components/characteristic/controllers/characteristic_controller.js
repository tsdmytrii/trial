$.Controller.extend('Characteristic', {
    defaults: {
        viewpath:'//components/user/automodel/sub_components/characteristic/views/'
    }

},{

    init: function(selector, automodel_id, autobrend_id, main, lang_id, window_id){

        this.selector = $(selector);

        this.window_id = window_id;

        this.automodel_id = automodel_id;

        var stringParam = automodel_id+'/'+autobrend_id+'/'+main+'/'+lang_id+'/characteristic';

        if (this.selector.hasClass('serverLoad')) {

            this.characteristicGeted(false);

        } else {

            Characteristic_model.get_automodel(stringParam, this.callback('characteristicGeted'), this.callback('error'));

        }

    },

    characteristicGeted: function(data){
        var obj = this;

        if (data !== false) {

            var dataObject = {
                our_data: data.data,
                automodel_id: this.automodel_id,
                pref: chose_lang_pref(),
                lang_id: $.cookie('lang'),
                site_url: base_url
            },

            html = $.View(this.Class.defaults.viewpath+'characteristic.tmpl', dataObject);

            this.selector.append(html);

        }

        this.emptyBlockHeight();

        $('#'+this.window_id+' .charCaption').on('click', function(event){
            event.preventDefault();

            var id = $(this).attr('href');

            var jSPAPI = $('#'+obj.window_id+' .charContWrap').data('jsp');
            try {
                jSPAPI.scrollToElement($(id), true, true);
            } catch(err){
                return false;
            }
        });

        var table = $([0]);
        var tr = $([0]);
        $.each($('#'+this.window_id+' .charCont table'), function(){
            table[0] = this;
            $.each(table.find('tr'), function(i){
                tr[0] = this;
                if (i % 2 != 0) {
                    tr.addClass('even');
                }
            });
        });

//        setTimeout(function(){
            $.char_scroller($('#'+obj.window_id+' .charContWrap'));
//        }, 1000);


        var api = $($('#'+this.window_id+' .charContWrap')).data('jsp'),
        throttleTimeout;
        if (api) {
            if ($.browser.msie) {
                // IE fires multiple resize events while you are dragging thebrowser window which
                // causes it to crash if you try to update the scrollpane on everyone. So we need
                // to throttle it to fire a maximum of once every 50 milliseconds...
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

        if (data !== false)
            $('#'+obj.window_id+' .window_preload').fadeOut(200);
        else {
            $('#preloader').fadeOut(200);
        }
    },

    '.charContWrap scroll': function(){
        var $wrap = $('#'+this.window_id+' .charContWrap .jspContainer'),
        containerTop = $wrap.offset().top,
        obj = this,
        edgeMargin = 15;

        $('#'+this.window_id+' .charCont').each(function(i) {
            var blockTop = $(this).offset().top;
            var blockBottom = blockTop + $(this).height();

            if ( blockTop < (containerTop + edgeMargin) &&  blockBottom > (containerTop + edgeMargin) ){
                $('#'+obj.window_id+' .charCaption')
                .removeClass('active')
                .eq(i).addClass('active');
            }

        });

    },

    'windNormalToMaxi subscribe': function(event, id){
        if (id == this.window_id) {

            $('#'+this.window_id+' .charContainer').css('padding', 0);

            if (this.selector.hasClass('current')){

                var api = $('#'+this.window_id+' .charContWrap').data('jsp');

                this.emptyBlockHeight();

                api.reinitialise();
            }

        }
    },

    'windMaxiToNormal subscribe': function(event, id){

        if (id == this.window_id) {

            $('#'+this.window_id+' .charContainer').css('padding', '0 20px');

            if (this.selector.hasClass('current')){

                var api = $('#'+this.window_id+' .charContWrap').data('jsp');

                this.emptyBlockHeight();

                api.reinitialise();
            }

        }

    },

    emptyBlockHeight: function(){
        var wrapHeight = $('#'+this.window_id+' .charContWrap').height(),

        lastBlockHeight = $('#'+this.window_id+' .charCont:last').height();

        if (lastBlockHeight < wrapHeight)
            $('#'+this.window_id+' .emptyBlock').css('height', wrapHeight-lastBlockHeight);
        else
            $('#'+this.window_id+' .emptyBlock').css('height', 0);
    },

    error: function(response){
        show_error(response.data?response.data:response);
    }

}
);