$.Controller.extend('Question',{
    defaults: {
        viewpath:'//components/admin/question/views/',
        wind_opt: {
            width: 600,
            height: 380,
            minimize: true,
            maximise: true,
            left: '100',
            top: '100',
            resize: true,
            status_bar: true,
            modal: true
        }
    }

},{

    init:function(){

        this.elementId = $('.'+this.Class.fullName.toLowerCase()).attr('id');

        var html = $.View(this.Class.defaults.viewpath+'index.tmpl', {});

        this.element.append(html);

        this.loadEmails();

        this.loadQuestionVariant();
    },

     /**
      * ---------------------QUESTION VARIANT---------------------
      */

    loadQuestionVariant: function(){

        Question_model.get_question_variant(this.callback('questionVariantsLoaded'), this.callback('error'));

    },

    questionVariantsLoaded: function(data){

        if (data.message) {
            $('#questionVariantWrap').html('<h3>Код ошибки: '+data.message+'</h3>');
        } else {
            var html = $.View(this.Class.defaults.viewpath+'get_question_variant.tmpl', {
                our_data: data ? data.data : data
            });

            $('#questionVariantWrap').html(html);
        }

        componentLoaded(this.element);

    },

    '.addQuestionVariant click': function(){

        this.setQuestionVariantCallback(false);

    },

    '.editQuestionVariant click': function(el){
        var id = $(el).parents('.menu_item_icon_wrap').data('question_variant_id');

        Question_model.get_question_variant_by_id({
            question_variant_id: id
        }, this.callback('setQuestionVariantCallback'), this.callback('error'));

    },

    setQuestionVariantCallback: function(data){

        if (data && data.message) {
            show_error('Код ошибки: '+data.message);
            return;
        }

        var html = $.View(this.Class.defaults.viewpath+'set_question.tmpl', {
            question: data ? data.data : false
        });

        loadWindow('set_question_variant', this.Class.defaults.wind_opt, 'Задать тему вопроса', html);

        $('#set_question_variant_window').question_variant({
            className: this.Class.fullName.toLowerCase(),
            id: this.elementId
        });

    },

    '.deleteQuestionVariant click': function(el){
        var id = $(el).parents('.menu_item_icon_wrap').data('question_variant_id'),
            obj = this;

        if (confirm('Вы действительно хотите удалить эту тему?')){
            Question_model.delete_question_variant({
                question_variant_id: id
            }, function(data){
                obj.questionVariantDeleted(data, el)
            }, this.callback('error'));
        }
    },

    questionVariantDeleted: function(data, el) {

        if (data.success === true) {

            if (data.message) {
                show_error('Код ошибки: '+data.message);
                return;
            }

            show_success('Тема вопроса удалена!');

            var selector = $(el).parents('.question_item_wrap');

            selector.fadeOut(300, function(){
                selector.remove();
            });

        } else
            show_error('Неизвестаня ошибка!');

    },

    /**
     * ---------------------EMAIL---------------------
     */

    loadEmails: function(){

        Question_model.get_emails(this.callback('emailsLoaded'), this.callback('error'));

    },

    emailsLoaded: function(data){

        if (data.message) {
            $('#emailWrap').html('<h3>Код ошибки: '+data.message+'</h3>');
        } else {
            var html = $.View(this.Class.defaults.viewpath+'get_email.tmpl', {
                our_data: data ? data.data : data
            });

            $('#emailWrap').html(html);
        }

    },

    '.addEmail click': function(){

        this.setEmailCallback(false);

    },

    '.editEmail click': function(el){

        var email_id = $(el).parents('.menu_item_icon_wrap').data('email_id');

        Question_model.get_email_by_id({
            email_id: email_id
        }, this.callback('setEmailCallback'), this.callback('error'));

    },

    setEmailCallback: function(data){

        if (data && data.message) {
            show_error('Код ошибки: '+data.message);
            return;
        }

        var html = $.View(this.Class.defaults.viewpath+'set_email.tmpl', {
            email: data ? data.data : false
        }),
            windOption = this.Class.defaults.wind_opt;

        windOption.height = 380;

        loadWindow('set_email', windOption, 'Задать e-mail', html);

        $('#set_email_window').email({
            className: this.Class.fullName.toLowerCase(),
            id: this.elementId
        });

    },

    '.deleteEmail click': function(el){
        var id = $(el).parents('.menu_item_icon_wrap').data('email_id'),
            obj = this;

        if (confirm('Вы действительно хотите удалить этот E-mail?')){
            Question_model.delete_email({
                email_id: id
            }, function(data){
                obj.emailDeleted(data, el);
            }, this.callback('error'));
        }
    },

    emailDeleted: function(data, el) {

        if (data.success === true) {

            if (data.message) {
                show_error('Код ошибки: '+data.message);
                return;
            }

            show_success('Тема вопроса удалена!');

            var selector = $(el).parents('.email_item_wrap');

            selector.fadeOut(300, function(){
                selector.remove();
            });

        } else
            show_error('Неизвестаня ошибка!')

    },

    error: function(response){
        show_error(response.data?response.data:response);
    }

}
);