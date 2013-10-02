$.Controller.extend('Unit',{
    defaults: {
        viewpath:'//components/admin/unit/views/',
        lang_id: 2,
        pref: 'ru'
    }

},{

    init: function(element, options) {

        this.elementId = this.element.attr('id');

        if(typeof this.options.full_functionality == 'undefined'){
            this.options.full_functionality = false;
        }

        $('.unitForm').validate({
            rules:{
                name:{
                    minlength:2,
                    maxlength: 200,
                    required:true
                },
                short_name:{
                    minlength:2,
                    maxlength: 100,
                    required:true
                },
                description:{
                    minlength:5,
                    maxlength: 1000,
                    required:true
                }
            },
            messages: {
                name: {
                    minlength:'Минимальное количество символов - 2',
                    maxlength: 'Максимальное количество символов - 200',
                    required: 'Это обязательное поле'
                },
                short_name: {
                    minlength:'Минимальное количество символов - 2',
                    maxlength: 'Максимальное количество символов - 100',
                    required: 'Это обязательное поле'
                },
                description: {
                    minlength:'Минимальное количество символов - 5',
                    maxlength: 'Максимальное количество символов - 2000',
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

        $('.unitDataForm').validate({
            rules: {
                position: {
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

    '.unitTab click': function(el, ev) {

        ev.preventDefault();

        tab_navigation(el, 'unitTab', 'active', '.unitLangWrap', 'current', 'content_lang', '#'+this.elementId, $(el).attr('href'));

    },

    '.unitForm submit': function(el, ev) {
        ev.preventDefault();

        var dataForm = $('.unitDataForm');

        if(el.valid() !== false && dataForm.valid() !== false){
            Unit_model.set_unit(el.serialize()+'&'+dataForm.serialize(), this.callback('unit_saved'));
        }
    },

    unit_saved: function(response) {

        if(response.success == true){

            if (response.message) {

                show_error('Код ошибки: '+response.message);

                return;

            }

            $('.unit_id', '#'+this.elementId).val(response.data.unit_id);
            $('.lang_id', '#'+this.elementId).val(response.data.unit_lang_id);

            if(this.options.full_functionality !== false){

                $(this.options.unit_wrap).controller().load_units();

            }

            show_success('Еденица измерения сохранена!');

        }
        else{

            show_error('Ой что-то пошло не так!');

        }
    }

});