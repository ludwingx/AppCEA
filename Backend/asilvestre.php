<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
include("conexion.php");

$postjson = json_decode(file_get_contents("php://input"), TRUE);

if ($_GET['aksi'] == "list-AsilvestreSin") {

    $res = $mysqli->query("SELECT A.conosin_hc_as, PA.nombre_cientifico, PA.nombre_comun
    FROM animal_silvestre as A INNER JOIN procedente_atencion as PA ON A.id_procedente_atencion=PA.id_procedente_atencion WHERE A.conosin_hc_as = '0' AND A.estado_as='1'");
    $cont = 0;
    $check = mysqli_num_rows($res);

    if ($check > 0) {
        while ($data = mysqli_fetch_assoc($res)) {
            $datauser[$cont] = array(
                'id_animales_silvestre' => $data["id_animales_silvestre"],
                'conosin_hc_as' => $data["conosin_hc_as"],
                'nombre_cientifico' => $data["nombre_cientifico"],
                'nombre_comun' => $data["nombre_comun"],

            );
            $cont++;
        };
        $result = json_encode(array('success' => TRUE, "listAsilvestreSin" => $datauser));
    } else {
        $result = json_encode(array('success' => false, 'msg' => 'No existen usuarios registrados'));
    }
    echo $result;
    // }else if ($_GET['aksi'] == "list-AsilvestreCon") {

    //     $res = $mysqli->query("SELECT E.nom_especies, PA.nombre_cientifico, PA.nombre_comun, ED.nom_edad, SE.nom_sexo, PA.observaciones_rec
    //     FROM procedente_atencion as PA
    //     INNER JOIN especies as E
    //     ON PA.id_especies = E.id_especies
    //     INNER JOIN edad as ED
    //     ON PA.id_edad = ED.id_edad
    //     INNER JOIN sexo as SE
    //     ON PA.id_sexo = SE.id_sexo");
    
    //     $res2 = $mysqli->query("SELECT A.conosin_hc_as, A.estado_as 
    //     FROM procedente_atencion as PA
    //     INNER JOIN animal_silvestre as A
    //     ON PA.id_procedente_atencion = A.id_procedente_atencion 
    //     WHERE A.conosin_hc_as = '1'");
    
    //     $check =mysqli_num_rows($res);
    //     $check2 =mysqli_num_rows($res2);
    
    //     if($check > 0 && $check2 > 0){
    //         $data= mysqli_fetch_array($res);
    //         $datauser = array(
    //             'nom_especies' => $data["nom_especies"],
    //             'nombre_cientifico' => $data["nombre_cientifico"],
    //             'nombre_comun' => $data["nombre_comun"],
    //             'nom_edad' => $data["nom_edad"],
    //             'nom_sexo' => $data["nom_sexo"],
    //             'observaciones_rec' => $data["observaciones_rec"],
    //             'conosin_hc_as' => $data["conosin_hc_as"],
    //             'estado_as' => $data["estado_as"]
    //         );
        
    //         $result = json_encode(array('success' => TRUE, "listAsilvestreCon" => $datauser));
    //     } else {
    //         $result = json_encode(array('success' => false, 'msg' => 'No existen animales silvestres registrados'));
    //     }
    //     echo $result;
        }
?>