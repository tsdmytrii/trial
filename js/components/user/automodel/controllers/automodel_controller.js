$.Controller.extend('Automodel', {

    defaults: {
        viewpath:'//components/user/automodel/views/',
        pref: 'ru'
    }

}, {

    init: function(selector, automodel_id, autobrend_id, main, lang_id, defaultComponent){

        var $falseWind = $('div.window-container[data-false_window="automodel"]');
        var serverLoad = false;

        this.Class.container = $('.'+this.Class.fullName.toLowerCase());

        this.elementId = this.Class.container.attr('id');

        this.window = $('#'+this.elementId);

        this.automodel_id = automodel_id;

        var baseUrl = window.location.href;

        if ($falseWind.length) {
            defaultComponent = $falseWind.find('.serverLoad').attr('data-component_id');
            serverLoad = true;
            baseUrl = $falseWind.attr('data-href');

            $('#'+this.elementId+' .window_preload').hide();

        }

        var head = $.View(this.Class.defaults.viewpath+'head.tmpl', {
            automodel_id: automodel_id,
            base_url: baseUrl
        });

        var options = {
            isWindow: init_data.data.windowOn,
            controllerBlock: this.elementId+' .window-titleBar-content',
            divControlledWrap: this.elementId,
            divWrapper: '#'+this.elementId+' .winContWrap',
            base_url: baseUrl,
            serverLoad: serverLoad,
            defaultComponent: defaultComponent ? defaultComponent : 'description',
            blockClass: 'amTabCont',
            title: $(this.elementId+' .window-titleBar-content').text(),
            params: [automodel_id, autobrend_id, main, lang_id, '"'+this.elementId+'"']
        };

        $('#'+this.elementId+' .window-titleBar-content').
            html(head).
            inner_navigation(options);

        if ($falseWind.length) {

            if (parseInt(init_data.data.windowOn)) {

                this.window.append($falseWind.find('.autoModelListWrap'));

                $('#'+this.elementId+' .winContWrap').html($falseWind.find('.winContWrap').children());

                $falseWind.remove();

            } else {

                Windows.checkMaximised(true, true);

                Windows.findMaxWindPosition(this.window);

            }

        } else {

            var automodels = jlinq.from(init_data.data.autobrend).equals("id", parseInt(autobrend_id)).select()[0],
            currentAutomodel = jlinq.from(automodels.automodel).equals("id", parseInt(this.automodel_id)).select()[0],
            side_menu = $.View(this.Class.defaults.viewpath+'automodel_menu.tmpl', {
                automodels: automodels,
                currentAutomodel: currentAutomodel,
                automodel_id: this.automodel_id,
                pref: chose_lang_pref(),
                lang_id: $.cookie('lang'),
                site_url: base_url
            });

            this.window.append(side_menu);

        }

    },

    error: function(response){
        show_error(response.data?response.data:response);
    }

}
);