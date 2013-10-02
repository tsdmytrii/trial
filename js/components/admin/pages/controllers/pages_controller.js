$.Controller.extend('Pages',{
    defaults: {
        viewpath:'//components/admin/pages/views/',
        lang_id: 2,
        pref: 'ru'
    }
},{
    
    /*
     * Init function of Pages controller.
     * 
     * Calls load_components and load_display_component_types functions.
     * 
     * @var container string Selector of container for components table.   
     */
    init:function(){

        var container = $('.'+this.Class.fullName.toLowerCase());

        this.elementId = container.attr('id');

        this.load_components('');

        this.load_display_component_types();

    },

/* 
 * Calls model's method that loads components in navigation tabs
 */
    load_display_component_types: function(id){

        Pages_model.get_component_types(id, this.callback('success_get_component_types'), this.callback('error'));

    },

 /*
  * Recieves all returned components in navigation tabs 
  */
 success_get_component_types: function(data){

        this.component_types = data.data;

    },

/*
 * Calls model's method that loads components NOT in navigation tabs
 */
    load_components: function(id){

        Pages_model.get_components(id, this.callback('success_get_components'), this.callback('error'));

    },

/*
 * Recieves all returned components that are NOT in nav tabs
 * 
 * Show message error if exists. Creates template with components 
 * and appends it to table. dataTable is a plugin that makes our table more
 * flexible.  
 */
    success_get_components: function(data){

        if (data.message) {
            show_error('Код ошибки: '+data.message);
        }

        var html = $.View(this.Class.defaults.viewpath+'get_components.tmpl', {
            pages: data.message == false ? data.data : false
        });

        $('#'+this.elementId).html(html);

        $('#pages_table').dataTable({
            'bAutoWidth': false,
            'bPaginate': true,
            'bLengthChange':false,
            'bInfo': true,
            'bJQueryUI': true,
            'iDisplayLength': 100,
            "aaSorting": [[0,'desc']]
        });

        componentLoaded(this.element);
    },

/*
 * Called on #add_component button click
 */
    '#add_component click': function(el){
        this.setComponentCallback(false);
    },

/*
 * Called on .edit_component button click
 * 
 * Gets id of edited component, then calls setComponentCallback function
 */
    '.edit_component click': function(el){
        var component_id = $(el).parents('.component_icon_wrap').data('component_id');

        Pages_model.get_component_by_id({
            component_id: component_id
        }, this.callback('setComponentCallback'), this.callback('error'));
    },

/*
 * Creates component's set/edit form  
 * 
 * Show error message if exits. Creates form with datd or without depends on
 * if it seting or editin component.  
 */
    setComponentCallback: function(data) {

        $('.set_component').remove();

        if (data && data.message) {
            show_error('Код ошибки: '+data.message);
            return;
        }

        var html = $.View(this.Class.defaults.viewpath+'set_component.tmpl', {
            types: this.component_types,
            our_data: data ? data.data : false,
            event: 'Изменение страницы'
        });

        $('#'+this.elementId).append(html);

    },

/*
 * Called on set/edit form submit. 
 * 
 * Validates form. Serrialize all data in the form and call model. 
 */
    '.set_comp_form submit': function(el, ev){
        ev.preventDefault();
        var data;

        this._validate(el);

        if($(el).valid() == true) {
            data = $(el).serialize();

            Pages_model.set_component(data, this.callback('success_set_component'), this.callback('error'));
        }
    },

/*
 * Form set/edit success function
 * 
 * Show error mesages if exists. data.data.unique - check if its unique component(can be only one on the page)
 * Reloads components on success, show error on failure.
 */
    success_set_component: function(data){

        if (data && data.message) {
            show_error('Код ошибки: '+data.message);
            return;
        }

        if (data.data.unique) {

            show_error('Компонент который Вы пытаетесь добавить уже существует!');

        } else {

            if (data.success) {
                this.load_components();
                show_success('Изменения внесены успешно');
            } else {
                show_error('Ошибка');
            }

            $('.set_component').fadeOut(200, function(){
                $('.set_component').remove();
            });

        }
    },

/*
 * Called on close or cancel click.
 * 
 * Removes compinent's set/edit form
 */
    '.close_window, .cancel click': function(){
        $('.set_component').fadeOut(200, function(){
            $('.set_component').remove();
        });
    },

/*
 * Called on .delete_component click
 * 
 * Get component id, needed to delete on server. Calls model on confirm. 
 */
    '.delete_component click': function(el){
        var component_id = $(el).parents('.component_icon_wrap').data('component_id'),
        obj = this;
        if (confirm('Вы действительно хотите удалить страницу '+$(el).parents('tr').find('.component_name').text()+'?')){
            Pages_model.delete_component({
                component_id: component_id
            }, this.callback('success_delete_component', el));
        }

    },

/*
 * Checks delete component state
 * 
 * Shows error message if exist. Removes component from DOM.
 */
    success_delete_component: function(el, data){
        if (data.success == true) {

            if (data.message) {
                show_error('Код ошибки: '+data.message);
                return;
            }

            show_success('Изменения внесены успешно');

            $(el).parents('tr').fadeOut(300, function(){
                $(el).parents('tr').remove();
            });
        } else show_error('Unknown error')
    },

/*
 * Called on .conect_menu_item click. Connects menu-item to component.
 * 
 * Remember component id, name. Create connect form. Autocompletes when 
 * typing menu item name. 
 */
    '.conect_menu_item click': function(el){
        var component_id = $(el).parents('.component_icon_wrap').data('component_id'),
        page = $(el).parents('tr').find('.component_name').text(),
        html = $.View(this.Class.defaults.viewpath+'conect_menu_item.tmpl', {
            page: page,
            component_id: component_id
        });

        $('#'+this.elementId).append(html);

        this._autocomplete_menu_item();

    },

/*
 * Called on form.set_conect_menu_item submit
 *
 * Checks for not empty menu item name field, then calls model or show error
 */
    'form.set_conect_menu_item submit': function(el, ev){
        ev.preventDefault();

        if ($('#menu_item_id').val() != '' || parseInt($('#menu_item_id').val()) > 0) {

            var data = $(el).serialize();

            Pages_model.set_conect_menu_item(data, this.callback('connectionSeted'), this.callback('error'));

        } else {

            alert('Введите пожалуйста название пункта меню!');

        }
    },

/*
 * Checks for connection state. Shows errors if exist, reloads components on 
 * success.
 */
    connectionSeted: function(data){

        if (data.success == true) {

            if (data.message) {

                show_error('Код ошибки: '+data.message);

            } else {

                show_success('Изменения внесены успешно');

                this.load_components('');

            }

            $('.close_window').click();

        } else show_error('Unknown error');
    },

   /*
    * Disconnects menu item and component
    * 
    * Remembers component id and menu item id. Calls model on connfirm click.  
    */
   '.disconect_menu_item click': function(el){
        var component_id = $(el).parents('td').data('component_id'),
        menu_item_id = $(el).data('menu_item_id');

        if (confirm('Вы действительно хотите отвязать пункт меню?')) {
            Pages_model.disconect_menu_item({
                component_id: component_id,
                menu_item_id: menu_item_id
            }, this.callback('disConectedMI'), this.callback('error'));
        }

    },

/*
 * Checks disconnect status.
 * 
 * Shows error message if exists. Reloads components on success. 
 */
    disConectedMI: function(data){
        if (data.success == true) {

            if (data.message) {
                show_error('Код ошибки: '+data.message);
                return;
            }

            show_success('Изменения внесены успешно');
            this.load_components('');
        } else show_error('Unknown error')
    },

/*
 * Validate functtion with rules
 */
    _validate: function(element){
        $(element).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2,
                    maxlength: 500
                },
                component_type_id: {
                    required: true,
                    number: true
                }
            },
            messages: {
                name: {
                    required: 'Это обязательное поле!',
                    minlength: 'Минимальное количество символов - 2',
                    maxlength: 'Максимальное количество символов - 500'
                },
                component_type_id: {
                    required: 'Это обязательное поле!',
                    number: 'Это числовое поле!'
                }
            },

            errorPlacement: function(error, element){
                //                var id = "#"+element.attr('name')+'_error';
                element.next().append(error).animate({
                    opacity: "1"
                }, 1000);
            }
        });
    },

 /*
  * Autocomplete function. 
  */
 _autocomplete_menu_item: function(){
        $('#menu_item').autocomplete({
            serviceUrl: base_url+'admin/menu_controller/menu_item_autocomplete', // Страница для обработки запросов автозаполнения
            minChars: 3, // Минимальная длина запроса для срабатывания автозаполнения
            //            delimiter: /(,|;)\s*/, // Разделитель для нескольких запросов, символ или регулярное выражение
            maxHeight: 400, // Максимальная высота списка подсказок, в пикселях
            width: 300, // Ширина списка
            zIndex: 19999, // z-index списка
            deferRequestBy: 300, // Задержка запроса (мсек), на случай, если мы не хотим слать миллион запросов, пока пользователь печатает. Я обычно ставлю 300.
            onSelect: function(data, value){
                $('#menu_item_id').attr('value', value);
            } // Callback функция, срабатывающая на выбор одного из предложенных вариантов,
        //            lookup: ['January', 'February', 'March'] // Список вариантов для локального автозаполнения
        });
    },

    error: function(response){
        show_error(response.data?response.data:response);
    }
});