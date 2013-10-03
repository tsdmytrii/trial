$.Controller.extend('Mini_blocks',{

    defaults: {
        viewpath:'//components/admin/mini_block/views/',
        lang_id: 2,
        pref: 'ru',
        wind_opt: {
            width: 960,
            height: 480,
            minimize: true,
            maximise: true,
            left: '100',
            top: '100',
            resize: true,
            status_bar: true,
            modal: true
        }
    }

},{
    init:function(){

        this.elementId = $('.'+this.Class.fullName.toLowerCase()).attr('id');

        this.loadMiniBlocks();

    },

    loadMiniBlocks: function(){

        Mini_blocks_model.get_all_mini_blocks(this.callback('miniBlocksGeted'));

    },

    miniBlocksGeted: function(data){

        if (data.message) {

            show_error('Код ошибки: '+data.message);

        } else {
            var html = $.View(this.Class.defaults.viewpath+'mini_blocks_list.tmpl', {
                our_data: data.data,
                pref: this.Class.defaults.pref,
                site_url: base_url
            });

            this.element.html(html);
        }

        componentLoaded(this.element);
    },

    /*
     * Set mini_block
     */
    '.addMiniBlock click': function(){
        this.setMiniBlockCallback();
    },

    '.editMiniBlock click': function(el){

        Mini_blocks_model.get_mini_block($(el).parents('.mini_block_icon_wrap').data('mini_block_id'), this.callback('setMiniBlockCallback'));

    },

    setMiniBlockCallback: function(response){

        if (response && response.message) {
            show_error('Код ошибки: '+response.message);
            return;
        }

        var html = $.View(this.Class.defaults.viewpath+'set_mini_block.tmpl', {

            our_data: response ? response.data : response,
            lang: lang,
            site_url: base_url,
            element_id: this.elementId

        });

        loadWindow('set_mini_block', this.Class.defaults.wind_opt, 'Задать блок', html);

        $('#set_mini_block_window').mini_block({
            component_type_id: response ? response.data.component.component_type_id : false,
            data: response ? response.data : false,
            edit: response ? true : false ,
            elementId: this.elementId,
            className: this.Class.fullName.toLowerCase()
        });

    },

    /*
     * Delete
     */

    '.deleteMiniBlock click': function(el){
        var id = $(el).parents(".mini_block_icon_wrap").data('mini_block_id');

        if(confirm('Вы действительно хотите удалить мини блок?')){
            Mini_blocks_model.delete_mini_block(id, this.callback('miniBlockDeleted', el));
        }
    },

    miniBlockDeleted: function(el, data){

        if (data.success) {

            if (data.message) {
                show_error('Код ошибки: '+data.message);
                return;
            }

            show_success('Успешно удалено');

            var selector = $(el).parents('tr');

            selector.fadeOut(300, function(){
                selector.remove();
            });

        } else {
            show_error('Ошибка');
        }

    }

});