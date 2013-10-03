$.Controller.extend('Menu_item',{
    defaults: {
        viewpath:'//components/admin/menu_item/views/',
        lang_id: 2,
        pref: 'ru'
    }

},{
    init:function(block, menu_block_id){

        this.menu_block_id = menu_block_id;

        var container = $('.'+this.Class.fullName.toLowerCase());

        this.elementId = container.attr('id');

        $('#'+this.elementId).css('padding', '0');

        this.load_menu_items(menu_block_id);



        this._autocomplete_component();


    },

    '.header_menu_item mouseover': function(el) {
        var id = $(el).data('menu_item_id'),
        lvl = parseInt($(el).attr('data-lvl'))+1,
        html,
        child_menu_item_head = jlinq
        .from(this.menu_item_data)
        .equals("parent_id", id)
        .sort('position')
        .select();

        if (child_menu_item_head.length){

            if (!$(el).find('.sub_nav').length) {
                html = $.View(this.Class.defaults.viewpath+'sub_nav_menu_item.tmpl', {
                    our_data: child_menu_item_head,
                    lvl: lvl,
                    site_url: base_url
                });

                $(el).append(html);

                $(el).find('a:first').next().fadeIn(300);
            } else {
                $(el).find('a:first').next().fadeIn(300);
            }

        }

    },

    '.header_menu_item mouseleave': function(el) {
        $(el).find('ul').stop(true, true).fadeOut(300);
    },

    '.switch_set click': function(el, ev){
        ev.preventDefault();
        if (!$(el).hasClass('active')){

            if ($(el).find('a').attr('href') == 'new')
                $('#set_menu_item').css('position', 'fixed');
            else
                $('#set_menu_item').css('position', 'absolute');


            var href = $(el).find('a').attr('href');

            $('.switch_set').removeClass('active');
            $(el).addClass('active');
            $('#set_menu_item').find('.current_set').fadeOut(500);
            setTimeout(function(){
                $('.set_menu_item_wrap').removeClass('current_set');

                $('.'+href).fadeIn(500, function(){
                    $('.'+href).addClass('current_set');
                });
            }, 500);
        }
    },


    check_menu_item_relation: function(data, related){
        var i, j;
        for(i = 0; i < data.length; i++){
            data[i].related = false;
            for (j = 0; j < related.length; j++){
                if (data[i].id === parseInt(related[j].related_menu_item_id)){
                    data[i].related = true;
                }
            }
        }

        return data;
    },

    'form.menu_item_form submit': function(el,ev){
        ev.preventDefault();
        var data;

        this.menu_item_validate(el);

        if($(el).valid() == true) {
            data = $(el).serialize();

            Menu_item_model.set_menu_item(data, this.callback('success_set_menu_item'), this.callback('error'));
        }
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

    '.delete_menu_item click': function(el){
        var id = {
            menu_item_id: $(el).parents(".menu_item_wrap").attr('data-menu_item_id')
        }, obj = this;

        if(confirm('Вы действительно хотите удалить '+$(el).parents(".menu_item_icon_wrap").prev().text()+'?')){
            Menu_item_model.delete_menu_item(id, function(data){
                obj.success_delete_menu_item(data, el)
            }, this.callback('error'));
        }
    },

    success_delete_menu_item: function(data, el){
        if (data.success) {

            var menu_item_id = $(el).parents(".menu_item_wrap").attr('data-menu_item_id');

            $('.header_menu_item[data-menu_item_id="'+menu_item_id+'"]').fadeOut(300, function(){
                $('.header_menu_item[data-menu_item_id="'+menu_item_id+'"]').remove();
            });

            show_success('Успешно удалено');

        } else {

            show_error('Ошибка');

        }

        el.parents('.menu_item_wrap').slideUp(300, function(){
            el.parents('.menu_item_wrap').remove();
        });
    },

    '.minus_menu_item click': function(el){
        var id = {
            menu_item_id: $(el).parents(".menu_item_wrap").attr('data-menu_item_id'),
            menu_block_id: $(el).parents('#menu_item_wrap').attr('menu_block_id')
        }, obj = this;

        if(confirm('Вы действительно хотите отвязать пункт меню '+$(el).parents(".menu_item_icon_wrap").prev().text()+'?')){
            Menu_item_model.minus_menu_item(id, function(data){
                obj.success_minus_menu_item(data, el)
            }, this.callback('error'));
        }
    },

    success_minus_menu_item: function(data, el){
        if (data.success) {
            show_success('Связь успешно удалена');
        } else {
            show_error('Ошибка');
        }

        el.parents('.menu_item_wrap').slideUp(300, function(){
            el.parents('.menu_item_wrap').remove();
        });
    },

    '.disconect_menu_item click': function(el){
        var menu_item_id = $('#menu_item_id').val();

        if (confirm('Вы действительно хотите отвязать пункт меню от страницы?')) {
            Menu_item_model.disconect_menu_item({
                menu_item_id: menu_item_id
            }, this.callback('disConectedMI'), this.callback('error'));
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

    success_get_component_id: function(data, content_id, menu_item_id){

        var initComponentString = '$("#content").'+data.data.name+'('+content_id+', '+menu_item_id+');',
        existComponentString = '$("#content").'+data.data.name+'('+'"init" , "", '+content_id+', '+menu_item_id+');';

        if ($('#content').hasClass(data.data.name)) {
            eval(existComponentString);
        } else {
            steal(data.data.admin_client_controller).then(function(){
                eval(initComponentString);
            });
        }

    },

    error: function(response){
        show_error(response.data?response.data:response);
    },

    '.lang_content click': function(el, ev){
        ev.preventDefault();
        tab_navigation(el, 'lang_content', 'active', '#content_lang_wrap', 'current', 'content_lang', '#set_menu_item');
    },

    menu_item_validate: function(element){

        $(element).validate({
            rules: {
                position: {
                    required: true,
                    number: true
                },
                link_ru: {
                    regexp: '^[a-zA-Z0-9_]+$',
                    unique: true
                },
                link_ua: {
                    regexp: '^[a-zA-Z0-9_]+$',
                    unique: true
                },
                link_en: {
                    regexp: '^[a-zA-Z0-9_]+$',
                    unique: true
                },
                name_ru: {
                    maxlength: 100
                },
                name_ua: {
                    maxlength: 100
                },
                name_en: {
                    maxlength: 100
                }
            },
            messages: {
                position: {
                    required: 'Это обязательное поле',
                    number: 'Пожалуйста введите целое число'
                },
                link_ru: {
                    regexp: 'может состоять только из латинских букв, цифр и знака подчеркивания',
                    unique: 'Такая ссылка уже зарегестрирована'
                },
                link_ua: {
                    regexp: 'может состоять только из латинских букв, цифр и знака подчеркивания',
                    unique: 'Такая ссылка уже зарегестрирована'
                },
                link_en: {
                    regexp: 'может состоять только из латинских букв, цифр и знака подчеркивания',
                    unique: 'Такая ссылка уже зарегестрирована'
                },
                name_ru: {
                    maxlength: "Максимальное количество символов - 100"
                },
                name_ua: {
                    maxlength: "Максимальное количество символов - 100"
                },
                name_en: {
                    maxlength: "Максимальное количество символов - 100"
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
    },

    '#pages click': function(){
        $('#work_space').slideUp(300, function(){
            $('#work_space').html('<div id="components_wrap"></div>');
            $('#work_space').slideDown(300);
        });
    }

}
);