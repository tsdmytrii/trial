$.Controller.extend('Campaign',{
    defaults: {
        viewpath:'//components/admin/campaigns/views/',

        lang_id: 2,
        pref: 'ru'
    }

},{
    init:function(selector){

        this.elementId = this.element.attr('id');

        this.campaign_id = 0;

        if (this.options.data) {
            $('.campaignTab').removeClass('disabled');

            this.campaign_id = this.options.data.id;
        }

        $('#campaignForm').validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2,
                    maxlength: 150
                },
                title: {
                    required: true,
                    minlength: 2,
                    maxlength: 150
                },
                html: {
                    required: false
                },
                active: {
                    required: true,
                    minlength: 1,
                    maxlength: 1
                },
                type: {
                    required: true,
                    minlength: 1,
                    maxlength: 1
                },
                date: {
                    required: false,
                    minlength: 4,
                    maxlength: 10
                },
                frequency: {
                    required: true,
                    minlength: 1,
                    maxlength: 1
                },
                ready: {
                    required: true,
                    minlength: 1,
                    maxlength: 1
                }
            },
            messages: {
                name: {
                    required: 'Это обязательное поле',
                    minlength: "Минимальное количество символов - 3",
                    maxlength: "Максимальное количество символов - 100"
                },
                title: {
                    required: 'Это обязательное поле',
                    minlength: "Минимальное количество символов - 3",
                    maxlength: "Максимальное количество символов - 100"
                },
                html: {
                    required: 'Это обязательное поле',
                    minlength: "Минимальное количество символов - 3",
                    maxlength: "Максимальное количество символов - 100"
                },
                active: {
                    required: 'Это обязательное поле',
                    minlength: "Минимальное количество символов - 3",
                    maxlength: "Максимальное количество символов - 100"
                },
                type: {
                    required: 'Это обязательное поле',
                    minlength: "Минимальное количество символов - 3",
                    maxlength: "Максимальное количество символов - 100"
                },
                date: {
                    required: 'Это обязательное поле',
                    minlength: "Минимальное количество символов - 3",
                    maxlength: "Максимальное количество символов - 100"
                },
                frequency: {
                    required: 'Это обязательное поле',
                    minlength: "Минимальное количество символов - 3",
                    maxlength: "Максимальное количество символов - 100"
                },
                ready: {
                    required: 'Это обязательное поле',
                    minlength: "Минимальное количество символов - 3",
                    maxlength: "Максимальное количество символов - 100"
                }
            },
            highlight: function(element){
                $(element).parents('.control-group').addClass('error');
            },
            unhighlight: function(element){
                $(element).parents('.control-group').removeClass('error').find('.help').empty();
            },
            errorPlacement: function(error, element){
                element.next().append(error).animate({
                    opacity: "1"
                }, 1000);
            }
        });

    },

    '#campaignForm submit': function(el,ev) {
        ev.preventDefault();

        if($(el).valid() === true) {

            Component_type_model.set_component_type($(el).serialize(), this.callback('componentTypeSaved', el));

        }

    },

    componentTypeSaved: function(el, data){

        if (data.success == true) {

            if (data.message) {

                show_error('Код ошибки: '+data.message);

                return;

            }

            show_success('Изменения внесены успешно');

            if (this.component_type_id === 0) {

                this.component_type_id = data.data;

                $('#component_type_id').val(data.data);

                this.getFunctions();

            }

            $('.compTypeTab').removeClass('disabled');

            $('#'+this.options.elementId).controller().loadComponentTypes();

        } else {

            show_error('Ошибка');

        }
    },

    '.cancel click': function(el) {
        $(el).parents('.window-container').find('.window-closeButton').click();
    },

    '.compTypeTab click': function(el, ev){

        ev.preventDefault();

        tab_navigation(el, 'compTypeTab', 'active', '#compWrap', 'current', 'compTypeTabCont', '#'+this.elementId, $(el).attr('href'));

    },

    /*
     * Component functions
     */

     getFunctions: function() {

         Component_type_model.get_all_component_function({
             component_type_id: this.component_type_id
         }, this.callback('functionsGeted'));

     },

     functionsGeted: function(data) {

        var html;

        if (data.message) {

            html = '<h3>Код ошибки: '+data.message+'</h3>';

        } else {

            html = $.View(this.Class.defaults.viewpath + 'function_list.tmpl', {
                component_type_id: this.component_type_id,
                our_data: data.data
            });

        }

        $('.function_forms', '#' + this.elementId).html(html);

    },

     '#addFunction click': function() {

         var html = $.View(this.Class.defaults.viewpath+'add_function.tmpl', {
             component_type_id: this.component_type_id
         });

         $('.function_forms').prepend(html);

     },

     '.saveFunction click': function(el, ev){
        ev.preventDefault();

        var $form = $(el).parents('.functionForm');

        this.functionValidate($form);

        if ($form.valid() !== false) {
            Component_type_model.set_component_function($form.serialize(), this.callback('functionSaved', $form));
        }

     },

     functionSaved: function(el, data) {
        if (data.success == true) {

            if (data.message) {

                show_error('Код ошибки: '+data.message);

            } else {

                show_success('Функция сохранена!');

                el.find('.formId').val(data.data);

                el.find('.deleteFunction').children('i').removeClass('icon-remove').addClass('icon-trash');

            }

        } else
            show_error('Что-то пошло не так');
     },

     functionValidate: function(el) {

        $(el).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 3,
                    maxlength: 100
                },
                clear_name: {
                    required: true,
                    minlength: 3,
                    maxlength: 100
                }
            },
            messages: {
                name: {
                    required: 'Это обязательное поле',
                    minlength: "Минимальное количество символов - 3",
                    maxlength: "Максимальное количество символов - 100"
                },
                clear_name: {
                    required: 'Это обязательное поле',
                    minlength: "Минимальное количество символов - 3",
                    maxlength: "Максимальное количество символов - 100"
                }
            },
            highlight: function(element){
                $(element).parents('.control-group').addClass('error');
            },
            unhighlight: function(element){
                $(element).parents('.control-group').removeClass('error').find('.help').empty();
            },
            errorPlacement: function(error, element){
                element.next().append(error).animate({
                    opacity: "1"
                }, 1000);
            }
        });

     },

     '.deleteFunction click': function(el) {

         var $el = $(el),
             $form = $el.parents('.functionForm');

        if ($el.children('i').hasClass('icon-remove')) {

            $form.fadeOut(300, function(){
                $form.remove();
            });

        } else {
            if (confirm("Вы действительно хотите удалить функцию?")) {

                Component_type_model.delete_component_function({component_function_id: $form.find('.formId').val()}, this.callback('functionDeleted', $form));

            }
        }

     },

     functionDeleted: function($form, data) {

        if (data.success == true) {

            if (data.message) {

                show_error('Код ошибки: '+data.message);

            } else {

                show_success('Функция удалена!');

                $form.fadeOut(300, function() {
                    $form.remove();
                });
            }

        } else
            show_error('Что-то пошло не так!');

    }

});