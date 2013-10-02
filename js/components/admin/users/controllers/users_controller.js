/*
 * Users controller 
 * 
 * Operates with user groups and all actions about it
 * 
 * @var obj wind_opt Options for window with set/edit user form 
 */
$.Controller('Users', {

    viewpath: '//components/admin/users/views/',

    wind_opt: {
        width: 815,
        height: 375,
        minimize: true,
        maximise: true,
        left: '100',
        top: '50',
        resize: true,
        status_bar: true,
        modal: true
    }

}, {
    
   /* 
    * Init function of users_controller
    * 
    * Loads all user groups and calls loadUsers function
    * 
    * param full_functionality boolean, if true, renders view on ceter column,
    * if false - just listens to events on adding_user, updating user
*/
    init: function(element, options) {

        this.elementId = this.element.attr('id');

        if (typeof this.options.full_functionality == 'undefined') {
            this.options.full_functionality = true;
        }

        if (this.options.full_functionality === true) {

            this.element.html($.View(this.Class.viewpath + 'index.tmpl', {}));

            UsersModel.getGroups(this.callback('groupsLoaded'));

            this.loadUsers();
        }
    },

/*
 * Remembers all user groups
 */
    groupsLoaded: function(data) {

        this.groups = data.data;

    },

/*
 * Calls model for get users
 */
    loadUsers: function() {
        UsersModel.getUsers(this.callback('usersLoaded'));
    },

/*
 * loadUsers function result handler
 * 
 * Checks for erroes. Create html view and add it to #usersContent
 */
    usersLoaded: function(response) {
        if (response.success == 1) {
            var obj = this;

            if (response.message){
                show_error('Код ошибки: '+response.message);
            } else {

                var center_column = $.View(this.Class.viewpath + 'center_column.tmpl', {
                    viewpath: obj.Class.viewpath,
                    users: response.data
                });

                $('#usersContent').html(center_column);

            }

                /*	$('#datatable').dataTable( {
                 "sScrollY": "500px",
                 "bPaginate": false,
                 'bFilter': true,
                 "bJQueryUI": true,
                 "aaSorting": [[ 1, "desc" ]],
                 "oLanguage":{
                 "sEmptyTable": "No entries added yet"
                 },
                 aoColumns:[{
                 sWidth:'30px'
                 }, {
                 sWidth: '700px'
                 },

                 {
                 sWidth:'90px'
                 }]

                 });*/
        }

        componentLoaded(this.element);

    },

/*
 * #add_user click handler
 * 
 * Calls setUserCallback with param false(no incoming data)
 */
    '#add_user click': function() {
        this.setUserCallback(false);
    },

/*
 * .edit_user click click handler
 * 
 * Calls setUserCallback with param false(with incoming data)
 */
    '.edit_user click': function(el) {
        var id = el.attr('id').split('_')[2];
        UserModel.getUser(id, this.callback('setUserCallback'));
    },

/*
 * .delete_user click handler
 * 
 * Send request for delete user from base after confirm by id
 */
    '.delete_user click': function(el) {
        //alert($.dump(this.options))
        if (this.options.full_functionality == true) {

            var id = el.attr('id').split('_')[2];

            if (confirm('Are you sure to delete user "' + el.parents('tr').children('td:eq(1)').text() + '"'))
                UserModel.deleteUser(id, this.callback('userDeleted', el));

        }

    },

/*
 * Checks delete user status
 * 
 * Checks for errors. Removes user from DOM, if delete from server was successfull
 */
    userDeleted: function(el, response) {

        if (response.success == true) {

            if (response.message) {
                show_error('Код ошибки:'+response.message);

                return;
            }

            show_success('User deleted successfully');

            $(el).parents('tr').fadeOut(300, function(){

                $(el).parents('tr').remove();

            });

        }
        else
            $.showError('Deleting user failed')
    },

/*
 * Set/edit user
 * 
 * Creates html view of set/edit user form and insert it into new window.
 * $('#set_user_window').user_widget() - set user_widget controller on selecctor
 */
    setUserCallback: function(response) {
        var html = $.View(this.Class.viewpath + 'set_user.tmpl', {
                user: response ? response.data : false,
                groups: this.groups,
                pref: 'ru'
            });

        if (response && response.message) {
            show_error("Код ошибки: "+response.message);

            return;
        }

        loadWindow('set_user', this.Class.wind_opt, 'Пользователь', html);

        $('#set_user_window').user_widget({
            full_functionality: this.options.full_functionality,
            data: response ? response.data : false,
            elementId: this.elementId
        });

    }
});