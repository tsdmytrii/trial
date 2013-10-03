$.Controller.extend('Automodels',{
    defaults: {
        viewpath:'//components/user/automodels/views/',
        lang: '',
        pref: 'ru',
        quant: 10
    }

},{

    init:function(selector, automodel_id, menu_item_id, main, lang_id, scrollToId){

        var obj = this, hideP = false;

        this.Class.container = $('.'+this.Class.fullName.toLowerCase());

        this.elementId = this.Class.container.attr('id');

        var fakeWind = $('div.window-container[data-false_window="automodels"]');

        if (fakeWind.length) {

            hideP = true;

            if (parseInt(init_data.data.windowOn)) {
                $('#'+this.elementId+' .window_preload').hide();

                $('#'+this.elementId+' .winContWrap').html(fakeWind.find('.winContWrap').children());

                fakeWind.remove();
            } else {
                Windows.checkMaximised(true, true);

                Windows.findMaxWindPosition($('#'+this.elementId))
            }

        } else {
            var autobrends = init_data.data.autobrend;

            $.each(autobrends, function(i){
                this.automodel_s = obj.sortData(this.automodel, i);
            });

            var html = $.View(this.Class.defaults.viewpath+'automodels.tmpl', {
                our_data: init_data.data.autobrend,
                site_url: base_url,
                lang_id: $.cookie('lang'),
                pref: chose_lang_pref()
            });

            $('#'+this.elementId+' .winContWrap').html(html);

            $('#'+this.elementId+" .lazy").lazyload({
                skip_invisible : false
            });
        }

        this.emptyBlockHeight();

        $.window_scroller($('#'+this.elementId+' .autoModelsTblCont'));

        if (scrollToId !== undefined)
            this.scrollTo('#autoBrend_'+scrollToId, false);


        $('#'+this.elementId).waitForImages(function(){
            if (hideP == false)
                $('#'+obj.elementId+' .window_preload').fadeOut(200);
            else
                hidePreloader();
        });
    },

    sortData: function(data, autoBrendI){

        var sortedData = [],
        helperArray = [],
        k = 0,
        j = 0;

        for (var i = 0; i < data.length; i++) {

            helperArray[k] = data[i];

            var left = 0;

            if (k !== 0 && helperArray[k].quant > 1){
                left = -(helperArray[k].quant-1)*50;
            }

            if (k === 1 && helperArray[k].quant > 3) {
                left = -100;
            }

            if (k === 3 && helperArray[k].quant > 3) {
                left = -200;
            }

            if (k === 4 && helperArray[k].quant > 1) {
                left = -100;
            }

            if (k === 4 && helperArray[k].quant > 2) {
                left = -200;
            }

            if (k === 4 && helperArray[k].quant > 3) {
                left = -300;
            }

            helperArray[k].left = 'left: '+left+'%;';

            k++;

            if (((i+1) % 5) === 0){
                sortedData[j] = helperArray;
                helperArray = [];
                j++;
                k = 0;
            }

            if ((i+1) === data.length) {

                if (helperArray.length < 5)
                    for (var z = helperArray.length; z <= 5; z++) {
                        helperArray[helperArray.length] = {
                            empty: true
                        }
                    }

                sortedData[j] = helperArray;
            }

        }

        return sortedData;
    },

    '.autoBrendLogoItem click': function(el, ev){
        ev.preventDefault();
        ev.stopPropagation();

        $('.autoBrendLogoItem').removeClass('active')
        $(el).addClass('active');

        this.scrollTo($(el).attr('href'), true);
    },

    scrollTo: function(id, animate) {
        var jSPAPI = $('#'+this.elementId+' .autoModelsTblCont').data('jsp');
        try {
            jSPAPI.scrollToElement($(id), true, animate);
        } catch(err){
            return false;
        }
    },

    '.autoModelsTblCont scroll': function(){
        var $wrap = $('#'+this.elementId+' .autoModelsTblCont .jspContainer'),
        containerTop = $wrap.offset().top,
        obj = this,
        edgeMargin = 50;

        $('.autoBrendCont', '#'+this.elementId).each(function(i) {
            var blockTop = $(this).offset().top;
            var blockBottom = blockTop + $(this).height();

            if ( blockTop < (containerTop + edgeMargin) &&  blockBottom > (containerTop + edgeMargin) ){

                $('.autoBrendLogoItem', '#'+obj.elementId).removeClass('active').eq(i).addClass('active');
                $('.autoBrendCont', '#'+obj.elementId).removeClass('active').eq(i).addClass('active');

            }
        });

    },

    'automodelsScrollTo subscribe': function(event, id){
        this.scrollTo('#autoBrend_'+id, false);
    },

    'windNormalToMaxi subscribe': function(event, id){
        if (id == this.elementId && $('#'+this.elementId).is(':visible')) {
             var api = $('#'+this.elementId+' .autoModelsTblCont').data('jsp');

            this.emptyBlockHeight();

            api.reinitialise();
        }
    },

    emptyBlockHeight: function(){
        var wrapHeight = $('#'+this.elementId+' .autoModelsTblCont').height(),
        lastBlockHeight = $('#'+this.elementId+' .autoBrendCont:last').height();

        if (lastBlockHeight < wrapHeight)
            $('#'+this.elementId+' .emptyBlock').css('height', wrapHeight-lastBlockHeight);
    },

    error: function(response){
        show_error(response.data?response.data:response);
    }

}
);