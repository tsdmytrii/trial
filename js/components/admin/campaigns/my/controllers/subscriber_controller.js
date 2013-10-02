/*
 * Subscribtion controller
 * 
 * Operates with set/edit of component type
 */
$.Controller.extend('Subscriber',{
    defaults: {
        viewpath:'//components/admin/subscribes/views/',
        lang_id: 2,
        pref: 'ru'
    }

},{
    
    /*
     * Init func of subscribtion cotroller
     * 
     * Validates component type edit/set form. If option.data exists, get 
     * function of this component type  
     */
    init: function(selector){

        this.elementId = this.element.attr('id');

        this.subscriber_id = 0;

        if (this.options.data) {
           
            this.subscriber_id = this.options.data.data.id;

        }

        $('#subscriberForm').validate({
            rules: {
                name: {
                    required: true,
                    minlength: 3,
                    maxlength: 100
                },
                date: {
                    required: true,
                    minlength: 8,
                    maxlength: 10
                },
                email: {
                    required: true,
                    minlength: 8,
                    maxlength: 100
                }
                  
                  
            },
            messages: {
                name: {
                    required: 'Это обязательное поле',
                    minlength: "Минимальное количество символов - 3",
                    maxlength: "Максимальное количество символов - 100"
                },
                description: {
                    required: 'Это обязательное поле',
                    minlength: "Минимальное количество символов - 3",
                    maxlength: "Максимальное количество символов - 100"
                },
                position: {
                    required: 'Это обязательное поле',
                    minlength: "Минимальное количество символов - 1",
                    maxlength: "Максимальное количество символов - 2"
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
    '#subscriberForm submit': function(el,ev) {
     
        ev.preventDefault();
        console.log($(el).serialize());
        if($(el).valid() === true) {

            Subscribes_model.set_subscriber($(el).serialize(), this.callback('subscriberSaved', el));

        }

    },

    /*
 * Check componnent type status
 * 
 * Check for errors. Set subscribtion_id equal to data property, and request
 * for available functions for this subscribtion. Make tab 'fuctions' active 
 * by removing class disabled to set new or edit functions for this compoent_type.
 * Refresh list of component types in the end.   
 */
    subscriberSaved: function(el, data){

        if (data.success == true) {

            if (data.message) {

                show_error('Код ошибки: '+data.message);

                return;

            }

            show_success('Изменения внесены успешно');

            if (this.subscriber_id === 0) {

                this.subscriber_id = data.data;

                $('#subscriber').val(data.data);

            }

            $('#'+this.options.elementId).controller().loadSubscribers();

        } else {

            show_error('Ошибка');

        }
    },

    /*
 * Cancel button click handler
 */ 
    '.cancel click': function(el) {
        $(el).parents('.window-container').find('.window-closeButton').click();
    }


});