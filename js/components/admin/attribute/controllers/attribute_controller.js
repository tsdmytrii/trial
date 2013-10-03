$.Controller.extend('Attribute',{
    defaults: {
        viewpath:'//components/admin/attribute/views/',

        lang_id: 2,
        pref: 'ru'
    }

},{
    init:function(selector){

        this.elementId = this.element.attr('id');

        this.attribute_id = 0;

        if (this.options.data) {
            $('.attributeTab').removeClass('disabled');

            this.attribute_id = this.options.data.id;

            this.getFunctions();
        }

        $('#attributeForm').validate({
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

    '#attributeForm submit': function(el,ev) {
        ev.preventDefault();

        if($(el).valid() === true) {

            Attribute_model.set_attribute($(el).serialize(), this.callback('attributeSaved', el));

        }

    },

    attributeSaved: function(el, data){

        if (data.success == true) {

            if (data.message) {

                show_error('Код ошибки: '+data.message);

                return;

            }

            show_success('Изменения внесены успешно');

            if (this.attribute_id === 0) {

                this.attribute_id = data.data;

                $('#attribute_id').val(data.data);

                this.getFunctions();

            }

            $('.attributeTab').removeClass('disabled');

            $('#'+this.options.elementId).controller().loadAttributes();

        } else {

            show_error('Ошибка');

        }
    },

    '.cancel click': function(el) {
        $(el).parents('.window-container').find('.window-closeButton').click();
    },

    '.attributeTab click': function(el, ev){

        ev.preventDefault();

        tab_navigation(el, 'attributeTab', 'active', '#compWrap', 'current', 'attributeTabCont', '#'+this.elementId, $(el).attr('href'));

    }

});