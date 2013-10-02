$.Controller.extend('Main',{

    viewpath:'//components/profiling/main/views/'


},{

    init:function(){
        $('#profile_content').dataTable({
            'bAutoWidth': false,
            'bPaginate': true,
            'bLengthChange':false,
            'bInfo': true,
            'bJQueryUI': true,
            'iDisplayLength': 100,
            "aaSorting": [[0,'desc']]
        });

        $('#profile_content').css('width', '100%');
        $('#profile_content td').css('padding', '5px');
    }

});