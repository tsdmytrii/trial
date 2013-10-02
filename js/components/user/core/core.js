/*
 * @page core Core
 * @tag core, loader
 * @parent user_side
 * @plugin core
 * ###Loader for Core of Userside
 * @download @download arsenal/js/components/user/core/core.js
 * Here we load all components for core, which are needed for all pages on userside
 */
//if(steal.options.env=='development'){
   steal(
        'jquery/controller',                        // a widget factory
        'jquery/controller/subscribe',        // subscribe to OpenAjax.hub
        'jquery/view',
        'jquery/controller/view',                // lookup views with the controller's name
        'jquery/model'                                        // Ajax wrappers
        )
    .then('jquery/view/tmpl').
        then('css/plugins/960/reset.css').then(function(){
            if (!$.browser.msie){
                steal(
                'resources/plugins/history/history.js',
                'resources/plugins/history/history.adapter.jquery.js'
            )
            }
        }).
        then(function(){
            if (!$.browser.opera) {
                steal(
                    'resources/jquerypp/styles.js',
                    'resources/jquerypp/animate.js'
                )
            }
        }).
        then(

//            'resources/plugins/jquery.profile.js',
            './css/core.css',
            'resources/plugins/jquery.jscrollpane/jquery.jscrollpane.min.js',
            'resources/plugins/jquery.jscrollpane/jquery.mousewheel.js',
            'resources/plugins/jquery.jscrollpane/jquery.jscrollpane.css',

            'resources/plugins/jquery.validate.js',

            'resources/plugins/jquery.lazyload/jquery.lazyload.js',

            'resources/plugins/jquery.waitforimages/jquery.waitforimages.js',

            'components/user/core/navigation',
            'components/user/core/navigation_json.js',

            'components/user/core/inner_navigation',

            'resources/plugins/jlinq/jlinq.js'
            ).
        then(
            'resources/plugins/jquery.cookie.js',
            'resources/helper_functions.js'
            );
