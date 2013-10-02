if(steal.options.env=='development'){
    steal(function(){
        if (steal.isRhino !== undefined) {
            steal({
                src:'components/user/core/production',
                packaged: false
            });
        }
    })
    .then('./css/article.css')
    .then(

        './controllers/article_controller',
        './models/article_model',

        './views/all_article.tmpl',

        {src:'jquery', packaged:false},
        {src:'jquery/view', packaged:false},
        {src:'jquery/view/tmpl', packaged:false}
        );
} else {
    if ($.browser.msie){
        steal('components/user/article/production/production.js',
        'components/user/article/production/production.css?'+Math.floor(Math.random()*(100000+1)));
    } else {
        steal('components/user/article/production/production.js',
        'components/user/article/production/production.css');
    }
}