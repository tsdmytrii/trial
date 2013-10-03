/*
 * Subscriptions controller
 * 
 * Loads subscribes and table for it, handls edit/delete clicks etc.
 * wind_opt - options for window with set/edit form  
 */
$.Controller.extend('Campaigns',{
    defaults: {
        viewpath:'//components/admin/campaigns/views/',
        lang_id: 2,
        wind_opt: {
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

        Campaigns_model.get_all_subscriptions({
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

        this.setCampaingCallback(false);

    },

    /*
 * .editSubscription click handler
 * 
 * Get id of subscribe type, call func that sets subscribe type with existing 
 * properties(edit subscribe type)
 */
    '.editSubscription click': function(el) {
        var id = {
            campaing_id: $(el).parent(".subscription_icon_wrap").data('subscription_id')
        };

        Campaings_model.get_campaing(id, this.callback('setCampaingCallback'));
    },

    /*
 * Sets subscribe type
 * 
 * Check for error message. Create window with title(var msg), window options
 * and html view(var html). 
 * $('#set_subscription_window').subscription() - add subscription 
 * controller to selector.
 */
    setCampaingCallback: function(data) {

        if (data && data.message) {
            show_error('Код ошибки: '+data.message);
            return;
        }
       
        var html = $.View(this.Class.defaults.viewpath+'set_campaing.tmpl', {
            our_data: data ? data.data : false
        }),
        msg = data === false ? 'Добавление типа подписки' : 'Изменение типа подписки';

        loadWindow('set_campaing', this.Class.defaults.wind_opt, msg, html);
    
        $('#set_campaing_window').campaign({
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