<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
include("conexion.php");

$postjson = json_decode(file_get_contents("php://input"),TRUE);

if($_GET['aksi']=="list-cargo"){
    
    $res = $mysqli->query("SELECT * FROM tblcargos");
    $cont = 0;
    $check=mysqli_num_rows($res);
    
    if($check > 0){
        while ($data=mysqli_fetch_assoc($res)) {
                $datacargo[$cont] = array(
                'id_cargo' => $data["id_cargo"],
                'ncargo' => $data["ncargo"]
                );
                $cont++;
            };
            $result = json_encode(array('success'=> TRUE,"listCargo"=>$datacargo));
        
       }
       else{
        $result = json_encode(array('success'=> false, 'msg'=> 'No existen cargos'));
    }
    
    echo $result;
}
?>