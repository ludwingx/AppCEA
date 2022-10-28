<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: Content-Type");
    include("conexion.php");
    
    $postjson = json_decode(file_get_contents("php://input"), TRUE);

    if($postjson['aksi'] == "registrar-hc"){
        $fecha_hc = $postjson['fecha_hc'];
        $hora_hc = $postjson['hora_hc'];
        $id_especies  = $postjson['id_especies'];
        $nom_comun_hc  = $postjson['nom_comun_hc'];
        $id_sexo = $postjson['id_sexo'];
        $id_edad  = $postjson['id_edad'];
    
        $anamnesis_hc  = $postjson['anamnesis_hc'];
        $id_mucosas  = $postjson['id_mucosas'];
        $observaciones_hc  = $postjson['observaciones_hc'];
        $id_revext  = $postjson['id_revext'];
        $sis_nervioso_hc  = $postjson['sis_nervioso_hc'];
        $sis_respiratorio_hc  = $postjson['sis_respiratorio_hc'];
        $temperatura_hc  = $postjson['temperatura_hc'];
        $frec_cardiaca_hc  = $postjson['frec_cardiaca_hc'];
        $peso_hc  = $postjson['peso_hc'];
        
        $pruebas_complementarias_hc  = $postjson['pruebas_complementarias_hc'];
        $diagn_presuntivo_hc  = $postjson['diagn_presuntivo_hc'];
        $diagn_confirmado_hc  = $postjson['diagn_confirmado_hc'];
        
        $hreposicion_hc  = $postjson['hreposicion_hc'];
        $hmantenimiento_hc  = $postjson['hmantenimiento_hc'];
        $hperdidas_hc  = $postjson['hperdidas_hc'];
    
        $tratamiento_diagnostico = $postjson['tratamiento_diagnostico'];

        $id_usuario = $postjson['id_usuario'];

        $farmaco_td;
        $accion_td;
        $dosis_td;
        $via_td;
        $hora_td;
        //registro de persona

        $res = $mysqli->query("INSERT INTO historia_clinica SET
        fecha_hc= '$fecha_hc',
        hora_hc= '$hora_hc',
        id_especies: $id_especies,
        nom_comun_hc= '$nom_comun_hc',
        id_sexo: $id_sexo,
        id_edad: $id_edad,

        anamnesis_hc= '$anamnesis_hc',
        id_mucosas= $id_mucosas,
        observaciones_hc= '$observaciones_hc',
        id_revext= $id_revext,
        sis_nervioso_hc= '$sis_nervioso_hc',
        sis_respiratorio_hc= '$sis_respiratorio_hc',
        temperatura_hc= '$temperatura_hc',
        frec_cardiaca_hc= '$frec_cardiaca_hc',
        peso_hc= '$peso_hc',

        pruebas_complementarias_hc= '$pruebas_complementarias_hc',
        diagn_presuntivo_hc= '$diagn_presuntivo_hc',
        diagn_confirmado_hc= '$diagn_confirmado_hc',

        hreposicion_hc= '$hreposicion_hc',
        hmantenimiento_hc= '$hmantenimiento_hc',
        hperdidas_hc= '$hperdidas_hc',

        id_usuario = $id_usuario");
        
        $repHcli = $mysqli->query("SELECT id_historia_clinica FROM historia_clinica WHERE nom_comun_hc='$nom_comun_hc' AND fecha_hc='$fecha_hc' AND hora_hc='$hora_hc'");
        $id_hcli = mysqli_fetch_array($repHcli);
        $id_hcli = $id_hcli["id_historia_clinica"];
        
        
        for($i = 0; $i < count($tratamiento_diagnostico); $i++){
            $farmaco_td[$i] = $tratamiento_diagnostico[$i]['farmaco_td'];
            $accion_td[$i]= $tratamiento_diagnostico[$i]['accion_td'];
            $dosis_td[$i]= $tratamiento_diagnostico[$i]['dosis_td'];
            $via_td[$i]= $tratamiento_diagnostico[$i]['via_td'];
            $hora_td[$i]= $tratamiento_diagnostico[$i]['hora_td'];
        }
        
        for($i = 0; $i < count($tratamiento_diagnostico); $i++){
            $res2 = $mysqli->query("INSERT INTO tratamiento_diagnostico SET id_historia_clinica=$id_hcli,
                farmaco_td='$farmaco_td[$i]',
                accion_td='$accion_td[$i]',
                dosis_td='$dosis_td[$i]',
                via_td='$via_td[$i]',
                hora_td='$hora_td[$i]'");
        }
        
        if($res && $res2){
            $result = json_encode(array("success" => TRUE, "msg" => "Historia Clinica registrada con exito"));
        }else{
            $result = json_encode(array("success" => FALSE, "msg" => "Hubo un error al registrar la historia clinica"));
        }

        echo $result;
        
    }
    else if($postjson['aksi'] == "ver-hcli"){
        $nom_comun_hc = $postjson['nom_comun_hc'];
        $cont = 0;
        $res = $mysqli-> query("SELECT HC.fecha_hc as fecha_hc, HC.hora_hc as hora_hc, E.nom_especies as nom_especies, HC.nom_comun_hc as nom_comun_hc,
        S.nom_sexo as nom_sexo, ED.nom_edad as nom_edad, HC.anamnesis_hc as anamnesis_hc, M.nom_mucosa as nom_mucosa, HC.observaciones_hc as observaciones_hc, 
        HC.pruebas_complementarias_hc as pruebas_complementarias_hc, HC.diagn_presuntivo_hc as diagn_presuntivo_hc, HC.diagn_confirmado_hc as diagn_confirmado_hc, 
        HC.sis_nervioso_hc as sis_nervioso_hc, HC.sis_respiratorio_hc as sis_respiratorio_hc, HC.temperatura_hc as temperatura_hc, HC.frec_cardiaca_hc as frec_cardiaca,
        HC.peso_hc as peso_hc, HC.hreposicion_hc as hreposicion_hc, HC.hmantenimiento_hc as hmantenimiento_hc, HC.hperdidas_hc as hperdidas_hc,
        RE.nom_revext as nom_revext, FROM historia_clinica as HC 
        INNER JOIN especies as E ON HC.id_especies = E.id_especies
        INNER JOIN sexo as S ON HC.id_sexo = S.id_sexo
        INNER JOIN edad as ED ON HC.id_edad = ED.id_edad
        INNER JOIN revext as RE ON HC.id_revext = RE.id_revext
        WHERE HC.nom_comun_hc='$nom_comun_hc'");

        $res2 = $mysqli->query("SELECT TD.farmaco_td, TD.accion_td, TD.dosis_td, TD.via_td, TD.hora_td
        FROM historia_clinica as HC
        INNER JOIN tratamiento_diagnostico as TD
        WHERE HC.nom_comun_hc='$nom_comun_hc'");

        $check =mysqli_num_rows($res);
        $check2 =mysqli_num_rows($res2);

        if($check > 0  && $check2 > 0){
            $data= mysqli_fetch_array($res);
            $datauser = array(
            'fecha_hc' => $data["fecha_hc"],
            'hora_hc'=> $data["hora_hc"],
            'nom_especies'=> $data["nom_especies"],
            'nom_comun_hc'=> $data["nom_comun_hc"],
            'nom_sexo'=> $data["nom_sexo"],
            'nom_edad'=> $data["nom_edad"],
        
            'anamnesis_hc'=> $data["anamnesis_hc"],
            'nom_mucosas'=> $data["nom_mucosas"],
            'observaciones_hc'=> $data["observaciones_hc"],
            'nom_revext' => $data["nom_revext"],
            'sis_nervioso_hc' => $data["sis_nervioso_hc"],
            'sis_respiratorio_hc'=> $data["sis_respiratorio_hc"],
            'temperatura_hc'=> $data["temperatura_hc"],
            'frec_cardiaca_hc'=> $data["frec_cardiaca_hc"],
            'peso_hc'=> $data["peso_hc"],
        
            'pruebas_complementarias_hc'=> $data["pruebas_complementarias_hc"],
            'diagn_presuntivo_hc'=> $data["diagn_presuntivo_hc"],
            'diagn_confirmado_hc'=> $data["diagn_confirmado_hc"],
        
            'hreposicion_hc'=> $data["hreposicion_hc"],
            'hmantenimiento_hc'=> $data["hmantenimiento_hc"],
            'hperdidas_hc'=> $data["hperdidas_hc"]
        
        );
        while($data=mysqli_fetch_assoc($res2)){
                $tratamiento_diagnostico[$cont] = array(
                    'farmaco_td' => $data["farmaco_td"],
                    'accion_td' => $data["accion_td"],
                    'dosis_td' => $data["dosis_td"],
                    'via_td' => $data["via_td"],
                    'hora_td' => $data["hora_td"]
                );
                $cont++;
            }
        $result = json_encode(array("success"=>true,"VerHcli"=>$datauser,"tratamiento_diagnostico"=>$tratamiento_diagnostico));
        }
        else{
            $result = json_encode(array("success"=>false,"msg"=>"Error al traer la información"));
        }
        echo $result;
    }
    
?>