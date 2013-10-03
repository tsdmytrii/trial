steal(
    '//css/plugins/datatables/demo_table.css',
    '//css/admin/menu/menu.css'
    )
.then(
    '//resources/plugins/ckeditor/ckeditor.js',

    '//resources/plugins/jquery.synctranslit/jquery.synctranslit.js',

    '//resources/plugins/jlinq/jlinq.js'

    )

.then(
//    '//resources/plugins/ckeditor/styles.js',
    '//resources/plugins/ckeditor/adapters/jquery.js',
    //then our component
    './controllers/menu_controller',
    './models/menu_model',
    './controllers/menu_block_controller',
    './models/menu_block_model'
    );









