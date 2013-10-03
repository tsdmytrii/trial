
/*
 *	function for hiding trs in table
 *	is used generally fo jquery dataTables
 *	is used due to bug caused by specific display attr of tr
 *	@params row_object - Object, jQuery Object, link to target tr
 *	@params action- action
 *	@params callback - callback function
 *	N.B. It does not remove row, just hides\shows it, to remove tr, you must init removing it in callback
 **/
function windowSize() {
    var xScroll, yScroll, pageHeight, pageWidth, windowWidth, windowHeight;

    if (window.innerHeight && window.scrollMaxY) {
        xScroll = document.body.scrollWidth;
        yScroll = window.innerHeight + window.scrollMaxY;
    } else if (document.body.scrollHeight > document.body.offsetHeight) { // all but Explorer Mac
        xScroll = document.body.scrollWidth;
        yScroll = document.body.scrollHeight;
    } else if (document.documentElement && document.documentElement.scrollHeight > document.documentElement.offsetHeight) { // Explorer 6 strict mode
        xScroll = document.documentElement.scrollWidth;
        yScroll = document.documentElement.scrollHeight;
    } else { // Explorer Mac...would also work in Mozilla and Safari
        xScroll = document.body.offsetWidth;
        yScroll = document.body.offsetHeight;
    }


    if (self.innerHeight) { // all except Explorer
        windowWidth = self.innerWidth;
        windowHeight = self.innerHeight;
    } else if (document.documentElement && document.documentElement.clientHeight) { // Explorer 6 Strict Mode
        windowWidth = document.documentElement.clientWidth;
        windowHeight = document.documentElement.clientHeight;
    } else if (document.body) { // other Explorers
        windowWidth = document.body.clientWidth;
        windowHeight = document.body.clientHeight;
    }

    // for small pages with total height less then height of the viewport
    if (yScroll < windowHeight) {
        pageHeight = windowHeight;
    } else {
        pageHeight = yScroll;
    }

    // for small pages with total width less then width of the viewport
    if (xScroll < windowWidth) {
        pageWidth = windowWidth;
    } else {
        pageWidth = xScroll;
    }

    return {
        pageWidth: pageWidth,
        pageHeight: pageHeight,
        windowWidth: windowWidth,
        windowHeight: windowHeight
    };
}

function toggle_table_row(row_object, action, callback)
{
    var childCellsSelector = row_object.children("td");
    var ubound = childCellsSelector.length - 1;
    var lastCallback = null;

    childCellsSelector.each(function(i)
    {
        // Only execute the callback on the last element.
        if (ubound == i)
            lastCallback = callback

        if (action == 'show')
        {
            $(this).fadeIn("slow", lastCallback)
        }
        else
        {
            $(this).fadeOut("slow", lastCallback)
        }
    });
}

function show_success(message){
    init_pnotify(4000, message, 'notice');
}
function show_error(message){
    if(typeof(message) == 'undefined'){
        message = 'Unknown error occured'
    }
    init_pnotify(6000, message, 'error')
}
function init_pnotify(delay, message, type){
    $.pnotify({
        pnotify_text: message,
        pnotify_type: type,
        pnotify_width: '200px',
        pnotify_delay: delay,
        pnotify_addclass:"stack-bottomleft",
        pnotify_stack: {
            dir1:'left',
            'dir2':'up'
        }
    });
}

function get_current_date(){
    var date = new Date();
    return date.getFullYear() + '-' +
    (date.getMonth() < 9 ? '0' : '') + (date.getMonth()+1) + '-' +
    (date.getDate() < 10 ? '0' : '') + date.getDate();

}
function get_current_time(){
    var date = new Date();
    var minutes = date.getMinutes();
    if (minutes < 10)
        minutes = "0" + minutes
    var hours = date.getUTCHours();
    if (hours < 10)
        hours = "0" + hours
    return hours+':'+minutes
}

function loadWindow(id, windowOption, title, content){

    $.newWindow({
        id: id+'_window',
        title: title,
        content: content,
        width: windowOption.width,
        height: windowOption.height,
        type: 'normal',
        minimizeButton: windowOption.minimize,
        maximizeButton: windowOption.maximise,
        posx: windowOption.left,
        posy: windowOption.top,
        modal: windowOption.modal,
        resizeable: windowOption.resize,
        statusBar: windowOption.status_bar
    });

}

function date_picker(selector){

    $(selector).datepicker({
        dateFormat: "dd-mm-yy"
    });
}

function time_picker(selector){
    $(selector).timepicker();
}

function imperavi(selector){
    selector.ckeditor({
        //        filebrowserBrowseUrl :'js/ckeditor/filemanager/browser/default/browser.html?Connector='+base_url+'filemanager_in_ckeditor/js/ckeditor/filemanager/connectors/php/connector.php',
        filebrowserImageBrowseUrl : 'js/ckeditor/filemanager/browser/default/browser.html?Type=Image&Connector='+base_url+'filemanager_in_ckeditor/js/ckeditor/filemanager/connectors/php/connector.php',
        //        filebrowserFlashBrowseUrl :'js/ckeditor/filemanager/browser/default/browser.html?Type=Flash&Connector='+base_url+'filemanager_in_ckeditor/js/ckeditor/filemanager/connectors/php/connector.php',
        //        filebrowserUploadUrl  :base_url+'filemanager_in_ckeditor/js/ckeditor/filemanager/connectors/php/upload.php?Type=File',
        filebrowserImageUploadUrl: base_url+'js/resources/plugins/ckeditor/server/upload.php'
    //        filebrowserFlashUploadUrl : base_url+'filemanager_in_ckeditor/js/ckeditor/filemanager/connectors/php/upload.php?Type=Flash'
    });
}

