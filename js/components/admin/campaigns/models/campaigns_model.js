$.Model('Campaigns_model', {

    get_all_campaign: function(data, success){
        $.ajax({
            url: base_url+'admin/campaigns/get_all_campaigns',
            data: data,
            success: this.callback(success)
        });
    },

    get_campaign: function(data, success){
        $.ajax({
            url: base_url+'admin/component_type_controller/get_component_type',
            data: data,
            success: this.callback(success)
        });
    },

    delete_campaign: function(data, success){
        $.ajax({
            url: base_url+'admin/component_type_controller/delete_component_type',
            data: data,
            success: this.callback(success)
        });
    }

}, {});