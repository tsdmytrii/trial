if(steal.options.env=='development'){
    steal(function(){
        if (steal.isRhino !== undefined) {
            steal({
                src:'components/user/core/production/production.js',
                packaged: false
            });
        }
    })
    .then('./css/search.css')
    .then(

        './controllers/search_controller',
        './models/search_model',

        './views/body.tmpl',
        './views/results.tmpl',

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