<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
include("conexion.php");

$postjson = json_decode(file_get_contents("php://input"), TRUE);

if ($postjson['aksi'] == "registrar-as") {
    $id_especies = $postjson['id_especies'];
    $nom_cientifico = $postjson['nom_cientifico'];
    $nom_comun = $postjson['nom_comun'];
    $id_edad = $postjson['id_edad'];
    $id_sexo = $postjson['id_sexo'];
    $res = $mysqli->query("INSERT INTO animal_silvestre SET id_especies=$id_especies, nom_cientifico='$nom_cientifico', nom_comun='$nom_comun', id_edad=$id_edad, id_sexo=$id_sexo");
    if ($res) {
        $result = json_encode(array("success" => TRUE, "msg" => "Animal Silvestre Registrado con exito"));
    } else {
        $result = json_encode(array("success" => false, 'msg' => 'Hubo un error al registrar al usuario'));
    }
    echo $result;
}
else if ($_GET['aksi'] == "list-animals") {

    $res = $mysqli->query("SELECT A.id_animal_silvestre, E.nom_especies, A.nom_cientifico, A.nom_comun, ED.nom_edad, S.nom_sexo
    FROM animal_silvestre as A 
    INNER JOIN especies as E 
    ON A.id_especies=E.id_especies
    INNER JOIN edad as ED
    ON A.id_edad = ED.id_edad
    INNER JOIN sexo as S
    ON A.id_sexo = S.id_sexo 
    WHERE A.estado_as ='1'");
    $cont = 0;
    $check = mysqli_num_rows($res);

    if ($check > 0) {
        while ($data = mysqli_fetch_assoc($res)) {
            $datauser[$cont] = array(
                'id_animal_silvestre' => $data["id_animal_silvestre"],
                'nom_especies' => $data["nom_especies"],
                'nom_cientifico' => $data["nom_cientifico"],
                'nom_comun' => $data["nom_comun"],
                'nom_edad' => $data["nom_edad"],
                'nom_sexo' => $data["nom_sexo"],

            );
            $cont++;
        };
        $result = json_encode(array('success' => TRUE, "listAnimals" => $datauser));
    } else {
        $result = json_encode(array('success' => false, 'msg' => 'No existen animales registrados'));
    }
    echo $result;
}else if ($postjson['aksi'] == "update-as") {
    $id_animal_silvestre = $postjson['id_animal_silvestre'];
    $id_especies = $postjson['id_especies'];
    $nom_cientifico = $postjson['nom_cientifico'];
    $nom_comun = $postjson['nom_comun'];
    $id_edad = $postjson['id_edad'];
    $id_sexo = $postjson['id_sexo'];

    $res = $mysqli->query("UPDATE animal_silvestre 
    SET id_especies='$id_especies', 
    nom_cientifico='$nom_cientifico',
    nom_comun='$nom_comun',
    id_edad='$id_edad', 
    id_sexo='$id_sexo'
    WHERE id_animal_silvestre=$id_animal_silvestre");

    if ($res) {
        $result = json_encode(array("success" => TRUE, "msg" => "Datos del animal silvestre actualizado"));
    } else {
        $result = json_encode(array("success" => false, 'msg' => 'Hubo un error al actualizar los datos del animal silvestre'));
    }
    echo $result;
} else if ($postjson['aksi'] == "delete-as") {
    $id_animal_silvestre = $postjson['id_animal_silvestre'];

    $res = $mysqli->query("UPDATE animal_silvestre SET estado_as='0' WHERE id_animal_silvestre=$id_animal_silvestre");
    if ($res) {
        $result = json_encode(array("success" => TRUE, "msg" => "Animal silvestre eliminado"));
    } else {
        $result = json_encode(array("success" => false, 'msg' => 'Hubo un error al eliminar al animal silvestre'));
    }
    echo $result;
}
else if ($postjson['aksi'] == "incluir-as") {
    $id_animal_silvestre = $postjson['id_animal_silvestre'];

    $res = $mysqli->query("UPDATE animal_silvestre SET estado_as='1' WHERE id_animal_silvestre=$id_animal_silvestre");
    if ($res) {
        $result = json_encode(array("success" => TRUE, "msg" => "Animal silvestre incluido"));
    } else {
        $result = json_encode(array("success" => false, 'msg' => 'Hubo un error al eliminar al animal silvestre'));
    }
    echo $result;
}else if ($_GET['aksi'] == "list-eliminate") {

    $res = $mysqli->query("SELECT A.id_animal_silvestre, E.nom_especies, A.nom_cientifico, A.nom_comun, ED.nom_edad, S.nom_sexo
    FROM animal_silvestre as A 
    INNER JOIN especies as E 
    ON A.id_especies=E.id_especies
    INNER JOIN edad as ED
    ON A.id_edad = ED.id_edad
    INNER JOIN sexo as S
    ON A.id_sexo = S.id_sexo 
    WHERE A.estado_as ='0'");
    $cont = 0;
    $check = mysqli_num_rows($res);

    if ($check > 0) {
        while ($data = mysqli_fetch_assoc($res)) {
            $datauser[$cont] = array(
                'id_animal_silvestre' => $data["id_animal_silvestre"],
                'nom_especies' => $data["nom_especies"],
                'nom_cientifico' => $data["nom_cientifico"],
                'nom_comun' => $data["nom_comun"],
                'nom_edad' => $data["nom_edad"],
                'nom_sexo' => $data["nom_sexo"],

            );
            $cont++;
        };
        $result = json_encode(array('success' => TRUE, "listDisAnimals" => $datauser));
    } else {
        $result = json_encode(array('success' => false, 'msg' => 'No existen animales registrados'));
    }
    echo $result;
}
?>