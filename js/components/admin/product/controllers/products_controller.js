/*
 * Products controller
 * 
 * Loads, deletes , sorts products
 */
$.Controller.extend('Products',{
    defaults: {
        viewpath:'//components/admin/product/views/',
        lang_id: 2,
        wind_opt: {
            width: 960,
            height: 480,
            minimize: true,
            maximise: true,
            left: '100',
            top: '50',
            resize: true,
            status_bar: true,
            modal: true
        },
        pref: 'ru'
    }

},{

/*
 * Init function of Products controller
 * 
 * Creates html view with list of products and adds it to the container.
 * Calls loadData() - load categories, and loadUnits() - loads units. Set 
 * pagination options
 */
    init: function(selector) {

        this.limit = 20;

        this.units = false;

        this.elementId = this.element.attr('id');

        var html = $.View(this.Class.defaults.viewpath+'index.tmpl', {});

        this.element.html(html);

        this.loadData();

        this.loadUnits();

        this.paginatorOptions = {
            itemsOnPage: this.limit,
            edges: 1,
            currentPage: 1,
            callBackString: '$("#' + this.elementId + '").' + this.Class.fullName.toLowerCase() + '("loadProducts", '
        };

    },

    loadUnits: function(){

        Products_model.get_all_units(this.callback('unitsGeted'));

    },

    unitsGeted: function(data){

        this.units = data ? data.data : false;

    },

    loadData: function(){

        Products_model.get_all_categories({limit: this.limit}, this.callback('categoriesLoaded'));

    },

/*
 * loadData() results handler
 * 
 * Remember all got categories. this.dataSorting('0', 0) adds '--' for clear 
 * vision of structure of parent and child categories.
 */
    categoriesLoaded: function(data) {

        this.categories = data.data.category;

        this.categoriesParent = [];

        this.i = 0;

        this.dataSorting('0', 0);

        this.category_id = this.categoriesParent[0].id;

        var html = $.View(this.Class.defaults.viewpath+'category_list.tmpl', {
            categories: this.categoriesParent,
            allProductsCount: data.data.allProductCount,
            active: false,
            pref: this.Class.defaults.pref
        });

        this.products = data.data.product;

        var productHtml = $.View(this.Class.defaults.viewpath+'all_products.tmpl', {
            our_data: data.data.product,
            site_url: base_url,
            pref: this.Class.defaults.pref
        });

        $('#categoryWrapper').html(html);

        $('#productWrapper').html(productHtml);

        this.paginatorOptions.items = this.categoriesParent[0].productCount,

        $('#paginator').paginator(this.paginatorOptions);

        componentLoaded(this.element);

    },

/*
 * Adds lvl depth propertit to each category
 */
    dataSorting: function(parent_id, lvl){

        if (this.categories.length && this.categories !== false){
            var lvl_sign = '-',
                data = jlinq
                .from(this.categories)
                .equals("parent_id", parent_id)
                .sort('position')
                .select();

            lvl++;

            for (var j = 0; j < lvl-1; j++) {
                lvl_sign = lvl_sign+lvl_sign;
            }

            if (data.length) {
                for (var i = 0; i < data.length; i++) {
                    data[i].lvl = lvl;
                    data[i].lvl_sign = lvl_sign;
                    this.categoriesParent[this.i] = data[i];
                    this.i++;
                    this.dataSorting(data[i].id, lvl);
                }
            }
        }
    },

/*
 * Click on category handler
 * 
 * Add active property to category clicked. Reloads product and paginator
 */
    '.categoryItem click': function(el) {

        if (!$(el).hasClass('active')) {

            this.category_id = $(el).data('category_id');

            $('.categoryItem').removeClass('active');

            $(el).addClass('active');

            this.loadProducts();

            this.refreshPaginator();

        }

    },

    /*
     * Load Products
     */

    loadProducts: function(offset, refreshCategories) {

        var data = {limit: this.limit, category_id: this.category_id};

        if (offset !== undefined) {
            data.offset = offset;
        }

        if (refreshCategories !== undefined) {
            data.refreshCategories = true;
        }

        Products_model.get_all_products(data, this.callback('productsLoaded'));
    },

    productsLoaded: function(data){

        if (data.message) {
            $('#productWrapper').html('<h3>Код ошибки: '+data.message+'</h3>');
            return;
        }

        if (data.data.category) {

            this.categories = data.data.category;

            this.categoriesParent = [];

            this.i = 0;

            this.dataSorting('0', 0);

            var html = $.View(this.Class.defaults.viewpath+'category_list.tmpl', {
                categories: this.categoriesParent,
                allProductsCount: data.data.allProductCount,
                active: $('.categoryItem.active').data('category_id'),
                pref: this.Class.defaults.pref
            });

            $('#categoryWrapper').html(html);

            this.products = data.data.products;

        } else {
            this.products = data.data;
        }

        var data = this.sortingProducts();

        this.productsHtml(data);

    },

    productsHtml: function(data){
        var html = $.View(this.Class.defaults.viewpath+'all_products.tmpl', {
            our_data: data,
            site_url: base_url,
            pref: this.Class.defaults.pref
        });

        $('#productWrapper').html(html);
    },

    /*
     * Set Product
     */

    '#addProduct click': function(el){

        this.setProductCallback(false);

    },

    '.editProduct click': function(el){
        var id = {
            product_id: $(el).parents(".productManipulate").data('product_id')
        };

        Products_model.get_product(id, this.callback('setProductCallback'));
    },

    setProductCallback: function(response){

        if (response && response.message) {
            show_error('Код ошибки: '+response.message);
            return;
        }

        var msg;

        if (response && response.data && typeof response.data != 'undefined')
            msg = 'Изменение продукта';
        else
            msg = 'Добавление продукта';

        loadWindow('product', this.Class.defaults.wind_opt,  msg, $.View(this.Class.defaults.viewpath+'set_product.tmpl', {

            site_url: base_url,
            units: this.units,
            our_data: response ? response.data : false,
            categories: this.categoriesParent,
            pref: this.Class.defaults.pref

        }));

        $('#product_window').product({
            full_functionality:true,
            product_wrap: '#'+this.elementId,
            product_id: response && response.data && typeof response.data != 'undefined' ? response.data.id : false,
            sortedCategories: this.categoriesParent,
            elementId: this.elementId,
            className: this.Class.fullName.toLowerCase(),
            our_data: response ? response.data : false
        });

    },

    /*
     * Delete product
     */

    '.deleteProduct click': function(el) {
        var id = {
            product_id: $(el).parents(".productManipulate").data('product_id')
        };

        if(confirm('Вы действительно хотите удалить этот товар?')){
            Products_model.delete_product(id, this.callback('productDeleted', el));
        }
    },

    productDeleted: function(el, data) {
        if (data.success === true) {

            if (data.message) {
                show_error('Код ошибки: '+data.message);
                return;
            }

            show_success('Deleted');

            var card = el.parents('.productCard'),
                obj = this;

            if (card.data('rel_categories') !== '') {

                if (card.data('rel_categories').indexOf('|') == -1) {

                    var categoryItem = $('.categoryItem[data-category_id="'+card.data('rel_categories')+'"]');

                    categoryItem.attr('data-item', parseInt(categoryItem.attr('data-item'))-1);

                } else {

                    var relCategories = card.data('rel_categories').split('|');

                    for (var i = 0; i < relCategories.lengt; i++) {

                        categoryItem = $('.categoryItem[data-category_id="'+relCategories[i]+'"]');

                        categoryItem.attr('data-item', parseInt(categoryItem.attr('data-item'))-1);

                    }

                }
            }

            $('#allProducts').attr('data-item', parseInt($('#allProducts').attr('data-item'))-1);

            card.fadeOut(300, function(){
                card.remove();
                obj.refreshPaginator();
            });

        } else {
            show_error('Delete error');
        }
    },

    /*
     * Quantyty manipulation
     */

    '.quantity click': function(el) {

        $(el).parents('div').find('.quantity').removeClass('active');

        $(el).addClass('active');

        this.limit = $(el).data('limit');

        this.refreshPaginator();

        this.loadProducts();

    },

    /*
     * Sorting products
     */

     sortingProducts: function() {
         var sortingType = parseInt($('#sorting').val()),
             result,
             obj = this,
             response;

         switch (sortingType) {
             case 0:
                 result = this.products;
                 break;
             case 1:
                 var pricePrepare = jlinq.from(this.products).select(function(r){
                     response = r;
                     response.price = parseFloat(response.price);
                     return response;
                 });

                 result = jlinq.from(pricePrepare).sort('-price').select();
                 break;
             case 2:
                 var pricePrepare = jlinq.from(this.products).select(function(r){
                     response = r;
                     response.price = parseFloat(response.price);
                     return response;
                 });

                 result = jlinq.from(pricePrepare).sort('price').select();
                 break;
             case 3:
                 var langPrepare = jlinq.from(this.products).select(function(r){

                     var response = r;

                     if (r.lang) {

                        if (r.lang[obj.Class.defaults.pref]) {
                            response.name = r.lang[obj.Class.defaults.pref].name
                         } else {
                            response.name = '';
                         }

                     } else {
                         response.name = '';
                     }

                     return response;
                 });
                 result = jlinq.from(langPrepare).sort('name').select();
                 break;
             case 4:
                 result = jlinq.from(this.products).sort('producer_id').select();
                 break;
         }

         return result;

     },

     '.sortingVal click': function() {
        var data = this.sortingProducts();

        this.productsHtml(data);
     },

     refreshPaginator: function() {

        $('#paginator').paginator('destroy');

        this.paginatorOptions.items = parseInt($('.categoryItem.active').data('item'));

        this.paginatorOptions.itemsOnPage = this.limit;

        $('#paginator').paginator(this.paginatorOptions);

     }

});