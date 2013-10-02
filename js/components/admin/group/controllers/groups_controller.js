$.Controller.extend('Groups',{
    defaults: {
        viewpath:'//components/admin/group/views/',
        lang_id: 2,
        wind_opt: {
            width: 840,
            height: 460,
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

        this.load_groups();

    },

    load_groups: function(){

        Groups_model.get_all_groups(this.callback('groupsLoaded'));

    },

    groupsLoaded: function(data){

        var html = $.View(this.Class.defaults.viewpath+'all_groups.tmpl', {
            our_data: data,
            pref: this.Class.defaults.pref
        });

        $('#'+this.elementId).html(html);

        componentLoaded(this.element);

    },

    '.add_group click': function(el){

        this.setGroupCallback(false);

    },

    '.edit_group click': function(el){
        var id = {
            group_id: $(el).parents(".group_icon_wrap").data('group_id')
        };

        Groups_model.get_group(id, this.callback('setGroupCallback'));
    },

    setGroupCallback: function(response){

        if (response && response.message){
            show_error('Код ошибки: '+response.message);
            return;
        }

        var msg;

        if (response && response.data && typeof response.data != 'undefined')
            msg = 'Изменение изменение';
        else
            msg = 'Добавление группы';

        loadWindow('group', this.Class.defaults.wind_opt,  msg, $.View(this.Class.defaults.viewpath+'set_group.tmpl', {

            site_url: base_url,
            our_data: response ? response.data : false

        }));

        $('#group_window').group({
            data: response ? response.data : false,
            full_functionality:true,
            group_wrap: '#'+this.elementId,
            group_id: response && response.data && typeof response.data != 'undefined' ? response.data.id : false
        });

    },

    '.delete_group click': function(el){
        var id = {
            group_id: $(el).parents(".group_icon_wrap").data('group_id')
        };

        if(confirm('Вы действительно хотите удалить эту группу?')){
            Groups_model.delete_group(id, this.callback('groupDeleted', el));
        }
    },

    groupDeleted: function(el, data){
        if (data.success === true) {

            if (data.message) {

                show_error('Код ошибки: '+data.message);

            } else {

                show_success('Deleted');

                el.parents('tr').slideUp(300, function(){
                    el.parents('tr').remove();
                });

            }

        } else {
            show_error('Ошибка удаления');
        }
    }

});