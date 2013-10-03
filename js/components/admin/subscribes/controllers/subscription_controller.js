/*
 * Subscribtion controller
 * 
 * Operates with set/edit of component type
 */
$.Controller.extend('Subscription',{
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

        this.subscribtion_id = 0;

        if (this.options.data) {
           
            this.subscribtion_id = this.options.data.id;

          }

        $('#subscriptionForm').validate({
            rules: {
                name: {
                    required: true,
                    minlength: 3,
                    maxlength: 100
                },
                description: {
                    required: true,
                    minlength: 3,
                    maxlength: 100
                },
                position: {
                    required: true,
                    minlength: 1,
                    maxlength: 2
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
    '#subscriptionForm submit': function(el,ev) {
     
     ev.preventDefault();
//console.log($(el).serialize());
        if($(el).valid() === true) {

            Subscribes_model.set_subscription($(el).serialize(), this.callback('subscriptionSaved', el));

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
    subscriptionSaved: function(el, data){

        if (data.success == true) {

            if (data.message) {

                show_error('Код ошибки: '+data.message);

                return;

            }

            show_success('Изменения внесены успешно');

            if (this.subscribtion_id === 0) {

                this.subscribtion_id = data.data;

                $('#subscribtion_id').val(data.data);

                }

            $('#'+this.options.elementId).controller().loadSubscriptions();

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