/* 
 * Menu_items controller
 * 
 * 
 * @var object defaults Default  
 */
$.Controller.extend('Menu_items',{

    defaults: {
        viewpath:'//components/admin/menu_item/views/',
        lang_id: 2,
        wind_opt: {
            width: 860,
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
 /*
 * Init function of Menu_items controller
 * 
 * Loads all menu items 
 * 
 * @param menu_block_id Id of parent menu block
 */
    init:function(block, menu_block_id){

        this.menu_block_id = menu_block_id;

        this.elementId = this.element.attr('id');

        this.loadMenuItems();

    },

    /*
     * Function loads menu items of selected menu block
     * 
     *  Calls  get_menu_item_by_block method in Menu_items_model with 
     *  this.menu_block_id as param. Calls function menuItemsGeted as callback. 
     */

    loadMenuItems: function(){
            Menu_items_model.get_menu_item_by_block({
            menu_block_id: this.menu_block_id
        }, this.callback('menuItemsGeted'));

    },

    /*
     * Function creates menu item's view
     *
     * Check for errors. Add properties to defaults array by doing
     * this.Class.defaults.menu_items = data.data. Then calls prepare_menu_item_data
     * to prepare all data for creatin html. Append html to the table.
     * Component loaded hides preloader.
     *
     * @var html string Creates html view of menu item by filling get_menu_item.tmpl
     * with data.data
     * 
     * @param data object Response of ajax request in sent by
     * Menu_items_model.get_menu_item_by_block
     */
    menuItemsGeted: function(data) {

        if (data && data.message) {

            show_error('Код ошибки: '+data.message);

        } else {

            this.Class.defaults.menu_items = data.data;
            this.menu_item_data = data.data;

            this.parent_data = [];
            this.i = 0;
            this.prepare_menu_item_data('0', 0);

            var html = $.View(this.Class.defaults.viewpath+'get_menu_item.tmpl', {
                our_data: this.parent_data,
                pref: this.Class.defaults.pref,
                menu_block_id: this.menu_block_id,
                site_url: base_url
            });

            $('#'+this.elementId).html(html);

        }


        componentLoaded(this.element);

    },

    /* 
 * Function prepares data for transfering it to the menu item view. 
 * 
 * It gets needed menu item data, modifies number of '-' depends on depth lvl of
 * created menu item. 
 * 
 * @var lvl_sign string Appends '-' before name in parent menu block select
 * for understanding depth lvl of menu.  
 * @var data object Data of menu item where parent_id equals to first param
 * of this function. 
 */
    prepare_menu_item_data: function(parent_id, lvl){
        if (this.menu_item_data.length && this.menu_item_data !== false){
           
            var lvl_sign = '-', data = jlinq
            .from(this.menu_item_data)
            .equals("parent_id", parent_id)
            .sort('position')
            .select();
            lvl++;

            for (var j = 0; j < lvl-1; j++) {
                lvl_sign = lvl_sign+lvl_sign;
            }

            if (data.length) {
                for (var i = 0, ln = data.length; i < ln; i++) {
                    data[i].lvl = lvl;
                    data[i].lvl_sign = lvl_sign;
                    this.parent_data[this.i] = data[i];
                    this.i++;
                    this.prepare_menu_item_data(data[i].id, lvl);
                }
            }
        }
    },

      
/*
 * Function on .add_menu_item click
 */
    '.add_menu_item click': function(){
        //        var obj = this;
        //
        //        Menu_items_model.get_menu_item_for_parent({
        //            menu_block_id: this.menu_block_id
        //        }, this.callback('adding_menu_item'));

        this.setMenuItemCallback();

    },

/*
 * Funtion on .edit_menu_item click.
 * 
 * Calls get_menu_item method in Menu_items_model  
 * 
 * @var id object Get menu item id and menu block id
 */
    '.edit_menu_item click': function(el){

        var id = {
            menu_item_id: $(el).parents(".menu_item_wrap").attr('data-menu_item_id'),
            menu_block_id: this.menu_block_id
        };

        Menu_items_model.get_menu_item(id, this.callback('setMenuItemCallback'));
    },

/*
 * Function sets menu item properties(modified or new)     
 * 
 * Throw an error if its menu item editing. Create Html of menu item 
 * creation/iditing view. LoadWindow is a method that creates a window(#menu_item_window) 
 * with html we prepared earlier. $('#menu_item_window').menu_item({}) puts menu_item
 * controller on #menu_item_window.    
 * 
 * @var html string Html of  
 * @var msg string Title of the window for creation or editing menu item 
 */
    setMenuItemCallback: function(data) {

        if (data && data.message) {
            show_error('Код ошибки: '+data.message);
            return;
        }

        var msg;

        if (data && data.data && typeof data.data != 'undefined')
            msg = 'Изменение пункта меню';
        else
            msg = 'Добавление пункта меню';

        var html = $.View(this.Class.defaults.viewpath+'setMenuItem.tmpl', {
            menu_block_id: this.menu_block_id,
            our_data: data ? data.data : false,
            pref: this.Class.defaults.pref,
            parent: this.parent_data,
            //            related: data ? false : related,
            related: data ? false : false,
            tab: data ? false : true,
            msg: msg,
            component: component_types
        });

        loadWindow('menu_item', this.Class.defaults.wind_opt, msg, html);

        $('#menu_item_window').menu_item({
            full_functionality: true,
            wrap: '#'+this.elementId,
            menu_item_id: data && data.data && typeof data.data != 'undefined' ? data.data.id : false
        });

    },

    /*
     * Function on .delete_menu_item click
     * 
     * Deletes menu item. Ask a question when clicked, call Menu_items_model.delete_menu_item
     * with id as param on confirm. Calls success_delete_menu_item on callback
     * 
     * @var id object Id of menu item, and remembers element cliked on.
     */
    '.delete_menu_item click': function(el){
        var id = {
            menu_item_id: $(el).parents(".menu_item_wrap").attr('data-menu_item_id')
        }, obj = this;

        if(confirm('Вы действительно хотите удалить '+$(el).parents(".menu_item_icon_wrap").prev().text()+'?')){
            Menu_items_model.delete_menu_item(id, function(data){
                obj.success_delete_menu_item(data, el)
            });
        }
    },

/*
 * Function deletes menu item from DOM
 * 
 * Removes menu item from header and from list on success. Throw an error on
 * failure.  
 *
 */
    success_delete_menu_item: function(data, el){
        if (data.success) {

            var menu_item_id = $(el).parents(".menu_item_wrap").attr('data-menu_item_id');

            $('.header_menu_item[data-menu_item_id="'+menu_item_id+'"]').fadeOut(300, function(){
                $('.header_menu_item[data-menu_item_id="'+menu_item_id+'"]').remove();
            });

            show_success('Успешно удалено');

        } else {

            show_error('Ошибка');

        }

        el.parents('.menu_item_wrap').slideUp(300, function(){
            el.parents('.menu_item_wrap').remove();
        });
    },

    /* 
     * Function show inner menu items on mouseover
     *  
     * Loads sub_nav_menu_item.tmpl template, fill it with data about child
     * menu items and appends it to hovered menu item element.
     * 
     * @var id int Hovered menu item id.
     * @var lvl int Menu item depth lvl  
     * @var child_menu_item_head object All child menu items properties of
     * hovered menu item. 
     */
    '.header_menu_item mouseover': function(el) {
        var id = $(el).data('menu_item_id'),
        lvl = parseInt($(el).attr('data-lvl'))+1,
        html,
        child_menu_item_head = jlinq
        .from(this.menu_item_data)
        .equals("parent_id", id)
        .sort('position')
        .select();

        if (child_menu_item_head.length){

            if (!$(el).find('.sub_nav').length) {
                html = $.View(this.Class.defaults.viewpath+'sub_nav_menu_item.tmpl', {
                    our_data: child_menu_item_head,
                    lvl: lvl,
                    site_url: base_url
                });

                $(el).append(html);

                $(el).find('a:first').next().fadeIn(300);
            } else {
                $(el).find('a:first').next().fadeIn(300);
            }

        }

    },

/*
 * Function hides all menu item child elements. 
 */
    '.header_menu_item mouseleave': function(el) {
        $(el).find('ul').stop(true, true).fadeOut(300);
    }

});