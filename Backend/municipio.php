<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
include("conexion.php");
$postjson = json_decode(file_get_contents("php://input"),TRUE);
if($_GET['aksi']=="list-municipio"){
    $res = $mysqli->query("SELECT * FROM municipios");
    $cont = 0;
    $check=mysqli_num_rows($res);
    if($check > 0){
        while ($data=mysqli_fetch_assoc($res)) {
                $datamunicipio[$cont] = array(
                'id_municipio' => $data["id_municipio"],
                'nom_mun' => $data["nom_mun"]
                );
                $cont++;
            };
            $result = json_encode(array('success'=> TRUE,"listMunicipios"=>$datamunicipio));
        }
        else{
        $result = json_encode(array('success'=> false, 'msg'=> 'No existen Municipio'));
    }
    echo $result;
}
?>