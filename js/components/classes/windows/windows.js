/*
 * @class Windows
 * @parent navigation
 * @tag navigation, windows
 * ###Navigation controller
 *
 * Documentation for navigation controller
 * Here we do have all descriptions to our core files:
 * Let's take a lool on
 * * Navigation
 * * Realplexor
 * * Other plugins, which are loaded in Core
 */
$.Class.extend('Windows',
/* @static */
{
    registeredComponents: [],
    currentHistoryStep: 0,
    nextLinks: [],
    nextOpenedWindows: [],
    prevOpenedWindows: [null, null],
    prevIds: ['strt_hs', 'strt_hs'],
    nextActions: [],
    prevActions: [null, null],
    quantWindows: 0,
    displacement: 0,
    viewpath: '//components/classes/windows/views/',
    currentUrl: '',
    windowWidthProportion: 0.94,
    windowHeightProportion: 0.479,
    currentTitel: '',
    languageSettings: [],
    isHash: 0,
    sub: 'main',
    currentHistoryId: '',
    currentTabHistoryStep: 0,
    setTitelUrlSettings: function(lang){

        Windows.currentUrl = Windows.languageSettings[lang].url;
        Windows.currentTitel = Windows.languageSettings[lang].titel;

    },

    setHistoryLink: function(link, title, isCodes, action_type, id, replaceState, dataTabComponent){

        if(typeof replaceState =="undefined"){

            replaceState = false;

        }
        var referrer = document.location.href;
        if(document.location.href!=link||action_type=='start'||action_type=='maximize'||action_type=='close'||dataTabComponent){

            if(Windows.isHash!=1){

                var openedWindows= [];

                $.each($('.window-container'), function(){

                    if(1==1){

                        if (!$(this).hasClass('false_window')){
                            var compId = $(this).attr('id').split('_window')[0];
                            openedWindows[openedWindows.length] = {

                                state: $(this).data('state'),
                                position: $(this).data('position'),
                                closed: $(this).data('closed'),
                                id: compId

                            }
                        }
                    }


                });

                Windows.currentHistoryStep ++;
                Windows.nextOpenedWindows[Windows.currentHistoryStep] = openedWindows;

                var data={

                    history_step:  Windows.currentHistoryStep,
                    id: id,
                    title: title

                }

                if (dataTabComponent) {

                    data = $.extend(data, dataTabComponent);

                } else {

                    if ($('#'+id+'_window .inner_navigation').length) {

                        dataTabComponent = {};

                        Windows.currentTabHistoryStep++;

                        dataTabComponent.history_tab_step = Windows.currentTabHistoryStep;
                        dataTabComponent.href = $('#'+id+'_window').find('.active').attr('href');
                        dataTabComponent.type = 'bookmark';
                        dataTabComponent.componentBlock = '#'+$('#'+id+'_window').find('.current').attr('id');
                        var sameBlocks = $('#'+id+'_window .winContWrap').children('div').attr('data-class');
                        dataTabComponent.sameBlocks = '#'+id+'_window .winContWrap'+' .'+sameBlocks;
                        dataTabComponent.divWrapper = '#'+id+'_window .winContWrap';
                        dataTabComponent.controllerBlock = id+'_window';

                        data = $.extend(data, dataTabComponent);

                    }

                }

                if(replaceState==false){

                    History.pushState(data, '', link);
                    Windows.currentHistoryId = id;

                }
                else{

                    History.replaceState(data, '', link);

                }



            }

            if(isCodes==true){

                Windows.initCodes(link, referrer, action_type);

            }
        }

    },
    initCodes:function(url, referrer, type){

        if(base_url=='http://web-innovations.org.ua/'){

            var trilanCounter = $("<img src='http://counter.gyrlog.ru/afx.gif?r="+escape(referrer)+"&u="+escape(url)+"&n="+Math.random()+"' alt='trilan.ru  Counter' border=0 width=1 height=1/>");

            yaCounter18317422.hit(url, Windows.currentTitel, referrer);
            _gaq.push(['_setReferrerOverride', referrer]);
            _gaq.push(['_trackEvent', 'Window', type]);
            _gaq.push(['_trackPageview'], url);

        }

    },
    showWindow: function(id, fromHistory){

        if(typeof fromHistory=="undefined"){
            fromHistory = false;
        }

        var $obj = $('#'+id+'_window');
        var $button = $('#'+id+'_button');
        var z_index = $button.css('z-index');

        if ($obj.css('visibility') == 'hidden') {

            visibilityToggle($obj, false);

        }

        $obj.find('.window_preload').css('display', 'none');

        if($obj.data("state") === "minimized") {

            $obj.data("state", "normal");

            if($obj.data("position") === "maxi"){

                if(fromHistory==false){

                    var window = $([0]);

                    $.each($('.window-container'), function(){

                        window[0] = this;

                        if (typeof window.attr('id') !== undefined && window.data('closed')=='opened'){

                            var else_id = window.attr('id').split('_window')[0];

                            if (id != else_id){
                                window.data("state", "minimized")
                                .css("display", "none");
                                $('#'+else_id+'_button').removeClass('active');
                            } else {
                                window.css("z-index", 30);
                            }
                        }

                    });

                    visibilityToggle($obj, true);

                    Windows.defineWindSize();

                    visibilityToggle($obj, false);

                    Windows.checkMaximised(true, fromHistory);

                    $obj.fadeIn(200);

                }
                else{

                    $obj.css({
                        'display': 'block',
                        'z-index': 30
                    });

                    Windows.checkMaximised(true, fromHistory);

                }

            } else {

                $obj.css({
                    'display': 'none',
                    'z-index': jqWindowsEngineZIndex++
                });

                if(fromHistory==false){

                    $obj.fadeIn(200);

                } else {

                    $obj.css({
                        'display': 'block'
                    });

                }

                Windows.setFocus($obj);
            }

            var title = $('.seo_title', '#'+id+'_window').html();
            $('title').html(title);

            if(fromHistory==false){
                Windows.setHistoryLink($obj.attr('data-href'), title, true, 'maximize', id);
            }
            $button.addClass('active');

        }
        else if ($obj.data("state") === "normal") {

            $obj.data("state", "minimized");

            if(fromHistory==false){

                $obj.fadeOut(200, function(){
                    $obj.css('z-index', --z_index).css('display', 'none');
                });

            } else {


                $obj.css({
                    'display': 'none',
                    'z-index':--z_index
                });

            }

            if($obj.data('position') == 'maxi') {

                Windows.checkMaximised(false, fromHistory);
            }

            $button.removeClass('active');

            if(fromHistory==false){
                Windows.setRestUrlTitle();
            }
        }
        else {
            if(fromHistory==false){
                Windows.setRestUrlTitle();
            }
            $obj.find(".window-maximizeButton").click();
        }

    },

    maximiseWindow: function(id, fromHistory){

        if(typeof fromHistory=="undefined")
            fromHistory = false

        var $obj = $('#'+id+'_window');

        if ($obj.data('position') === 'body') {
            $obj.data('position', 'maxi');

            if(fromHistory==false){
                Windows.hideOtherWindow(id);

            }

            $obj.data('draggable', false);

            $obj.fadeOut(200, function(){

                $('#pageWrap').append($obj);

                visibilityToggle($obj, true);

                if (maxi == true) {
                    $obj.css({
                        left: '20.3%',
                        width: '75%'
                    });
                } else {

                    if ($obj.data('allWidth') == true) {

                        if ($obj.data('logoAlign') == true) {

                            $obj.css({
                                left: '2.8%',
                                width: '77%',
                                padding: '0'
                            });

                        } else {

                            $obj.css({
                                left: '0',
                                width: '80%',
                                padding: '0'
                            });

                        }

                    } else {
                        $obj.css({
                            left: '20.3%',
                            width: '58%'
                        });
                    }

                    $obj.css('z-index', 30);
                }

                Windows.findMaxWindPosition($obj);

                OpenAjax.hub.publish('windNormalToMaxi', id+'_window');

                Windows.checkMaximised(true, false);

                visibilityToggle($obj, false);

                $obj.fadeIn(200)
            })

        } else {

            $obj.data('position', 'body');
            $obj.data('draggable', true);

            $obj.fadeOut(200, function(){

                $('body').append($obj);

                visibilityToggle($obj, true);

                $('#'+id+'_window .winContWrap').css('height', $obj.data('lastHeight')-30);

                $obj.css({
                    left: $obj.data('lastX')+'px',
                    top: $obj.data('lastY')+'px',
                    width: $obj.data('lastWidth')+'px',
                    height: $obj.data('lastHeight')+'px',
                    'z-index': jqWindowsEngineZIndex
                });

                OpenAjax.hub.publish('windMaxiToNormal', id+'_window');

                visibilityToggle($obj, false);

                $obj.fadeIn(200);

                Windows.checkMaximised(false, false);

            });

        }

        if(fromHistory==false) {
            var title = $('.seo_title', '#'+id+'_window').html();
            $('title').html(title);
            Windows.setHistoryLink($obj.attr('data-href'), title, false, 'maximize', id);
        }

    },

    /**
     * state - (true -> toMaxi; false -> toMini)
     */

    checkMaximised: function(state, fromHistory) {

        if (typeof fromHistory == undefined)
            fromHistory = false;

        if (state) {

            if (fromHistory == false){
                $('#headerBtmBg').fadeOut(300);
                $('#windTopMax, #windBottomMax, .modalBlock').fadeIn(300);
            } else {
                $('#headerBtmBg').hide();
                $('#windTopMax, #windBottomMax, .modalBlock').show();
            }

        } else {

            $('#headerBtmBg').show();

            if (fromHistory == false)
                $('#windTopMax, #windBottomMax, .modalBlock').fadeOut(300);
            else
                $('#windTopMax, #windBottomMax, .modalBlock').hide();
        }

    },

    /*
     * This method work with maximised window, wich has attr 'display': 'block'
     **/

    defineWindSize: function(){

        var $this = $([0]);

        $.each($('.window-container'), function(){

            $this[0] = this

            if ($this.data('position') == 'maxi' && $this.data('state') == 'normal' && $this.data('closed') !== 'closed') {

                Windows.findMaxWindPosition($this);

                OpenAjax.hub.publish('windNormalToMaxi', $this.attr('id'));

            }

        });
    },

    findMaxWindPosition: function(selector){
        var headerHeight = $('#header').innerHeight(),
        footerHeight = $('#footer').innerHeight(),
        windowHeight = $('#pageWrap').height() - headerHeight - footerHeight;

        if (selector.data('titleBar') != false)
            selector.find('.winContWrap').css('height', windowHeight - 30);

        selector.css({
            top: headerHeight+'px',
            height: windowHeight
        });

    },

    hideOtherWindow: function(id){
        var window = $([0]);
        $.each($('.window-container'), function(){
            window[0] = this;
            if (!window.hasClass('false_window')) {
                var other_window_id = window.attr('id').replace(/_window/g, '');

                if (other_window_id !== id){
                    window.data("state", "minimized")
                    .css("display", "none");
                    $('#'+other_window_id+'_button').removeClass('active');
                }
            }

        });
    },

    setRestUrlTitle: function(reason){
        if(typeof reason=="undefined"){
            reason = 'minimize';
        }


        var newTitle = false;

        var window = $([0]);

        $('.window-container').each(function(){
            window[0] = this;
            if(window.data("state")!='minimized' && window.data("closed")!='closed'&& typeof window.attr('id') !== undefined){

                newTitle = $('.seo_title', this).html();
                $('title').html(newTitle);
                Windows.setHistoryLink(window.attr('data-href'), newTitle, true, reason, window.attr('id'));
                return false;

            }

        });
        if(newTitle===false){

            $('title').html(Windows.currentTitel);
            Windows.setHistoryLink(Windows.currentUrl, Windows.currentTitel, true, reason, null);

        }


    },
    setHeadTitle: function(title, dataHref){

        var id = Windows.currentHistoryId;

        if(id == Windows.currentHistoryId){

            var State = History.getState();

            var data={

                history_step:  State.data.history_step,
                id: State.data.id,
                title: title

            }

            if (dataHref) {

                data = $.extend(data, dataHref);

            }

            History.replaceState(data, '', document.location.href);

            $('title').html(title);
        }
    },

    setFocus: function($obj){
        if($obj.data('position') !== 'maxi'){
            $obj.parents('.window-container').css("z-index", jqWindowsEngineZIndex++);
            $obj.data('lastZIndex', jqWindowsEngineZIndex);
        }
    },

    deleteButton: function(componentId, fromHistory){

        var buttonId = '#'+componentId+'_button';
        if(fromHistory==false){

            $(buttonId).fadeOut();

        }
        else{

            $(buttonId).css('display', 'none');

        }

    },
    deleteWindow: function(componentId, fromHistory){

        var window = $('#'+componentId+'_window');

        if(window.data("position") === "maxi"){

            Windows.checkMaximised(false, fromHistory);

        }

        if(fromHistory==false){

            window.fadeOut(200, function(){

                window.data('closed', 'closed');
                Windows.setRestUrlTitle('close');

            });

        }
        else{

            window.css('display', 'none');
            window.data('closed', 'closed');

        }

    },

    deleteFromCache: function(componentId){

        var openedWindows = $.cookie('openedWindows_'+Windows.sub).split(/\|/);

        var newCookie = '';
        var componentCookie = $('#'+componentId+'_window').attr('data-name') == 'false' ? componentId.replace(/[-]+/g, '\/') : $('#'+componentId+'_window').attr('data-name');

        $.each(openedWindows, function(){

            if(this.split(';')[0] == componentCookie){

            }
            else{
                newCookie += this+'|';
            }

        });
        if(newCookie[newCookie.length-1]=='|'){

            newCookie = newCookie.substr(0, newCookie.length-1);

        }
        $.cookie('openedWindows_'+Windows.sub, newCookie);

    },
    deleteFromHash: function(componentId){


        var oldHash = window.location.hash;

        var newHash = '';

        if(oldHash){
            var openedWindows = oldHash.split('#')[1].split('&');

        }
        var wind = $('#'+componentId+'_window');
        var componentCookie = wind.attr('data-name') == 'false' ? componentId.replace(/[-]+/g, '\/') : wind.attr('data-name');

        $.each(openedWindows, function(){

            if(this == componentCookie||this.length==0){

            }
            else{

                newHash += this+'&';
            }

        });
        if(newHash[newHash.length-1]=='&'){

            newHash = newHash.substr(0, newHash.length-1);

        }
        if(newHash.length==0){

            newHash = '!';

        }
        window.location.hash = newHash;

    },

    deleteComponent: function(id, fromHistory){

        if(typeof fromHistory=="undefined"){
            fromHistory = false
        }

        Windows.displacement--;

        Windows.deleteButton(id, fromHistory);
        Windows.deleteWindow(id, fromHistory);
        if(Windows.isCookie==1){
            Windows.deleteFromCache(id);
        }
        if(Windows.isHash==1){
            Windows.deleteFromHash(id);
        }

    },

    addComponentFromRegistered: function(data, fromHistory){

        if(typeof fromHistory=="undefined"){
            fromHistory = false
        }
        data[0].type="window";
        data[0].componentId = data[0].id;
        Navigation.addCookies(data[0]);

        var id = data[0].id.replace(/[\/]+/g,'-');

        var window = $('#'+id+'_window'),
        button = $('#'+id+'_button');

        button.addClass('active');

        if(fromHistory==false){
            button.fadeIn(200);

            if (window.data('position') == 'maxi') {
                visibilityToggle(window, true);
                OpenAjax.hub.publish('windNormalToMaxi', id+'_window');
                visibilityToggle(window, false);

                Windows.hideOtherWindow(id);

                Windows.checkMaximised(true, fromHistory);
            }

            window.fadeIn(200);

            var title = $('.seo_title', '#'+id+'_window').html();
            $('title').html(title);
            Windows.setHistoryLink(data[0].href, title, true, 'open', id);
        }
        else{

            if (window.data('position') == 'maxi') {
                visibilityToggle(window, true);

                OpenAjax.hub.publish('windNormalToMaxi', id+'_window');

                visibilityToggle(window, false);

                Windows.hideOtherWindow(id);

                Windows.checkMaximised(true, fromHistory);
            }

            button.css('display', 'block');
            window.css('display', 'block');

        }

        window.data('closed', 'opened');

        if(window.data("position") === "maxi"&& window.data("state")!='minimized'){

            if(fromHistory==false){
                Windows.hideOtherWindow(id);
            }
        }
    }


},


/* @prototype */
{
    init: function(targets){

        Windows.languageSettings[1]={

            url: base_url+'en/',
            titel: 'Автоцентр на московском'

        };

        Windows.languageSettings[2]={

            url: base_url,
            titel: $('#hidden_title').html()

        };

        Windows.setTitelUrlSettings($.cookie('lang'));

        this.title = $('#hidden_title').html();

        Windows.isCookie = targets.isCookie;
        Windows.isHash = targets.isHash;


        this.pageLoc = base_url;

        Windows.quantWindows++;

    },

    loadWindow: function(id, windowOption, name, data, sub, fresh, href){

        if(Windows.displacement<0){
            Windows.displacement = 0;
        }

        Windows.sub=sub;
        //windowOption.direct_link - 1 если линк прямой, и 0 если линк не прямой

        var window_height = (window.innerHeight ? window.innerHeight : (document.documentElement.clientHeight ? document.documentElement.clientHeight : document.body.offsetHeight)),
        top = window_height*0.1,
        newWidth = $('#pageWrap').width()*Windows.windowWidthProportion,
        newHeight = newWidth*Windows.windowHeightProportion,
        left = Math.floor((parseInt($('body').width()) - newWidth)/2) + Windows.displacement*50;

        $.newWindow({
            id: id+'_window',
            title: name,
            content: data,
//            width: windowOption.width == 'default' ? 720 : windowOption.width,
//            height: 460,
            width: newWidth,
            height: newHeight,
            type: 'normal',
            minimizeButton: windowOption.button_panel,
            maximizeButton: windowOption.maximise,
            statusBar: windowOption.statusBar,
            posx: left,
            posy: top,
            resizeable: false,
            onResizeBegin: '',
            onResizeEnd: ''
        });

        var modal_window = $('#'+id+'_window');

        if (windowOption.button_panel == true){
            this.addButton(id, name, windowOption.state);
        }

        modal_window.attr('data-href', href)
        .data('lastY', top)
        .data('lastX', left)
        .data('lastWidth', newWidth)
        .data('lastHeight', newHeight)
//        .data('lastWidth', 720)
//        .data('lastHeight', 460)
        .data('draggable', true)
        .data('lastZIndex', '100')
        .data('settings', windowOption.settings)
        .data("state", windowOption.state)
        .data('closed', 'opened')
        .data('titleBar', windowOption.titleBar)
        .data('position', 'body')
        .data('allWidth', windowOption.allWidth)
        .data('logoAlign', windowOption.logoAlign);

        if (windowOption.state == 'minimized') {

            visibilityToggle(modal_window, true);

            modal_window.css('z-index', 0);
        }

        modal_window.find('.window-content').append("<div class='window_preload'><a><img src='"+base_url+"js/images/loading_black.gif'/></a></div><div class='winContWrap' style='width:100%;'></div>");
        modal_window.find('.winContWrap').height(newHeight-30);

        if (windowOption.titleBar == false) {

            modal_window.find('.window-titleBar').hide();

            modal_window.find('.winContWrap').css('height', '100%');

        }

        if (windowOption.statusBar == false) {
            modal_window.find('.window-statusBar').hide();
        }

        if (windowOption.main == '1') {

            modal_window.data("position", "maxi");

            Windows.findMaxWindPosition(modal_window);

            if (maxi == true) {
                modal_window.css({
                    left: '20.3%',
                    width: '75%'
                });
            } else {

                if (windowOption.allWidth == false) {
                    modal_window.css({
                        left: '20.3%',
                        width: '58%'
                    });
                } else {

                    if (windowOption.logoAlign == true) {

                        modal_window.css({
                            left: '2.8%',
                            width: '77%',
                            padding: '0'
                        });

                    } else {
                        modal_window.css({
                            left: '0',
                            width: '80%'
                        });

                        if (windowOption.titleBar == false) {
                            modal_window.addClass('bigContent');
                        }
                    }
                }
            }

            modal_window.data('draggable', false);

            $('#pageWrap').append(modal_window);
        }

        if (windowOption.main == 1 && windowOption.state != 'minimized'){

            Windows.checkMaximised(true);

            Windows.hideOtherWindow(id);

            modal_window.css('z-index', 30);

        }

        if(windowOption.settings == true){
            modal_window.find('.window-buttons').apped('<div class="settings"></div>');
        }

        if (windowOption.maximise == false){
            modal_window.find('.window-maximizeButton').remove();
        }

        if (windowOption.buttonsInBody == true) {
            modal_window.children('.window-content').append(modal_window.find('.window-buttons').addClass(id.split('-')[0]));
        }

        $('.btnWindCloseBtn', '#'+id+'_button').on('click', function(event, element){

            event.stopPropagation();
            Windows.deleteComponent(id);

        });

        $('.window-closeButton', '#'+id+'_window').on('click', function(event, element){

            event.stopPropagation();
            Windows.deleteComponent(id);

        });

        modal_window.on('mousedown', function(el){

            var title = $('.seo_title', '#'+id+'_window').html()

            $('title').html(title);

            if(modal_window.data('position')=='maxi'){

                Windows.hideOtherWindow(id);

            }

            var href = modal_window.attr('data-href');

            if (document.location.href !== href) {
                Windows.setHistoryLink(href, title, true, 'focus', id);
            }

            if(modal_window.data("position") === "body"){
                modal_window.css("z-index", jqWindowsEngineZIndex++);
                modal_window.data('lastZIndex', jqWindowsEngineZIndex);
            }

        });

        modal_window.find('.window-minimizeButton').on('click', function(ev){

            ev.stopPropagation();
            Windows.showWindow(id);

        });

        href = modal_window.attr('data-href');

        if (windowOption.state != 'minimized') {

            var isCodes=true;
            if(windowOption.direct_link==1){

                isCodes = false;

            }
            var title = $('.seo_title', '#'+id+'_window').html();
            $('title').html(title);
            Windows.setHistoryLink(href, title, isCodes, 'open', id);
        }

        $('.window-maximizeButton', '#'+id+'_window').on('click', function(event){

            event.stopPropagation();
            Windows.maximiseWindow(id);

        });

        Windows.displacement++;

    },

    checkOpened: function(id){


        if($('#'+id + '_window').length==0){

            return true;

        }
        else{

            return false;

        }

    },

    addButton: function(id, name, state){

        var button,

        active = state == 'minimized' ? '' : 'active' ;

        button = '<div class="tb_button in_panel '+active+'" id="'+id+'_button"><div class="navigation_panel_button_caption">'+name.substr(0, 40)+'</div></div>';

        $('#button_panel').append(button);

        var $button = $('#button_panel').find('#'+id+'_button');

        $button.on('click', function(){

            Windows.showWindow(id);

        });


    }


});
