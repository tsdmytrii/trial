$.Controller.extend('Languages',{
    defaults: {
        viewpath:'//components/admin/language/views/',
        lang_id: 2,
        wind_opt: {
            width: 510,
            height: 370,
            minimize: true,
            maximise: true,
            left: '100',
            top: '50',
            resize: true,
            status_bar: true,
            modal: true
        },
        pref: 'ru'
    }

},{
    init:function(selector) {

        this.elementId = this.element.attr('id');

        this.load_languages();

    },

    /*
     * Get lenguages
     */

    load_languages: function(){

        Languages_model.get_all_languages(this.callback('languagesLoaded'));

    },

    languagesLoaded: function(data){

        if (data && !data.message)
            lang = data.data;

        var html = $.View(this.Class.defaults.viewpath+'all_languages.tmpl', {
            our_data: data,
            pref: this.Class.defaults.pref
        });

        $('#'+this.elementId).html(html);

        componentLoaded(this.element);

    },

    /*
     * Set languages
     */

    '.add_language click': function(){

        this.setLanguageCallback(false);

    },

    '.edit_language click': function(el){
        var id = {
            language_id: $(el).parents(".language_icon_wrap").data('language_id')
        };

        Languages_model.get_language(id, this.callback('setLanguageCallback'));
    },

    setLanguageCallback: function(response){

        if (response && response.message) {

            show_error('Код ошибки:'+response.message);

            return;
        }

        var msg;

        if (response && response.data && typeof response.data != 'undefined')
            msg = 'Изменение языка';
        else
            msg = 'Добавление языка';

        loadWindow('language', this.Class.defaults.wind_opt,  msg, $.View(this.Class.defaults.viewpath+'set_language.tmpl', {

            site_url: base_url,
            our_data: response ? response.data : false

        }));

        $('#language_window').language({
            full_functionality:true,
            language_wrap: '#'+this.elementId,
            language_id: response && response.data && typeof response.data != undefined ? response.data.id : false
        });

    },

    /*
     * Delete language
     */

    '.delete_language click': function(el){
        var id = {
            language_id: $(el).parents(".language_icon_wrap").data('language_id')
        },
        obj = this;

        if(confirm('Вы действительно хотите удалить этот язык?')){
            Languages_model.delete_language(id, this.callback('languageDeleted', el));
        }
    },

    languageDeleted: function(el, data){
        if (data.success == true) {

            if (data.message) {

                show_error('Код ошибки: '+data.message);

                return;

            }

            show_success('Deleted');

            el.parents('tr').slideUp(300, function(){
                el.parents('tr').remove();
            });


        } else {
            show_error('Delete error');
        }
    }

});