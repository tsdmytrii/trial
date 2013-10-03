/*
 * @class Navigation_controller
 * @tag navigation, windows
 * @parent navigation
 * @plugin navigation
 * @download arsenal/js/components/user/core/navigation/controllers/navigation_controller.js
 * ###Navigation controller
 *
 * Documentation for navigation controller
 * Is responsible for loading components in windows, controls:
 *
 * * Loading from cookies
 * * Adding into cookies
 * * Checks identity of component on page
 * * Loads new components by clicking on link
 * * Openes components with specific parameters in Windows
 *
 */
$.Controller.extend('Navigation',
/*
* @static
*/
{



    serverLoader : new Array(),
    clientLoader : new Array(),
    flightControllers : new Array(),
    /*
     * Dispatch an order.
     * @return {Boolean} Returns true if order dispatched successfully.
     */
    addCookies: function(compObj) {

        if (Navigation.isSuchCookie(compObj) == true){

            return;
        }
        if(compObj.type=='window'){


            var openedWindows ='';
            var cookieWinName = 'openedWindows_'+compObj.sub;
            if ($.cookie(cookieWinName)) {
                openedWindows = $.cookie(cookieWinName);
            }

            var component = compObj.name ? compObj.name : compObj.componentId;

            openedWindows += component+';'+compObj.title+';'+compObj.href+'|';

            $.cookie(cookieWinName, openedWindows);

        }
        else if(compObj.type=='main'){

            var cookieManName = 'mainContent_'+compObj.sub;
            $.cookie(cookieManName, compObj.componentId+';'+compObj.title+'|');

        }

    },
    /*
     * Dispatch an order.
     * @return {Boolean} Returns true if order dispatched successfully.
     */
    isSuchCookie: function(checkedCookie){
        var cookieArray = $.cookie('openedWindows_'+checkedCookie.sub) ? $.cookie('openedWindows_'+checkedCookie.sub).split(/\|/) : false;
        var isSuchCookie = false;
        var check = checkedCookie.name ? checkedCookie.name : checkedCookie.componentId;


        if (cookieArray) {
            $.each(cookieArray, function(){
                if (this.split(';')[0] == check)
                    isSuchCookie = true;
            });
        }

        return isSuchCookie;


    }

},
/*
* @prototype
*/
{
    /*
     * @function init
     * Initializes work of Navigation controller, you may put it on <body> selector
     * @param  {String} el typical param for each JVMC controller constructeur
     * @param  {Object} options typical param for each JVMC controller constructeur
     * @param  {Boolean} options.isWindow shows us if components must be loaded in windows
     * @return {Null} Returns true if order dispatched successfully.
     */

    init: function(el, options){

        this.windows_work = parseInt(options.isWindow);

        window.onpopstate = function(event) {
            var pageLoc = ''+document.location;
            var back = false;
            var willComponents, wasComponents;
            var State = History.getState();

            if(State.data.type == 'bookmark'){

                $('#'+State.data.controllerBlock).inner_navigation('event_onpopstate');

            }

            $('title').html(State.data.title);
            if(State.data.history_step >= 1){

                if(Windows.currentHistoryStep - State.data.history_step>0){
                    back = true;
                    wasComponents = Windows.nextOpenedWindows[Windows.currentHistoryStep];
                    Windows.currentHistoryStep = State.data.history_step;
                    willComponents = Windows.nextOpenedWindows[Windows.currentHistoryStep];

                }
                else{

                    wasComponents = Windows.nextOpenedWindows[Windows.currentHistoryStep];
                    Windows.currentHistoryStep = State.data.history_step;
                    willComponents = Windows.nextOpenedWindows[Windows.currentHistoryStep];

                }

                var componentsToOpen = [],
                componentsToClose = [],
                componentsToMinimize = [],
                componentsToMaximize = [];

                $(willComponents).each(function(){

                    var suchComponent = jlinq.from(wasComponents).equals("id", this.id).select();
                    var closed='closed';
                    if(suchComponent.length!=0){
                        closed=suchComponent[0].closed;
                    }

                    if(this.closed=='opened'&&closed=='closed'){

                        componentsToOpen[componentsToOpen.length] = this;

                    }

                });

                $(wasComponents).each(function(){

                    var suchComponent = jlinq.from(willComponents).equals("id", this.id).select();
                    var closed = true;
                    if(suchComponent.length>0)
                        closed = suchComponent[0].closed;
                    if(this.closed=='opened'&&suchComponent.length==0||(this.closed=='opened'&&closed=='closed')){

                        componentsToClose[componentsToClose.length] = this;

                    }

                });

                $(willComponents).each(function(){

                    var suchComponent = jlinq.from(wasComponents).equals("id", this.id).select();
                    if(suchComponent.length!=0){

                        if(this.closed!='closed'&&this.state!=suchComponent[0].state){
                            componentsToMinimize[componentsToMinimize.length] = this;
                        }
                    }

                });
                $(willComponents).each(function(){

                    var suchComponent = jlinq.from(wasComponents).equals("id", this.id).select();
                    if(suchComponent.length!=0){

                        if(this.closed!='closed'&&this.state==suchComponent[0].state&&this.state=='normal'){
                            if(this.position!=suchComponent[0].position){
                                componentsToMaximize[componentsToMaximize.length] = this;
                            }
                        }
                    }

                });
                //alert('to_open'+$.dump(componentsToOpen));
                $(componentsToOpen).each(function(){


                    var suchComponent = jlinq.from(Windows.registeredComponents).equals("id", this.id.replace(/[-]+/g, '\/')).select();

                    Windows.addComponentFromRegistered(suchComponent, true);

                });
                //alert('to_close'+$.dump(componentsToClose));
                $(componentsToClose).each(function(){

                    Windows.deleteComponent(this.id, true);

                });

                //alert('to_min'+$.dump(componentsToMinimize));

                $(componentsToMinimize).each(function(){

                    Windows.showWindow(this.id, true);

                });

                $(componentsToMaximize).each(function(){

                    Windows.maximiseWindow(this.id, true);

                });

                if(State.data.id!=null){
                    if($('#'+State.data.id+'_window').data('position') === "body"){

                        $('#'+State.data.id+'_window').css("z-index", jqWindowsEngineZIndex++);
                        $('#'+State.data.id+'_window').data('lastZIndex', jqWindowsEngineZIndex);
                    }
                }
                if(Windows.currentHistoryStep==1&&back==true){

                    alert("Вы достигли первой страницы истории Вашей навигации,\n при дальнейшем нажатии на кнопку назад вы окажитесь\n на другом ресурсе!");

                }
            }
            if(pageLoc.split('#')[1]=='!'){

                History.replaceState('', '', pageLoc.split('#')[0]);

            }
        };
        if (!$.cookie('ieOff')){
            var browser = $.browser;

            if (browser.msie){
                $.cookie('ieOff', true);
            }

            if (browser.opera && parseFloat(browser.version.slice(0,4)) < 11.5){
                $.cookie('ieOff', true);
            }

        }

        if (typeof init_data != undefined) {
            if (init_data.data.mobile === 1 ){

                $.cookie('ieOff', true);
            }
        }

        /**
        * @attribute components
        * @parent Navigation_controller.prototype.init
        * Sets the array of available components, which is loaded in file navigation_json in navigation component
        */
        this.components=navigation_components;

        this.oldCookie='';

        this.mainSelector = options.mainSelector;

        this.winPanSelector = options.winPanSelector;
        this.sub = options.sub;
        this.isHash = options.isHash;
        this.isCookie = options.isCookie;
        var targets = {

            isHash: this.isHash,
            isCookie: this.isCookie

        }

        this.windows = new Windows(targets);

        if(this.winPanSelector.length>0){
            if($("#button_panel").length==0){
                var buttonPanel = $('<div id="button_panel">&nbsp;</div>')
                $(this.winPanSelector).append(buttonPanel);
            }
        }

        if (!$.cookie('ieOff') && this.windows_work != 0){

            this.setComponentsArray();


        } else {

            this.connectComponent();

        }

    },
    /*
     * Steal component and make fake window work for old browsers
     **/
    connectComponent: function(){

        if ($('.false_window').length) {

            this.componentId = this.options.componentLoad.componentId;
            var obj = this;

            var componentSearchId = this.componentId.split('\/')[0];
            var component;
            if(componentSearchId.length > 0){
                component = jlinq.from(this.components).equals("componentId", componentSearchId).select()[0];
            }

            if(component){
                var params = this.componentId.split('\/');
                var i=0;

                obj.param = new Array();

                $(params).each(function(key){

                    if(key!=0 && this != '' ){

                        obj.param[i] = this;
                        i++;

                    }

                });

                steal(component.clientApp).then(function(){

                    $("#pageWrap .false_window").attr('id', component.clientController+'_'+obj.param[0]);

                    $('#'+component.clientController+'_'+obj.param[0])
                    .data('position', 'maxi')
                    .data('titleBar', component.windowOption.titleBar)
                    .data('logoAlign', component.windowOption.logoAlign)
                    .data('allWidth', component.windowOption.allWidth);

                    var initComponentString = ';$("#pageWrap .false_window").'+component.clientController+'('+obj.param+');';

                    eval(initComponentString);
                });

            }
        }

    },

    /*
     * Dispatch an order.
     * @return {Boolean} Returns true if order dispatched successfully.
     */
    setComponentsArray: function(){
        var componentArray = new Array();
        var cookieWinName = 'openedWindows_'+this.sub;

        if ($('.false_window').length){
            var suchInComponents = jlinq.from(componentArray).equals("id", this.options.componentLoad.componentId).select();

            if(suchInComponents.length==0){

                var href,
                id;

                var buffer_route = jlinq.from(routing).equals('url', this.options.componentLoad.componentId).select()[0];
                if (buffer_route !== undefined){
                    if (buffer_route.link !== '' && buffer_route.link.length){
                        href = Windows.currentUrl+buffer_route.link+'/';
                        id = buffer_route.link;
                    } else {
                        href = Windows.currentUrl+this.options.componentLoad.componentId+'/'
                        id = this.options.componentLoad.componentId;
                    }
                } else {
                    href = Windows.currentUrl+this.options.componentLoad.componentId+'/'
                    id = this.options.componentLoad.componentId;
                }

                componentArray[componentArray.length]={
                    id: id,
                    title: this.options.componentLoad.title,
                    href: href,
                    source: 'direct'
                };

            }
        }
        if($.cookie(cookieWinName)&&this.isCookie==1) {
            var cookiesComponents = $.cookie(cookieWinName).split(/\|/);
            $(cookiesComponents).each(function(){

                var suchInComponents = jlinq.from(componentArray).equals("id", this.split(';')[0]).select();
                if(suchInComponents.length==0&&this.length!=0){

                    componentArray[componentArray.length]={
                        id: this.split(';')[0],
                        title: this.split(';')[1],
                        href: this.split(';')[2],
                        source: 'cookie'
                    }

                }

            });

        }
        if(this.oldHash&&this.isHash==1){

            var hashComponents = this.oldHash.split('&');
            $.each(hashComponents, function(key){
                if(hashComponents.length>0 && hashComponents[key] !== '' && hashComponents[key] !== '!'){

                    var suchInComponents = jlinq.from(componentArray).equals("id", hashComponents[key]).select();

                    if(suchInComponents.length==0){

                        componentArray[componentArray.length]={
                            id: hashComponents[key],
                            title: '',
                            href: hashComponents[key]+'/',
                            source: 'hash'
                        };

                    }
                }
            });

        }
        if(componentArray.length==0){

            Windows.setHistoryLink(document.location.href, Windows.currentTitel, false, 'start', null, true);
        }
        this.loadComponentsArray(componentArray);

    },
    loadComponentsArray: function(componentArray){
        var object = this;
        $(componentArray).each(function(key){

            this.id.substring(0, this.id.length - 1);

            object.name = this.id.indexOf('/') == -1 ? this.id : false;

            if(object.name) {
                var buffer_route = jlinq.from(routing).equals('link', object.name).select()[0];
                object.componentId = buffer_route.url;
            }
            else{
                object.componentId = this.id;
            }
            object.href = this.href;
            var componentSearchId = object.componentId.split('\/')[0];
            var component;
            if(componentSearchId.length > 0){
                component = jlinq.from(object.components).equals("componentId", componentSearchId).select()[0];
            }
            if(component){
                object.serverApp = component.serverApp;
                object.windowOption = component.windowOption;
                object.serverQuery = component.serverQuery;
                var params = object.componentId.split('\/');
                var i=0;

                object.param = new Array();

                $(params).each(function(key){

                    if(key!=0 && this != '' ){

                        object.param[i] = this;
                        i++;

                    }

                });

                object.clientApp = component.clientApp;
                object.clientController = component.clientController;
                object.title = this.title;
                object.type = "window";
                if(this.source=='cookie' && this.source!='direct'){
                    object.state = "minimized";
                    object.maxi = 0;
                }
                else{
                    object.maxi = 0;
                    object.state = "normal";
                }

                if(this.source=='direct'){
                    object.state = "normal";
                    object.maxi = 1;
                }
                object.last = (key+1==componentArray.length);
                object.loadComponent(false);

            }


        });


    },
    /*
     * @function event_new_component_click
     * @return {Boolean} Returns true if order dispatched successfully.
     */
    ".new_component click": function(el, ev){
        ev.preventDefault();
        ev.stopPropagation();

        this.maxi = 0;

        if (el.attr('data-href') !== undefined)
            var href = el.attr('data-href');
        else
            href = el.attr('href');
        this.href = href;

        var additionalParam = el.attr('data-additional_param')

        if ($.cookie('ieOff') || this.windows_work == 0){
            document.location.href = href;
        } else {
            this.name = false;

            var compIdName = href.split(Windows.currentUrl)[1];
            compIdName = compIdName.substring(0, compIdName.length - 1);

            if (href.split(Windows.currentUrl)[1] === '#' || href.split(Windows.currentUrl)[1] === '#/') {
                return;
            } else {
                this.name = compIdName.indexOf('/') == -1 ? compIdName : false;
            }

            if (this.name){
                if (route == true) {
                    var buffer_route = jlinq.from(routing).equals('link', compIdName).select()[0];
                    href = Windows.currentUrl+buffer_route.url;
                }
            } else {
                href = Windows.currentUrl+compIdName;
            }

            this.componentId = href.split(Windows.currentUrl)[1];
            var componentSearchId = this.componentId.split('\/')[0],
                menu_item_id = false;
                menu_item = false;

            if (el.attr('data-inner') !== undefined) {
                var menu_item_id = this.componentId.split('\/')[2];

                var menu_item = jlinq.from(init_data.data.innerMenuItem).equals("id", parseInt(menu_item_id)).select()[0];

                var neibors_menu_item,
                    parent_menu_item = false;

                if (parseInt(menu_item.parent_id) !== 0) {

                    neibors_menu_item = jlinq.from(init_data.data.innerMenuItem).equals("parent_id", menu_item.parent_id).select();
                    parent_menu_item = jlinq.from(init_data.data.innerMenuItem).equals("id", menu_item.parent_id).select();

                } else {

                    neibors_menu_item = jlinq.from(init_data.data.innerMenuItem).equals("parent_id", menu_item.id).select();

                }

                var openedBro = false,
                    id;

                for (var i = 0; i < neibors_menu_item.length; i++) {
                    var thisMI = neibors_menu_item[i];

                    if (thisMI.id !== menu_item_id) {
                        id = thisMI.href.replace(/[\/]+/g, '-')+'-'+thisMI.id+'-'+thisMI.main+'-'+$.cookie('lang');

                        if ($('#'+id+'_window').length) {
                            openedBro = id;
                        }
                    }
                }

                if (parent_menu_item) {
                    /*
                     * ToDo - сделать открытие родителя в том же окне что и открытие соседей связаных пунктов меню.
                     */
                }

                if (openedBro) {

                    this.componentId = openedBro.replace(/[-]+/g, '\/');
                    componentSearchId = this.componentId.split('\/')[0];
                    this.name = false;

                }

            }
            
            var component = jlinq.from(this.components).equals("componentId", componentSearchId).select()[0];

            if (componentSearchId) {
                this.serverQuery = component.serverQuery;
                if(this.serverQuery){
                    this.serverApp = this.componentId;
                }
                else{
                    this.serverApp=0;
                }
                this.type = component.type;
                this.state = 'normal';
                this.windowOption = component.windowOption;
                this.clientApp = component.clientApp;
                this.clientController = component.clientController;
                var params = this.componentId.split('\/');
                var i=0;
                var object=this;
                this.param = new Array();

                $(params).each(function(key){

                    if(key!=0 && this != '' ){

                        object.param[i] = this;
                        i++;

                    }

                });

                if (additionalParam !== undefined)
                    this.param[this.param.length] = additionalParam;

                this.last = false;
                this.title = el.attr('title') === undefined ? '' : el.attr('title').replace(/[&]+/g, ' ');

                if(this.componentId.length == 0){
                    steal.dev.log("there is no component id");
                }

                var suchComponentClosed=true;
                var suchComponent = jlinq.from(Windows.registeredComponents).equals("id", this.componentId).select();
                if(suchComponent.length!==0){

                    suchComponentClosed = $('#'+(suchComponent[0].id.replace(/[\/]+/g,'-'))+'_window').data('closed');

                }
                if(suchComponent.length>0&&suchComponentClosed=='closed'){

                    if(suchComponent[0].id.replace(/[\/]+/g,'-'))
                        Windows.addComponentFromRegistered(suchComponent);

                }
                else{

                    this.addComponent(true, menu_item);

                }

            }
        }

    },
    addComponent: function(fresh, menu_item){

        if(this.isSuchComponent()===false){

            this.loadComponent(fresh);
        }
        else{

            var id = this.componentId.replace(/[\/]+/g,'-');

            if ($('#'+id+'_window').css('display') !== 'block' || $('#'+id+'_window').css('visibility') == 'hidden'){
                Windows.showWindow(id);
            }

            if (menu_item) {
                $('#'+id+'_window .inner_navigation').inner_navigation('prepareComponent', base_url+menu_item.link[chose_lang_pref()].link+'/', this.title, 'navigation');
            }

        }


    },
    isSuchComponent: function(){

        if(this.type=='main'){

            steal.dev.log("#"+this.componentId);
            var idElem = this.componentId.replace(/[\/]+/g,'-');
            if($("#"+idElem).length==0)
                return false;
            else
                return true;

        }
        else if(this.type=='window'){

            var cookieWinName = 'openedWindows_'+this.sub;
            var suchComponent = false;

            if($.cookie(cookieWinName)) {

                var openedWindows = $.cookie(cookieWinName).split(/\|/);

                if (this.name) {
                    suchComponent = this.isSuchInSource(openedWindows, this.name);
                } else {
                    if ($('#'+this.componentId.replace(/[\/]+/g,'-')+'_window').length)
                        suchComponent = true;
                }

            }
            return suchComponent;

        }

    },
    isSuchInSource: function(sourceArray, componentId){


        var cookieComponentId;
        var suchComponent = false;
        $.each(sourceArray, function(window){


            cookieComponentId = this.split(';')[0];

            if(cookieComponentId == componentId){
                suchComponent= true;
                return;
            }

        });
        return suchComponent;

    },
    loadComponent: function(fresh){

        var compObj = new Object();
        compObj.componentId = this.componentId;
        compObj.name = this.name;
        compObj.href = this.href;
        compObj.windowOption = this.windowOption;
        compObj.serverApp = this.serverApp;
        compObj.clientApp = this.clientApp;
        compObj.clientController = this.clientController;
        compObj.type = this.type;
        compObj.state = this.state;
        compObj.title = this.title;
        compObj.param = this.param;
        compObj.sub = this.sub;
        compObj.mainSelector = this.mainSelector;
        compObj.serverQuery = this.serverQuery;
        compObj.html='';
        compObj.isHash = this.isHash;
        compObj.isCookie = this.isCookie;
        compObj.maxi = this.maxi;
        compObj.last = this.last;
        if(typeof this.json == 'undefined'){

            compObj.json='';

        }
        else{

            compObj.json=this.json;

        }

        if(compObj.serverQuery==1){
            Script.getServerApp(compObj, this.callback('stealClientApp', compObj, fresh));
        }
        else{
            this.stealClientApp(compObj, '', fresh);
        }
    },
    stealClientApp: function(componentObject, data, fresh){

        if(data.length>0){
            try{
                componentObject.json = $.parseJSON(data);
                componentObject.html = '';
            }
            catch(e){
                componentObject.html = data;
                componentObject.json = '';
            }
        }
        var object = this;
        steal(componentObject.clientApp).then(function(){

            object.initNewApp(componentObject, fresh);


        })

    },
    addHash: function(compObj){

        var newHash = window.location.hash;
        if(newHash[newHash.length-1]=='!'){

            newHash='';

        }



        var component = compObj.name ? compObj.name : compObj.componentId;
        if(newHash[newHash.length-1]!='&'&&newHash.length!=0){

            component ='&'+component;

        }
        newHash = newHash+component;

        if(newHash.length==0){

            newHash = '!';

        }
        window.location.hash = newHash;

    },
    "client_ready subscribe": function(element, data){

        this.listenClient(data);

    },
    "server_ready subscribe": function(element, data){

        this.listenServer(data);

    },
    listenServer: function(data){

        var idElem = data.componentId.replace(/[\/]+/g,'_');

        if(Navigation.clientLoader[idElem] == true){


            this.initNewApp(data);
        }
        else{

            Navigation.serverLoader[idElem] = true;

        }

    },
    listenClient: function(data){

        var idElem = data.componentId.replace(/[\/]+/g,'_');

        if(Navigation.serverLoader[idElem] == true){



            this.initNewApp(data);

        }
        else{

            Navigation.clientLoader[idElem] = true;

        }

    },
    initNewApp: function(data, fresh){

        var idElem = data.componentId.replace(/[\/]+/g,'-');
        var name = data.name;

        if(data.type=='main'){

            var wrapper = $('<div id="'+idElem+'">'+data.html+'</div>');
            $(data.mainSelector).html(wrapper);

        }
        else if(data.type=='window'){

            data.windowOption.state = data.state;

            if (data.maxi == 1) {
                data.windowOption.main = 1;
            } else {
                data.windowOption.main = parseInt(data.componentId.split('/')[3]);
            }

            data.windowOption.direct_link = data.maxi;
            this.windows.loadWindow(idElem, data.windowOption, data.title, data.html, data.sub, fresh, data.href);

        }
        var clientParam = null;

        if(data.json){

            clientParam = data.json;

        }
        else{
            if(data.param){

                clientParam = data.param;

            }
        }

        if(data.param){
            if(Navigation.flightControllers[idElem]!=true){

                var clientController = data.clientController;
                clientController = clientController.substr(0, 1).toUpperCase()+clientController.substr(1, clientController.length-1);
                var controllerOnFlight = clientController+".extend('"+clientController+data.param[0]+"',{},{})";
                eval(controllerOnFlight);
                Navigation.flightControllers[idElem] = true;
            }
            else{
                steal.dev.log('There is such controller!');
            }
            if(data.type=='main'){
                var initComponentString = '$("#'+idElem+'").'+data.clientController+data.param[0]+'('+clientParam+');';
            }
            else if(data.type=='window'){
                //                var initComponentString = '$("#'+idElem+'_window").find(".window-content").'+data.clientController+data.param[0]+'('+clientParam+');';
                var initComponentString = '$("#'+idElem+'_window").'+data.clientController+data.param[0]+'('+clientParam+');';
            }


        }
        else{
            if(data.type=='main'){

                var initComponentString = '$("#'+idElem+'").'+data.clientController+'('+clientParam+');';

            }
            else if(data.type=='window'){
                //                var initComponentString = '$("#'+idElem+'_window").find(".window-content").'+data.clientController+'('+clientParam+');';
                var initComponentString = '$("#'+idElem+'_window").'+data.clientController+'('+clientParam+');';
            }
        }

        $('#'+idElem+'_window').attr('data-name', name);

        eval(initComponentString);


        if(this.isCookie==1){

            Navigation.addCookies(data);

        }
        if(this.isHash==1){
            this.addHash(data);
        }
        Windows.registeredComponents[Windows.registeredComponents.length] = {
            'name': data.name,
            'id': data.componentId,
            'href': data.href,
            'title': data.title,
            'sub': data.sub

        }
        if(data.last==true){

            Windows.setHistoryLink(document.location.href, false, 'start', null, true);

        }

    }
});
