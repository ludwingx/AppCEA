<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
include("conexion.php");
$postjson = json_decode(file_get_contents("php://input"),TRUE);
if($_GET['aksi']=="list-edad"){
    $res = $mysqli->query("SELECT * FROM tbledad");
    $cont = 0;
    $check=mysqli_num_rows($res);
    if($check > 0){
        while ($data=mysqli_fetch_assoc($res)) {
                $dataedad[$cont] = array(
                'id_edad' => $data["id_edad"],
                'nedad' => $data["nedad"]
                );
                $cont++;
            };
            $result = json_encode(array('success'=> TRUE,"listEdad"=>$dataedad));
       }
       else{
        $result = json_encode(array('success'=> false, 'msg'=> 'No existen tipos de atención'));
    }
    echo $result;
}
?>