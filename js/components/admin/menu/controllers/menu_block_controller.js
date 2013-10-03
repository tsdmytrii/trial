$.Controller.extend('Menu_block',{
    defaults: {
        viewpath:'//components/admin/menu/views/',
        lang_id: 2,
        pref: 'ru'
    }

},{
    /*
     * Initialize function of Menu_block controller
     * 
     * Validates new menu-block(fields name and position)
     * 
     * @var elementId string Its id of the new menu-block element
     */
    init:function(){

        this.elementId = this.element.attr('id');

        $('#menuBlockForm').validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2,
                    maxlength: 100
                },
                position: {
                    required: true,
                    maxlength: 2
                }
            },
            messages: {
                name: {
                    required: 'Это обязательное поле',
                    minlength: 'Минимальное количество символов - 2',
                    maxlength: "Максимальное количество символов - 100"
                },
                position: {
                    required: 'Это обязательное поле',
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
 * Function on new menu-block element submit
 * 
 *  Checks if all fields in the form are valid, and if they are - serialize all 
 *  data from fields into an array(post), after that calls set_menu_block method 
 *  in the Menu_block_model with serialized data. Callback after that to show 
 *  changes.
 *    
 */
    '#menuBlockForm submit': function(el, ev){
        ev.preventDefault();

        if($(el).valid() === true) {

            Menu_block_model.set_menu_block($(el).serialize(), this.callback('menuBlockSaved'));

        }
    },

/*
 * Simply closes window with new menu-block form
 */
    '.cancel click': function(el, ev) {
        $(el).parents('.window-container').find('.window-closeButton').click();
    },

/*
 * Callback function for submiting new menu-block form
 * 
 * Shows successfull message on success or throw an error message on failure
 * .controller().loadMenuBlock() - "find" the nearest controler to the 
 * element and run loadMenuBlock method in this controller.
 */
    menuBlockSaved: function(data){
        if (data.success) {

            if (data.message) {
                show_error('Код ошибки: '+data.message);
                return;
            }

            show_success('Изменения внесены успешно');

            $('#'+this.options.elementId).controller().loadMenuBlock();

        } else
            show_error('Ошибка');

    }

});