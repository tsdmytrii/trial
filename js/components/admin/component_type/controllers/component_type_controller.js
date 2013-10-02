/*
 * Component_type controller
 * 
 * Operates with set/edit of component type
 */
$.Controller.extend('Component_type',{
    defaults: {
        viewpath:'//components/admin/component_type/views/',

        lang_id: 2,
        pref: 'ru'
    }

},{
    
    /*
     * Init func of component_type cotroller
     * 
     * Validates component type edit/set form. If option.data exists, get 
     * function of this component type  
     */
    init: function(selector){

        this.elementId = this.element.attr('id');

        this.component_type_id = 0;

        if (this.options.data) {
            $('.compTypeTab').removeClass('disabled');

            this.component_type_id = this.options.data.id;

            this.getFunctions();
        }

        $('#componentTypeForm').validate({
            rules: {
                name: {
                    required: true,
                    minlength: 3,
                    maxlength: 100
                },
                psevdo_name: {
                    required: true,
                    minlength: 3,
                    maxlength: 100
                },
                library: {
                    required: true,
                    minlength: 3,
                    maxlength: 100
                },
                admin_client_controller: {
                    required: true,
                    minlength: 3,
                    maxlength: 100
                },
                client_controller: {
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
                psevdo_name: {
                    required: 'Это обязательное поле',
                    minlength: "Минимальное количество символов - 3",
                    maxlength: "Максимальное количество символов - 100"
                },
                library: {
                    required: 'Это обязательное поле',
                    minlength: "Минимальное количество символов - 3",
                    maxlength: "Максимальное количество символов - 100"
                },
                admin_client_controller: {
                    required: 'Это обязательное поле',
                    minlength: "Минимальное количество символов - 3",
                    maxlength: "Максимальное количество символов - 100"
                },
                client_controller: {
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

/*
 * #componentTypeForm submit handler
 * 
 * Serialize data from validated form and call callback func with this data as
 * param + element selector
 */
    '#componentTypeForm submit': function(el,ev) {
        ev.preventDefault();

        if($(el).valid() === true) {

            Component_type_model.set_component_type($(el).serialize(), this.callback('componentTypeSaved', el));

        }

    },

/*
 * Check componnent type status
 * 
 * Check for errors. Set component_type_id equal to data property, and request
 * for available functions for this component_type. Make tab 'fuctions' active 
 * by removing class disabled to set new or edit functions for this compoent_type.
 * Refresh list of component types in the end.   
 */
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

/*
 * Cancel button click handler
 */ 
    '.cancel click': function(el) {
        $(el).parents('.window-container').find('.window-closeButton').click();
    },

    '.compTypeTab click': function(el, ev){

        ev.preventDefault();

        tab_navigation(el, 'compTypeTab', 'active', '#compWrap', 'current', 'compTypeTabCont', '#'+this.elementId, $(el).attr('href'));

    },

/*
 * Get all functions that belong to current component type 
 */
     getFunctions: function() {

         Component_type_model.get_all_component_function({
             component_type_id: this.component_type_id
         }, this.callback('functionsGeted'));

     },

/*
 *  getFunctions result handler
 *  
 *  Show error on failure, or create html view with returned data and add it 
 *  to 'functions' tab when set/edit component type   
 */
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

/*
 * #addFunction click handler
 * 
 * Creates html view with component_type_id as incoming data. Prepends this
 * html to form after.
 */
     '#addFunction click': function() {

         var html = $.View(this.Class.defaults.viewpath+'add_function.tmpl', {
             component_type_id: this.component_type_id
         });

         $('.function_forms').prepend(html);

     },

/*
 * .saveFunction click handler
 * 
 * Validates .functionForm. If valid serialize data from form and send to server.
 * Calls callback after.
 */
     '.saveFunction click': function(el, ev){
        ev.preventDefault();

        var $form = $(el).parents('.functionForm');

        this.functionValidate($form);

        if ($form.valid() !== false) {
            Component_type_model.set_component_function($form.serialize(), this.callback('functionSaved', $form));
        }

     },

/*
 * Handles .saveFunction click results
 * 
 * Show error if exists. Set formId property and change icon  
 */
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

/*
 * Component type function validate
 */
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

/*
 * .deleteFunction click handler
 * 
 * Removes function from DOM if it hasn't been saved(just created) or 
 * entirely deletes it from server on confirm(for existing function) 
 */
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

/*
 * Handles .deleteFunction click result 
 * 
 * Show error if exists. Deletes funcion from DOM on success.
 */
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