/*
 * Subscribtion controller
 * 
 * Operates with set/edit of component type
 */
$.Controller.extend('Campaign',{
    defaults: {
        viewpath:'//components/admin/campaigns/views/',
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

        this.campaign_id = 0;

        if (this.options.data) {
           
            this.campaign_id = this.options.data.id;

          }

        $('#campaignForm').validate({
            rules: {
                name: {
                    required: true,
                    minlength: 3,
                    maxlength: 100
                },
                title: {
                    required: true,
                    minlength: 3,
                    maxlength: 100
                },
               date: {
                    required: true,
                    minlength: 8,
                    maxlength: 10
                }
                
                  
                  
            },
            messages: {
                name: {
                    required: 'Это обязательное поле',
                    minlength: "Минимальное количество символов - 3",
                    maxlength: "Максимальное количество символов - 100"
                },
                title: {
                    required: 'Это обязательное поле',
                    minlength: "Минимальное количество символов - 3",
                    maxlength: "Максимальное количество символов - 100"
                },
                date: {
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


    '#campaignForm submit': function(el,ev) {
     
     ev.preventDefault();
//console.log($(el).serialize());
        if($(el).valid() === true) {

            Campaigns_model.set_campaign($(el).serialize(), this.callback('campaignSaved', el));

        }

    },

    campaignSaved: function(el, data){

        if (data.success == true) {

            if (data.message) {

                show_error('Код ошибки: '+data.message);

                return;

            }

            show_success('Изменения внесены успешно');

            if (this.campaign_id === 0) {

                this.campaign_id = data.data;

                $('#campaign_id').val(data.data);

                }

            $('#'+this.options.elementId).controller().loadCampaigns();

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