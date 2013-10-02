$.Controller.extend('Article',{
    defaults: {
        viewpath:'//components/admin/article/views/',
        path_for_uploadify: 'js/resources/plugins/uploadify/',
        lang_id: 2,
        imgpath: 'uploads/images/',
        upload_function: 'picture_controller/set_article_item_image',
        pref: 'ru'
    }

},{
    init:function(selector){

        this.elementId = this.element.attr('id');

        imperavi($('.content_desc', '#'+this.elementId));
        date_picker($('#date', '#'+this.elementId));
        time_picker($('#time', '#'+this.elementId));

        for (var i = 0, length = lang.length; i < length; i++) {

            $('#name_'+lang[i].iso_code).syncTranslit({destination: 'link_'+lang[i].iso_code, urlSeparator: '_'});

        }

        if (this.options.edit) {
            this.upload_img('#upload_img', this.options.data.id);
        }

        $('.articleItemForm').validate({
            rules: {
                title: {
                    required: true,
                    minlength: 5,
                    maxlength: 500
                },
                author: {
                    required: true,
                    minlength: 2,
                    maxlength: 100
                },
                description: {
                    required: true,
                    minlength: 20,
                    maxlength: 12000
                },
                link: {
                    regexp: '^[a-zA-Z0-9_]+$',
                    unique: true
                },
                key_words: {
                    maxlength: 1000
                },
                seo_description: {
                    maxlength: 4000
                },
                seo_title: {
                    maxlength: 500
                }
            },
            messages: {
                title: {
                    required: 'Это обязательное поле',
                    minlength: "Минимальное количество символов - 5",
                    maxlength: "Максимальное количество символов - 500"
                },
                author: {
                    required: 'Это обязательное поле',
                    minlength: "Минимальное количество символов - 5",
                    maxlength: "Максимальное количество символов - 100"
                },
                description: {
                    required: 'Это обязательное поле',
                    minlength: "Минимальное количество символов - 20",
                    maxlength: "Максимальное количество символов - 12000"
                },
                link: {
                    regexp: 'может состоять только из латинских букв, цифр и знака подчеркивания',
                    unique: 'Такая ссылка уже зарегестрирована'
                },
                key_words: {
                    maxlength: "Максимальное количество символов - 1000"
                },
                seo_description: {
                    maxlength: "Максимальное количество символов - 4000"
                },
                seo_title: {
                    maxlength: "Максимальное количество символов - 500"
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

        $('#articleItemInfoForm').validate({
            rules: {
                date: {
                    required: true,
                    minlength: 8,
                    maxlength: 10
                },
                time: {
                    required: true,
                    minlength: 4,
                    maxlength: 5
                }
            },
            messages: {
                date: {
                    required: 'Это обязательное поле',
                    minlength: "Минимальное количество символов - 8",
                    maxlength: "Максимальное количество символов - 10"
                },
                time: {
                    required: 'Это обязательное поле',
                    minlength: "Минимальное количество символов - 4",
                    maxlength: "Максимальное количество символов - 5"
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

    '.article_lang click': function(el, ev){
        ev.preventDefault();
        tab_navigation(el, 'article_lang', 'active', '.articleLangWrap', 'current', 'content_lang', '#'+this.elementId, el.attr('href'));
    },

    '.articleItemForm submit': function(el,ev){
        ev.preventDefault();
        var data,
            articleItemInfoForm = $('#articleItemInfoForm');

        if($(el).valid() == true && articleItemInfoForm.valid() == true) {

            data = $(el).serialize()+'&'+articleItemInfoForm.serialize();

            Article_model.set_article(data, this.callback('articleSaved', el));

        }

    },

    articleSaved: function(el, data) {
        if (data.success) {

            if (data.message) {

                show_error('Код ошибки: '+data.message);

                return;

            }

            show_success('Изменения внесены успешно');

            $('#article_item_id').val(data.data.article_item_id);

            $(el).find('.lang_id').val(data.data.article_item_lang_id);

            if (data.data.link_id)
                $(el).find('.link_id').val(data.data.link_id);

            $('#'+this.options.elementId).controller().loadArticles();

            //Проверка на существования аплоада
            if (!$('#upload_imgUploader').length)
                this.upload_img('#upload_img', data.data.article_item_id);

        } else {
            show_error('Ошибка');
        }
    },

    '#delete_article_img click': function(el){
        var img_id = {
                id: $(el).attr('data-img_id')
            };

        if(confirm('Вы действительно хотите удалить это изображение?')){
            Article_model.delete_article_img(img_id, this.callback('articleItemImgDeleted', el));
        }
    },

    articleItemImgDeleted: function(el, data){
        if (data.success == true) {
            $('#article_img').fadeOut(300, function(){
                $('#article_img').empty().show();
            });
        } else {
            show_error('Ой-ой что-то пошло не так(((');
        }
    },

    '.cancel click': function(el){
        $(el).parents('.window-container').find('.window-closeButton').click();
    },

    upload_img: function(selector, id){
        var obj = this;

        $(selector).each(function(){
            $(this).uploadify({
                'uploader': base_url+obj.Class.defaults.path_for_uploadify+'uploadify.swf',
                'cancelImg': base_url+obj.Class.defaults.path_for_uploadify+'cancel.png',
                'script': base_url+obj.Class.defaults.upload_function,
                'scriptData':{
                    id: id
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

                    $('#article_img').html('<img src="'+base_url+obj.Class.defaults.imgpath+'/'+resp.data.name+'"/><i class="icon-trash" id="delete_article_img" data-img_id="'+resp.data.id+'"/>');

                },
                'onError': function(errorObj, data){

                    throw_message(errorObj, 'error');
                }
            });
        });

    }

});