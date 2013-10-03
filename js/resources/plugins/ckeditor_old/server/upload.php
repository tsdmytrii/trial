<?php

include "../config.php";


$_FILES['upload']['type'] = strtolower($_FILES['upload']['type']);

if ($_FILES['upload']['type'] == 'image/png'
|| $_FILES['upload']['type'] == 'image/jpg'
|| $_FILES['upload']['type'] == 'image/gif'
|| $_FILES['upload']['type'] == 'image/jpeg'
|| $_FILES['upload']['type'] == 'image/pjpeg')
{
	$filename = md5(date('YmdHis')).'.jpg';

	copy($_FILES['upload']['tmp_name'], IMAGES_ROOT.$filename);

        $string = '<script>(function(){var d=document.domain;while (true){try{var A=window.parent.document.domain;break;}catch(e) {};d=d.replace(/.*?(?:\.|$)/,"");if (d.length==0) break;try{document.domain=d;}catch (e){break;}}})();window.parent.CKEDITOR.tools.callFunction("2","'.HTTP_IMAGES_ROOT.$filename.'", "Upload successful")</script>';

	echo $string;
}
?>




