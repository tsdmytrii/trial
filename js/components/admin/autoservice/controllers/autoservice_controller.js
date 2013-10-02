$.Controller.extend('Autoservice',{
    defaults: {
        viewpath:'//components/admin/autoservice/views/',
        path_for_uploadify: 'js/resources/plugins/uploadify/',
        lang_id: 2
    }

},{
    init:function(selector, content_id){

        this.id = content_id;

        var container = $('.'+this.Class.fullName.toLowerCase());

        this.elementId = container.attr('id');

        Autoservice_model.get_autoservice({
            autoservice_id: this.id
        }, this.callback('success_get_autoservice'));

    },

    success_get_autoservice: function(data){

        if (data && data.message) {
            show_error('Код ошибки: '+data.message);
        } else {

            var html = $.View(this.Class.defaults.viewpath+'index.tmpl', {
                our_data: data.data,
                content_id: this.id,
                site_url: base_url,
                element_id: this.elementId
            }),
            obj = this;

            $('#'+this.elementId).html(html);
            imperavi($('.content_desc'));
            date_picker($('#date'));
            this.upload_picture();

            $("#picture_drag_list_wrap").dragsort({
                dragSelector: "img",
                dragEnd: obj.saveOrder(),
                dragBetween: true,
                placeHolderTemplate: "<li class='picture_item'></li>"
            });

        }

        componentLoaded(this.element);

    },

    saveOrder: function () {

        var data = $("#"+this.elementId+" .picture_item").map(function() {
            return $(this).attr('data-index');
        }).get();

        $("input[name=list1SortOrder]").val(data.join("|"));

    },

    '.lang_content click': function(el, ev){
        ev.preventDefault();

        tab_navigation(el, 'lang_content', 'active', '#content_lang_wrap', 'current', 'content_lang', '#'+this.elementId);

    },

    'form.autoservice_form submit': function(el,ev){
        ev.preventDefault();
        var data;

        this.autoservice_validate(el);

        if($(el).valid() == true) {

            data = $(el).serialize();
            data = data+'&autoservice_id='+$('#autoservice_id', '#'+this.elementId).val();
            Autoservice_model.set_autoservice(data, this.callback('success_set_component_content'));

        }
    },

    success_set_component_content: function(data){
        if (data.success) {

            if (data.message) {
                show_error('Код ошибки: '+data.message);
            } else {
                show_success('Изменения внесены успешно');
            }

        } else {
            show_error('Ошибка');
        }
    },

    '#saveOrder click':function(){
        var order = new Array();

        $.each($('.picture_item'), function(i){
            order[i] = {};
            order[i].id = parseInt($(this).attr('data-picture_id'));
            order[i].position = $(this).attr('data-itemidx');
        });

        if (order.length) {

            Autoservice_model.set_picture_order({
                order: order
            }, this.callback('orderSaved'));

        }

    },

    orderSaved:function(data){
        if (data.success)

            if (data.message)
                show_error('Код ошибки: '+data.message);
            else
                show_success('Order is saved');

        else
            show_error('Smth went wrong');
    },

    '.delete_picture click': function(el){
        var id = $(el).attr('data-picture_id'),
        obj = this;

        if(confirm('Вы действительно хотите удалить эту картинку?')){
            Autoservice_model.delete_picture({
                id: id
            }, this.callback('pictureDeleted', el));
        }

    },

    pictureDeleted: function(el, data) {

        if (data.success) {

            show_success('Картинка удалена!');

            $(el).parents('.picture_item').fadeOut(300, function(){
                $(el).parents('.picture_item').remove();
            });

        } else show_error('Ошибка!');

    },

    upload_picture: function(){
        this.upload_function('#picture_upload_'+this.elementId, 'picture_controller/set_autoservice_bg_picture');
    },

    pictureUploaded: function(data){
        $('#picture_list_wrap .clear:last', '#'+this.elementId).before('<div style="display: none;" class="picture_item"><img src="'+base_url+'uploads/images/'+data.name+'"><div class="clear"></div><i data-picture_id="'+data.id+'" class="icon-trash menu_icon delete_picture" style="margin: 5px auto;"></i></div>');
        $('#picture_list_wrap .picture_item:last', '#'+this.elementId).fadeIn(300);
    },

    upload_function: function(selector, upload_method){
        var obj = this;

        $(selector).uploadify({
            'uploader': base_url+obj.Class.defaults.path_for_uploadify+'uploadify.swf',
            'cancelImg': base_url+obj.Class.defaults.path_for_uploadify+'cancel.png',
            'script': base_url+upload_method,
            'scriptData':{
                autoservice_id: obj.id
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

                obj.pictureUploaded(resp);

            //                $('.files_list').append('<li><i title="Delete file" class="icon-trash menu_item_icon delete_file" data-file_id="'+resp.file.id+'"></i><a href="'+base_url+resp.file.directory+'/'+resp.file.name+'" class="'+resp.file.type+' file-icon" target="_blank"><span class="file-icon"></span><span class="file-text">'+resp.file.short_description+'.'+resp.file.type+'</span></a></li>');
            },
            'onError': function(errorObj, data){
                throw_message(errorObj, 'error');
            }
        });
    },

    error: function(response){

        show_error(response.data?response.data:response);

    },

    autoservice_validate: function(element){

        $(element).validate({
            rules: {
                title: {
                    required: true,
                    minlength: 5,
                    maxlength: 500
                },
                author: {
                    required: true,
                    minlength: 5,
                    maxlength: 100
                },
                description: {
                    required: true,
                    minlength: 20,
                    maxlength: 12000
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

            errorPlacement: function(error, element){
                element.next().append(error).animate({
                    opacity: "1"
                }, 1000);
            }
        });

    }

}
);