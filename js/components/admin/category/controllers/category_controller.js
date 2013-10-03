$.Controller.extend('Category',{
    defaults: {
        viewpath:'//components/admin/category/views/',
        path_for_uploadify: 'js/resources/plugins/uploadify/',
        lang_id: 2,
        pref: 'ru'
    }

},{
    init:function(selector, data){

        this.elementId = $('.'+this.Class.fullName.toLowerCase()).attr('id');

        this.params = data;

        if (data.edit) {

            this.upload_logo();

        }


    },

    '.categoryForm submit': function(el,ev){
        ev.preventDefault();
        var data;

        this.categoryInfoValidate($('#'+this.elementId+' .categoryInfoForm'));
        this.categoryValidate(el);

        if ($(el).valid() === true && $('#'+this.elementId+' .categoryInfoForm').valid() === true) {

            data = $(el).serialize()+'&'+$('#'+this.elementId+' .categoryInfoForm').serialize();

            Category_model.set_category(data, this.callback('categorySaved'));

        }

    },

    categorySaved: function(data){
        if (data.success) {

            if (data.message) {
                show_error('Код ошибки: '+data.message);
                return;
            }

            show_success('Изменения внесены успешно');

            var callBackString = '$("#'+this.params.elementId+'").'+this.params.className+'("loadCategories")';

            eval(callBackString);

            if (!$('#logo_uploadUploader').length) {
                this.upload_logo();

                this.element.find('.logo').show();
            }

            $('#category_id').val(data.data);

            $('.categoryMaxTab').removeClass('disabled');

        } else {
            show_error('Ошибка');
        }
    },

    /*
     * Images functions
     */

    upload_logo: function(){

        this.upload_function('#logo_upload', 'logo_controller/set_category_img');

    },

    logoUploaded: function(data){

        $('#'+this.elementId+' .categoryImgWrap').show().html('<img src="'+base_url+'uploads/images/'+data.name+'"><div class="clear"></div><i style="margin: 5px auto;" class="icon-trash menu_icon delete_img" data-category_img_id="'+data.id+'" title="Удалить картинку"></i><div class="clear"></div>');

    },

    upload_function: function(selector, upload_method){
        var obj = this;

        $(selector).uploadify({
            'uploader': base_url+obj.Class.defaults.path_for_uploadify+'uploadify.swf',
            'cancelImg': base_url+obj.Class.defaults.path_for_uploadify+'cancel.png',
            'script': base_url+upload_method,
            'scriptData':{
                category_id: $('#'+obj.elementId+' .category_id').val()
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

    '.delete_img click': function(el){
        var id = $(el).attr('data-category_img_id'),
        obj = this;

        if(confirm('Вы действительно хотите удалить эту картинку?')){
            Category_model.delete_img({
                id: id
            }, function(data){
                obj.imgDeleted(data, el);
            });
        }
    },

    imgDeleted: function(data, el) {

        if (data.success == true) {

            show_success('Картинка удалена!');

            $(el).parents('.categoryImgWrap').fadeOut(300, function(){
                $(el).parents('.categoryImgWrap').empty();
            });

        } else show_error('Ошибка!');

    },

    categoryValidate: function(element) {

        $(element).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2,
                    maxlength: 200
                },
                description: {
                    required: true,
                    minlength: 2,
                    maxlength: 2000
                }
            },
            messages: {
                name: {
                    required: 'Это обязательное поле',
                    minlength: "Минимальное количество символов - 2",
                    maxlength: "Максимальное количество символов - 200"
                },
                description: {
                    required: 'Это обязательное поле',
                    minlength: "Минимальное количество символов - 2",
                    maxlength: "Максимальное количество символов - 2000"
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

    categoryInfoValidate: function(element){

        $(element).validate({
            rules: {
                position: {
                    required: true,
                    maxlength: 11
                }
            },
            messages: {
                position: {
                    required: 'Это обязательное поле',
                    maxlength: "Максимальное количество символов - 11"
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
     * Attribute
     */

    '#addAttr click': function(){

        var html = $.View(this.Class.defaults.viewpath+'add_attribute.tmpl', {
            site_url: base_url
        });

        $('#attributesWrap').prepend(html);

    },

    '.attributeTab click': function(el, ev){
        ev.preventDefault();

        tab_navigation(el, 'attributeTab', 'active', '.attributeLangWrap', 'current', 'attribute_content_lang', '#'+$(el).parents('table').attr('id'), $(el).attr('href'));
    },

    '.typeSwitch click': function(el) {

        var $el = $(el),
            val = $el.val();

        if (parseInt(val) === 1) {

            $el.parents('td').find('.typeQualityWrap').hide();
            $el.parents('td').find('.typeNumbWrap').show();

        } else {

            $el.parents('td').find('.typeQualityWrap').show();
            $el.parents('td').find('.typeNumbWrap').hide();

        }


    },

    '.attributeForm submit': function(el,ev){
        ev.preventDefault();
        var data;

        var attrDataForm = $('#'+$(el).parents('table').attr('id')+' .attributeDataForm');

        this.attrDataValidate(attrDataForm);
        this.attrValidate(el);

        if ($(el).valid() === true && attrDataForm.valid() === true) {

            data = $(el).serialize()+'&'+attrDataForm.serialize()+'&category_id='+$('#category_id').val();

            Category_model.set_attribute(data, this.callback('attrSaved', attrDataForm));

        }

    },

    attrSaved: function(el, data){
        if (data.success) {

            if (data.message) {
                show_error('Код ошибки: '+data.message);
                return;
            }

            show_success('Изменения внесены успешно');

            $(el).parents('table').attr('id', 'setAttr_'+data.data);

            if (parseInt(el.find('.typeSwitch').val()) === 2) {

                $('.qualityVariant').show();

            }

        } else {
            show_error('Ошибка');
        }
    },

    '.deleteAttr click': function(el){

        var attrId = $(el).data('attr_id');

        if (confirm('Вы действительно хотите удалить атрибут?'))
           Category_model.delete_attribute(attrId, this.callback('attrDeleted', el));
    },

    attrDeleted: function(el, data){
        if (data.success) {

            if (data.message) {
                show_error('Код ошибки: '+data.message);
                return;
            }

            show_success('Успешно удалено');

            var selector = $(el).parents('table');

            selector.fadeOut(300, function(){
                selector.remove();
            });

        } else {
            show_error('Ошибка');
        }
    },

    attrValidate: function(element) {

        $(element).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2,
                    maxlength: 200
                }
            },
            messages: {
                name: {
                    required: 'Это обязательное поле',
                    minlength: "Минимальное количество символов - 2",
                    maxlength: "Максимальное количество символов - 200"
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

    attrDataValidate: function(element){

        $(element).validate({
            rules: {
                type: {
                    required: true,
                    maxlength: 2
                }
            },
            messages: {
                type: {
                    required: 'Это обязательное поле',
                    maxlength: "Максимальное количество символов - 1"
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
     * Quality Variant
     */

    '.addQualityVariant click': function(el){
        var html = $.View(this.Class.defaults.viewpath+'add_quality_variant.tmpl', {
            lang: lang,
            category_attribute_id: $(el).parents('td').find('.category_attribute_id').val()
        });

        $(el).next().append(html);
    },

    '.qualityVariantTab click': function(el, ev){
        ev.preventDefault();

        tab_navigation(el, 'qualityVariantTab', 'active', '.qualityVariantLangWrap', 'currentElement', 'qualityVariant_content_lang', '#'+$(el).parents('.qualityVatiantForm').attr('id'), $(el).attr('href'));
    },

    '.saveQualityVariant click': function(el) {

        var $el = $(el).parents('.formQualityVatiant');

        this.qualityVariantValidate($el);

        if ($el.valid() === true) {

            Category_model.set_quality_variant($el.serialize(), this.callback('qualityVariantSaved', $el));

        }
    },

    qualityVariantSaved: function(form, response){
        if (response.success === true) {

            if (response.message) {
                show_error('Код ошибки: '+response.message);
                return;
            }

            form.find('.deleteQualityVariant').children('i').removeClass('icon-remove').addClass('icon-trash');

            form.parents('.qualityVariantLangWrap').find('.qualityVariantId').val(response.data.quality_variant_id);

            form.find('.lang_id').val(response.data.quality_variant_lang_id);

            form.attr('id', 'setQualityVariant_'+response.data);

            show_success('Изменения успешно внесены!');

        } else {

            show_error('Возникла неизвестная ошибка!');

        }
    },

    '.deleteQualityVariant click': function(el){

        var $el = $(el);

        if ($el.children('i').hasClass('icon-remove')) {

            $el.parents('.qualityVatiantContent').fadeOut(300, function(){
                $el.parents('.qualityVatiantContent').remove();
            });

        } else {
            if (confirm("Вы действительно хотите удалить атрибут?")) {

                Category_model.delete_quality_variant($el.parents('.qualityVatiantForm').find('.qualityVariantId').val(), this.callback('qualityVariantDeleted', $el));

            }
        }

    },

    qualityVariantDeleted: function($el, response){
        if (response.success === true) {

            if (response.message) {
                show_error('Код ошибки: '+response.message);
                return;
            }

            show_success('Вариант атрибута удален!');

            $el.parents('.qualityVatiantContent').fadeOut(300, function(){
                $el.parents('.qualityVatiantContent').remove();
            });

        } else
            show_error('Возникла неизвестная ошибка!');
    },

    qualityVariantValidate: function(element) {

        $(element).validate({
            rules: {
                value: {
                    required: true,
                    minlength: 2,
                    maxlength: 200
                }
            },
            messages: {
                value: {
                    required: 'Это обязательное поле',
                    minlength: "Минимальное количество символов - 2",
                    maxlength: "Максимальное количество символов - 200"
                }
            },
            highlight: function(element){
                $(element).addClass('error');
            },
            unhighlight: function(element){
                $(element).removeClass('error').next().empty();
            },
            errorPlacement: function(error, element){
                element.next().append(error).animate({
                    opacity: "1"
                }, 1000);
            }
        });

    },

    /*
     * Window manipulation
     */

    '.categoryTab click': function(el, ev){
        ev.preventDefault();

        tab_navigation(el, 'categoryTab', 'active', '.categoryLangWrap', 'current', 'content_lang', '#'+this.elementId, $(el).attr('href'));
    },

    '.categoryMaxTab click': function(el, ev){
        ev.preventDefault();

        tab_navigation(el, 'categoryMaxTab', 'active', '#categoryContent', 'curr', 'categoryWrap', '#'+this.elementId, $(el).attr('href'));
    },

    '.cancel click': function(){
        var selector = $('#set_category_window, .modal-background');

        selector.fadeOut(300, function(){
            selector.remove();
        });
    }
});