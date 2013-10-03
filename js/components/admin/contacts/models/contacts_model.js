$.Model('Contacts_model', {

    get_contacts: function(data, success){
        $.ajax({
            url: base_url+'admin/contacts_controller/get_contacts',
            data: data,
            success: this.callback(success)
        });
    },

    set_contacts: function(data, success){
        $.ajax({
            url: base_url+'admin/contacts_controller/set_contacts',
            data: data,
            success: this.callback(success)
        });
    }

}, {});