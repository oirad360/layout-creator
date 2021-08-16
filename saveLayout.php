<?php
require_once 'database.php';
$conn=mysqli_connect($database['host'],$database['user'],$database['password'],$database['name']);
$request=json_decode(file_get_contents('php://input'),true);

$layoutID;

if($request["id"]==="new"){
    $query="insert into layouts(display,flexDirection,height,width) values('".$request["display"]."','".$request["flexDirection"]."','".$request["height"]."','".$request["width"]."')";
    $res=mysqli_query($conn,$query);
    $query="select max(id) from layouts";
    $res=mysqli_query($conn,$query);
    $row=mysqli_fetch_array($res);
    $layoutID=$row[0];
}else{
    $query="update layouts set display='".$request["display"]."',flexDirection='".$request["flexDirection"]."',height='".$request["height"]."',width='".$request["width"]."' where id=".$request["id"];
    $res=mysqli_query($conn,$query);
    $query="delete from childs where layout_id=".$request["id"];
    $res=mysqli_query($conn,$query);
    $layoutID=$request["id"];
}

foreach($request["childs"] as $child){
    $query="insert into childs(layout_id,data_gen,data_id,data_parent_gen,data_parent_id,hasChilds,title,fontSize,display,flexDirection,height,width,margin)
    values('".$layoutID."','".$child["data_gen"]."','".$child["data_id"]."','".$child["data_parent_gen"]."','".$child["data_parent_id"]."','".$child["hasChilds"]."',
    '".$child["title"]."','".$child["fontSize"]."','".$child["display"]."','".$child["flexDirection"]."','".$child["height"]."','".$child["width"]."','".$child["margin"]."')";
    $res=mysqli_query($conn,$query);
}

$file=fopen("layout$layoutID.json","w");
$data=array();
foreach($request["childs"] as $child){
    if($child["hasChilds"]==0)
    $data["gen".$child["data_gen"]]["id".$child["data_id"]]=$child["content"];
}
fwrite($file,json_encode($data));
fclose($file);
mysqli_close($conn);
echo $layoutID;
?>