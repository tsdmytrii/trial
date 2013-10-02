/*
 * Menu controller
 * 
 * @var object defaults Contains pass for views, options for windows engine
 * and language propeties  
 */ 
$.Controller.extend('Menu',{
    defaults: {
        viewpath:'//components/admin/menu/views/',
        wind_opt: {
            width: 475,
            height: 275,
            minimize: true,
            maximise: true,
            left: '100',
            top: '100',
            resize: true,
            status_bar: true,
            modal: true
        },
        lang_id: 2,
        pref: 'ru'
    }

},{
    /*
     * Init function for Menu controller
     * 
     * Creates html for table of menu-blocks and appends its to the element, 
     * then calls loadMenuBlock function
     */
    init:function(){

        this.elementId = this.element.attr('id');

        var html = $.View(this.Class.defaults.viewpath+'index.tmpl', {});

        this.element.html(html);

        this.loadMenuBlock();

    },

    /*
     * Function calls get_all_menu_blocks method of Menu_model that loads 
     * all existing menu-blocks and calls callback after.
     */

    loadMenuBlock: function(id){

        Menu_model.get_all_menu_blocks(this.callback('menuBlocksGeted'));

    },

/*
 * Function checks if any data was returned by callback of loadMenuBlock. 
 * If message property is not empty in this data, then we have error on ajax 
 * request and function throws error's code. If not - creates html by filling 
 * get_menu_block.tmpl with data from ajax responce and then appends it to the
 * #menuBlockContent (menu-block table's body)
 * 
 * componentsLoaded is for interrupting preloader and hiding it.
 *
 * @param data array data with all menu-blocks and their properties  
 */
    menuBlocksGeted: function(data){

        if (data && data.message) {
            show_error('Код ошибки: '+data.message);
        } else {
            var html = $.View(this.Class.defaults.viewpath+'get_menu_block.tmpl', {
                our_data: data.data,
                base_url: base_url
            });

            $('#menuBlockContent').html(html);
        }

        componentLoaded(this.element);

    },

    /*
     * Function simply transfer false(no data) as param to setMenuBlockCallback
     */

    '#addMenuBlock click': function(){

        this.setMenuBlockCallback(false);

    },

/*
* Click on edit Menu-block
*
* Function get id of menu-block which is a parent of clicked element,
* then calls  Menu_model.get_menu_block with id as param (id.menu_block_id). 
* Id is anough to idintify menu_block by server. Callback after that.
*/
    '.editMenuBlock click': function(el){
        var id = {
            menu_block_id: $(el).parents(".menu_block_icon_wrap").data('menu_block_id')
        };

        Menu_model.get_menu_block(id, this.callback('setMenuBlockCallback'));
    },

/*
 * Function creates a window with setting menu-block form
 * 
 * Creates html from set_menu_block template and fills it with data param
 * 
 * @param data array Or we have propper data array without .message property 
 * with all atributes of existing menu-block. Or its errordata from failed ajax
 * so we just use error message from it to show it for user 
 */
    setMenuBlockCallback: function(data){

        if (data && data.message) {
            show_error('Код ошибки: '+data.message);
            return;
        }

        var html = $.View(this.Class.defaults.viewpath+'set_menu_block.tmpl', {
                our_data: data ? data.data : false
            }),
            msg = data ? 'Изменения меню блока' : 'Добавления меню блока';

        loadWindow('set_menu_block', this.Class.defaults.wind_opt, msg, html);

        $('#set_menu_block_window').menu_block({
            data: data ? data.data : false,
            elementId: this.elementId
        });

    },

    /*
     * Function on .deleteMenuBlock click
     * 
     * Gets id of the menu-block, asks for confirm. If confirmed, call 
     * Menu_model.delete_menu_block with id as param, hen callback func.
     */
    '.deleteMenuBlock click': function(el){
        var id = {
            menu_block_id: $(el).parents(".menu_block_icon_wrap").data('menu_block_id')
        };

        if(confirm('Вы действительно хотите удалить этот блок? Это приведет к удалению целого раздела.')){
            Menu_model.delete_menu_block(id, this.callback('menuBlockDeleted', el));
        }
    },


/*
 * Checks for deletet result
 *
 * Function checks if we have any error messages and show them, if not - 
 * message about successfull deleting and removing tr with current menu-block
 * from DOM
 */
    menuBlockDeleted: function(el, data){

        if (data.success) {

            if (data.message) {
                show_error('Код ошибки: '+data.message);
                return;
            }

            show_success('Операция удаления успешна!');

            var tr = el.parents('tr');

            tr.slideUp(300, function(){
                tr.remove();
            });

        } else
            show_error('Ошибка');


    }

}
);