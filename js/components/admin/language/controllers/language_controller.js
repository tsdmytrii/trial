$.Controller.extend('Language',{
    defaults: {
        viewpath:'//components/admin/language/views/',
        lang_id: 2,
        pref: 'ru'
    }

},{

    init: function(element, options) {

        this.elementId = this.element.attr('id');

        if(typeof this.options.full_functionality == 'undefined'){
            this.options.full_functionality = false;
        }

        $('.languageForm').validate({
            rules:{
                name:{
                    minlength:2,
                    maxlength: 200,
                    required:true
                },
                iso_code:{
                    maxlength: 3,
                    required:true
                },
                position:{
                    maxlength: 2,
                    required:true
                }
            },
            messages: {
                name: {
                    minlength:'Минимальное количество символов - 2',
                    maxlength: 'Максимальное количество символов - 200',
                    required: 'Это обязательное поле'
                },
                iso_code:{
                    maxlength: 'Максимальное количество символов - 3',
                    required: 'Это обязательное поле'
                },
                position:{
                    maxlength: 'Максимальное количество символов - 2',
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

    '.languageForm submit': function(el, ev) {
        ev.preventDefault();

        if(el.valid() !== false){
            Language_model.set_language(el.serialize(), this.callback('language_saved'));
        }
    },

    language_saved: function(response) {

        if(response.success == true){

            if (response.message) {

                show_error('Код ошибки: '+response.message);

                return;

            }

            $('.language_id', '#'+this.elementId).val(response.data);

            if(this.options.full_functionality !== false){

                $(this.options.language_wrap).controller().load_languages();

            }

            show_success('Язык сохранен! Для правильной работы компоненто пожалуйста перезагрузите страницу!');

        }
        else{

            show_error('Ой что-то пошло не так!');

        }
    }

});