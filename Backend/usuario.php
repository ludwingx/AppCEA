<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
include("conexion.php");

$postjson = json_decode(file_get_contents("php://input"), TRUE);

if ($postjson['aksi'] == "login") {
    $email_u = $postjson["email_u"];
    $password_u = $postjson["password_u"];
    $res = $mysqli->query("SELECT id_usuario, id_cargo FROM usuarios 
    WHERE email_u='$email_u' AND password_u='$password_u' AND estado_u='1'");
    $check = mysqli_num_rows($res);

    if ($check > 0) {
        $data = mysqli_fetch_array($res);
        $datauser = array(
            'id_usuario' => $data["id_usuario"],
            'id_cargo' => $data["id_cargo"]
        );
        if ($res) {
            $result = json_encode(array('success' => TRUE, "result" => $datauser));
        } else {
            $result = json_encode(array('success' => false, 'msg' => 'error porfavor intente nuevamente'));
        }
    } else {
        $result = json_encode(array('success' => false, 'msg' => 'Cuenta no registrada'));
    }
    echo $result;
} else if ($_GET['aksi'] == "list-users") {

    $res = $mysqli->query("SELECT C.nom_cargo, U.nombre_u, U.email_u, U.id_usuario, U.password_u, U.id_cargo, U.firma_u, U.foto_u 
    FROM usuarios as U INNER JOIN cargos as C ON U.id_cargo=C.id_cargo WHERE U.estado_u='1'");
    $cont = 0;
    $check = mysqli_num_rows($res);

    if ($check > 0) {
        while ($data = mysqli_fetch_assoc($res)) {
            $datauser[$cont] = array(
                'id_usuario' => $data["id_usuario"],
                'nom_cargo' => $data["nom_cargo"],
                'nombre_u' => $data["nombre_u"],
                'email_u' => $data["email_u"],
                'password_u' => $data["password_u"],
                'id_cargo' => $data["id_cargo"],
                'firma_u' => $data["firma_u"],
                'foto_u' => $data["foto_u"]
            );
            $cont++;
        };
        $result = json_encode(array('success' => TRUE, "listUsers" => $datauser));
    } else {
        $result = json_encode(array('success' => false, 'msg' => 'No existen usuarios registrados'));
    }
    echo $result;
} else if ($postjson['aksi'] == "register-user") {
    $nombre_u = $postjson['nombre_u'];
    $email_u = $postjson['email_u'];
    $password_u = $postjson['password_u'];
    $id_cargo = $postjson['id_cargo'];
    $firma_u = $postjson['firma_u'];
    $res = $mysqli->query("INSERT INTO usuarios SET nombre_u='$nombre_u', email_u='$email_u', password_u='$password_u', id_cargo=$id_cargo, firma_u='$firma_u'");
    if ($res) {
        $result = json_encode(array("success" => TRUE, "msg" => "Usuario Registrado con exito"));
    } else {
        $result = json_encode(array("success" => false, 'msg' => 'Hubo un error al registrar al usuario'));
    }
    echo $result;
} else if ($postjson['aksi'] == "update-user") {
    $id_usuario = $postjson['id_usuario'];
    $nombre_u = $postjson['nombre_u'];
    $email_u = $postjson['email_u'];
    $password_u = $postjson['password_u'];
    $id_cargo = $postjson['id_cargo'];
    $firma_u = $postjson['firma_u'];

    $res = $mysqli->query("UPDATE usuarios SET nombre_u='$nombre_u', email_u='$email_u',password_u='$password_u', id_cargo='$id_cargo', firma_u='$firma_u'
    WHERE id_usuario=$id_usuario");

    if ($res) {
        $result = json_encode(array("success" => TRUE, "msg" => "Usuario Actualizado"));
    } else {
        $result = json_encode(array("success" => false, 'msg' => 'Hubo un error al actualizar al usuario'));
    }
    echo $result;
} else if ($postjson['aksi'] == "delete-user") {
    $id_usuario = $postjson['id_usuario'];

    $res = $mysqli->query("UPDATE usuarios SET estado_u='0' WHERE id_usuario=$id_usuario");
    if ($res) {
        $result = json_encode(array("success" => TRUE, "msg" => "Usuario Deshabilitado"));
    } else {
        $result = json_encode(array("success" => false, 'msg' => 'Hubo un error al eliminar al usuario'));
    }
    echo $result;
} else if ($postjson['aksi'] == "profile-user") {
    $id_usuario = $postjson["id_usuario"];
    $res = $mysqli->query("SELECT C.nom_cargo, U.nombre_u, U.email_u, U.id_usuario,U.id_cargo, U.password_u, U.firma_u, U.foto_u
    FROM usuarios as U INNER JOIN cargos as C ON U.id_cargo=C.id_cargo WHERE id_usuario='$id_usuario'");

    $check = mysqli_num_rows($res);
    if ($check > 0) {
        $data = mysqli_fetch_array($res);
        $datauser = array(
            'id_usuario' => $data["id_usuario"],
            'nombre_u' => $data["nombre_u"],
            'nom_cargo' => $data["nom_cargo"],
            'email_u' => $data["email_u"],
            'password_u' => $data["password_u"],
            'id_cargo' => $data["id_cargo"],
            'firma_u' => $data["firma_u"],
            'foto_u' => $data["foto_u"]
        );
        $result = json_encode(array('success' => TRUE, "result" => $datauser));
    } else {
        $result = json_encode(array('success' => false, 'msg' => 'error porfavor intente nuevamente'));
    }
    echo $result;
} else if ($_GET['aksi'] == "listDis-users") {

    $res = $mysqli->query("SELECT C.nom_cargo, U.nombre_u, U.email_u, U.id_usuario, U.password_u, U.id_cargo, U.firma_u, U.foto_u 
    FROM usuarios as U INNER JOIN cargos as C ON U.id_cargo=C.id_cargo WHERE U.estado_u='0'");
    $cont = 0;
    $check = mysqli_num_rows($res);

    if ($check > 0) {
        while ($data = mysqli_fetch_assoc($res)) {
            $datauser[$cont] = array(
                'id_usuario' => $data["id_usuario"],
                'nom_cargo' => $data["nom_cargo"],
                'nombre_u' => $data["nombre_u"],
                'email_u' => $data["email_u"],
                'password_u' => $data["password_u"],
                'id_cargo' => $data["id_cargo"],
                'firma_u' => $data["firma_u"],
                'foto_u' => $data["foto_u"]
            );
            $cont++;
        };
        $result = json_encode(array('success' => TRUE, "listDisUsers" => $datauser));
    } else {
        $result = json_encode(array('success' => false, 'msg' => 'No existen usuarios registrados'));
    }
    echo $result;
}else if ($postjson['aksi'] == "reactivate-user") {
    $id_usuario = $postjson['id_usuario'];
    $res = $mysqli->query("UPDATE usuarios SET estado_u='1' WHERE id_usuario=$id_usuario");

    if ($res) {
        $result = json_encode(array("success" => TRUE, "msg" => "Usuario Habilitado"));
    } else {
        $result = json_encode(array("success" => false, 'msg' => 'Hubo un error al habilitar al usuario'));
    }
    echo $result;
}else if ($postjson['aksi'] == "updatePhoto") {
    $id_usuario = $postjson['id_usuario'];
    $nombre_u = $postjson['nombre_u'];
    $email_u = $postjson['email_u'];
    $password_u = $postjson['password_u'];
    $foto_u = $postjson['foto_u'];

    $res = $mysqli->query("UPDATE usuarios SET nombre_u='$nombre_u', email_u='$email_u',password_u='$password_u', foto_u= '$foto_u'
    WHERE id_usuario=$id_usuario");

    if ($res) {
        $result = json_encode(array("success" => TRUE, "msg" => "Usuario Actualizado"));
    } else {
        $result = json_encode(array("success" => false, 'msg' => 'Hubo un error al actualizar al usuario'));
    }
    echo $result;
}
?>