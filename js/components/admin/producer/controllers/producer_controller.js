$.Controller.extend('Producer',{
    defaults: {
        viewpath:'//components/admin/producer/views/',
        path_for_uploadify: 'js/resources/plugins/uploadify/',
        lang_id: 2,
        upload_photo: 'producer_img_controller/upload_photo',
        upload_logo: 'producer_img_controller/upload_logo',
        pref: 'ru'
    }

},{

    init: function(element, options){

        var container = $('.'+this.Class.fullName.toLowerCase());

        this.elementId = container.attr('id');

        imperavi($('.content_desc', '#'+this.elementId));

        if(typeof this.options.full_functionality == 'undefined'){
            this.options.full_functionality = false;
        }

        if (this.options.producer_id != false){

            this.id = parseInt(this.options.producer_id);

            this.uploadLogo();
            this.fancyBox();
            this.uploadPhoto();
        }

        //alert($.dump(this.options));
        $('.producerForm').validate({
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

        if($('.producer_id').val().length>0){
            $('.producerMaxTab').removeClass('disabled');
        }
    },

    '.producerMaxTab click': function(el, ev){

        ev.preventDefault();

        tab_navigation(el, 'producerMaxTab', 'active', '#producer_tab_content', 'cur', 'producer_tab_cont', '#'+this.elementId, $(el).attr('href'));

    },

    '.producerTab click': function(el, ev){

        ev.preventDefault();

        tab_navigation(el, 'producerTab', 'active', '.producerLangWrap', 'current', 'content_lang', '#'+this.elementId, $(el).attr('href'));

    },

    '.producerForm submit': function(el, ev){
        ev.preventDefault();

        if(el.valid() !== false){
            Producer_model.set_producer(el.serialize(), this.callback('producer_saved'));
        }
    },

    producer_saved: function(response){

        if(response.success == true){

            if (response.message) {
                show_error('Код ошибки:'+response.message);
                return;
            }


            this.id = parseInt(response.data);

            $('.producer_id').val(response.data);
            $('.producerMaxTab').removeClass('disabled');

            if(this.options.full_functionality !== false){

                $(this.options.producer_wrap).controller().load_producers();

            }

            if (!$('#producer_logo_wrap').length) {

                $('#producer_logo_wrap').show();

                this.uploadLogo();
                this.uploadPhoto();

            }

            show_success('Автомодель сохранена!');

        }
        else{
            show_error('Ой что-то пошло не так!');
        }
    },

    uploadLogo: function(){
        this.upload_function('#upl_producer_img', 'logo_controller/set_producer_logo', 'logo');
    },

    logoUploaded: function(data){
        $('#producer_img').html('<img src="'+base_url+'uploads/images/'+data.name+'"><i class="icon-trash menu_icon delete_producer_logo" data-producer_logo_id="'+data.id+'" title="Удалить логотип автомодели"></i>');
    },

    uploadPhoto: function(){
        this.upload_function('#upl_producer_photo', 'photo_controller/set_producer_photo', 'photo');
    },

    photoUploaded: function(data){
        $('#producer_photoes').append('<div class="producer_photo_item"><a rel="producer_photo" class="fany_box_img" href="'+base_url+'uploads/images/'+data.name+'"><img src="'+base_url+'uploads/images/'+data.name+'"/></a><div class="clear"></div><i class="icon-trash menu_icon delete_producer_photo" data-producer_photo_id="'+data.id+'" title="Удалить фотографию автомодели"></i><div class="clear"></div>');
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
                producer_id: obj.id
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

    '.delete_producer_logo click': function(el){
        var id = $(el).data('producer_logo_id'),
        obj = this;

        if(confirm('Вы действительно хотите удалить этот логотип?')){
            Producer_model.delete_logo({
                id: id
            }, function(data){
                obj.logoDeleted(data, el);
            });
        }

    },

    logoDeleted: function(data, el) {

        if (data.success == true) {

            show_success('Логотип удален!');

            $('#producer_img').fadeOut(300, function(){
                $('#producer_img').html('&nbsp;').show();
            });

        } else show_error('Ошибка!');

    },

    '.delete_producer_photo click': function(el){
        var id = $(el).data('producer_photo_id'),
        obj = this;

        if(confirm('Вы действительно хотите удалить фотографию?')){
            Producer_model.delete_photo({
                id: id
            }, function(data){
                obj.photoDeleted(data, el);
            });
        }

    },

    photoDeleted: function(data, el) {

        if (data.success == true) {

            show_success('Фотография удалена!');

            $(el).parents('.producer_photo_item').fadeOut(300, function(){
                $(el).parents('.producer_photo_item').remove();
            });

        } else show_error('Ошибка!');

    }

});