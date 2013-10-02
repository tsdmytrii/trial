var realplexor;
$.dklab_init = function(){
    realplexor = new Dklab_Realplexor("http://rpl."+base_url.split('http://')[1], null);

    realplexor.subscribe("id_fe2d7578b8ac760", function() {});
    /*-----RUSSIAN-----*/
    realplexor.subscribe("indexes", function(data) {
        OpenAjax.hub.publish('indexes',data);
    });
    realplexor.subscribe("news_online_ru", function(data) {
        OpenAjax.hub.publish('news_online_ru',data);
    });
    /*-----ENGLISH-----*/
    realplexor.subscribe("news_online_en", function(data) {
        OpenAjax.hub.publish('news_online_en',data);
    });


    realplexor.execute();
}