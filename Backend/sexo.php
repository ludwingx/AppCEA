<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
include("conexion.php");
$postjson = json_decode(file_get_contents("php://input"),TRUE);
if($_GET['aksi']=="list-sexo"){
    $res = $mysqli->query("SELECT * FROM sexo");
    $cont = 0;
    $check=mysqli_num_rows($res);
    if($check > 0){
        while ($data=mysqli_fetch_assoc($res)) {
                $datasexo[$cont] = array(
                'id_sexo' => $data["id_sexo"],
                'nom_sexo' => $data["nom_sexo"]
                );
                $cont++;
            };
            $result = json_encode(array('success'=> TRUE,"listSexos"=>$datasexo));
       }
       else{
        $result = json_encode(array('success'=> false, 'msg'=> 'No existen tipos de atención'));
    }
    echo $result;
}
?>