if(steal.options.env=='development'){
    steal(function(){
        if (steal.isRhino !== undefined) {
            steal({
                src:'components/user/core/production',
                packaged: false
            });
        }
    })
    .then(

        './css/static_comp.css',
        './controllers/static_comp_controller.js',
        './models/static_comp_model.js',

        './views/index.tmpl',

        {src:'jquery', packaged:false},
        {src:'jquery/view', packaged:false},
        {src:'jquery/view/tmpl', packaged:false}

        );
} else {
        steal('components/user/static_comp/production/production.css').
        then('components/user/static_comp/production/production.js');
}