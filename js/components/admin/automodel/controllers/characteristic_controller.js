$.Controller.extend('Characteristic',{
    defaults: {
        viewpath:'//components/admin/automodel/views/',
        path_for_uploadify: 'js/resources/plugins/uploadify/',
        lang_id: 2,
        pref: 'ru'
    }

},{

    init: function(element, automodel_id){

        this.automodel_id = automodel_id;

        var container = $('.'+this.Class.fullName.toLowerCase());

        this.elementId = container.attr('id');

        this.load_characteristic(true);

    },

    load_characteristic: function(init){

        var obj = this;

        if (typeof init == undefined)
            init = false

        Characteristic_model.get_all_characteristics({
            automodel_id: this.automodel_id
        }, function(data){
            obj.characteristicsLoaded(data, init);
        }, this.callback('error'));
    },

    characteristicsLoaded: function(data, init) {

        if (data && data.message) {
            show_error('Код ошибки: '+data.message);
            return;
        }

        var html = $.View(this.Class.defaults.viewpath+'characteristic_list.tmpl', {
            our_data: data.data,
            pref: this.Class.defaults.pref
        }),
        new_form = $.View(this.Class.defaults.viewpath+'characteristic_form.tmpl', {
            our_data: false,
            site_url: base_url,
            automodel_id: this.automodel_id
        });

        $('#characteristic_list').html(html);

        if (init) {
            $('#characteristic_form_wrap').html(new_form);

            imperavi($('.content_desc', '#'+this.elementId));
        }
    },

    '.add_characteristic click': function(){

        this.setCharacteristicCallback(false, this.automodel_id);

    },

    '.edit_characteristic click': function(el) {
        var characteristic_id = $(el).parents('.characteristic_icon_wrap').data('characteristic_id'),
        obj = this;

        Characteristic_model.get_characteristic({
            characteristic_id: characteristic_id
        }, function(data){

            var response = data.data;

            obj.setCharacteristicCallback(response, this.automodel_id);
        });
    },

    setCharacteristicCallback: function(data, automodel_id){

        if (data && data.message) {
            show_error('Код ошибки: '+data.message);
            return;
        }

        var html = $.View(this.Class.defaults.viewpath+'characteristic_form.tmpl', {
            our_data: data,
            site_url: base_url,
            automodel_id: automodel_id
        }),
        obj = this;

        $('#characteristic_form_wrap').html(html);

        imperavi($('.content_desc', '#'+obj.elementId));

    },

    '.characteristic_lang click': function(el, ev){

        ev.preventDefault();

        tab_navigation(el, 'characteristic_lang', 'active', '#characteristic_lang_wrap', 'current', 'content_lang', '#'+this.elementId);

    },

    '.characteristic_form submit': function(el, ev){
        ev.preventDefault();

        this.characteristic_validate(el);

        var obj = this;

        if(el.valid() !== false){

            var data = el.serialize();
            data = data+'&type_id='+$('.type_id:checked', '#'+this.elementId).val();

            Characteristic_model.set_characteristic(data, function(data){
                obj.characteristic_saved(data, el)
            }, this.callback('error'));
        }
    },

    characteristic_saved: function(response, el){

        if(response.success == true){

            if (response.message) {
                show_error('Код ошибки: '+response.message);
                return;
            }

            $(el).find('.characteristic_id').val(response.data.id);
            $(el).find('.characteristic_lang_id').val(response.data.characteristic_lang_id);

            this.load_characteristic();

            show_success('Характеристика сохранена!');

        }
        else{
            show_error('Ой что-то пошло не так!');
        }
    },

    '.delete_characteristic click': function(el){
        var characteristic_id = $(el).parents('.characteristic_icon_wrap').data('characteristic_id'),
        obj = this;

        if (confirm('Вы действительно хотите удалить комплектацию: "'+$(el).parents('.characteristic_wrap').find('.characteristic_caption').text()+'"?')){
            Characteristic_model.delete_characteristic({
                characteristic_id: characteristic_id
            }, function(data){
                obj.characteristicDeleted(data, el);
            }, this.callback('error'));
        }
    },

    characteristicDeleted: function(data, el) {
        if (data.success == true) {

            if (data.message) {
                show_error('Код ошибки: '+data.message);
                return;
            }
            
            show_success('Комплектация успешно удалена!');

            var new_form = $.View(this.Class.defaults.viewpath+'characteristic_form.tmpl', {
                our_data: false,
                site_url: base_url,
                automodel_id: this.automodel_id
            });

            $('#characteristic_form_wrap').html(new_form);

            imperavi($('.content_desc', '#'+this.elementId));


        } else
            show_error('Ошибка, пожалуйста подождите пока мы все исправим!');
    },

    characteristic_validate: function(element){

        $(element).validate({
            rules:{
                name:{
                    minlength:2,
                    maxlength: 200,
                    required:true
                },
                description:{
                    minlength:5,
                    maxlength: 2000,
                    required:true
                }
            },
            messages: {
                name: {
                    minlength:'Минимальное количество символов - 2',
                    maxlength: 'Максимальное количество символов - 200',
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

    },

    error: function(response){
        show_error(response.data?response.data:response);
    }

});