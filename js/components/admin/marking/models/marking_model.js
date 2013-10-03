$.Model('Marking_model', {

    get_marking: function(success){
        $.ajax({
            url: base_url+'admin/marking_controller/get_marking',
            success: this.callback(success)
        });
    },

    set_marking: function(data, success){
        $.ajax({
            url: base_url+'admin/marking_controller/set_marking',
            data: data,
            success: this.callback(success)
        });
    }

}, {});