/*
 * User_widget controller 
 * 
 * Operates with action about single user
 */
$.Controller('User_widget', {}, {

/*
 * Init func of user_widget controller
 * 
 * Validates user set/edit form. $('#email').rules('remove', 'remote') - do not
 * need to check for unique email if user is already created. Same with 
 * passwords.
 */
    init: function(element, options) {
        if (typeof this.options.full_functionality == 'undefined') {
            this.options.full_functionality = false;
        }
        //alert($.dump(this.options));
        $('#set_user_form').validate({
            rules: {
                username: {
                    minlength: 3,
                    required: true
                },
                email: {
                    required: true,
                    email: true
                            //remote:base_url+'admin/users/check_email'
                },
                password: {
                    required: true,
                    minlength: 6
                },
                confirm_password: {
                    required: true,
                    equalTo: '#password'
                },
                'name': {
                    minlength: 3
                },
                surname: {
                    minlength: 3
                }
            },
            messages: {
                name: {
                    required: 'Name is required,',
                    minlength: 'Minimal length - 3 chars'
                },
                email: {
                    email: 'Please, enter valid email',
                    'remote': 'User with such email already exists'
                }

            },
            highlight: function(element) {
                $(element).parents('.control-group').addClass('error');
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
        if ($('.user_id').val().length > 0 && $('.user_id').val() == parseInt($('.user_id').val())) {
            //removing remote check
            $('#email').rules('remove', 'remote');

            if (parseInt(this.options.data.group.removed) == 0)
                $('.allGroups', '#set_user_form').remove();
            //removing required on password
            $('#password').rules('remove', 'required');
            $('#confirm_password').rules('remove', 'required');

        }
    },

/*
 * #set_user_form submit handler
 * 
 * Calls model function if set/edit user form is valid
 */
    '#set_user_form submit': function(el, ev) {
        ev.preventDefault();

        if (el.valid() !== false) {
            UserModel.setUser(el.serialize(), this.callback('user_saved'));
        }
    },

/*
 * Checks user set result
 * 
 * Checks for errors. Set user_id equal to new user id returned from server.
 * Call loadUsers() from users_controller
 */
    user_saved: function(response) {
        if (response.success == true) {

            if (response.message){
                show_error('Код ошибки: '+response.message);
                return;
            }

            if (response.data == parseInt(response.data)) {
                $('.user_id').val(response.data);
            }

            if (this.options.full_functionality !== false) {

                $('#'+this.options.elementId).controller().loadUsers();

            }

            $('.allGroups', '#set_user_form').show();

            show_success('User saved successfully');

        }
        else {

            show_error('OOPS, something went wrong');

        }
    },

/*
 * .cancel click handler
 * 
 * Just closes set/edit window
 */
    '.cancel click': function() {
        $('#set_user_window, .modal-background').fadeOut(300, function(){
            $('#set_user_window').remove();
        });
    }

});