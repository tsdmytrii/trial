function chose_lang(){
    var language;

    switch($.cookie('lang')){
        case '1':
            language = lang.en;
            break;
        case '2':
            language = lang.ru;
            break;
        case '3':
            language = lang.ua;
            break;
    }

    return language;
}

function chose_lang_pref(){
    var language;

    switch($.cookie('lang')){
        case '1':
            language = 'en';
            break;
        case '2':
            language = 'ru';
            break;
        case '3':
            language = 'ua';
            break;
    }

    return language;
}

function chose_lang_pref_by_lang_id(lang_id){
    var language;

    switch(lang_id){
        case 1:
            language = 'en';
            break;
        case 2:
            language = 'ru';
            break;
        case 3:
            language = 'ua';
            break;
    }

    return language;
}

$.window_scroller = function(selector, scroll_height){

    selector.jScrollPane({
        //        ,
//                autoReinitialise: true
        });
    $('.jspPane').css('margin-left', 0);
    $('.jspContainer').css('height', '100%');
}

$.char_scroller = function(selector, scroll_height){

    selector.jScrollPane({
        //        hijackInternalLinks: true,
        animateScroll: true
    //        ,
    //        autoReinitialise: true
    });

//    $('.jspScrollable, .jspContainer, .jspPane').css('width', '100%');
//    $('.jspContainer').css('height', '100%');
}

$.window_scroller_destroy = function(selector){
    var api = selector.data('jsp');
    api.destroy();
}

$.fn.preload = function() {
    this.each(function(){
        $('<img/>')[0].src = this;
    });
}

function preloadImage(){
    $([
        base_url+'js/images/win_btm.png',
        base_url+'js/images/win_top.png',
        base_url+'js/images/winMin.png',
        base_url+'js/images/winMax.png',
        base_url+'js/images/winClose.png',
        base_url+'js/images/winMaxNorm.png',
        base_url+'js/images/autocentr_big.jpg'
        ]).preload();
}

$.preLoadImages = function() {
    var args_len = arguments.length;
    for (var i = args_len; i--;) {
        var cacheImage = document.createElement('img');
        cacheImage.src = arguments[i];
        cache.push(cacheImage);
    }
}

$.make_window_title = function(id, title) {
    var button_id = id.split('_window')[0]+'_button';

    $('#'+id).find('.window-titleBar-content').html(title);

    $('#'+button_id).find('.navigation_panel_button_caption').html(title.substr(0, 30)+'...');
}

function hidePreloader(){

    $('body').waitForImages(function(){
        $('#preloader').fadeOut(200);
    });
}

function windowCallBack(data, window_id, title, html, false_window, main){

    if (data){
        $.make_window_title(window_id, title);

        $('#'+window_id).find('.winContWrap').html(html);
    } else {
        $('#'+window_id).find('.winContWrap').html($('div.window-container[data-false_window="'+false_window+'"]').find('.jspPane').children());
    }

    $('div.window-container[data-false_window="'+false_window+'"]').remove();

    //    if (data == true || main == 0){
    $.window_scroller($('#'+window_id).find('.winContWrap'), 47);
    //    }

    $('#'+window_id).find('.window_preload').fadeOut();

    hidePreloader(data, main);
}

function tab_navigation(el, btn_class, active_class, wrap, current, block, mega_wrapper){
    var href = $(el).attr('href');

    if (!$(el).hasClass(active_class)){

        $(mega_wrapper+' .'+btn_class).removeClass(active_class);
        $(el).addClass(active_class);

        if ($(mega_wrapper+' '+wrap).find('.'+current).length) {
            $(mega_wrapper+' '+wrap).find('.'+current).fadeOut(200, function(){
                $(mega_wrapper+' .'+block).removeClass(current);

                $(mega_wrapper+' #'+href).fadeIn(200, function(){
                    $(mega_wrapper+' #'+href).addClass(current);
                });
            });
        } else {
            $(mega_wrapper+' #'+href).fadeIn(200, function(){
                $(mega_wrapper+' #'+href).addClass(current);
            });
        }
    }
}

function listedData(data, quant){
    var list_data = [], r = 0, j = 0, bufer = [];

    for (var i = 0; i < data.length; i++){

        bufer[j] = data[i];
        j++;
        if ((i+1)%quant == 0) {
            list_data[r] = bufer;
            r++;
            j = 0;
            bufer = []
        } else {
            if (i+1 == data.length) {
                list_data[r] = bufer;
            }
        }
    }

    return list_data;
}

function visibilityToggle($obj, show) {
    if (show == true)
        $obj.css({
            visibility: 'hidden',
            display: 'block'
        });
    else
        $obj.css({
            visibility: 'visible',
            display: 'none'
        })
}
