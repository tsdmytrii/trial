$.Controller.extend('Group',{
    defaults: {
        viewpath:'js/components/admin/group/views/',
        lang_id: 2,
        pref: 'ru'
    }

},{

    init: function(element, options) {

        this.elementId = this.element.attr('id');

        this.groupId = 0;

        if(typeof this.options.full_functionality == 'undefined'){
            this.options.full_functionality = false;
        }

        if (this.options.data) {
            this.groupId = this.options.data.id;
        }

        $('.groupForm').validate({
            rules:{
                name:{
                    minlength:2,
                    maxlength: 200,
                    required:true
                },
                clear_name:{
                    minlength:2,
                    maxlength: 200,
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
                clear_name: {
                    minlength:'Минимальное количество символов - 2',
                    maxlength: 'Максимальное количество символов - 200',
                    required: 'Это обязательное поле'
                },
                description: {
                    minlength:'Минимальное количество символов - 5',
                    maxlength: 'Максимальное количество символов - 1000',
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

        this.getComponentFunctions();

    },

    '.groupForm submit': function(el, ev) {
        ev.preventDefault();

        if(el.valid() !== false){
            Group_model.set_group(el.serialize(), this.callback('group_saved'));
        }
    },

    group_saved: function(response) {

        if(response.success == true){

            if (response.message !== false) {

                show_error('Код ошибки: '+response.message);

            } else {

                $('.group_id', '#'+this.elementId).val(response.data.group_id);

                this.groupId = response.data.group_id;

                if(this.options.full_functionality !== false){

                    $(this.options.group_wrap).controller().load_groups();

                }

                show_success('Группа сохранена!');

            }

        }
        else{

            show_error('Ой что-то пошло не так!');

        }
    },

    '.cancel click': function() {

        $('#group_window, .modal-background').fadeOut(300, function(){
            $('#group_window').remove()
        });

    },

    '.groupTab click': function(el, ev) {
        ev.preventDefault();

        if (!$(el).hasClass('disabled'))
            tab_navigation(el, 'groupTab', 'active', '#groupContent', 'current', 'groupTabContent', '#'+this.elementId, $(el).attr('href'));
    },

    /*
     * Group permissions
     */

    getComponentFunctions: function(){

        Group_model.get_component_functions({
            group_id: this.groupId
        }, this.callback('componentFunctionsGeted'));

    },

    componentFunctionsGeted: function(data) {

        var html = $.View(base_url+this.Class.defaults.viewpath+'set_perm.tmpl', {
            our_data: data.data
        });

        $('#permissionWrap').html(html);

    },

    '.allPermissions click': function(el) {
        var $el = $(el);

        if ($el.is(':checked')) {

            $el.parents('table').find('.component_function_id').each(function(){
                $(this).attr('checked', 'checked');
            });

        } else {

            $el.parents('table').find('.component_function_id').each(function(){
                $(this).removeAttr('checked');
            });

        }
    },

    '#permissionForm submit': function(el, ev){

        ev.preventDefault();

        if(el.valid() !== false){

            Group_model.set_permissions(el.serialize()+'&group_id='+this.groupId, this.callback('pervissionSaved'));

        }

    },

    pervissionSaved: function(response) {

        if (response.success == true) {

            show_success('Права сохранены!');

        }

        else
            show_error('Ой что-то пошло не так!');

    }

});