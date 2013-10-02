$.Controller.extend('Placeholders',{
    defaults: {
        viewpath:'//components/admin/placeholder/views/',
        lang_id: 2,
        pref: 'ru'
    },
    wind_opt: {
        width: 720,
        height: 480,
        minimize: true,
        maximise: true,
        left: '100',
        top: '100',
        resize: true,
        status_bar: true,
        modal: true
    }

},{

    init:function(selector){

        this.elementId = $('.'+this.Class.fullName.toLowerCase()).attr('id');

        this.loadPlaceholders();

    },

    loadPlaceholders: function(){

        Placeholders_model.get_placeholders(this.callback('placeholderLoaded'));

    },

    placeholderLoaded: function(data){

        var html = $.View(this.Class.defaults.viewpath+'get_placeholders.tmpl', {
            our_data: data ? data.data : data
        });

        this.element.html(html);

        componentLoaded(this.element);

    },

    '#addPlaceholder click': function(){

        this.setPlaceholderCallback(false);

    },

    '.editPlaceholder click': function(el){
        var id = $(el).parents('.placeholder_icon_wrap').data('placeholder_id');

        Placeholders_model.get_placeholder(id, this.callback('setPlaceholderCallback'));

    },

    setPlaceholderCallback: function(data){

        if (data && data.message) {
            show_error('Код ошибки: '+data.message);
            return;
        }

        var html = $.View(this.Class.defaults.viewpath+'set_placeholder.tmpl', {
            our_data: data ? data.data : false,
            lang: lang
        }),
            obj = this;

        loadWindow('set_placeholder', Placeholders.wind_opt, 'Задать блок', html);

        $('#set_placeholder_window').placeholder({
            elementId: obj.elementId,
            className: this.Class.fullName.toLowerCase()
        });

    },

    '.deletePlaceholder click': function(el){
        var id = $(el).parents('.placeholder_icon_wrap').data('placeholder_id');

        if (confirm('Вы действительно хотите удалить этот блок?')){
            Placeholders_model.delete_placeholder(id, this.callback('placeholderDeleted', el));
        }
    },

    placeholderDeleted: function(el, data) {

        if (data.success === true) {

            if (data && data.message) {
                show_error('Код ошибки: '+data.message);
                return;
            }

            show_success('Блок удален!');

            var selector = $(el).parents('tr');

            selector.fadeOut(300, function(){
                selector.remove();
            });

        } else
            show_error('Неизвестаня ошибка!');

    }

}
);