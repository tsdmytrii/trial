$.Model('Campaign_model', {

    set_campaign: function(data, success){
        $.ajax({
            url: base_url+'admin/campaigns/set_campaign',
            data: data,
            success: this.callback(success)
        });
    },

    set_component_function: function(data, success){
        $.ajax({
            url: base_url+'admin/component_type_controller/set_component_function',
            data: data,
            success: this.callback(success)
        });
    },

    get_all_component_function: function(data, success){
        $.ajax({
            url: base_url+'admin/component_type_controller/get_all_component_function',
            data: data,
            success: this.callback(success)
        });
    },

    delete_component_function: function(data, success){
        $.ajax({
            url: base_url+'admin/component_type_controller/delete_component_function',
            data: data,
            success: this.callback(success)
        });
    }

}, {});