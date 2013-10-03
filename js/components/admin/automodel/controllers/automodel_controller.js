$.Controller.extend('Automodel',{
    defaults: {
        viewpath:'//components/admin/automodel/views/',
        path_for_uploadify: 'js/resources/plugins/uploadify/',
        lang_id: 2,
        upload_photo: 'automodel_img_controller/upload_photo',
        upload_logo: 'automodel_img_controller/upload_logo',
        pref: 'ru'
    }

},{

    init: function(element, options) {

        var container = $('.'+this.Class.fullName.toLowerCase());

        this.elementId = container.attr('id');

        imperavi($('.content_desc', '#'+this.elementId));

        $('#name_ru').syncTranslit({
            destination: 'link_ru',
            urlSeparator: '_'
        });
        $('#name_ua').syncTranslit({
            destination: 'link_ua',
            urlSeparator: '_'
        });
        $('#name_en').syncTranslit({
            destination: 'link_en',
            urlSeparator: '_'
        });

        if(typeof this.options.full_functionality == 'undefined'){
            this.options.full_functionality = false;
        }

        if (this.options.automodel_id != false){

            this.id = parseInt(this.options.automodel_id);

            this.uploadLogo();
            this.fancyBox();
            this.uploadPhoto();
            $('#complectation').complectation(this.id);
            $('#characteristic').characteristic(this.id);
            $('#groups').autogroup(this.id);
        }

        //alert($.dump(this.options));
        $('.automodel_form').validate({
            rules:{
                name:{
                    minlength:2,
                    maxlength: 100,
                    required:true
                },
                link:{
                    minlength:2,
                    maxlength: 1000,
                    regexp: '^[a-zA-Z0-9_]+$',
                    unique: true,
                    required:true
                },
                description:{
                    minlength:5,
                    maxlength: 3000,
                    required:true
                },
                seo_title:{
                    maxlength: 200
                },
                key_words:{
                    maxlength: 500
                },
                seo_description:{
                    maxlength: 1000
                }
            },
            messages: {
                name: {
                    minlength:'Минимальное количество символов - 2',
                    maxlength: 'Максимальное количество символов - 100',
                    required: 'Это обязательное поле'
                },
                link: {
                    minlength:'Минимальное количество символов - 2',
                    maxlength: 'Максимальное количество символов - 1000',
                    regexp: 'может состоять только из латинских букв, цифр и знака подчеркивания',
                    unique: 'Такая ссылка уже зарегестрирована',
                    required: 'Это обязательное поле'
                },
                description: {
                    minlength:'Минимальное количество символов - 5',
                    maxlength: 'Максимальное количество символов - 3000',
                    required: 'Это обязательное поле'
                },
                seo_title:{
                    maxlength: 'Максимальное количество символов - 200'
                },
                key_words:{
                    maxlength: 'Максимальное количество символов - 500'
                },
                seo_description:{
                    maxlength: 'Максимальное количество символов - 1000'
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
        if($('.automodel_id').val().length>0){
            $('.nav-tabs li').show();
        }
    },

    '.automodel_tab click': function(el, ev) {

        ev.preventDefault();

        tab_navigation(el, 'automodel_tab', 'active', '#automodel_tab_content', 'cur', 'automodel_tab_cont', '#'+this.elementId);

    },

    '.automodel_lang click': function(el, ev) {

        ev.preventDefault();

        tab_navigation(el, 'automodel_lang', 'active', '#automodel_lang_wrap', 'current', 'content_lang', '#'+this.elementId);

    },

    '.automodel_form submit': function(el, ev){
        ev.preventDefault();

        if(el.valid() !== false){

            var data = el.serialize();
            data = data+'&'+$('#miniAutomodelForm').serialize();

            Automodel_model.set_automodel(data, this.callback('automodel_saved'), this.callback('error'));
        }
    },

    automodel_saved: function(response) {

        if(response.success == true){

            if (response.message) {
                show_error('Код ошибки: '+response.message);
                return;
            }

            this.id = parseInt(response.data);

            $('.automodel_id').val(response.data);
            $('.nav-tabs li').show();

            if(this.options.full_functionality !== false){
                $(this.options.automodel_wrap).controller().load_automodels();
            }

            if (!$('#automodel_logo_wrap').length) {

                $('#automodel_form').find('fieldset').prepend('<div id="automodel_logo_wrap"><h3 id="automodel_logo_caption">Логотип автомодели:</h3><input type="file" id="upl_automodel_img" class="upl_img" /><div id="automodel_img"></div></div>');

                this.uploadLogo();
                this.uploadPhoto();
                $('#complectation').complectation(this.id);
                $('#characteristic').characteristic(this.id);
                $('#groups').group(this.id);
            }

            show_success('Автомодель сохранена!');

        }
        else{
            show_error('Ой что-то пошло не так!');
        }
    },

    uploadLogo: function(){
        this.upload_function('#upl_automodel_img', 'logo_controller/set_automodel_logo', 'logo');
    },

    logoUploaded: function(data){
        $('#automodel_img').html('<img src="'+base_url+'uploads/images/'+data.name+'"><i class="icon-trash menu_icon delete_automodel_logo" data-automodel_logo_id="'+data.id+'" title="Удалить логотип автомодели"></i>');
    },

    uploadPhoto: function(){
        this.upload_function('#upl_automodel_photo', 'photo_controller/set_automodel_photo', 'photo');
    },

    photoUploaded: function(data){
        $('#automodel_photoes').append('<div class="automodel_photo_item"><a rel="automodel_photo" class="fany_box_img" href="'+base_url+'uploads/images/'+data.name+'"><img src="'+base_url+'uploads/images/'+data.name+'"/></a><div class="clear"></div><i class="icon-trash menu_icon delete_automodel_photo" data-automodel_photo_id="'+data.id+'" title="Удалить фотографию автомодели"></i><div class="clear"></div>');
        this.fancyBox();
    },

    fancyBox: function(){
        $('#'+this.elementId).find("a:has(img)").fancybox({
            overlayShow: true,
            overlayOpacity: 0.5,
            zoomSpeedIn: 300,
            zoomSpeedOut:300,
            transitionIn:'elastic',
            transitionOut:'elastic'
        });
    },

    upload_function: function(selector, upload_method, callback){
        var obj = this;

        $(selector).uploadify({
            'uploader': base_url+obj.Class.defaults.path_for_uploadify+'uploadify.swf',
            'cancelImg': base_url+obj.Class.defaults.path_for_uploadify+'cancel.png',
            'script': base_url+upload_method,
            'scriptData':{
                automodel_id: obj.id
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

                if (callback == 'logo') {
                    obj.logoUploaded(resp);
                } else {
                    obj.photoUploaded(resp);
                }
            },
            'onError': function(errorObj, data){
                throw_message(errorObj, 'error');
            }
        });
    },

    '.delete_automodel_logo click': function(el){
        var id = $(el).data('automodel_logo_id'),
        obj = this;

        if(confirm('Вы действительно хотите удалить этот логотип?')){
            Automodel_model.delete_logo({
                id: id
            }, function(data){
                obj.logoDeleted(data, el);
            }, obj.callback('error'));
        }

    },

    logoDeleted: function(data, el) {

        if (data.success == true) {

            show_success('Логотип удален!');

            $('#automodel_img').fadeOut(300, function(){
                $('#automodel_img').html('&nbsp;').show();
            });

        } else show_error('Ошибка!');

    },

    '.delete_automodel_photo click': function(el){
        var id = $(el).data('automodel_photo_id'),
        obj = this;

        if(confirm('Вы действительно хотите удалить этот логотип?')){
            Automodel_model.delete_photo({
                id: id
            }, function(data){
                obj.photoDeleted(data, el);
            }, obj.callback('error'));
        }

    },

    photoDeleted: function(data, el) {

        if (data.success == true) {

            show_success('Фотография удалена!');

            $(el).parents('.automodel_photo_item').fadeOut(300, function(){
                $(el).parents('.automodel_photo_item').remove();
            });

        } else show_error('Ошибка!');

    },

    error: function(response){
        show_error(response.data?response.data:response);
    }

});