/*
 * @class Main_controller
 * @tag main, controller, navigation
 * @parent main
 * @plugin main
 * @download arsenal/js/components/user/main/main.js
 * ###Main controller
 *
 * Documentation for main controller
 * Makes the start init on page:
 *
 * * Loades menu
 * * Inits navigation
 * * Makes right visual proportion
 * * Inits languages
 *
 * In this version of documentation will be described only part connected with navigation
 */
$.Controller.extend('Main',
/*
* @static
*/
{

    viewpath:'//components/user/main/views/',

    lang_id: 2,

    fontSizeKoef: 0.005059524,

    autoModelKoef: 0.2007,

    scrollHeight: 15,

    min_width: init_data.data.marking.min_width,

    max_width: init_data.data.marking.max_width,

    min_height: init_data.data.marking.min_width/(init_data.data.marking.width/init_data.data.marking.height),

    w_h_koef: init_data.data.marking.width/init_data.data.marking.height,

    pref: 'ru'
},
/*
* @prototype
*/
{
    /*
     * @function init
     * Initializes work of Main controller, called from server views/user/init_codes on line 53 on 'body'
     * We executte here next steps according to navigation:
     *
     * * if (navigation_component) { checks a global navigation_component, if it exists write this component into options
     * * options = { In Object options specify Navigation options
     * * $('body').navigation(options) inits Navigation on body with an options object
     * * winPanSelector - where all buttons of Windows will append
     * * mainSelector - where content with new component will append
     * * sub - component prefix
     * * componentLoad - Object of component which should be loaded when Navigation is inited,
     * is used to create a window from content, which returned via direct link, not return of server thatswhy deprecated
     * * isHash - load from hash(deprecated); isCookie - load from Cookie; isWindow - should we make a Window from our server response
     * We ve got a record in navigation_options table in db for these options
     */

    init:function(){
        this.linkUs = 0;
        this.popUp = 0;
        this.timer = null;

        var options = {
            mainSelector: '#body_wrapper',
            winPanSelector: 'body',
            sub: 'main',
            componentLoad: navigation_component ? {
                'componentId': navigation_component.componentName,
                'title': navigation_component.title
            } : false,
            isHash: 0,
            isCookie: init_data.data.windowOn,
            isWindow: init_data.data.windowOn
        },
        obj = this;

        $(document).ready(function(){

            obj.define_page_size();

            $('body').navigation(options);

            if (!$('.false_window').length){
                hidePreloader();
            }

            initializeMap('map_canvas');
            
           
        });

        this.fancyBox();

        preloadImage();
//        $('#bannerItemPict').css('height', '100%');
$('.bannerItemPict:not(.active)').css('display', 'none');
        $("img.lazy").css({
            'display': 'none', 
            'width': 100+'%',
            'height': 100+'%'
        });
        $("img.active").css({
            'width': 100+'%',
            'height': 100+'%'
        });
        
        $('#bannerPagination').css({
            'font-size': '22px', 
            'position': 'relative', 
            'top':'-30px', 
            'left':'20px', 
            'color': 'black'
        })
        $('#mainMenu').css({
            'font-size': '16px'
        });
        
    },

    fancyBox: function(){
        $('#autoCentrBg').fancybox({
            overlayShow: true,
            overlayOpacity: 0.5,
            zoomSpeedIn: 300,
            zoomSpeedOut: 300,
            transitionIn:'elastic',
            transitionOut:'elastic'
        });
    },

    '{window} resize': function () {

        this.define_page_size();

        if ($('.window-container').length)
            Windows.defineWindSize();

    },

    define_page_size: function(){

        $('body, #pageWrap, #contentWrap, #footer, #dynamicCont').removeAttr('style');

        var window_width = (window.innerWidth ? window.innerWidth : (document.documentElement.clientWidth ? document.documentElement.clientWidth : document.body.offsetWidth)),
        window_height = (window.innerHeight ? window.innerHeight : (document.documentElement.clientHeight ? document.documentElement.clientHeight : document.body.offsetHeight));

        if (window_width/window_height > Main.w_h_koef) {

            var content_width = Main.w_h_koef*window_height;

            if (content_width < Main.min_width) {

                this.miniSize(window_width);

            } else if (content_width < Main.max_width) {

                $('#pageWrap').css({
                    'width': content_width+'px',
                    'margin': '0 auto'
                });

            }

            if (content_width > Main.max_width) {

                this.dynamicBlockHeight(window_height, Main.max_width, true);

            } else {

                this.sectionHeight(false);

            }

            content_width = content_width < Main.min_width ? Main.min_width : content_width;
            content_width = content_width > Main.max_width ? Main.max_width : content_width;

            var fontSize = (content_width - Main.min_width)*Main.fontSizeKoef + 9.3;

            $('body').css('font-size', fontSize+'px');

        } else {

            if (window_width < Main.min_width) {

                window_width = Main.min_width;

                if (window_width/window_height > Main.w_h_koef) {

                    this.miniSize(window_width);

                    this.sectionHeight(false);

                } else {

                    this.dynamicBlockHeight(window_height, Main.min_width);

                }

            } else {

                this.dynamicBlockHeight(window_height, window_width > Main.max_width ? Main.max_width : window_width, window_width > Main.max_width ? true : false);

            }

            fontSize = (window_width-Main.min_width)*Main.fontSizeKoef + 9.3;

            $('body').css('font-size', fontSize+'px');
        }

    },

    miniSize: function(window_width){
        $('#pageWrap').css({
            'width': Main.min_width,
            'height': Main.min_height,
            'margin': '0 auto'
        });

        $('body').css({
            'overflow-x': window_width <= Main.min_width ? 'visible' : 'hidden',
            'overflow-y': 'visible'
        });
    },

    dynamicBlockHeight: function(window_height, window_width, maxi){
        var contentWrapHeight = window_width*0.446,
        footerHeight = window_width*0.02,
        footerPadding = window_width*0.002,
        dynamicHeight = window_width <= Main.min_width ? window_height - window_height*0.004 - contentWrapHeight - footerHeight - Main.scrollHeight : window_height - window_height*0.004 - contentWrapHeight - footerHeight;

        $('#contentWrap').height(contentWrapHeight);

        $('#footer').css({
            height: footerHeight,
            'padding-top': footerPadding
        });
        $('.dynamic').css({
            height: dynamicHeight
        });

        if (maxi === true) {
            $('#pageWrap').css({
                width: window_width,
                margin: '0 auto'
            });
        } else {
            $('body').css({
                width: window_width,
                'overflow-x': window_width <= Main.min_width ? 'visible' : 'hidden'
            });
        }

        this.sectionHeight(dynamicHeight);
    },

    sectionHeight: function(dynamicHeight){

        var autoBrend = $([0]),
        autoModels = $([0]);

        if (dynamicHeight === false) {

            dynamicHeight = $('.dynamic').height();

        }

        var autoModelBrendWrapHeight = dynamicHeight*0.91*0.9;
        var autoModelBrendWrapWidth = $('#autoModelItemsWrap').width();

        if (autoModelBrendWrapWidth < 795)
            autoModelBrendWrapWidth = 795;

        var autoModelWidth = Math.floor((autoModelBrendWrapWidth*0.96/8)*0.86);
        if (autoModelWidth > 110) {
            autoModelWidth = 110;
        }

        var autoModelHeight = Math.floor((autoModelWidth*64)/110);
        var lineHeight = Math.floor(autoModelHeight/0.61);
        var blockQuantity = Math.floor(autoModelBrendWrapHeight/lineHeight);
        if (blockQuantity === 0) {
            blockQuantity = 1;
        }
        var lineHeightPerCent = Math.floor((lineHeight/autoModelBrendWrapHeight)*100);

        $.each($('.autoModelBrendWrap'), function(i){

            autoBrend[0] = this;

            $.each(autoBrend.children('.autoModelSector'), function(j){

                autoModels[0] = this;

                if ((j+1) <= blockQuantity) {

                    autoModels.show();

                } else {

                    autoModels.hide();

                }

            });

        });

        $('.autoModelSector').css('height', lineHeightPerCent+'%');
        $('.autoModelItem').children('.autoModelPict').css('width', autoModelWidth+'px');
        $('.autoModelItem').find('.autoModelRelPict').css('width', autoModelWidth+'px');

    },

    '.autoBrendLogo:not(.disabled) click': function(el){
        var $wrap = $(el).parents('.autoBrendItem');

        if (!$wrap.hasClass('active')) {

            var $autoBrendLogo = $('.autoBrendLogo'),
            autobrend_id = $wrap.data('autobrend_id');

            $autoBrendLogo.addClass('disabled');

            $('#allAutoModelWrapCapt').attr('data-additional_param', autobrend_id);

            var $wasActive = $('.autoBrendItem.active');

            $wasActive.children('.autoBrendInfo').children('div').hide();

            $wasActive.children('.autoBrendInfo').fadeOut(300, function(){

                $wasActive.removeClass('active');

                $wrap.addClass('active');

                var index = $wrap.index();

                $('.autoBrendItemPict:eq('+index+')').css('z-index', 2).fadeIn(300, function(){
                    $('.autoBrendItemPict').removeClass('active').css('z-index', 0);
                    $('.autoBrendItemPict:eq('+index+')').addClass('active');
                    $('.autoBrendItemPict:not(.active)').hide();
                });

                $wrap.children('.autoBrendInfo').fadeIn(300, function(){

                    $wrap.children('.autoBrendInfo').children('div').show();

                    $autoBrendLogo.removeClass('disabled');
                });

            });

            $('.autoModelBrendWrap.active').fadeOut(300, function(){
                $('.autoModelBrendWrap').removeClass('active');
                var target = $('.autoModelBrendWrap[data-autobrend_id="'+autobrend_id+'"]');
                target.fadeIn(300, function(){
                    target.addClass('active');
                });
            });

        }
    },

    '#linkUs mouseenter': function(){
        if ($('#popUpWrap').css('visibility') === 'hidden') {
            $('#popUpWrap').css({
                display: 'none',
                visibility: 'visible'
            });
        }

        this.linkUs = 1;

        clearTimeout(this.timer);
        this.timer = null;

        this.showPopUp();

    },

    '#linkUs mouseleave': function(){
        this.linkUs = 0;

        this.hidePopUp();
    },

    '#popUpWrap mouseenter': function(){
        this.popUp = 1;

        clearTimeout(this.timer);
        this.timer = null;

        this.showPopUp();
    },

    '#popUpWrap mouseleave': function(){
        this.popUp = 0;

        this.hidePopUp();
    },

    showPopUp: function(){

        if (!$('#popUpWrap').is(':visible'))
            $('#popUpWrap').stop(false, true).fadeIn(200);

    },

    hidePopUp: function(){

        var obj = this;
        if (!obj.timer) {

            clearTimeout(obj.timer);

            obj.timer = setTimeout(
                function() {
                    if (obj.linkUs === 0 && obj.popUp === 0)
                        $('#popUpWrap').stop(false, true).fadeOut(200);

                    obj.timer = null;
                },
                500);
        }
    },

    '.allNewsCaption, .randMenuItenCapt mouseenter': function(el){

        var $el = $(el);

        clearTimeout($el.data('timer'));
        $el.data('timer', null);

        this.showTooltip(el);

    },

    '.allNewsCaption, .randMenuItenCapt mouseleave': function(el){

        var $el = $(el);

        this.hideTooltip($el);

    },

    showTooltip: function(el){

        if (!el.siblings('.tooltipMiniBlock').is(':visible'))
            el.siblings('.tooltipMiniBlock').fadeIn(200);

    },

    hideTooltip: function(el){
        var timer = el.data('timer');

        if (!timer) {

            clearTimeout(timer);

            timer = setTimeout(
                function() {
                    el.siblings('.tooltipMiniBlock').stop(false, true).fadeOut(200);
                    timer = null;
                }, 200
                );

            el.data('timer', timer);
        }
    },

    '#allAutoModelWrapCapt click': function(el, ev){
        ev.preventDefault();

        var $targetWind = $('.automodels0');

        if ($targetWind.length) {

            visibilityToggle($targetWind, true);

            $targetWind.automodels0('scrollTo', '#autoBrend_'+$(el).attr('data-additional_param'), false)

            visibilityToggle($targetWind, false);

        }
    },

    '#logoAC click': function(){

        if ($.cookie('ieOff') || parseInt(init_data.data.windowOn) == 0)
            document.location.href = base_url;

        $.each($('.window-container'), function(i){

            if($(this).data('state')=='normal'){

                var id = $(this).attr('id').split('_window')[0];

                Windows.showWindow(id, true);

            }

        });

        //        $('title').html($('#hidden_title').text());

        Windows.setHistoryLink(Windows.currentUrl, true, 'start', null);
        Windows.setHeadTitle(Windows.currentTitel);
    },

    '#askButton click': function(el){
        if ($(el).data('state') === 'mini') {
            $('#askQuestCont').animate({
                right: '-6%'
            }, 300);
            $(el).data('state', 'maxi');
        } else {
            $('#askQuestCont').animate({
                right: '-107%'
            }, 300);
            $(el).data('state', 'mini');
        }
    },

    '#askQuestWrap submit': function(el, ev){
        ev.preventDefault();

        this.askQuestionValidate();

        if (el.valid() !== false) {
            Main_model.ask_quest(el.serialize(), this.callback('questAsked'), this.callback('error'));
        }

    },

    questAsked: function(data){
        if (data.success) {
            $('#askButton').click();
        }
    },

    askQuestionValidate: function(){
        $('#askQuestWrap').validate({
            rules: {
                email: {
                    email: true,
                    minlength: 4,
                    maxlength: 200,
                    required: true
                },
                question_variant_id: {
                    maxlength: 11
                },
                name: {
                    minlength: 3,
                    maxlength: 200,
                    required: true
                },
                question: {
                    minlength: 3,
                    maxlength: 1000,
                    required: true
                }
            },
            messages: {
                email: {
                    required: '*',
                    minlength: '*',
                    maxlength: '*',
                    email: '*'
                },
                question_variant_id: {
                    maxlength: '*'
                },
                name: {
                    required: '*',
                    minlength: '*',
                    maxlength: '*'
                },
                question: {
                    required: '*',
                    minlength: '*',
                    maxlength: '*'
                }
            },
            highlight: function(element) {
                $(element).parents('.controlGroup').addClass('error').find('.help').empty();
            },
            unhighlight: function(element) {
                $(element).parents('.controlGroup').removeClass('error').find('.help').empty();
            },
            errorPlacement: function(error, element) {
                element.parents('.controlGroup').find('.help').html(error.html());

            }
        });
    },

    '.autoModelQuant, .relatedAutoModelToolTip mouseenter': function(el){

        var $el = $(el).parents('.groupAM');

        clearTimeout($el.data('timer'));

        $el.data('timer', null);

        $('.relatedAutoModelToolTip').css('z-index', 1);

        $el.children('.relatedAutoModelToolTip, .triangle').css('z-index', 2);

        this.showRelatedAutoModel($el);

    },

    '.groupAM mouseenter': function(el){

        var $el = $(el);

        if ($el.children('.relatedAutoModelToolTip').is(':visible')) {

            clearTimeout($el.data('timer'));

            $el.data('timer', null);

        }

    },

    '.groupAM mouseleave': function(el){

        var $el = $(el);

        this.hideRelatedAutomodel($el);

    },

    showRelatedAutoModel: function(el){

        var selector = el.children('.relatedAutoModelToolTip, .triangle');

        if (!selector.is(':visible'))
            selector.stop(false, true).fadeIn(300);

    },

    hideRelatedAutomodel: function(el){

        var timer = el.data('timer'),
        selector = el.children('.relatedAutoModelToolTip, .triangle');

        if (!timer) {

            clearTimeout(timer);

            timer = setTimeout(function() {
                selector.stop(false, true).fadeOut(300);
                timer = null;
            }, 200);

            el.data('timer', timer);
        }

    },

    error: function(response){
        show_error(response.data?response.data:response);
    },
    
    'a.banerLink click': function(el, ev) {
        ev.preventDefault();
        var bannerId = el.data('baner_link_id');
    
        $('.bannerItemPict').css('display','none');
        $('.bannerItemPict[data-banner_id='+bannerId+']').children('img').css('display', 'block');
        $('.bannerItemPict[data-banner_id='+bannerId+']').css('display','block'); 
    }
    
   

});