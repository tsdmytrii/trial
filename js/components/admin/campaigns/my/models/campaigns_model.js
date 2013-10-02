$.Model('Campaigns_model', {

    get_all_subscriptions: function(data, success){
        $.ajax({
            url: base_url+'admin/subscribes_controller/get_all_subscriptions',
            data: data,
            success: this.callback(success),
            error: function(){alert(2);}
        });
    },
    
    get_all_subscribers: function(data, success){
        $.ajax({
            url: base_url+'admin/subscribes_controller/get_all_subscribers',
            data: data,
            success: this.callback(success),
            error: function(){alert(2);}
        });
    },
    
    set_campaign: function(data, success){
        $.ajax({
            url: base_url+'admin/campaigns_controller/set_campaign',
            data: data,
            success: this.callback(success)
        });
    },
    
     set_subscriber: function(data, success){
        $.ajax({
            url: base_url+'admin/subscribes_controller/set_subscriber',
            data: data,
            success: this.callback(success)
        });
    },

    get_subscription: function(data, success){
        $.ajax({
            url: base_url+'admin/subscribes_controller/get_subscription_by_id',
            data: data,
            success: this.callback(success)
        });
    },
    
    get_subscriber: function(data, success){
        $.ajax({
            url: base_url+'admin/subscribes_controller/get_subscriber_by_id',
            data: data,
            success: this.callback(success)
        });
    },

    delete_subscription: function(data, success){
        $.ajax({
            url: base_url+'admin/subscribes_controller/delete_subscription',
            data: data,
            success: this.callback(success)
        });
    },
    
    delete_subscriber: function(data, success){
        $.ajax({
            url: base_url+'admin/subscribes_controller/delete_subscriber',
            data: data,
            success: this.callback(success)
        });
    }

}, {});