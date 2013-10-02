if(steal.options.env=='development'){
    steal(function(){
        if (steal.isRhino !== undefined) {
            steal({
                src:'components/user/core/production/production.js',
                packaged: false
            });
        }
    })
    .then(

        './controllers/characteristic_controller',
        './models/characteristic_model',

        './views/characteristic.tmpl',
        './views/characteristic_menu.tmpl',

        {src:'jquery', packaged:false},
        {src:'jquery/view', packaged:false},
        {src:'jquery/view/tmpl', packaged:false}

    );
} else {

    steal(
        'components/user/article/production/production.css'
    )
    .then(
        'components/user/article/production/production.js'
    );

}