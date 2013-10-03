$.Controller('Email', {}, {
    init: function(element, data) {

        this.params = data;

        //validation
        $('#emailForm').validate({
            rules: {
                email: {
                    email: true,
                    minlength: 4,
                    maxlength: 200,
                    required: true
                },
                department: {
                    minlength: 3,
                    maxlength: 200,
                    required: true
                },
                description: {
                    minlength: 3,
                    maxlength: 1000
                }
            },
            messages: {
                email: {
                    required: 'Это обязательное поле',
                    minlength: 'Минимальное количество символов - 4',
                    maxlength: 'Максимальное количество символов - 200',
                    email: 'Пожалуйста введите правильный e-mail'
                },
                department: {
                    required: 'Это обязательное поле',
                    minlength: 'Минимальное количество символов - 2',
                    maxlength: 'Максимальное количество символов - 200'
                },
                description: {
                    minlength: 'Минимальное количество символов - 3',
                    maxlength: 'Максимальное количество символов - 1000'
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

    '#emailForm submit': function(el, ev) {
        ev.preventDefault();

        if (el.valid() !== false) {
            Email_model.set_email(el.serialize(), this.callback('emailSaved'), this.callback('error'));
        }
    },

    emailSaved: function(response) {

        if (response.success === true) {

            if (response.message) {
                show_error('Код ошибки: '+response.message);
                return;
            }

            show_success('Изменения успешно внесены!');

            $('#set_email_window, .modal-background').fadeOut(300, function(){
                $('#set_email_window, .modal-background').remove();
            });

            var callBackString = '$("#'+this.params.id+'").'+this.params.className+'("loadEmails")';

            eval(callBackString);


        } else {
            show_error('Возникла неизвестная ошибка!');
        }

    },

    error: function(response){
        show_error(response.data?response.data:response);
    }

});