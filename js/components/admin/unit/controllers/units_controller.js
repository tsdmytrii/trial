$.Controller.extend('Units',{
    defaults: {
        viewpath:'//components/admin/unit/views/',
        lang_id: 2,
        wind_opt: {
            width: 580,
            height: 490,
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

        this.load_units();

    },

    load_units: function(){

        Units_model.get_all_units(this.callback('unitsLoaded'));

    },

    unitsLoaded: function(data){

        var html = $.View(this.Class.defaults.viewpath+'all_units.tmpl', {
            our_data: data,
            pref: this.Class.defaults.pref
        });

        $('#'+this.elementId).html(html);

        componentLoaded(this.element);

    },

    '.add_unit click': function(el){

        this.setUnitCallback(false);

    },

    '.edit_unit click': function(el){
        var id = {
            unit_id: $(el).parents(".unit_icon_wrap").data('unit_id')
        };

        Units_model.get_unit(id, this.callback('setUnitCallback'));
    },

    setUnitCallback: function(response){

        if (response && response.message) {

            show_error('Код ошибки:'+response.message);

            return;
        }

        var msg;

        if (response && response.data && typeof response.data != 'undefined')
            msg = 'Изменение еденицы измерения';
        else
            msg = 'Добавление еденицы измерения';

        loadWindow('unit', this.Class.defaults.wind_opt,  msg, $.View(this.Class.defaults.viewpath+'set_unit.tmpl', {

            site_url: base_url,
            our_data: response ? response.data : false

        }));

        $('#unit_window').unit({
            full_functionality:true,
            unit_wrap: '#'+this.elementId,
            unit_id: response && response.data && typeof response.data != 'undefined' ? response.data.id : false
        });

    },

    '.delete_unit click': function(el){
        var id = {
            unit_id: $(el).parents(".unit_icon_wrap").data('unit_id')
        },
        obj = this;

        if(confirm('Вы действительно хотите удалить эту еденицу измерения?')){
            Units_model.delete_unit(id, this.callback('unitDeleted', el));
        }
    },

    unitDeleted: function(el, data){
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