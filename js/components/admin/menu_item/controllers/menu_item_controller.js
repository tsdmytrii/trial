/*
 * Menu_item controller
 * 
 * Operates with all menu item actions
 * 
 *  @var object defaults Default froperies of controller (pass for views, 
 *  language)  
 */
$.Controller.extend('Menu_item',{
    defaults: {
        viewpath:'//components/admin/menu_item/views/',
        lang_id: 2,
        pref: 'ru'
    }

},{

/*
 * Init function of Menu_item controller
 * 
 * Recieves elemnet id. Validates #menuItemDataForm
 */
init:function(){

        this.elementId = this.element.attr('id');

        if ($('#component_name', '#'+this.elementId).length) {
           this._autocomplete_component();
        }

        $('#menuItemDataForm').validate({
            rules:{
                position:{
                    maxlength: 3,
                    required:true
                }
            },
            messages: {
                position: {
                    maxlength: 'Максимальное количество символов - 3',
                    required: 'Это обязательное поле'
                }
            },
            highlight: function(element){
                $(element).parents('.control-group').addClass('error');
            },
            unhighlight: function(element){
                $(element).parents('.control-group').removeClass('error').find('.help').empty();
            },
            errorPlacement: function(error, element){
                element.parents('.control-group').find('.help').html(error.html());
            }
        });

    },


/*
 * .menuItemLangTab click handler. Actually language switcher.
 * Calls tab_navigation method to make chosen language active.
 */
    '.menuItemLangTab click': function(el, ev){
        ev.preventDefault();

        tab_navigation(el, 'menuItemLangTab', 'active', '#menuItemLangContent', 'current', 'content_lang', '#'+this.elementId, $(el).attr('href'));
    },


/*
 * .menuItemForm submit handler. 
 * 
 * Validates form. Serializes data from .menuItemForm and #menuItemDataForm,
 * then joins it and call Menu_item_model's method set_menu_item with 
 * serialized data as param. Calls menuItemSaved as callback.
 * 
 */
    '.menuItemForm submit': function(el,ev) {
        ev.preventDefault();
        var data,
            dataForm = $('#menuItemDataForm');

        this.validateMenuItem(el);

        if($(el).valid() == true && dataForm.valid() == true) {
            data = $(el).serialize()+'&'+dataForm.serialize();

            Menu_item_model.set_menu_item(data, this.callback('menuItemSaved', el));
        }

    },

/*
 * menu_item check state
 *
 * Set #menu_item_id equal to data.menu_item_id. Set .lang_id equal to data.menu_item_lang_id
 * $(this.options.wrap).controller().loadMenuItems() looks for the first used controller
 * and calls its method loadMenuItems(). If save failured throw error.
 *          
 * @param form object 
 * @param data Data from ajax response
 */
menuItemSaved: function(form, data) {

        if (data.success) {

            if (data.message) {
                show_error('Код ошибки: '+data.message);
                return;
            }
            
            $('#menu_item_id').val(data.menu_item_id);

            $(form).find('.lang_id').val(data.menu_item_lang_id);

            show_success('Пункт меню сохранен');

            if(this.options.full_functionality !== false){

                $(this.options.wrap).controller().loadMenuItems();

            }

        } else {
            show_error('Ой что-то пошло не так');
        }



    },

/*
 * menu item validator 
 */
    validateMenuItem: function(el) {

        $(el).validate({
            rules:{
                position:{
                    minlength: 2,
                    maxlength: 100,
                    required:true
                }
            },
            messages: {
                position: {
                    minlength: 'Минимальное количество символов - 2',
                    maxlength: 'Максимальное количество символов - 100',
                    required: 'Это обязательное поле'
                }
            },
            highlight: function(element){
                $(element).parents('.control-group').addClass('error');
            },
            unhighlight: function(element){
                $(element).parents('.control-group').removeClass('error').find('.help').empty();
            },
            errorPlacement: function(error, element){
                element.parents('.control-group').find('.help').html(error.html());
            }
        });

    },

/*
 *  
 */
    '.switchSet click': function(el, ev){
        ev.preventDefault();

        tab_navigation(el, 'switchSet', 'active', '#setMenuItemWrap', 'current_set', 'menuItemTab', '#'+this.elementId, $(el).attr('href'));
    },



    'form.menu_item_related_form submit': function(el,ev){
        ev.preventDefault();
        var data;

        data = $(el).serialize();

        data = data+'&menu_block_id='+this.menu_block_id;

        Menu_item_model.set_related_menu_item(data, this.callback('success_set_related_menu_item'), this.callback('error'));

    },

    success_set_related_menu_item: function(data){
        if (data.success) {

            if (data.message) {
                show_error('Код ошибки: '+data.message);
            } else {
                show_success('Изменения внесены успешно');
            }

        } else {
            show_error('Ошибка');
        }

        var obj = this;

        Menu_item_model.get_menu_item_by_block({
            menu_block_id: this.menu_block_id
        }, function(data){
            obj.success_get_menu_items(data, obj.menu_block_id)
        }, this.callback('error'));

        $('#set_menu_item').find('.close_set_menu_block').click();
    },

    success_set_menu_item: function(data){

        if (data && data.message) {
            shwo_error('Код ошибки: '+data.message);
            return;
        }

        if (data.data.unique) {

            show_error('Компонент который Вы пытаетесь добавить уже существует!');

        } else {

            if (parseInt(data.data.component_id) === 0){
                show_error('Внимание! У данного елемента нет компонента, его ссылка не будет сохранена');
            } else {
                if (data.success) {
                    show_success('Изменения внесены успешно');
                } else {
                    show_error('Ошибка');
                }
            }

            var obj = this;

            if (this.menu_item_data !== false && this.menu_item_data.length)
                this.menu_item_data.push(data.data);
            else {
                this.menu_item_data = [];
                this.menu_item_data[0] = data.data;
            }

            this.parent_data = [];
            this.i = 0;

            this.prepare_menu_item_data('0', 0);


            this.all_menu_item_head = this.parent_data;

            Menu_item_model.get_menu_item_by_block({
                menu_block_id: this.menu_block_id
            }, function(data){
                obj.success_get_menu_items(data, obj.menu_block_id)
            }, this.callback('error'));

            $('#set_menu_item').find('.close_set_menu_block').click();
        }
    },

    '#set_menu_item_relation click': function(el){
        $('#relation_menu_item').slideToggle('300');

        $('#set_menu_item').css('position', 'absolute');
    },

    'form#relation_menu_item submit': function(el,ev){
        ev.preventDefault();
        var data;

        data = $(el).serialize();

        Menu_item_model.set_menu_item_relation(data, this.callback('success_set_menu_item_relation'), this.callback('error'));
    },

    success_set_menu_item_relation: function(data){
        if (data.success) {

            if (data.message) {
                show_error('Код ошибки: '+data.message);
            } else {
                show_success('Изменения внесены успешно');
            }

        } else {
            show_error('Ошибка');
        }
    },

    '.disconect_menu_item click': function(el){
        var menu_item_id = $('#menu_item_id').val();

        if (confirm('Вы действительно хотите отвязать пункт меню от страницы?')) {
            Menu_item_model.disconect_menu_item({
                menu_item_id: menu_item_id
            }, this.callback('disConectedMI'));
        }

    },

    disConectedMI: function(data){
        if (data.success == true) {

            if (data.message) {
                show_error('Код ошибки: '+data.message);
                return;
            }

            $('#component_id').attr('val', '');
            $('.component_name').remove();
            $('.component_name_search').show();
            show_success('Изменения внесены успешно');

        } else show_error('Unknown error')
    },

    '.lang_content click': function(el, ev){
        ev.preventDefault();
        tab_navigation(el, 'lang_content', 'active', '#content_lang_wrap', 'current', 'content_lang', '#set_menu_item');
    },

/*
 * Autocomplete for component name
 */
    _autocomplete_component: function(){
        $('#component_name').autocomplete({
            serviceUrl: base_url+'admin/component_controller/component_autocomplete', // Страница для обработки запросов автозаполнения
            minChars: 3, // Минимальная длина запроса для срабатывания автозаполнения
            //            delimiter: /(,|;)\s*/, // Разделитель для нескольких запросов, символ или регулярное выражение
            maxHeight: 400, // Максимальная высота списка подсказок, в пикселях
            width: 300, // Ширина списка
            zIndex: 19999, // z-index списка
            deferRequestBy: 300, // Задержка запроса (мсек), на случай, если мы не хотим слать миллион запросов, пока пользователь печатает. Я обычно ставлю 300.
            onSelect: function(data, value){
                $('#component_id').attr('value', value.id);
                $('#component_type_id').attr('value', value.component_type_id);
            } // Callback функция, срабатывающая на выбор одного из предложенных вариантов,
        //            lookup: ['January', 'February', 'March'] // Список вариантов для локального автозаполнения
        });
    }

});