/*
 * Product controller 
 * 
 * 
 */
$.Controller.extend('Product',{
    defaults: {
        viewpath:'//components/admin/product/views/',
        path_for_uploadify: 'js/resources/plugins/uploadify/',
        lang_id: 2,
        upload_logo: 'product_img_controller/upload_logo',
        pref: 'ru'
    }

},{

    init: function(element, options) {

        var container = $('.' + this.Class.fullName.toLowerCase());

        this.elementId = container.attr('id');

        if (typeof this.options.full_functionality == 'undefined') {
            this.options.full_functionality = false;
        }

        if (this.options.product_id != false) {

            this.id = parseInt(this.options.product_id);

            this.uploadLogo();
           
            if (this.options.our_data.category !== undefined)
                this.attributesGeted(this.options.our_data.category);

        }

        $('.productForm').validate({
            rules: {
                name: {
                    minlength: 2,
                    maxlength: 200,
                    required: true
                },
                description: {
                    minlength: 5,
                    maxlength: 2000,
                    required: true
                }
            },
            messages: {
                name: {
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

        $('#productDataForm').validate({
            rules: {
                price: {
                    maxlength: 11,
                    required: true
                },
                discount_price: {
                    maxlength: 11
                },
                quantity: {
                    maxlength: 11,
                    required: true
                }
            },
            messages: {
                price: {
                    maxlength: 'Максимальное количество символов - 11',
                    required: 'Это обязательное поле'
                },
                discount_price: {
                    maxlength: 'Максимальное количество символов - 11',
                },
                quantity: {
                    maxlength: 'Максимальное количество символов - 11',
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

        this._producer_autocomplete();

        if ($('.product_id').val().length > 0) {
            $('.productMaxTab').removeClass('disabled');
        }
    },

    /*
     * Window manipulation
     */

    '.cancel click': function() {
        var selector = $('#product_window, .modal-background');

        selector.fadeOut(300, function() {
            selector.remove();
        });
    },

    '.productMaxTab click': function(el, ev) {

        ev.preventDefault();

        tab_navigation(el, 'productMaxTab', 'active', '#product_tab_content', 'cur', 'product_tab_cont', '#' + this.elementId, $(el).attr('href'));

    },

    '.productTab click': function(el, ev) {

        ev.preventDefault();

        tab_navigation(el, 'productTab', 'active', '.productLangWrap', 'current', 'content_lang', '#' + this.elementId, $(el).attr('href'));

    },

    /*
     * Save Product
     */

    '.productForm submit': function(el, ev) {
        ev.preventDefault();

        var $dataForm = $('#productDataForm');

        if (el.valid() !== false && $dataForm !== false) {
            Product_model.set_product(el.serialize() + '&' + $dataForm.serialize(), this.callback('product_saved', el));
        }
    },

    product_saved: function(form, response) {

        if (response.success == true) {

            if (response.message) {
                show_error('Код ошибки: '+response.message);
                return;
            }

            this.id = parseInt(response.data.product_id);

            $('.product_id').val(response.data.product_id);

            form.find('.lang_id').val(response.data.product_lang_id);

            $('.productMaxTab').removeClass('disabled');

            var callBackString = '$("#' + this.options.elementId + '").' + this.options.className + '("loadProducts", 0, true)';

            eval(callBackString);

            $('#product_logo_wrap').show();

            if (!$('#upl_product_imgUploader').length) {
                this.uploadLogo();
            }

            show_success('Продукт сохранен!');

        }
        else {
            show_error('Ой что-то пошло не так!');
        }
    },

    /*
     * Category functions
     */

     '#addProductCategory click': function() {

        var html = $.View(this.Class.defaults.viewpath + 'add_category.tmpl', {
            categories: this.options.sortedCategories,
            pref: this.Class.defaults.pref
        });

        $('.productCategoryContent').append(html);

    },

     '.saveCategory click': function(el){

        Product_model.set_category($(el).parents('.categoryForm').serialize() + '&product_id='+this.id, this.callback('categorySaved', $(el).parents('.categoryForm')));

     },

     categorySaved: function(form, data) {

        if (data.success === true) {

            if (data.message) {
                show_error('Код ошибки: '+data.message);
                return;
            }

            form.find('.deleteCategory').children('i').removeClass('icon-remove').addClass('icon-trash');

            form.find('.saveCategory').remove();

            form.find('.categoryId').attr('readonly', 'readonly');

            show_success('Категория сохранена!');

            Product_model.get_attribute_values({product_id: this.id}, this.callback('attributesGeted'));

            var callBackString = '$("#' + this.options.elementId + '").' + this.options.className + '("loadProducts", 0, true)';

            eval(callBackString);

        } else {

            show_error('Ой что-то пошло не так!');

        }

     },

     '.deleteCategory click': function(el) {
        var $el = $(el);

        if ($el.children('i').hasClass('icon-remove')) {

            $el.parents('.categoryForm').fadeOut(300, function(){
                $el.parents('.categoryForm').remove();
            });

        } else {
            if (confirm("Вы действительно хотите удалить категорию?")) {

                Product_model.delete_category({
                    category_id: $el.parents('.categoryForm').find('.categoryId').val(),
                    product_id: this.id
                }, this.callback('categoryDeleted', $el));

            }
        }
     },

     categoryDeleted: function($el, response){
        if (response.success === true) {

            if (response.message) {
                show_error('Код ошибки: '+response.message);
                return;
            }

            show_success('Категория удалена!');

            $el.parents('.categoryForm').fadeOut(300, function(){
                $el.parents('.categoryForm').remove();
            });

            Product_model.get_attribute_values({product_id: this.id}, this.callback('attributesGeted'));

        } else
            show_error('Возникла неизвестная ошибка!');
     },

     /*
      * Category value functions
      */

    attributesGeted: function(data) {

        if (data.success !== undefined) {
            data = data.data;
        }

        var html = $.View(this.Class.defaults.viewpath + 'attribute_values.tmpl', {
            categories: data,
            pref: this.Class.defaults.pref
        });

        $('#attributeValues').html(html);
    },

    '.attributeValueForm submit': function(el, ev) {
        ev.preventDefault();
        var $el = $(el),
            value = $el.find('.quantityValue');

        if (value.length) {

            var min = value.data('min'),
                max = value.data('max');

            if ((min !== '' || min >= 0) && (max !== '' || max >= 0)) {

                if (value.val() >= min && value.val() <= max) {

                    Product_model.set_attribute_value($el.serialize() + '&product_id='+this.id, this.callback('attributeValueSaved', $el));

                } else {

                    alert('Значение атрибута должно быть в пределах от "'+min+'" до "'+max+'"');

                }

            }

        } else {

            Product_model.set_attribute_value($el.serialize() + '&product_id='+this.id, this.callback('attributeValueSaved', $el));

        }
    },

    attributeValueSaved: function(el, data) {

        if (data.success === true) {

            if (data.message) {
                show_error('Код ошибки: '+data.message);
                return;
            }

            show_success('Значение сохранено!');

            var id = el.find('.productQuantityValId');

            if (id.length) {

                id.val(data.data);

            }

        } else {

            show_error('Ой что-то пошло не так!');

        }

    },

    /*
     * Logo functions
     */

    uploadLogo: function(){
        this.upload_function('#upl_product_img', 'logo_controller/set_product_logo', 'logo');
    },

    logoUploaded: function(data){
        $('#product_img').html('<img src="'+base_url+'uploads/images/'+data.name+'"><i class="icon-trash menu_icon delete_product_logo" data-product_logo_id="'+data.id+'" title="Удалить логотип автомодели"></i>');

        var callBackString = '$("#' + this.options.elementId + '").' + this.options.className + '("loadProducts")';

        eval(callBackString);
    },

    '.delete_product_logo click': function(el){
        var id = $(el).data('product_logo_id'),
        obj = this;

        if(confirm('Вы действительно хотите удалить этот логотип?')){
            Product_model.delete_logo({
                id: id
            }, function(data){
                obj.logoDeleted(data, el);
            });
        }

    },

    logoDeleted: function(data, el) {

        if (data.success == true) {

            show_success('Логотип удален!');

            $('#product_img').fadeOut(300, function(){
                $('#product_img').html('&nbsp;').show();
            });

        } else show_error('Ошибка!');

    },

    upload_function: function(selector, upload_method, callback){
        var obj = this;

        $(selector).uploadify({
            'uploader': base_url+obj.Class.defaults.path_for_uploadify+'uploadify.swf',
            'cancelImg': base_url+obj.Class.defaults.path_for_uploadify+'cancel.png',
            'script': base_url+upload_method,
            'scriptData':{
                product_id: obj.id
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
                } 
            },
            'onError': function(errorObj, data){
                throw_message(errorObj, 'error');
            }
        });
    },

    _producer_autocomplete: function() {

        $('#producerName').autocomplete({
            serviceUrl: base_url + 'admin/producer_controller/producer_autocomplete', // Страница для обработки запросов автозаполнения
            minChars: 2, // Минимальная длина запроса для срабатывания автозаполнения
            //            delimiter: /(,|;)\s*/, // Разделитель для нескольких запросов, символ или регулярное выражение
            maxHeight: 400, // Максимальная высота списка подсказок, в пикселях
            width: 300, // Ширина списка
            zIndex: 19999, // z-index списка
            deferRequestBy: 300, // Задержка запроса (мсек), на случай, если мы не хотим слать миллион запросов, пока пользователь печатает. Я обычно ставлю 300.
            onSelect: function(data, value, element) {

                $(element).next().val(value);

            } // Callback функция, срабатывающая на выбор одного из предложенных вариантов,
            //            lookup: ['January', 'February', 'March'] // Список вариантов для локального автозаполнения
        });

    }

});