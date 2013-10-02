$.Controller.extend('Inner_navigation',
    /*
 * @static
 */
    {},
    /*
 * @prototype
 */
    {
        /*
     * @function init
     * Initializes work of Inner navigation controller, you may put it on <window> selector
     * @param  {String} el typical param for each JVMC controller constructeur
     * @param  {Object} options typical param for each JVMC controller constructeur
     * @param  {Boolean} options.isWindow shows us if components must be loaded in windows
     * @return {Null} Returns true if order dispatched successfully.
     */

        init: function(el, options){

            this.element = $(el);

            if (this.options.defaultComponent) {

                var component = jlinq.from(navigation_components).equals("componentId", this.options.defaultComponent).select()[0];

                $('a[href="'+this.options.base_url+this.options.defaultComponent+'/"]').addClass('active');

                var id = this.options.defaultComponent+'_'+this.options.params[0]+'_'+this.options.params[1]+'_'+this.options.params[2]+'_'+this.options.params[3];

                this.componentInit(component, true, false, id);

            }

            this.preloadComponentFromCookie();

        },
        /*
 * Dispatch an order.
 * @return {Boolean} Returns true if order dispatched successfully.
 */
        event_onpopstate:function(){

                var obj = this;

                var back = false;
                var State = History.getState();

                if (State.data.history_tab_step >= 0) {

                    if (Windows.currentTabHistoryStep == State.data.history_tab_step) {
                        return;
                    }

                    if(Windows.currentTabHistoryStep - State.data.history_tab_step>0){
                        back=true;
                        Windows.currentTabHistoryStep= State.data.history_tab_step
                    } else {
                        Windows.currentTabHistoryStep= State.data.history_tab_step
                    }

                    $(State.data.sameBlocks).hide().removeClass('current');

                    $(State.data.componentBlock).show().addClass('current');


                    $('#'+State.data.controllerBlock+' a').removeClass('active');

                    var active_link = $('#'+State.data.controllerBlock).find('a[href="'+State.data.href+'"]');

                    active_link.addClass('active');
                    $('#'+State.data.controllerBlock.split('_window')[0]+'_button .navigation_panel_button_caption').text(active_link.text())
                    
                    if(obj.history_tab_step == 0 && back == true){

//                        alert("Вы достигли первой страницы истории Вашей навигации,\n при дальнейшем нажатии на кнопку назад вы окажитесь\n на другом ресурсе!");
                        alert("First page");

                    }
                }

        },

        '.new_inner_component click': function(el, ev) {
            ev.preventDefault();

            var $link = $(el);

            if (!$link.hasClass('active')) {

                this.element.children('.new_inner_component').removeClass('active');

                $link.addClass('active');

                //        this.component_type = $(el).attr('data-bookmark')=='true'?'bookmark':'window';

                if ($link.attr('data-href') !== undefined)
                    var href = $link.attr('data-href');
                else
                    href = $link.attr('href');



                if ($.cookie('ieOff') || this.options.isWindow == 0){

                    document.location.href = href;

                } else {

                    this.prepareComponent(href, $(el).attr('title'));

                }

            }
        },

        addCookies: function(window_id, componentHref, title) {

            var openedTabs ='';
            var cookieTabName = 'openedtTabs';

            var cookieArray = $.cookie('openedtTabs') ? $.cookie('openedtTabs').split(/\|/) : false,
            matchesCounter = 0;

            if (cookieArray) {

                $.each(cookieArray, function(){
                    if (this.split(';')[0] == window_id) {
                        openedTabs += window_id+';'+title+';'+componentHref+'|';
                        matchesCounter++;
                    }
                    else
                        openedTabs += this;
                });

            } else {

                openedTabs = window_id+';'+title+';'+componentHref+'|';

            }

            if (matchesCounter == 0)

                openedTabs = window_id+';'+title+';'+componentHref+'|';

            $.cookie(cookieTabName, openedTabs);

        },

        preloadComponentFromCookie: function(){

            var cookieArray = $.cookie('openedtTabs') ? $.cookie('openedtTabs').split(/\|/) : false,
            obj = this;

            if (cookieArray) {
                $.each(cookieArray, function(){

                    var cookie = this.split(';');

                    var href = cookie[2]

                    if (cookie[0] == obj.options.divControlledWrap && $('#'+obj.options.divControlledWrap).data("state") == 'minimized') {

                        if (!$(cookie[0].split('_window')[0]).length) {

                            obj.element.children('.new_inner_component').removeClass('active');

                            obj.element.find('a[href="'+href+'"]').addClass('active');

                            $('#'+obj.options.divControlledWrap).attr('data-href', href);

                            obj.prepareComponent(href, cookie[1]);
                        }

                    }

                });
            }

        },

        prepareComponent: function(href, title, callFrom){

            var primaryHref = href,
            obj = this;

            if (callFrom !== undefined) {
                if (callFrom === 'navigation') {
                    this.element.children('.new_inner_component').removeClass('active');

                    this.element.children('.new_inner_component[href="'+href+'"]').addClass('active');
                }
            }

            var compIdName = href.split(this.options.base_url)[1];
            compIdName = compIdName.substring(0, compIdName.length - 1);

            if (this.options.base_url == base_url) {

                if (href.split(this.options.base_url)[1] === '#' || href.split(this.options.base_url)[1] === '#/') {
                    return;
                } else {
                    this.name = compIdName.indexOf('/') == -1 ? compIdName : false;
                }

                if (this.name){
                    if (route == true) {
                        var buffer_route = jlinq.from(routing).equals('link', compIdName).select()[0];
                        href = this.options.base_url+buffer_route.url;
                    }
                } else {
                    href = Windows.currentUrl+compIdName;
                }

                var id  = href.split(this.options.base_url)[1].replace(/[\/]+/g,'-');

                var params = href.split(this.options.base_url)[1].split('\/');
                var i=0;
                var param = [];

                $(params).each(function(key) {

                    if(key!=0 && this != '' ) {

                        param[i] = this;
                        i++;

                    }

                });

            } else {

                id = href.split(this.options.base_url)[1].split('/')[0]+'-'+this.options.params[0]+'-'+this.options.params[1]+'-'+this.options.params[2]+'-'+this.options.params[3];

            }

            var componentSearchId = href.split(this.options.base_url)[1].split('/')[0];

            var component = jlinq.from(navigation_components).equals("componentId", componentSearchId).select()[0]

            if (component) {

                var btn_id = this.options.divControlledWrap.split('_window')[0]+'_button';

                $('#'+btn_id+' .navigation_panel_button_caption').html(title);

                var $componentBlock = $('#'+id);

                this.addCookies(this.options.divControlledWrap, primaryHref, title);

                if(!$componentBlock.length){

                    this.componentInit(component, false, param, id);

                } else {

                    $(obj.options.divWrapper+' .current').fadeOut(200, function(){

                        $(obj.options.divWrapper+' .'+obj.options.blockClass).removeClass('current');

                        $componentBlock.fadeIn(200, function(){

                            $componentBlock.addClass('current');

                        });

                    });

                }

                if ($('#'+this.options.divControlledWrap).data('state') !== "minimized"){

                    Windows.currentTabHistoryStep++;

                    var data = {};

                    data.history_tab_step = Windows.currentTabHistoryStep;
                    data.title = title;
                    data.href = primaryHref;
                    data.type = 'bookmark';
                    data.componentBlock = '#'+id;
                    data.sameBlocks = this.options.divWrapper+' .'+this.options.blockClass;
                    data.divWrapper = this.options.divWrapper;
                    data.controllerBlock = this.options.controllerBlock;

                    //                        this.setHistoryState(data);
                    $('#'+this.options.divControlledWrap).attr('data-href', primaryHref).css("z-index", jqWindowsEngineZIndex++);

                    $('#'+this.options.divControlledWrap).find('.seo_title').text(data.title);

                    Windows.setHistoryLink(primaryHref, '', false, '', this.options.divControlledWrap.split('_window')[0], false, data);

                }

            }

        },

        componentInit:function(component, init, param, id){

            var obj = this,
            targetWrapper = $(obj.options.divWrapper);

            steal(component.clientApp).then(function(){

                if (obj.options.serverLoad == false || init != true) {

                    targetWrapper.append('<div id="'+id+'" class="'+obj.options.blockClass+' freshComponent"></div>');

                }

                var componentParam = obj.options.params ? obj.options.params : param;
                var initComponentString = '$("'+obj.options.divWrapper+'").find(".'+obj.options.blockClass+':last").'+component.clientController+'('+componentParam+');';

                eval(initComponentString);

                if (init !== undefined && init == true) {
                    var data = {};
                    Windows.currentTabHistoryStep++;
                    data.history_tab_step = Windows.currentTabHistoryStep;
                    data.title = obj.options.title;
                    data.href = obj.options.base_url+obj.options.defaultComponent+'/';
                    data.type = 'bookmark';
                    data.componentBlock = obj.options.divWrapper+' .'+component.clientController;
                    data.sameBlocks = obj.options.divWrapper+' .'+obj.options.blockClass;
                    data.divWrapper = obj.options.divWrapper;
                    data.controllerBlock = obj.options.controllerBlock;

                    $('#'+obj.options.divControlledWrap).attr('data-href', data.href).css("z-index", jqWindowsEngineZIndex++);
                    Windows.setHistoryLink(data.href, '', false, '', obj.options.divControlledWrap.split('_window')[0], false, data);

                }

            }).then(function(){
                var target = targetWrapper.find('.'+obj.options.blockClass+':last');

                if (targetWrapper.find('.current').length) {

                    targetWrapper.find('.current').fadeOut(200, function(){

                        $(obj.options.divWrapper+' .'+obj.options.blockClass).removeClass('current');

                        visibilityToggle(target, false);

                        target.fadeIn(200, function(){

                            target.removeClass('freshComponent').addClass('current').removeAttr('style');

                        });

                    });

                } else {

                    target.removeClass('freshComponent').addClass('current');

                }
            });

        }



    });