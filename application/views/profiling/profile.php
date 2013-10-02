<!DOCTYPE html>
<head>
    <meta http-equiv="Content-type" content="text/html; charset=utf-8" />
    <script type='text/javascript' src='<?= base_url() ?>js/steal/steal.js'>
    </script>

    <script type="text/javascript">
        var img_url = '<?= base_url(); ?>';
        var base_url = '<?= base_url() ?>';
    </script>
    <script type="text/javascript">
        steal('components/profiling/core')
        .then('components/profiling/main')
        .then(function(){
            $('body').main();
        });
    </script>
    <style>
        #profile_content {
            border: 1px solid #000;
        }

        #profile_content td {
            padding: 5px;
        }
    </style>
</head>
<body style="padding: 40px;">
    <div id="content" class="container-fluid">
        <table id="profile_content">
            <thead>
                <tr>
                    <td>Date & time</td>
                    <td>Load base Classes</td>
                    <td>Method name</td>
                    <td>Exec time</td>
                    <td>Total time</td>
                    <td>DB queries</td>
                    <td>DB queries time</td>
                    <td>Memory usage</td>
                    <td>Files</td>
                    <td>Benchmarks</td>
                </tr>
            </thead>
            <tbody>
                <?php foreach($data as $key => $val):?>
                    <tr>
                        <td><?= $val['date_time']?></td>
                        <td><?= $val['base_classes']?></td>
                        <td><?= $val['method_name']?></td>
                        <td><?= $val['controller']?></td>
                        <td><?= $val['total']?></td>
                        <td><?= $val['query_quant']?></td>
                        <td><?= $val['query_time']?></td>
                        <td><?= $val['memory_usage']?></td>
                        <td><?= $val['files']?></td>
                        <td><?= $val['bencmarks']?></td>
                    </tr>
                <?php endforeach;?>
            </tbody>
        </table>
    </div>
    <div id="footer"></div>
</body>
</html>