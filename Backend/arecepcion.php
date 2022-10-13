<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: Content-Type");
    include("conexion.php");
    
    $postjson = json_decode(file_get_contents("php://input"), TRUE);

    if($postjson['aksi'] == "register-ar"){
        $numacta = $postjson['numacta'];
        $fecha = $postjson['fecha'];
        $hora = $postjson['hora'];
        $id_tatencion = $postjson['id_tatencion'];
        $id_dfmunicipio = $postjson['id_dfmunicipio'];
        $dfbarrio = $postjson['dfbarrio'];
        $dfcalleavenida = $postjson['dfcalleavenida'];
        $dfnumcasa = $postjson['dfnumcasa'];
        $id_dpmunicipio = $postjson['id_dpmunicipio'];
        $dpbarrio = $postjson['dpbarrio'];
        $dpcalleavenida = $postjson['dpcalleavenida'];
        $dpempreinsti = $postjson['dpempreinsti'];
        $dparea = $postjson['dparea'];
        $namerecep = $postjson['namerecep'];
        $firmarecep = $postjson['firmarecep'];
        $cirecep = $postjson['cirecep'];
        $nameperson = $postjson['nameperson'];
        $firmaperson = $postjson['firmaperson'];
        $telfperson = $postjson['telfperson'];
        $ciperson = $postjson['ciperson'];

        $res = $mysqli ->query("INSERT INTO tblrcpt SET numacta='$numacta', fecha='$fecha', hora = '$hora', id_tatencion = '$id_tatencion',
        id_dfmunicipio = '$id_dfmunicipio', dfbarrio = '$dfbarrio', dfcalleavenida = '$dfcalleavenida', dfnumcasa = '$dfnumcasa', id_dpmunicipio = '$id_dpmunicipio',
        dpbarrio = '$dpbarrio', dpcalleavenida = '$dpcalleavenida', dpempreinsti = '$dpempreinsti', dparea = '$dparea', namerecep = '$namerecep',
        firmarecep = '$firmarecep',cirecep = '$cirecep', nameperson = '$nameperson', firmaperson = '$firmaperson', telfperson = '$telfperson',
        ciperson = '$ciperson'");
        if($res){
            $result = json_encode(array("success" => TRUE, "msg" => "Acta de recepción registrada con exito"));
        }else{
            $result = json_encode(array("success" => FALSE, "msg" => "Hubo un error al registrar el Acta de recepción"));
        }
        echo $result;
    } else if ($_GET['aksi'] == "list-ar"){
        $res = $mysqli -> query("SELECT  FROM tblrcpt");
        $cont = 0;
        $check = mysqli_num_rows($res);
        if($check > 0){
            while($data = mysqli_fetch_assoc($res)) {
                $datarcpt[$cont] = array(
                    'id_rcpt' => $data["id_rcpt"]
                );
                $cont++;
            };
            $result = json_encode(array('success' => TRUE, "listAR" => $datarcpt));
        }else{
            $result = json_encode(array('success' => false, 'msg' => 'No existen Acta de recepciones registradas'));
        }
        echo $result;
    } else if($postjson['aksi'] == "update-ar"){
        $id_rcpt = $postjson['id_rcpt'];
        $numacta = $postjson['numacta'];
        $fecha = $postjson['fecha'];
        $hora = $postjson['hora'];
        $id_tatencion = $postjson['id_tatencion'];
        $id_dfmunicipio = $postjson['id_dfmunicipio'];
        $dfbarrio = $postjson['dfbarrio'];
        $dfcalleavenida = $postjson['dfcalleavenida'];
        $dfnumcasa = $postjson['dfnumcasa'];
        $id_dpmunicipio = $postjson['id_dpmunicipio'];
        $dpbarrio = $postjson['dpbarrio'];
        $dpcalleavenida = $postjson['dpcalleavenida'];
        $dpempreinsti = $postjson['dpempreinsti'];
        $dparea = $postjson['dparea'];
        $namerecep = $postjson['namerecep'];
        $firmarecep = $postjson['firmarecep'];
        $cirecep = $postjson['cirecep'];
        $nameperson = $postjson['nameperson'];
        $firmaperson = $postjson['firmaperson'];
        $telfperson = $postjson['telfperson'];
        $ciperson = $postjson['ciperson'];

        $res = $mysqli ->query("UPDATE tblrcpt SET numacta='$numacta', fecha='$fecha', hora = '$hora', id_tatencion = '$id_tatencion',
        id_dfmunicipio = '$id_dfmunicipio', dfbarrio = '$dfbarrio', dfcalleavenida = '$dfcalleavenida', dfnumcasa = '$dfnumcasa', id_dpmunicipio = '$id_dpmunicipio',
        dpbarrio = '$dpbarrio', dpcalleavenida = '$dpcalleavenida', dpempreinsti = '$dpempreinsti', dparea = '$dparea', namerecep = '$namerecep',
        firmarecep = '$firmarecep',cirecep = '$cirecep', nameperson = '$nameperson', firmaperson = '$firmaperson', telfperson = '$telfperson',
        ciperson = '$ciperson' WHERE id_rcpt=$id_rcpt");
        if($res){
            $result = json_encode(array("success" => TRUE, "msg" => "Acta de recepción actualizada con exito"));
        }else{
            $result = json_encode(array("success" => FALSE, "msg" => "Hubo un error al actualizar el Acta de recepción"));
        }
        echo $result;

    }else if($postjson['aksi'] == "delete-ar"){
        $id_rcpt = $postjson["id_rcpt"];
        $res = $mysqli -> query("UPDATE tblrcpt SET estado = '0' WHERE id_rcpt = $id_rcpt");
        if ($res) {
            $result = json_encode(array("success" => TRUE, "msg" => "Acta de recepción eliminada"));
        } else {
            $result = json_encode(array("success" => false, 'msg' => 'Hubo un error al eliminar el acta de recepción'));
        }
        echo $result;
    }
?>