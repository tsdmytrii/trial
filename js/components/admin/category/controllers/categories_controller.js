$.Controller.extend('Categories',{

    defaults: {
        viewpath:'//components/admin/category/views/',
        lang_id: 2,
        pref: 'ru',
        wind_opt: {
            width: 960,
            height: 480,
            minimize: true,
            maximise: true,
            left: '100',
            top: '100',
            resize: true,
            status_bar: true,
            modal: true
        }
    }

},{
    init:function(){

        this.elementId = $('.'+this.Class.fullName.toLowerCase()).attr('id');

        this.loadCategories();

    },

    loadCategories: function(){

        Categories_model.get_all_categories(this.callback('getedCategories'));

    },

    getedCategories: function(data){

        if (data.message) {

            show_error('Код ошибки: '+data.message);

        } else {
            this.categories = data.data;

            this.categoriesParent = [];

            this.i = 0;

            this.dataSorting('0', 0);

            var html = $.View(this.Class.defaults.viewpath+'categories_list.tmpl', {
                our_data: data ? data.data : false,
                pref: this.Class.defaults.pref,
                site_url: base_url
            });

            this.element.html(html);
        }

        componentLoaded(this.element);
    },

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
     * Set category
     */
    '.addCategory click': function(){
        this.setCategoryCallback();
    },

    '.editCategory click': function(el){

        Categories_model.get_category($(el).parents('.category_icon_wrap').data('category_id'), this.callback('setCategoryCallback'));

    },

    setCategoryCallback: function(response){

        if (response && response.message) {
            show_error('Код ошибки: '+response.message);
            return;
        }

        var html = $.View(this.Class.defaults.viewpath+'set_category.tmpl', {

            our_data: response ? response.data : response,
            parent_category: this.categories,
            pref: this.Class.defaults.pref,
            lang: lang,
            site_url: base_url,
            element_id: this.elementId

        });

        loadWindow('set_category', this.Class.defaults.wind_opt, 'Задать категорию', html);

        $('#set_category_window').category({
            data: response ? response.data : false,
            edit: response ? true : false ,
            elementId: this.elementId,
            className: this.Class.fullName.toLowerCase()
        });

    },

    /*
     * Delete
     */

    '.deleteCategory click': function(el){
        var id = $(el).parents(".category_icon_wrap").data('category_id');

        if(confirm('Вы действительно хотите удалить мини блок?')){
            Categories_model.delete_category(id, this.callback('categoryDeleted', el));
        }
    },

    categoryDeleted: function(el, data){

        if (data.success) {

            if (data.message) {
                show_error('Код ошибки: '+data.message);
                return;
            }

            show_success('Успешно удалено');

            var selector = $(el).parents('tr');

            selector.fadeOut(300, function(){
                selector.remove();
            });

        } else {
            show_error('Ошибка');
        }

    }

});