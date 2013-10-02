/*
 * Class Staticcomp 
 */
$.Controller.extend('Staticcomp',{
    defaults: {
        viewpath:'//components/admin/static/views/',
        path_for_uploadify: 'js/resources/plugins/uploadify/',
        lang_id: 2
    }

},{
    /*
     * Init function of staticcomp_contrller 
     * 
     *  Remeber coponent_type_id, content_id and id of the container.
     *  Calls model method for load static component by id 
     */
    init:function(selector, content_id, component_type_id){
        var obj = this;

        this.component_type_id = component_type_id;

        this.id = content_id;

        var container = $('.'+this.Class.fullName.toLowerCase());

        this.elementId = container.attr('id');

        Static_model.get_static({
            static_component_id: this.id
        }, this.callback('success_get_static'), this.callback('error'));

    },

/*
 * Result handler for Static_model.get_static()
 * 
 * Checks for errors. Create html view. Insert html vies into container after.
 * Adds imperavi(text editor) and date_picker(calendar) plugings. 
 */
    success_get_static: function(data){

        if (data.message) {

            show_error('Код ошибки: '+data.message);

        } else {

            var html = $.View(this.Class.defaults.viewpath+'index.tmpl', {
                our_data: data.data,
                content_id: this.id,
                site_url: base_url,
                element_id: this.elementId
            });

            $('#'+this.elementId).html(html);
            imperavi($('.content_desc'));
            date_picker($('#date'));

        }

        componentLoaded(this.element);

    },

/*
 * .delete_file click handler
 * 
 * Calls model's delete method 
 */
    '.delete_file click': function(el){
        var id = $(el).attr('data-file_id'),
        obj = this;

        if(confirm('Вы действительно хотите удалить файл '+$(el).next().find('.file-text').text()+'?')){
            Static_model.delete_file({
                file_id: id
            }, function(data){
                obj.success_delete_file(data, el);
            }, obj.callback('error'));
        }

    },

/*
 * Deletes component from DOM
 */
    success_delete_file: function(data, el){
        $(el).parents('li').slideUp(300, function(){
            $(el).parents('li').remove();
        });
    },

    '.article_lang click': function(el, ev){
        ev.preventDefault();

        tab_navigation(el, 'article_lang', 'active', '#content_lang_wrap', 'current', 'content_lang', '#'+this.elementId, $(el).attr('href'));

    },

/*
 * form.static_comp_form submit handler
 * 
 * Validates data from from. If valid, calls model's metod for set static
 * component. Callack after.
 */
    'form.static_comp_form submit': function(el,ev){
        ev.preventDefault();
        var data;

        this.static_comp_validate(el);

        if($(el).valid() == true) {

            data = $(el).serialize();
            data = data+'&component_type_id='+this.component_type_id+'&date='+$('#date').val()+'&static_component_id='+$('#static_component_id', '#'+this.elementId).val();
            Static_model.set_static_component(data, this.callback('success_set_component_content', el), this.callback('error'));

        }
    },

/*
 * Static_model.set_static_component() result handler
 * 
 * Checks for errors. If link_id exists - set it.
 */
    success_set_component_content: function(el, data){
        if (data.success) {

            if (data.message) {

                show_error('Код ошибки: '+data.message);

            } else {

                show_success('Изменения внесены успешно');

                if (data.data.link_id)
                    $(el).find('.link_id').val(data.data.link_id);

            }

        } else {
            show_error('Ошибка');
        }
    },

/*
 * Show error on set static component
 */
    error: function(response){
        show_error(response.data?response.data:response);
    },

/*
 * satic component validation
 */
    static_comp_validate: function(element){

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
                link: {
                    regexp: '^[a-zA-Z0-9_]+$',
                    maxlength: 100,
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
                    regexp: 'Может состоять только из латинских букв, цифр и знака подчеркивания',
                    maxlength: 'Максимальное количество символов - 100',
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

            errorPlacement: function(error, element){
                element.next().append(error).animate({
                    opacity: "1"
                }, 1000);
            }
        });

    }

}
);