function tab_navigation(el, btn_class, active_class, wrap, current, block, mega_wrapper, href){

    if (href === undefined)
        href = $(el).find('a').attr('href');

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

function showPreload(){
    if (!$('#preLoad').is(':visible'))
        $('#preLoad').stop(true, true).fadeIn(200);
}

function hidePreload() {
    if ($('#preLoad').is(':visible'))
        $('#preLoad').stop(true, true).fadeOut(200);
}

function showCompPreload(){
    if (!$('#preLoadComp').is(':visible'))
        $('#preLoadComp').stop(true, true).fadeIn(200);
}

function hideCompPreload() {
    if ($('#preLoadComp').is(':visible'))
        $('#preLoadComp').stop(true, true).fadeOut(200);
}

function componentLoaded(element) {
    if (element.data("display") == 'block') {
        OpenAjax.hub.publish('page.loaded');
        OpenAjax.hub.publish('component.loaded');
    }
}

$.preLoadImages = function() {
    var args_len = arguments.length;
    for (var i = args_len; i--;) {
        var cacheImage = document.createElement('img');
        cacheImage.src = arguments[i];
        cache.push(cacheImage);
    }
}

$.fn.stickyfloat = function(options, lockBottom) {
    var $obj = $(this);
    var $parent = $obj.parent();
    if (!$parent.length) {
        return;  // No parent, continue with next element, if any.
    }
    var parentPaddingTop    = parseInt($parent.css('padding-top'));
    var startOffset         = 0;
    var opts                = $.extend({
        startOffset: startOffset,
        offsetY: parentPaddingTop,
        duration: 200,
        lockBottom:true
    }, options);

    $obj.css({
        position: 'absolute'
    });

    if(opts.lockBottom){
        var bottomPos = $obj.parent().height() - $obj.height() + parentPaddingTop; //get the maximum scrollTop value
        if( bottomPos < 0 )
            bottomPos = 0;
    }

    $(window).scroll(function () {
        $obj.stop(); // stop all calculations on scroll event

        var pastStartOffset         = $(document).scrollTop() > opts.startOffset;   // check if the window was scrolled down more than the start offset declared.
        var objFartherThanTopPos    = $obj.offset().top > startOffset;  // check if the object is at it's top position (starting point)
        var objBiggerThanWindow     = $obj.height() < $(window).height();  // if the window size is smaller than the Obj size, then do not animate.

        // if window scrolled down more than startOffset OR obj position is greater than
        // the top position possible (+ offsetY) AND window size must be bigger than Obj size
        if( (pastStartOffset || objFartherThanTopPos) && objBiggerThanWindow ){
            var newpos = ($(document).scrollTop() - startOffset );

            if (newpos < opts.offsetY)
                newpos = opts.offsetY;

            if ( newpos > bottomPos )
                newpos = bottomPos;
            if ( $(document).scrollTop() < opts.startOffset ) // if window scrolled < starting offset, then reset Obj position (opts.offsetY);
                newpos = parentPaddingTop;
            $obj.animate({
                top: newpos
            }, opts.duration );
        }
    });
};

$.make_window_title = function(id, title){
    var button_id = id.split('_window')[0]+'_button';

    $('#'+id).find('.window-titleBar-content').html(title);

    $('#'+button_id).find('.navigation_panel_button_caption').html(title);
}

$.processTimestamp = function(timestamp) {
    var date = new Date(timestamp * 1000);
    return date.getFullYear() + '-' +
            (date.getMonth() < 9 ? '0' : '') + (date.getMonth() + 1) + '-' +
            (date.getDate() < 10 ? '0' : '') + date.getDate();
};

function isMain(window, main){
    if (main == 1 && window.data("state") !== 'minimized'){
        window.find('.normal .window-maximizeButton').click();
    } else if (main == 1 && window.data("state") === 'minimized') {
        window.data("position", "column");

        window.css({
            'top': '1.5%',
            'left': '2%',
            'width': '72%',
            'height': '95%',
            'display': 'block',
            'position': 'absolute',
            'z-index': '4'
        });

        window.data('lastContentHeight', window.find('.window-content').height());
        window.find('.window-content').css('height', '100%');

        $('#wind_maximise_wrap').append(window);
    }
}

jQuery.validator.addMethod('regexp',
    function(value, element, regexp) {
        var re = new RegExp(regexp);
        return this.optional(element) || re.test(value);
    },
    "Please check your input.");

jQuery.validator.addMethod('unique',
    function(value, element) {
        if (value.length !== 0){
            var result = $.ajax({
                async:false,
                url: base_url+"admin/menu_controller/check_link",
                data:'link='+ value+'&link_id='+$(element).prev().val()+'&language_id='+$(element).parents('form').find('.language_id').val(),
                type: 'post',
                dataType: "text"
            });

            if(parseInt(result.responseText) === 1){
                return false;
            } else {
                return true;
            }
        } else {
            return true;
        }

    }, "This url has already been  registered");
