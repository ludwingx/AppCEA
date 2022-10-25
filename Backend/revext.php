<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
include("conexion.php");

$postjson = json_decode(file_get_contents("php://input"),TRUE);

if($_GET['aksi']=="list-revext"){
    $res = $mysqli->query("SELECT * FROM revext");
    $cont = 0;
    $check=mysqli_num_rows($res);
    if($check > 0){

        while ($data=mysqli_fetch_assoc($res)) {
                $datarevext[$cont] = array(
                'id_revext' => $data["id_revext"],
                'nom_revext' => $data["nom_revext"]
                );
                $cont++;
            };
            $result = json_encode(array('success'=> TRUE,"listRevext"=>$datarevext));
            }
            else{
            $result = json_encode(array('success'=> false, 'msg'=> 'No existen revext'));
        }
        echo $result;
    }
