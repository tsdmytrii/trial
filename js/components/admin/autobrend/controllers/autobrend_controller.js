$.Controller.extend('Autobrend',{
    defaults: {
        viewpath:'//components/admin/autobrend/views/',
        path_for_uploadify: 'js/resources/plugins/uploadify/',
        lang_id: 2
    }

},{
    init:function(selector, content_id){

        this.id = content_id;

        var container = $('.'+this.Class.fullName.toLowerCase());

        this.elementId = container.attr('id');

        this.load_autobrend();

    },

    load_autobrend: function(){
        Autobrend_model.get_autobrend({
            autobrend_id: this.id
        }, this.callback('success_get_autobrend'), this.callback('error'));
    },

    success_get_autobrend: function(data){

        if (data && data.message) {
            show_error('Код ошибки: '+data.message);
            return;
        }

        var html = $.View(this.Class.defaults.viewpath+'index.tmpl', {
            our_data: data.data,
            content_id: this.id,
            site_url: base_url,
            element_id: this.elementId
        });

        $('#'+this.elementId).html(html);

        var  componentObject = jlinq.from(component_types).equals("id", 29).select()[0],
        obj = this;

        steal(componentObject.admin_client_controller).then(function(){

            var clientController = componentObject.name;
            clientController = clientController.substr(0, 1).toUpperCase()+clientController.substr(1, clientController.length-1);

            var controllerOnFlight = clientController+".extend('"+clientController+obj.id+"',{},{})";
            eval(controllerOnFlight);

            var initComponentString = '$("#automodels_'+obj.id+'").'+componentObject.name+obj.id+'('+obj.id+');';

            eval(initComponentString);

        });

        imperavi($('.content_desc'));
        this.upload_logo();
        this.upload_autologo();
        this.upload_picture();

        componentLoaded(this.element);
    },

    '.delete_logo click': function(el){
        var id = $(el).attr('data-logo_id'),
        obj = this;

        if(confirm('Вы действительно хотите удалить этот логотип?')){
            Autobrend_model.delete_logo({
                id: id
            }, function(data){
                obj.logoDeleted(data, el);
            }, obj.callback('error'));
        }

    },

    logoDeleted: function(data, el) {

        if (data.success == true) {

            show_success('Логотип удален!');

            $(el).parents('.logo_item').fadeOut(300, function(){
                $(el).parents('.logo_item').remove();
            });

        } else show_error('Ошибка!');

    },

    '.delete_autologo click': function(el){
        var id = $(el).attr('data-logo_id'),
        obj = this;

        if(confirm('Вы действительно хотите удалить этот логотип?')){
            Autobrend_model.delete_autologo({
                id: id
            }, function(data){
                obj.autologoDeleted(data, el);
            }, obj.callback('error'));
        }

    },

    autologoDeleted: function(data, el) {

        if (data.success === true) {

            show_success('Логотип удален!');

            $(el).parents('.autologo_item').fadeOut(300, function(){
                $(el).parents('.autologo_item').remove();
            });

        } else show_error('Ошибка!');

    },

    '.delete_picture click': function(el){
        var id = $(el).attr('data-picture_id'),
        obj = this;

        if(confirm('Вы действительно хотите удалить эту картинку?')){
            Autobrend_model.delete_picture({
                id: id
            }, function(data){
                obj.pictureDeleted(data, el);
            }, obj.callback('error'));
        }

    },

    pictureDeleted: function(data, el) {

        if (data.success == true) {

            show_success('Картинка удалена!');

            $(el).parents('.picture_item').fadeOut(300, function(){
                $(el).parents('.picture_item').remove();
            });

        } else show_error('Ошибка!');

    },

    success_delete_file: function(data, el){
        $(el).parents('li').slideUp(300, function(){
            $(el).parents('li').remove();
        });
    },

    '.lang_content click': function(el, ev){
        ev.preventDefault();

        tab_navigation(el, 'lang_content', 'active', '#content_lang_wrap', 'current', 'content_lang', '#'+this.elementId);

    },

    '.tab click': function(el, ev){
        ev.preventDefault();

        tab_navigation(el, 'tab', 'active', '#autobrend_wrap', 'act', 'tab_cont', '#'+this.elementId);

    },

    'form.autobrend_form submit': function(el,ev){
        ev.preventDefault();
        var data;

        this.autobrend_validate(el);

        if($(el).valid() == true) {

            data = $(el).serialize();
            data = data+'&autobrend_id='+$('#autobrend_id', '#'+this.elementId).val()+'&price='+$('.price', '#'+this.elementId).val();
            Autobrend_model.set_autobrend(data, this.callback('success_set_content'), this.callback('error'));

        }
    },

    success_set_content: function(data){
        if (data.success) {

            if (data.message) {
                show_error('Код ошибки: '+data.message);
                return;
            }

            show_success('Изменения внесены успешно');

        } else {
            show_error('Ошибка');
        }
    },

    upload_logo: function(){
        this.upload_function('#logo_upload_'+this.elementId, 'logo_controller/set_logo_image', 'logo');
    },

    logoUploaded: function(data){
        $('#logo_list_wrap .clear:last', '#'+this.elementId).before('<div style="display: none;" class="logo_item"><img src="'+base_url+'uploads/images/'+data.name+'"><div class="clear"></div><i data-logo_id="'+data.id+'" class="icon-trash menu_icon delete_logo" style="margin: 5px auto;"></i></div>');
        $('#logo_list_wrap .logo_item:last', '#'+this.elementId).fadeIn(300);
    },

    upload_autologo: function(){
        this.upload_function('#autologo_upload_'+this.elementId, 'logo_controller/set_autologo_image', 'autologo');
    },

    autologoUploaded: function(data){
        $('#autologo_list_wrap .clear:last', '#'+this.elementId).before('<div style="display: none;" class="autologo_item"><img src="'+base_url+'uploads/images/'+data.name+'"><div class="clear"></div><i data-logo_id="'+data.id+'" class="icon-trash menu_icon delete_autologo" style="margin: 5px auto;"></i></div>');
        $('#autologo_list_wrap .autologo_item:last', '#'+this.elementId).fadeIn(300);
    },

    upload_picture: function(){
        this.upload_function('#picture_upload_'+this.elementId, 'picture_controller/set_picture', 'picture');
    },

    pictureUploaded: function(data){
        $('#picture_list_wrap .clear:last', '#'+this.elementId).before('<div style="display: none;" class="picture_item"><img src="'+base_url+'uploads/images/'+data.name+'"><div class="clear"></div><i data-picture_id="'+data.id+'" class="icon-trash menu_icon delete_picture" style="margin: 5px auto;"></i></div>');
        $('#picture_list_wrap .picture_item:last', '#'+this.elementId).fadeIn(300);
    },

    upload_function: function(selector, upload_method, callback){
        var obj = this;

        $(selector).uploadify({
            'uploader': base_url+obj.Class.defaults.path_for_uploadify+'uploadify.swf',
            'cancelImg': base_url+obj.Class.defaults.path_for_uploadify+'cancel.png',
            'script': base_url+upload_method,
            'scriptData':{
                autobrend_id: obj.id
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

                switch(callback) {
                    case 'logo':
                        obj.logoUploaded(resp);
                        break;
                    case 'autologo':
                        obj.autologoUploaded(resp);
                        break;
                    case 'picture':
                        obj.pictureUploaded(resp);
                        break;

                }

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

    autobrend_validate: function(element){

        $(element).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 3,
                    maxlength: 40
                },
                description: {
                    required: true,
                    minlength: 10,
                    maxlength: 3000
                },
                moto: {
                    maxlength: 200
                },
                baner_name: {
                    maxlength: 200
                },
                key_words: {
                    maxlength: 500
                },
                seo_description: {
                    maxlength: 1000
                },
                seo_title: {
                    maxlength: 200
                }
            },
            messages: {
                name: {
                    required: 'Это обязательное поле',
                    minlength: "Минимальное количество символов - 3",
                    maxlength: "Максимальное количество символов - 40"
                },
                description: {
                    required: 'Это обязательное поле',
                    minlength: "Минимальное количество символов - 10",
                    maxlength: "Максимальное количество символов - 3000"
                },
                moto: {
                    maxlength: "Максимальное количество символов - 200"
                },
                baner_name: {
                    maxlength: "Максимальное количество символов - 200"
                },
                key_words: {
                    maxlength: "Максимальное количество символов - 500"
                },
                seo_description: {
                    maxlength: "Максимальное количество символов - 1000"
                },
                seo_title: {
                    maxlength: "Максимальное количество символов - 200"
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