<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: Content-Type");
    include("conexion.php");
    
    $postjson = json_decode(file_get_contents("php://input"), TRUE);

    if($postjson['aksi'] == "consentrega"){
        $res = $mysqli->query("SELECT COUNT(id_tipo_atencion) as totalar FROM acta_recepcion WHERE id_tipo_atencion='1';");
        $cont = 0;
        $check=mysqli_num_rows($res);
        if($check > 0){
    
            while ($data=mysqli_fetch_object($res)) {
                    $dataacta[$cont] = array(
                    'id_tipo_atencion' => $data["totalar"]
                    );
                    $cont++;
                };
                $result = json_encode(array('success'=> TRUE,"consActa"=>$dataacta));
                }
                else{
                $result = json_encode(array('success'=> false, 'msg'=> 'No existen especies'));
            }
            echo $result;
        }
        else if($postjson['aksi'] == "consrescate"){
            $res = $mysqli->query("SELECT COUNT(id_tipo_atencion) as totalar FROM acta_recepcion WHERE id_tipo_atencion='2';");
            $cont = 0;
            $check=mysqli_num_rows($res);
            if($check > 0){
        
                while ($data=mysqli_fetch_object($res)) {
                        $dataacta[$cont] = array(
                        'id_tipo_atencion' => $data["totalar"]
                        );
                        $cont++;
                    };
                    $result = json_encode(array('success'=> TRUE,"consActa"=>$dataacta));
                    }
                    else{
                    $result = json_encode(array('success'=> false, 'msg'=> 'No existen especies'));
                }
                echo $result;
            }
        else if($postjson['aksi'] == "consdecomiso"){
        $res = $mysqli->query("SELECT COUNT(id_tipo_atencion) as totalar FROM acta_recepcion WHERE id_tipo_atencion='3';");
        $cont = 0;
        $check=mysqli_num_rows($res);
        if($check > 0){
    
            while ($data=mysqli_fetch_object($res)) {
                    $dataacta[$cont] = array(
                    'id_tipo_atencion' => $data["totalar"]
                    );
                    $cont++;
                };
                $result = json_encode(array('success'=> TRUE,"consActa"=>$dataacta));
                }
                else{
                $result = json_encode(array('success'=> false, 'msg'=> 'No existen especies'));
            }
            echo $result;
        }
?>