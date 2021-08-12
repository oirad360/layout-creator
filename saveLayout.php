<?php
require_once 'database.php';
$conn=mysqli_connect($database['host'],$database['user'],$database['password'],$database['name']);
$request=json_decode(file_get_contents('php://input'),true);
echo $data["layout"]["id"];
?>