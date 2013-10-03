$.Controller.extend('Marking',{
    defaults: {
        viewpath:'//components/admin/marking/views/',
        lang_id: 2
    }

},{
    init:function(selector, content_id) {

        this.elementId = $('.'+this.Class.fullName.toLowerCase()).attr('id');

        Marking_model.get_marking(this.callback('markingGeted'));

    },

    markingGeted: function(data){

        if (data && data.message) {
            show_error('Код ошибки: '+data.message);
        } else {
            var html = $.View(this.Class.defaults.viewpath+'index.tmpl', {
                marking: data ? data.data : data,
            });

            this.element.html(html);
        }

        componentLoaded(this.element);

    },

    '#markingForm submit': function(el,ev){
        ev.preventDefault();

        this.markingValidate();

        if($(el).valid() === true) {
            Marking_model.set_marking($(el).serialize(), this.callback('markingSeted'));
        }
    },

    markingSeted: function(data){
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

    markingValidate: function(){

        $('#markingForm').validate({
            rules: {
                min_width: {
                    required: true,
                    minlength: 3,
                    maxlength: 11
                },
                max_width: {
                    required: true,
                    minlength: 3,
                    maxlength: 11
                },
                width: {
                    required: true,
                    minlength: 3,
                    maxlength: 11
                },
                height: {
                    required: true,
                    minlength: 2,
                    maxlength: 11
                },
                min_font_size: {
                    required: true,
                    maxlength: 11
                }
            },
            messages: {
                min_width: {
                    required: 'Это обязательно поле',
                    minlength: 'Минимальное количество символов - 3',
                    maxlength: 'Максимальное количество символов - 11'
                },
                max_width: {
                    required: 'Это обязательно поле',
                    minlength: 'Минимальное количество символов - 3',
                    maxlength: 'Максимальное количество символов - 11'
                },
                width: {
                    required: 'Это обязательно поле',
                    minlength: 'Минимальное количество символов - 3',
                    maxlength: 'Максимальное количество символов - 11'
                },
                height: {
                    required: 'Это обязательно поле',
                    minlength: 'Минимальное количество символов - 2',
                    maxlength: 'Максимальное количество символов - 11'
                },
                min_font_size: {
                    required: 'Это обязательно поле',
                    maxlength: 'Максимальное количество символов - 11'
                }
            },
            highlight: function(element) {
                $(element).parents('.control-group').addClass('error').find('.help').empty();
            },
            unhighlight: function(element) {
                $(element).parents('.control-group').removeClass('error').find('.help').empty();
            },
            errorPlacement: function(error, element){
                element.parents('.control-group').find('.help').html(error.html());
            }
        });

    }
}
);