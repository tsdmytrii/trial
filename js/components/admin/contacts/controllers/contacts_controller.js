$.Controller.extend('Contacts',{
    defaults: {
        viewpath:'//components/admin/contacts/views/',
        path_for_uploadify: 'js/resources/plugins/uploadify/',
        lang_id: 2
    }

},{
    init:function(selector, content_id){
        var obj = this;

        this.id = content_id;

        var container = $('.'+this.Class.fullName.toLowerCase());

        this.elementId = container.attr('id');

        Contacts_model.get_contacts({
            contacts_id: this.id
        }, this.callback('contactsGeted'));

    },

    contactsGeted: function(data){

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
        }

        componentLoaded(this.element);

    },

    '.lang_content click': function(el, ev){
        ev.preventDefault();

        tab_navigation(el, 'lang_content', 'active', '#content_lang_wrap', 'current', 'content_lang', '#'+this.elementId);

    },

    'form.contacts_form submit': function(el,ev){
        ev.preventDefault();
        var data;

        this.contacts_validate(el);

        if($(el).valid() == true) {

            data = $(el).serialize();

            Contacts_model.set_contacts(data, this.callback('success_set_component_content'), this.callback('error'));

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

    error: function(response){
        show_error(response.data?response.data:response);
    },

    contacts_validate: function(element){

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
                    maxlength: 5000
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
                    maxlength: "Максимальное количество символов - 5000"
                },
                seo_title: {
                    maxlength: "Максимальное количество символов - 200"
                },
                key_words: {
                    maxlength: "Максимальное количество символов - 500"
                },
                seo_description: {
                    maxlength: "Максимальное количество символов - 1000"
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

    }

}
);