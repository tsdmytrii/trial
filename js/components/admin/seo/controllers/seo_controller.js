$.Controller.extend('Seo',{
    defaults: {
        viewpath:'//components/admin/seo/views/',
        lang_id: 2,
        pref: 'ru'
    }

},{
    init:function(selector){
        this.elementId = $('.'+this.Class.fullName.toLowerCase()).attr('id');

        Seo_model.get_seo(this.callback('success_get_seo'), this.callback('error'));
    },

    success_get_seo: function(data){

        if (data && data.message) {
            show_error('Код ошибки: '+data.message);
        } else {
            var html = $.View(this.Class.defaults.viewpath+'index.tmpl', {
                our_data: data ? data.data : data
            });

            this.element.html(html);
        }

        componentLoaded(this.element);
    },

    '.seo_lang click': function(el, ev){
        ev.preventDefault();
        tab_navigation(el, 'seo_lang', 'active', '#seo_lang_wrap', 'current', 'content_lang', '#'+this.elementId, $(el).attr('href'));
    },

    'form.set_seo submit': function(el,ev){
        ev.preventDefault();

        this.seo_validate(el);

        if($(el).valid() === true) {
            Seo_model.set_seo($(el).serialize(), this.callback('success_set_component_content'), this.callback('error'));
        }

    },

    success_set_component_content: function(data){
        if (data.success) {

            show_success('Изменения внесены успешно');

        } else {

            show_error('Ошибка');

        }

    },

    error: function(response){
        show_error(response.data?response.data:response);
    },

    seo_validate: function(element){

        $(element).validate({
            rules: {
                title: {
                    required: true,
                    minlength: 5,
                    maxlength: 500
                },
                description: {
                    required: true,
                    minlength: 20,
                    maxlength: 1000
                },
                key_words: {
                    required: true,
                    minlength: 5,
                    maxlength: 500
                }
            },
            messages: {
                title: {
                    required: 'Это обязательное поле',
                    minlength: "Минимальное количество символов - 5",
                    maxlength: "Максимальное количество символов - 500"
                },
                description: {
                    required: 'Это обязательное поле',
                    minlength: "Минимальное количество символов - 20",
                    maxlength: "Максимальное количество символов - 1000"
                },
                key_words: {
                    required: 'Это обязательное поле',
                    minlength: "Минимальное количество символов - 5",
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

});