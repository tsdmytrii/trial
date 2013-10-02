$.Controller.extend('Complectation',{
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

        this.load_complectation();

    },

    load_complectation: function(){
        Complectation_model.get_all_complectations({
            automodel_id: this.automodel_id
        }, this.callback('complectationsLoaded'), this.callback('error'));
    },

    complectationsLoaded: function(data){

        if (data && data.message) {
            show_error('Код ошибки: '+data.message);
            return;
        }

        var html = $.View(this.Class.defaults.viewpath+'complectation_list.tmpl', {
            our_data: data.data,
            pref: this.Class.defaults.pref
        });

        $('#complectation_list').html(html);
    },

    '.add_complectation click': function(el){

        this.setComplectationCallback(false, false, this.automodel_id);

    },

    '.edit_complectation click': function(el){
        var complectation_id = $(el).parents('.complectation_icon_wrap').data('complectation_id'),
        obj = this;

        Complectation_model.get_complectation({
            complectation_id: complectation_id
        }, function(data){

            var response = data.data;

            obj.setComplectationCallback(response, el, false);
        });
    },

    setComplectationCallback: function(data, el, automodel_id){

        if (data && data.message) {
            show_error('Код ошибки: '+data.message);
            return;
        }

        var html = $.View(this.Class.defaults.viewpath+'complectation_form.tmpl', {
            our_data: data,
            site_url: base_url,
            automodel_id: automodel_id
        }), obj = this;

        if ($('#complectation_form').length){
            $('#complectation_form').slideUp(300, function(){

                $('#complectation_form').remove();

                if (el !== false)
                    $(el).parents('.complectation_wrap').after(html);
                else
                    $('#complectation_list').before(html);

                imperavi($('.content_desc', '#'+obj.elementId));

                if (el !== false)
                    obj.uploadLogo(data.id);

                $('#complectation_form').slideDown(300);
            });
        } else {
            if (el !== false)
                    $(el).parents('.complectation_wrap').after(html);
                else
                    $('#complectation_list').before(html);

                imperavi($('.content_desc', '#'+this.elementId));

                if (el !== false)
                    this.uploadLogo(data.id);

                $('#complectation_form').slideDown(300);
        }
    },

    '.cancel_complectation click': function(el){
        $(el).parents('#complectation_form').slideUp(300, function(){
            $(el).parents('#complectation_form').remove();
        });
    },

    '.complectation_lang click': function(el, ev){

        ev.preventDefault();

        tab_navigation(el, 'complectation_lang', 'active', '#complectation_lang_wrap', 'current', 'content_lang', '#'+this.elementId);

    },

    '.complectation_form submit': function(el, ev){
        ev.preventDefault();

        this.complectation_validate(el);
        var compl_info_form = $(el).parents('fieldset').find('.compl_info_form');
        this.complectation_info_validate(compl_info_form);

        var obj = this;

        if(el.valid() !== false && compl_info_form.valid() !== false){

            var data = el.serialize();
            data = data+'&'+compl_info_form.serialize();

            Complectation_model.set_complectation(data, function(data){
                obj.complectation_saved(data, el)
            }, this.callback('error'));
        }
    },

    complectation_saved: function(response, el){

        if(response.success == true){

            if (response.message) {
                show_error('Код ошибки: '+response.message);
                return;
            }

            if(response.data == parseInt(response.data)){

                this.id = parseInt(response.data);

                $('.complectation_id').val(response.data);

            }

            this.load_complectation();

            if (!$('#complectation_logo_wrap').length) {

                $('#complectation_form').find('.compl_info_wrap').after('<div id="complectation_logo_wrap"><h3 id="complectation_logo_caption">Логотип комплектации:</h3><input type="file" id="upl_complectation_img" class="upl_img" /><div id="complectation_img"></div></div>');

                this.uploadLogo(this.id);
            }

            show_success('Комплектация сохранена!');

        }
        else{
            show_error('Ой что-то пошло не так!');
        }
    },

    uploadLogo: function(id){
        this.upload_function('#upl_complectation_img', 'logo_controller/set_complectation_logo', id);
    },

    logoUploaded: function(data){
        $('#complectation_img').html('<img src="'+base_url+'uploads/images/'+data.name+'"><i class="icon-trash menu_icon delete_complectation_logo" data-complectation_logo_id="'+data.id+'" title="Удалить логотип автомодели"></i>');
    },

    upload_function: function(selector, upload_method, id){
        var obj = this;

        $(selector).uploadify({
            'uploader': base_url+obj.Class.defaults.path_for_uploadify+'uploadify.swf',
            'cancelImg': base_url+obj.Class.defaults.path_for_uploadify+'cancel.png',
            'script': base_url+upload_method,
            'scriptData':{
                complectation_id: id
            },
            'removeCompleted' : true,
            'fileDesc': 'Select your image file',
            'fileExt': '*.*',
            'buttonText': 'Upload',
            'multi': false,
            'auto': true,
            'queueSizeLimit' : 5,
            'onAllComplete':function(){
//                $('.uploadifyQueueItem').remove();
            },
            'onComplete': function(event, ID, fileObj, response, data) {
                var resp = jQuery.parseJSON(response), selector;
                resp = resp.data;

                obj.logoUploaded(resp);
            },
            'onError': function(errorObj, data){
                throw_message(errorObj, 'error');
            }
        });
    },

    '.delete_complectation_logo click': function(el){
        var id = $(el).data('complectation_logo_id'),
        obj = this;

        if(confirm('Вы действительно хотите удалить этот логотип?')){
            Complectation_model.delete_logo({
                id: id
            }, function(data){
                obj.logoDeleted(data, el);
            }, obj.callback('error'));
        }

    },

    logoDeleted: function(data, el) {

        if (data.success == true) {

            show_success('Логотип удален!');

            $('#complectation_img').fadeOut(300, function(){
                $('#complectation_img').html('&nbsp;').show();
            });

        } else show_error('Ошибка!');

    },

    '.delete_complectation click': function(el){
        var complectation_id = $(el).parents('.complectation_icon_wrap').data('complectation_id'),
        obj = this;

        if (confirm('Вы действительно хотите удалить комплектацию: "'+$(el).parents('.complectation_wrap').find('.complectation_caption').text()+'"?')){
            Complectation_model.delete_complectation({
                complectation_id: complectation_id
            }, function(data){
                obj.complectationDeleted(data, el);
            }, this.callback('error'));
        }
    },

    complectationDeleted: function(data, el){
        if (data.success == true) {

            if (data.message) {
                show_error('Код ошибки: '+data.message);
                return;
            }
            
            show_success('Комплектация успешно удалена!');

            if ($(el).parents('.complectation_wrap').next().attr('id') == 'complectation_form'){
                $('#complectation_form').slideUp(300, function(){
                    $('#complectation_form').remove();
                });
            }

            $(el).parents('.complectation_wrap').fadeOut(300, function(){
                $(el).parents('.complectation_wrap').remove();
            });

        } else
            show_error('Ошибка, пожалуйста подождите пока мы все исправим!');
    },

    complectation_validate: function(element){

        $(element).validate({
            rules:{
                name:{
                    minlength:2,
                    maxlength: 100,
                    required:true
                },
                description:{
                    minlength:5,
                    maxlength: 3000,
                    required:true
                }
            },
            messages: {
                name: {
                    minlength:'Минимальное количество символов - 2',
                    maxlength: 'Максимальное количество символов - 100',
                    required: 'Это обязательное поле'
                },
                description: {
                    minlength:'Минимальное количество символов - 5',
                    maxlength: 'Максимальное количество символов - 3000',
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

    complectation_info_validate: function(element){

        $(element).validate({
            rules:{
                year:{
                    minlength:2,
                    maxlength: 12,
                    required:true
                },
                price:{
                    minlength:2,
                    maxlength: 12,
                    required:true
                },
                position:{
                    maxlength: 11,
                    required:true
                }
            },
            messages: {
                year:{
                    minlength:'Минимальное количество символов - 2',
                    maxlength: 'Максимальное количество символов - 12',
                    required: 'Это обязательное поле'
                },
                price:{
                    minlength:'Минимальное количество символов - 2',
                    maxlength: 'Максимальное количество символов - 12',
                    required: 'Это обязательное поле'
                },
                position:{
                    maxlength: 'Максимальное количество символов - 11',
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