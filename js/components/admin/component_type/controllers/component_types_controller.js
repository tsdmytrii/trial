/*
 * ComponentTypes controller
 * 
 * Loads components and table for it, handls edit/delete clicks etc.
 * wind_opt - options for window with set/edit form  
 */
$.Controller.extend('Component_types',{
    defaults: {
        viewpath:'//components/admin/component_type/views/',
        lang_id: 2,
        wind_opt: {
            width: 780,
            height: 480,
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
 * Init func of component_types controller
 * 
 * Sets paginator options, append empty table for component types  and call 
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

        this.loadComponentTypes();
    },

    /*
     * Load all component types
     * 
     * Call model method for load component types
     * with limit and offset as params. Callback func with results. 
     */
    loadComponentTypes: function() {

        Component_types_model.get_all_component_type({
            limit: this.limit,
            offset: this.offset
        }, this.callback('componentTypesGeted'));

    },

/*
 * Check loadComponentsTypes func results.
 * 
 * Check for any data.success. Set component types quantity on page. Refresh 
 * paginator properties. Append html view to the table.   
 */
    componentTypesGeted: function(data) {

        if (data.success == false) {

            show_error('Пожалуйста добавьте несколько типов компонентов');

        } else {

            if (data.message) {

                $('#componentTypesList', '#'+this.elementId).html('<h3>Код ошибки: '+data.message+'</h3>');

            } else {

                if (this.items === 0 || this.items !== parseInt(data.data.quantity)) {

                    this.items = parseInt(data.data.quantity);

                    this.refreshPaginator();

                }

                var html = $.View(this.Class.defaults.viewpath+'all_component_type.tmpl', {
                    our_data: data.data.data,
                    pref: this.Class.defaults.pref
                });

                $('#componentTypesList', '#'+this.elementId).html(html);

            }

            componentLoaded(this.element);
        }
    },

    /*
     * #addComponentType click handler 
     * 
     * Call func that set component type with param FALSE(no properties, cause 
     * its new component type)
     */

    '#addComponentType click': function() {

        this.setComponentTypeCallback(false);

    },

/*
 * .editComponentType click handler
 * 
 * Get id of component type, call func that sets component type with existing 
 * properties(edit component type)
 */
    '.editComponentType click': function(el) {
        var id = {
            component_type_id: $(el).parents(".component_type_icon_wrap").data('component_type_id')
        };

        Component_types_model.get_component_type(id, this.callback('setComponentTypeCallback'));
    },

/*
 * Sets component type
 * 
 * Check for error message. Create window with title(var msg), window options
 * and html view(var html). 
 * $('#set_component_type_window').component_type() - add component_type 
 * controller to selector.
 */
    setComponentTypeCallback: function(data) {

        if (data && data.message) {
            show_error('Код ошибки: '+data.message);
            return;
        }

        var html = $.View(this.Class.defaults.viewpath+'set_component_type.tmpl', {
                our_data: data ? data.data : false
            }),
            msg = data === false ? 'Добавление типа компонента' : 'Изменение типа компонента';

        loadWindow('set_component_type', this.Class.defaults.wind_opt, msg, html);

        $('#set_component_type_window').component_type({
            data: data ? data.data : false,
            elementId: this.elementId
        });

    },

    /*
     * DELETE component types
     */

    '.deleteComponentType click': function(el){
        var id = {
            component_type_id: $(el).parents(".component_type_icon_wrap").data('component_type_id')
        };

        if(confirm('Вы действительно хотите удалить тип компонента?')){

            Component_types_model.delete_component_type(id, this.callback('componentTypeDeleted', el));

        }
    },

    componentTypeDeleted: function(el, data){
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

                this.refreshPaginator();

            }

        } else {
            show_error('Delete error');
        }
    },

    /*
     * Set offset properties, reload table
     */
    getOffset: function(offset) {

        this.offset = offset;

        this.loadComponentTypes();

    },

/*
 * Change quantity of components on page
 */
    '.quantity click': function(el) {

        $(el).parents('div').find('.quantity').removeClass('active');

        $(el).addClass('active');

        this.limit = $(el).data('limit');

        this.refreshPaginator();

        this.loadComponentTypes();

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