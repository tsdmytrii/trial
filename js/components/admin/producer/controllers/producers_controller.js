$.Controller.extend('Producers',{
    defaults: {
        viewpath:'//components/admin/producer/views/',
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
    init:function(selector) {

        this.elementId = this.element.attr('id');

        this.load_producers();

    },

    load_producers: function(){

        Producers_model.get_all_producers(this.callback('producersLoaded'));

    },

    producersLoaded: function(data){

        if (data.message) {

            show_error('Код ошибки: '+data.message);

        } else {

            var html = $.View(this.Class.defaults.viewpath+'all_producers.tmpl', {
                our_data: data.data,
                pref: this.Class.defaults.pref
            });

            $('#'+this.elementId).html(html);

        }

        componentLoaded(this.element);

    },

    '.add_producer click': function(el){

        this.setProducerCallback(false);

    },

    '.edit_producer click': function(el){
        var id = {
            producer_id: $(el).parents(".producer_icon_wrap").data('producer_id')
        };

        Producers_model.get_producer(id, this.callback('setProducerCallback'));
    },

    setProducerCallback: function(response){

        if (response && response.message) {
            show_error('Код ошибки:'+response.message);
            return;
        }

        var msg;

        if (response && response.data && typeof response.data != 'undefined')
            msg = 'Изменение автомодели';
        else
            msg = 'Добавление автомодели';

        loadWindow('producer', this.Class.defaults.wind_opt,  msg, $.View(this.Class.defaults.viewpath+'set_producer.tmpl', {

            site_url: base_url,
            our_data: response ? response.data : false

        }));

        $('#producer_window').producer({
            full_functionality:true,
            producer_wrap: '#'+this.elementId,
            producer_id: response && response.data && typeof response.data != 'undefined' ? response.data.id : false
        });

    },


    '.delete_producer click': function(el){
        var id = {
            producer_id: $(el).parents(".producer_icon_wrap").data('producer_id')
        },
        obj = this;

        if(confirm('Вы действительно хотите удалить этого производителя?')){
            Producers_model.delete_producer(id, this.callback('producerDeleted', el));
        }
    },

    producerDeleted: function(el, data){
        if (data.success == true) {
            show_success('Deleted');

            el.parents('tr').slideUp(300, function(){
                el.parents('tr').remove();
            });

        } else {
            show_error('Delete error');
        }
    }

});