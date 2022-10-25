<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
include("conexion.php");
$postjson = json_decode(file_get_contents("php://input"),TRUE);
if($_GET['aksi']=="list-mucosa"){
    $res = $mysqli->query("SELECT * FROM mucosas");
    $cont = 0;
    $check=mysqli_num_rows($res);
    if($check > 0){
        while ($data=mysqli_fetch_assoc($res)) {
                $datamucosa[$cont] = array(
                'id_mucosa' => $data["id_mucosa"],
                'nom_mucosa' => $data["nom_mucosa"]
                );
                $cont++;
            };
            $result = json_encode(array('success'=> TRUE,"listMucosas"=>$datamucosa));
        }
        else{
        $result = json_encode(array('success'=> false, 'msg'=> 'No existen tipos de mucosas'));
    }
    echo $result;
}
