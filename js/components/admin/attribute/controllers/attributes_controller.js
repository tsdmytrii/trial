$.Controller.extend('Attributes',{
    defaults: {
        viewpath:'//components/admin/attribute/views/',
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

        this.loadAttributes();
    },

    loadAttributes: function() {

        Attributes_model.get_all_attribute({
            limit: this.limit,
            offset: this.offset
        }, this.callback('attributesReceived'));

    },

    attributesReceived: function(data) {

        if (data.success == false) {

            show_error('Пожалуйста добавьте несколько типов компонентов');

        } else {

            if (data.message) {

                $('#attributesList', '#'+this.elementId).html('<h3>Код ошибки: '+data.message+'</h3>');

            } else {

                if (this.items === 0 || this.items !== parseInt(data.data.quantity)) {

                    this.items = parseInt(data.data.quantity);

                    this.refreshPaginator();

                }

                var html = $.View(this.Class.defaults.viewpath+'all_attribute.tmpl', {
                    our_data: data.data.data,
                    pref: this.Class.defaults.pref
                });

                $('#attributesList', '#'+this.elementId).html(html);

            }

            componentLoaded(this.element);
        }
    },

    '#addAttribute click': function() {

        this.setAttributeCallback(false);

    },

    '.editAttribute click': function(el) {
        var id = {
            attribute_id: $(el).parents(".attribute_icon_wrap").data('attribute_id')
        };

        Attributes_model.get_attribute(id, this.callback('setAttributeCallback'));
    },

    setAttributeCallback: function(data) {

        if (data && data.message) {
            show_error('Код ошибки: '+data.message);
            return;
        }

        var html = $.View(this.Class.defaults.viewpath+'set_attribute.tmpl', {
                our_data: data ? data.data : false
            }),
            msg = data === false ? 'Добавление типа компонента' : 'Изменение типа компонента';

        loadWindow('set_attribute', this.Class.defaults.wind_opt, msg, html);

        $('#set_attribute_window').attribute({
            data: data ? data.data : false,
            elementId: this.elementId
        });

    },

    '.deleteAttribute click': function(el){
        var id = {
            attribute_id: $(el).parents(".attribute_icon_wrap").data('attribute_id')
        };

        if(confirm('Вы действительно хотите удалить тип компонента?')){

            Attributes_model.delete_attribute(id, this.callback('attributeDeleted', el));

        }
    },

    attributeDeleted: function(el, data){
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
     * LIST MANIPULATION
     */

    getOffset: function(offset) {

        this.offset = offset;

        this.loadAttributes();

    },

    '.quantity click': function(el) {

        $(el).parents('div').find('.quantity').removeClass('active');

        $(el).addClass('active');

        this.limit = $(el).data('limit');

        this.refreshPaginator();

        this.loadAttributes();

    },

    refreshPaginator: function() {

        if ($('#paginator', '#'+this.elementId).hasClass('paginator'))
            $('#paginator', '#'+this.elementId).paginator('destroy');

        this.paginatorOptions.items = this.items;

        this.paginatorOptions.itemsOnPage = this.limit;

        $('#paginator', '#'+this.elementId).paginator(this.paginatorOptions);

     }

});