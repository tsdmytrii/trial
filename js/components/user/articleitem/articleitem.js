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
        './css/articleitem.css',
        './controllers/articleitem_controller',
        './models/articleitem_model',

        './views/article.tmpl',

        {src:'jquery', packaged:false},
        {src:'jquery/view', packaged:false},
        {src:'jquery/view/tmpl', packaged:false}
        );

} else {
    if ($.browser.msie){
        steal('components/user/articleitem/production/production.js',
        'components/user/articleitem/production/production.css?'+Math.floor(Math.random()*(100000+1)));
    } else {
        steal('components/user/articleitem/production/production.js',
        'components/user/articleitem/production/production.css');
    }
}