$.Controller('Question_variant', {}, {

    init: function(element, data) {

        this.params = data;
        this._autoCompleteEmail();
        //validation
        $('#questionForm').validate({
            rules: {
                question_theme: {
                    required: true,
                    minlength: 2,
                    maxlength: 200
                },
                email: {
                    required: true,
                    minlength: 4,
                    maxlength: 200
                }
            },
            messages: {
                question_theme: {
                    required: 'Это обязательное поле',
                    minlength: "Минимальное количество символов - 2",
                    maxlength: "Максимальное количество символов - 200"
                },
                email: {
                    required: 'Это обязательное поле',
                    minlength: "Минимальное количество символов - 4",
                    maxlength: "Максимальное количество символов - 200"
                }
            },
            highlight: function(element) {
                $(element).parents('.control-group').addClass('error').find('.help').empty();
            },
            unhighlight: function(element) {
                $(element).parents('.control-group').removeClass('error').find('.help').empty();
            },
            errorPlacement: function(error, element) {
                //		var  id = '.'+element.attr('name')+'_error';
                //	alert($.dump(error));
                element.parents('.control-group').find('.help').html(error.html());
                //		//$(id).append(error);
            }
        });

    },

    '#questionForm submit': function(el, ev){
        ev.preventDefault();

        if($(el).valid() === true) {

            Question_variant_model.set_question_variant($(el).serialize(), this.callback('questionVariantSeted'), this.callback('error'));

        }
    },

    questionVariantSeted: function(data){
        if (data.success) {

            if (data.message) {
                show_error('Код ошибки: '+data.message);
                return;
            }

            show_success('Изменения внесены успешно');

            $('#set_question_variant_window, .modal-background').fadeOut(300, function(){
                $('#set_question_variant_window, .modal-background').remove();
            });

            var callBackString = '$("#'+this.params.id+'").'+this.params.className+'("loadQuestionVariant")';

            eval(callBackString);

        } else {
            show_error('Ошибка');
        }
    },

    _autoCompleteEmail: function(id) {

        $('#emailAutocomplete').autocomplete({
            serviceUrl: base_url + 'admin/email_controller/email_autocomplete', // Страница для обработки запросов автозаполнения
            minChars: 2, // Минимальная длина запроса для срабатывания автозаполнения
            //            delimiter: /(,|;)\s*/, // Разделитель для нескольких запросов, символ или регулярное выражение
            maxHeight: 400, // Максимальная высота списка подсказок, в пикселях
            width: 300, // Ширина списка
            zIndex: 19999, // z-index списка
            deferRequestBy: 300, // Задержка запроса (мсек), на случай, если мы не хотим слать миллион запросов, пока пользователь печатает. Я обычно ставлю 300.
            onSelect: function(data, value, element) {

                $(element).prev().val(value);

            } // Callback функция, срабатывающая на выбор одного из предложенных вариантов,
            //            lookup: ['January', 'February', 'March'] // Список вариантов для локального автозаполнения
        });
    },

    error: function(response){
        show_error(response.data?response.data:response);
    }

});