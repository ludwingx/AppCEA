<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
include("conexion.php");
$postjson = json_decode(file_get_contents("php://input"),TRUE);
if($_GET['aksi']=="list-tatencion"){
    $res = $mysqli->query("SELECT * FROM tatencion");
    $cont = 0;
    $check=mysqli_num_rows($res);
    if($check > 0){
        while ($data=mysqli_fetch_assoc($res)) {
                $datatatencion[$cont] = array(
                'id_tipo_atencion' => $data["id_tipo_atencion"],
                'nom_tipo_atencion' => $data["nom_tipo_atencion"]
                );
                $cont++;
            };
            $result = json_encode(array('success'=> TRUE,"listTatencion"=>$datatatencion));
       }
       else{
        $result = json_encode(array('success'=> false, 'msg'=> 'No existen tipos de atención'));
    }
    echo $result;
}
?>