$.Controller.extend('Automodels',{
    defaults: {
        viewpath:'//components/admin/automodel/views/',
        lang_id: 2,
        wind_opt: {
            width: 960,
            height: 480,
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
    init:function(selector, autobrend_id){

        this.autobrend_id = autobrend_id;

        var container = $('.'+this.Class.fullName.toLowerCase());

        this.elementId = container.attr('id');

        this.load_automodels();
    },

    load_automodels: function(){
        Automodels_model.get_all_automodels({
            autobrend_id: this.autobrend_id
        }, this.callback('automodelsLoaded'));
    },

    automodelsLoaded: function(data) {

        if (data.success) {

            if (data.message) {
                show_error('Код ошибки: '+data.message);
                return;
            }

            var html = $.View(this.Class.defaults.viewpath+'all_automodels.tmpl', {
                our_data: data.data,
                pref: this.Class.defaults.pref
            });

            $('#'+this.elementId+' .automodels_list').html(html).slideDown(300);

        }

        componentLoaded(this.element);
    },

    '.add_automodel click': function(el){

        this.setAutomodelCallback(false);

    },

    '.edit_automodel click': function(el){

        Automodels_model.get_automodel({
            automodel_id: $(el).parents(".autmodel_icon_wrap").data('automodel_id')
        }, this.callback('setAutomodelCallback'));

    },

    setAutomodelCallback: function(response){

        var msg;

        if (response && response.data && typeof response.data != 'undefined')
            msg = 'Изменение автомодели';
        else
            msg = 'Добавление автомодели';

        loadWindow('automodel', this.Class.defaults.wind_opt,  msg, $.View(this.Class.defaults.viewpath+'set_automodel.tmpl', (response && response.data && typeof response.data != 'undefined') ? {

            site_url: base_url,
            autobrend_id: false,
            our_data: response.data

        }: {

            site_url: base_url,
            autobrend_id: this.autobrend_id,
            our_data: false

        } ));

        $('#'+this.elementId).append($('#automodel_window'));

        $('#automodel_window').automodel({
            full_functionality:true,
            automodel_wrap: '#'+this.elementId,
            automodel_id: response && response.data && typeof response.data != 'undefined' ? response.data.id : false
        });

    },

    '.delete_automodel click': function(el){
        var id = {
            automodel_id: $(el).parents(".autmodel_icon_wrap").data('automodel_id')
        },
        obj = this;

        if(confirm('Вы действительно хотите удалить автомодель "'+$(el).parents("tr").find('td:eq(1)').text()+'"?')){
            Automodels_model.delete_automodel(id, function(data){
                obj.automodelDeleted(data, el)
            }, this.callback('error'));
        }
    },

    automodelDeleted: function(data, el){
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