$.Controller.extend('Img_banner',{
    defaults: {
        viewpath:'//components/admin/img_banners/views/',
        path_for_uploadify: 'js/resources/plugins/uploadify/',
        imgpath: 'uploads/images',
        lang_id: 2,
        upload_function: 'baner_image_controller/set_img_banner',
        pref: 'ru'
    }

},{

    init:function(selector){

        this.elementId = '#'+this.element.attr('id');

        imperavi($('.content_desc', this.elementId));

        if (this.options.our_data) {

            this.upload_img($('#upload_img', this.elementId), this.options.our_data.id);

        }

        $('.bannerForm').validate({
            rules: {
                title: {
                    minlength: 2,
                    maxlength: 200,
                    required: true
                },
                description: {
                    minlength: 5,
                    maxlength: 3000,
                    required: true
                }
            },
            messages: {
                title: {
                    minlength: 'Минимальное количество символов - 2',
                    maxlength: 'Максимальное количество символов - 200',
                    required: 'Это обязательное поле'
                },
                description: {
                    minlength: 'Минимальное количество символов - 5',
                    maxlength: 'Максимальное количество символов - 2000',
                    required: 'Это обязательное поле'
                }
            },
            highlight: function(element) {
                $(element).parents('.control-group').addClass('error');
            },
            unhighlight: function(element) {
                $(element).parents('.control-group').removeClass('error').find('.help').empty();
            },
            errorPlacement: function(error, element) {
                element.parents('.control-group').find('.help').html(error.html());
            }

        });

        $('#bannerDataForm').validate({
            rules: {
                position: {
                    maxlength: 3,
                    required: true
                },
                top: {
                    maxlength: 5,
                    required: true
                },
                left: {
                    maxlength: 5,
                    required: true
                },
                width: {
                    maxlength: 5,
                    required: true
                },
                height: {
                    maxlength: 5,
                    required: true
                }
            },
            messages: {
                position: {
                    maxlength: 'Максимальное количество символов - 3',
                    required: 'Это обязательное поле'
                },
                top: {
                    maxlength: 'Максимальное количество символов - 5',
                    required: 'Это обязательное поле'
                },
                left: {
                    maxlength: 'Максимальное количество символов - 5',
                    required: 'Это обязательное поле'
                },
                width: {
                    maxlength: 'Максимальное количество символов - 5',
                    required: 'Это обязательное поле'
                },
                height: {
                    maxlength: 'Максимальное количество символов - 5',
                    required: 'Это обязательное поле'
                }
            },
            highlight: function(element) {
                $(element).parents('.control-group').addClass('error');
            },
            unhighlight: function(element) {
                $(element).parents('.control-group').removeClass('error').find('.help').empty();
            },
            errorPlacement: function(error, element) {
                element.parents('.control-group').find('.help').html(error.html());
            }

        });

    },

    '.bannerForm submit': function(el,ev){
        ev.preventDefault();
        var data,
            $dataForm = $('#bannerDataForm');

        if($(el).valid() == true && $dataForm.valid() == true) {
            data = $(el).serialize()+'&'+$dataForm.serialize();

            Img_banner_model.set_banner(data, this.callback('bannerSeted'));
        }

    },

    bannerSeted: function(data){
        if (data && data.success) {
            show_success('Изменения внесены успешно');

            $('#upload_wrapper').show();

            if (!$('#upload_imgUploader').length)
                this.upload_img($('#upload_img'), data.data);

            $(this.options.elementId).controller().load_banner();

        } else {

            show_error('Ошибка');

        }
    },

    '#delete_banner_img click': function(el){
        var img_id = {
                id: $(el).attr('data-img_id')
            };

        if(confirm('Вы действительно хотите удалить это изображение?')){
            Img_banner_model.delete_banner_img(img_id, this.callback('imgDeleted', el));
        }
    },

    imgDeleted: function(el, data){
        $(el).parent().fadeOut(300, function(){
            $(el).parent().children().remove();
        });
    },

    '.cancel click': function(el){
        $(el).parents('.window-container').find('.window-closeButton').click();
    },

    upload_img: function(selector, id){
        var obj = this;

        selector.uploadify({
            'uploader': base_url+obj.Class.defaults.path_for_uploadify+'uploadify.swf',
            'cancelImg': base_url+obj.Class.defaults.path_for_uploadify+'cancel.png',
            'script': base_url+obj.Class.defaults.upload_function,
            'scriptData':{
                banner_id: id
            },
            'removeCompleted' : true,
            'fileDesc': 'Select your image file',
            'fileExt': '*.png;*.jpg;*.gif;*.JPEG',
            //                'width':'200',
            'buttonText': 'Upload image',
            'multi': false,
            'auto': true,
            //                    'queueID':'upload_list_wrapper',
            'queueSizeLimit' : 5,
            //                'onAllComplete':function(){
            //                    $('.uploadifyQueueItem').remove();
            //                },
            'onComplete': function(event, ID, fileObj, response, data) {
                var resp = jQuery.parseJSON(response), selector;

                $('#banner_img').html('<img src="'+base_url+obj.Class.defaults.imgpath+'/'+resp.data.name+'"/><div class="clear"></div><i class="icon-trash" id="delete_banner_img" data-img_id="'+resp.data.id+'"/>').show();

                $(obj.options.elementId).controller().load_banner();
            },
            'onError': function(errorObj, data){
                throw_message(errorObj, 'error');
            }
        });

    }

});