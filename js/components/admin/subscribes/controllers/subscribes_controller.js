/*
 * Subscriptions controller
 * 
 * Loads subscribes and table for it, handls edit/delete clicks etc.
 * wind_opt - options for window with set/edit form  
 */
$.Controller.extend('Subscribes',{
    defaults: {
        viewpath:'//components/admin/subscribes/views/',
        lang_id: 2,
        wind_opt: {
            subscriber: {
                width: 780,
                height: 500,
                minimize: true,
                maximise: true,
                left: '100',
                top: '100',
                resize: true,
                status_bar: true,
                modal: true
            },
            subscription: {
                width: 780,
                height: 350,
                minimize: true,
                maximise: true,
                left: '100',
                top: '100',
                resize: true,
                status_bar: true,
                modal: true
            }
            
        },
        pref: 'ru'
    }

},{

    /*
 * Init func of subscriptions controller
 * 
 * Sets paginator options, append empty table for subscribe types  and call 
 * load function.  
 */
    init:function(selector) {

        this.limit = 20;
        this.items = 0;
        this.offset = 0;

        this.elementId = this.element.attr('id');

        this.paginatorOptions = {
            itemsOnPage: this.limit,
            edges: 1,
            currentPage: 1,
            callBackString: '$("#' + this.elementId + '").' + this.Class.fullName.toLowerCase() + '("getOffset", '
        };

        var html = $.View(this.Class.defaults.viewpath+'index.tmpl', {});

        this.element.html(html);
       
        this.loadSubscriptions();
    },

    '.tabBtn click': function(el) {
       
        $('.tabBtn').removeClass('btn-primary');
        var wrap = $(el).data('wrap');
        $(el).addClass('btn-primary');
        $('.subWrap').addClass('hidden');
        if(wrap === 'subscriptionWrap') {
            this.loadSubscriptions();
        }
        if(wrap === 'subscriberWrap') {
            this.loadSubscribers();
        }
        $('#'+wrap).removeClass('hidden');
    },    
    /*
     * Load all subscribe types
     * 
     * Call model method for load subscribe types
     * with limit and offset as params. Callback func with results. 
     */
    loadSubscriptions: function() {

        Subscribes_model.get_all_subscriptions({
            limit: this.limit,
            offset: this.offset
        }, this.callback('subscriptionsGot'));
    },

    /*
 * Check loadSubscribesTypes func results.
 * 
 * Check for any data.success. Set subscribe types quantity on page. Refresh 
 * paginator properties. Append html view to the table.   
 */
    subscriptionsGot: function(data) {
        
        if (data.success == false) {

            show_error('Пожалуйста добавьте несколько типов подписок');

        } else {

            if (data.message) {

                $('#subscriptionsList', '#'+this.elementId).html('<h3>Код ошибки: '+data.message+'</h3>');

            } else {

                if (this.items === 0 || this.items !== parseInt(data.data.quantity)) {

                    this.items = parseInt(data.data.quantity);

                    this.refreshPaginator();

                }

                var html = $.View(this.Class.defaults.viewpath+'all_subscriptions.tmpl', {
                    our_data: data.data,
                    pref: this.Class.defaults.pref
                });

                $('#subscriptionsList', '#'+this.elementId).html(html);

            }

            componentLoaded(this.element);
        }
    },

    /*
     * #addSubscription click handler 
     * 
     * Call func that set subscribe type with param FALSE(no properties, cause 
     * its new subscribe type)
     */

    '#addSubscription click': function() {

        this.setSubscriptionCallback(false);

    },

    /*
 * .editSubscription click handler
 * 
 * Get id of subscribe type, call func that sets subscribe type with existing 
 * properties(edit subscribe type)
 */
    '.editSubscription click': function(el) {
        var id = {
            subscription_id: $(el).parent(".subscription_icon_wrap").data('subscription_id')
        };

        Subscribes_model.get_subscription(id, this.callback('setSubscriptionCallback'));
    },

    /*
 * Sets subscribe type
 * 
 * Check for error message. Create window with title(var msg), window options
 * and html view(var html). 
 * $('#set_subscription_window').subscription() - add subscription 
 * controller to selector.
 */
    setSubscriptionCallback: function(data) {

        if (data && data.message) {
            show_error('Код ошибки: '+data.message);
            return;
        }
       
        var html = $.View(this.Class.defaults.viewpath+'set_subscription.tmpl', {
            our_data: data ? data.data : false
        }),
        msg = data === false ? 'Добавление типа подписки' : 'Изменение типа подписки';

        loadWindow('set_subscription', this.Class.defaults.wind_opt.subscription, msg, html);
    
        $('#set_subscription_window').subscription({
            data: data ? data.data : false,
            elementId: this.elementId
        });

    },

    /*
     * DELETE subscribe types
     */

    '.deleteSubscription click': function(el){
        var id = {
            subscription_id: $(el).parents(".subscription_icon_wrap").data('subscription_id')
        };

        if(confirm('Вы действительно хотите удалить тип компонента?')){

            Subscribes_model.delete_subscription(id, this.callback('subscriptionDeleted', el));

        }
    },

    subscriptionDeleted: function(el, data){
        if (data.success) {

            if (data.message) {

                show_error('Код ошибки: '+data.message);

            } else {

                show_success('Deleted');

                var tr = el.parents('tr');

                tr.slideUp(300, function(){

                    tr.remove();

                });

                this.items--;
            }

        } else {
            show_error('Delete error');
        }
    },



    loadSubscribers : function(){
        Subscribes_model.get_all_subscribers({
            limit: this.limit,
            offset: this.offset
        }, this.callback('subscribersGot'));
    },

    subscribersGot: function(data) {
        
        if (data.success == false) {

            show_error('Пожалуйста добавьте несколько типов подписок');

        } else {

            if (data.message) {

                $('#subscribersList', '#'+this.elementId).html('<h3>Код ошибки: '+data.message+'</h3>');

            } else {

                if (this.items === 0 || this.items !== parseInt(data.data.quantity)) {

                    this.items = parseInt(data.data.quantity);

                    this.refreshPaginator();

                }

                var html = $.View(this.Class.defaults.viewpath+'all_subscribers.tmpl', {
                    our_data: data.data,
                    pref: this.Class.defaults.pref
                });

                $('#subscribersList', '#'+this.elementId).empty();
                $('#subscribersList', '#'+this.elementId).html(html);

            }

            componentLoaded(this.element);
        }
    },
    
    '#addSubscriber click': function() {

        Subscribes_model.get_subscriber('', this.callback('setSubscriberCallback'));

    },
    
    '.editSubscriber click': function(el) {
        var id = {
            subscriber_id: $(el).parent(".subscriber_icon_wrap").data('subscriber_id')
        };

        Subscribes_model.get_subscriber(id, this.callback('setSubscriberCallback'));
    },
    
    setSubscriberCallback: function(data) {

        if (data && data.message) {
            show_error('Код ошибки: '+data.message);
            return;
        }

        var html = $.View(this.Class.defaults.viewpath+'set_subscriber.tmpl', {
            our_data: data ? data.data : data.subscriptions
        }),
        msg = data === false ? 'Добавление подписчика' : 'Изменение подписчика';

        loadWindow('set_subscriber', this.Class.defaults.wind_opt.subscriber, msg, html);

        $('#set_subscriber_window').subscriber({
            data: data ? data.data : false,
            elementId: this.elementId
        });

    },
    
    '.checkbox click': function(el, ev) {
        el.attr('disabled', "disabled");
        
        var id =  "id="+el.data('id')+"&";
//        var newFuture = el.serialize() ? "unchecked" : "checked";
        $.ajax({
            url: base_url+'admin/subscribes_controller/change_new_state',
            data: id+el.serialize(),
            success: function() {
                el.removeAttr("disabled");
                },
            error: function(){
                alert("Не удалось снять галочку!");
            }
        });
    },
    '.deleteSubscriber click': function(el){
        var id = {
            subscriber_id: $(el).parents(".subscriber_icon_wrap").data('subscriber_id')
        };

        if(confirm('Вы действительно хотите удалить подписчика?')){

            Subscribes_model.delete_subscriber(id, this.callback('subscriberDeleted', el));

        }
    },

    subscriberDeleted: function(el, data){
        if (data.success) {

            if (data.message) {

                show_error('Код ошибки: '+data.message);

            } else {

                show_success('Deleted');

                var tr = el.parents('tr');

                tr.slideUp(300, function(){

                    tr.remove();

                });

                this.items--;
            }

        } else {
            show_error('Delete error');
        }
    },
    
    /*
 * Change quantity of subscribes on page
 */
    '.quantity click': function(el) {

        $(el).parents('div').find('.quantity').removeClass('active');

        $(el).addClass('active');

        this.limit = $(el).data('limit');

        this.refreshPaginator();

        this.loadSubscriptions();

    },

    /*
 * Refreshes paginator with new properies 
 */
    refreshPaginator: function() {

        if ($('#paginator', '#'+this.elementId).hasClass('paginator'))
            $('#paginator', '#'+this.elementId).paginator('destroy');

        this.paginatorOptions.items = this.items;

        this.paginatorOptions.itemsOnPage = this.limit;

        $('#paginator', '#'+this.elementId).paginator(this.paginatorOptions);

    //        alert('paginatorInit');

    }

});