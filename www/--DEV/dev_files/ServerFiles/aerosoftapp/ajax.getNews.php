<?php
$url = $_GET['url'];
$htmlNews = file_get_contents($url);

if(isset($htmlNews) && strlen($htmlNews) > 20) {
    $status = utf8_encode($htmlNews);
}
else {
    $status = '0';
}
echo $status;
?>