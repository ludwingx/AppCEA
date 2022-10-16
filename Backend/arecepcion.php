<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: Content-Type");
    include("conexion.php");
    
    $postjson = json_decode(file_get_contents("php://input"), TRUE);

    if($postjson['aksi'] == "register-ar"){
        $num_acta_ar = $postjson['num_acta_ar'];
        $fecha_ar = $postjson['fecha_ar'];
        $hora_ar = $postjson['hora_ar'];
        $id_tipo_atencion = $postjson['id_tipo_atencion'];
        $id_ldfe_municipio  = $postjson['id_ldfe_municipio '];
        $nom_ldfe_barrio_ar = $postjson['nom_ldfe_barrio_ar'];
        $nom_ldfecalle_ar = $postjson['nom_ldfecalle_ar'];
        $num_ldfe_casa_ar = $postjson['num_ldfe_casa_ar'];
        $id_ldp_municipio  = $postjson['id_ldp_municipio '];
        $nom_ldp_barrio_ar = $postjson['nom_ldp_barrio_ar'];
        $nom_ldp_calle_ar = $postjson['nom_ldp_calle_ar'];
        $nom_ldp_empresa_ar = $postjson['nom_ldp_empresa_ar'];
        $nom_ldp_area_ar = $postjson['nom_ldp_area_ar'];
        $nom_funcionario_ar = $postjson['nom_funcionario_ar'];
        $firma_funcionario_ar = $postjson['firma_funcionario_ar'];
        $ci_funcionario_ar = $postjson['ci_funcionario_ar'];
        $nom_persona_ar = $postjson['nom_persona_ar'];
        $firma_persona_ar = $postjson['firma_persona_ar'];
        $telf_persona_ar = $postjson['telf_persona_ar'];
        $ci_persona_ar = $postjson['ci_persona_ar'];

        $res = $mysqli ->query("INSERT INTO tblrcpt SET num_acta_ar='$num_acta_ar', fecha_ar='$fecha_ar', hora = '$hora', id_tipo_atencion = '$id_tipo_atencion',
        id_ldfe_municipio  = '$id_ldfe_municipio ', nom_ldfe_barrio_ar = '$nom_ldfe_barrio_ar', nom_ldfecalle_ar = '$nom_ldfecalle_ar', num_ldfe_casa_ar = '$num_ldfe_casa_ar', id_ldp_municipio  = '$id_ldp_municipio ',
        nom_ldp_barrio_ar = '$nom_ldp_barrio_ar', nom_ldp_calle_ar = '$nom_ldp_calle_ar', nom_ldp_empresa_ar = '$nom_ldp_empresa_ar', nom_ldp_area_ar = '$nom_ldp_area_ar', nom_funcionario_ar = '$nom_funcionario_ar',
        firma_funcionario_ar = '$firma_funcionario_ar',ci_funcionario_ar = '$ci_funcionario_ar', nom_persona_ar = '$nom_persona_ar', firma_persona_ar = '$firma_persona_ar', telf_persona_ar = '$telf_persona_ar',
        ci_persona_ar = '$ci_persona_ar'");
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
                    'id_acta_recepcion' => $data["id_acta_recepcion"]
                );
                $cont++;
            };
            $result = json_encode(array('success' => TRUE, "listAR" => $datarcpt));
        }else{
            $result = json_encode(array('success' => false, 'msg' => 'No existen Acta de recepciones registradas'));
        }
        echo $result;
    } else if($postjson['aksi'] == "update-ar"){
        $id_acta_recepcion = $postjson['id_acta_recepcion'];
        $num_acta_ar = $postjson['num_acta_ar'];
        $fecha_ar = $postjson['fecha_ar'];
        $hora_ar = $postjson['hora_ar'];
        $id_tipo_atencion = $postjson['id_tipo_atencion'];
        $id_ldfe_municipio  = $postjson['id_ldfe_municipio '];
        $nom_ldfe_barrio_ar = $postjson['nom_ldfe_barrio_ar'];
        $nom_ldfecalle_ar = $postjson['nom_ldfecalle_ar'];
        $num_ldfe_casa_ar = $postjson['num_ldfe_casa_ar'];
        $id_ldp_municipio  = $postjson['id_ldp_municipio '];
        $nom_ldp_barrio_ar = $postjson['nom_ldp_barrio_ar'];
        $nom_ldp_calle_ar = $postjson['nom_ldp_calle_ar'];
        $nom_ldp_empresa_ar = $postjson['nom_ldp_empresa_ar'];
        $nom_ldp_area_ar = $postjson['nom_ldp_area_ar'];
        $nom_funcionario_ar = $postjson['nom_funcionario_ar'];
        $firma_funcionario_ar = $postjson['firma_funcionario_ar'];
        $ci_funcionario_ar = $postjson['ci_funcionario_ar'];
        $nom_persona_ar = $postjson['nom_persona_ar'];
        $firma_persona_ar = $postjson['firma_persona_ar'];
        $telf_persona_ar = $postjson['telf_persona_ar'];
        $ci_persona_ar = $postjson['ci_persona_ar'];

        $res = $mysqli ->query("UPDATE tblrcpt SET num_acta_ar='$num_acta_ar', fecha_ar='$fecha_ar', hora_ar = '$hora_ar', id_tipo_atencion = '$id_tipo_atencion',
        id_ldfe_municipio  = '$id_ldfe_municipio ', nom_ldfe_barrio_ar = '$nom_ldfe_barrio_ar', nom_ldfecalle_ar = '$nom_ldfecalle_ar', num_ldfe_casa_ar = '$num_ldfe_casa_ar', id_ldp_municipio  = '$id_ldp_municipio ',
        nom_ldp_barrio_ar = '$nom_ldp_barrio_ar', nom_ldp_calle_ar = '$nom_ldp_calle_ar', nom_ldp_empresa_ar = '$nom_ldp_empresa_ar', nom_ldp_area_ar = '$nom_ldp_area_ar', nom_funcionario_ar = '$nom_funcionario_ar',
        firma_funcionario_ar = '$firma_funcionario_ar',ci_funcionario_ar = '$ci_funcionario_ar', nom_persona_ar = '$nom_persona_ar', firma_persona_ar = '$firma_persona_ar', telf_persona_ar = '$telf_persona_ar',
        ci_persona_ar = '$ci_persona_ar' WHERE id_acta_recepcion=$id_acta_recepcion");
        if($res){
            $result = json_encode(array("success" => TRUE, "msg" => "Acta de recepción actualizada con exito"));
        }else{
            $result = json_encode(array("success" => FALSE, "msg" => "Hubo un error al actualizar el Acta de recepción"));
        }
        echo $result;

    }else if($postjson['aksi'] == "delete-ar"){
        $id_acta_recepcion = $postjson["id_acta_recepcion"];
        $res = $mysqli -> query("UPDATE tblrcpt SET estado = '0' WHERE id_acta_recepcion = $id_acta_recepcion");
        if ($res) {
            $result = json_encode(array("success" => TRUE, "msg" => "Acta de recepción eliminada"));
        } else {
            $result = json_encode(array("success" => false, 'msg' => 'Hubo un error al eliminar el acta de recepción'));
        }
        echo $result;
    }
?>