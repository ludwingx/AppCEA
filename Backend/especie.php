<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
include("conexion.php");

$postjson = json_decode(file_get_contents("php://input"),TRUE);

if($_GET['aksi']=="list-especies"){
    $res = $mysqli->query("SELECT * FROM especies");
    $cont = 0;
    $check=mysqli_num_rows($res);
    if($check > 0){

        while ($data=mysqli_fetch_assoc($res)) {
                $dataespecie[$cont] = array(
                'id_especies' => $data["id_especies"],
                'nom_especies' => $data["nom_especies"]
                );
                $cont++;
            };
            $result = json_encode(array('success'=> TRUE,"listEspecies"=>$dataespecie));
            }
            else{
            $result = json_encode(array('success'=> false, 'msg'=> 'No existen cargos'));
        }
        echo $result;
    }
