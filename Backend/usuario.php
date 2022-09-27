<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
include("conexion.php");

$postjson = json_decode(file_get_contents("php://input"), TRUE);

if ($postjson['aksi'] == "login") {
    $email = $postjson["email"];
    $contrasena = $postjson["password"];
    $res = $mysqli->query("SELECT id_user, id_cargo FROM tblusers 
    WHERE email='$email' AND password='$contrasena' AND estado='1'");
    $check = mysqli_num_rows($res);

    if ($check > 0) {
        $data = mysqli_fetch_array($res);
        $datauser = array(
            'id' => $data["id_user"],
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

    $res = $mysqli->query("SELECT C.ncargo, U.name, U.email, U.id_user 
    FROM tblusers as U INNER JOIN tblcargos as C ON U.id_cargo=C.id_cargo WHERE U.estado='1'");
    $cont = 0;
    $check = mysqli_num_rows($res);

    if ($check > 0) {
        while ($data = mysqli_fetch_assoc($res)) {
            $datauser[$cont] = array(
                'id_user' => $data["id_user"],
                'ncargo' => $data["ncargo"],
                'name' => $data["name"],
                'email' => $data["email"]
            );
            $cont++;
        };
        $result = json_encode(array('success' => TRUE, "listUsers" => $datauser));
    } else {
        $result = json_encode(array('success' => false, 'msg' => 'No existen usuarios registrados'));
    }
    echo $result;
} else if ($postjson['aksi'] == "register-user") {
    $name = $postjson['name'];
    $email = $postjson['email'];
    $password = $postjson['password'];
    $id_cargo = $postjson['id_cargo'];
    $res = $mysqli->query("INSERT INTO tblusers SET name='$name', email='$email', password='$password', id_cargo=$id_cargo");
    if ($res) {
        $result = json_encode(array("success" => TRUE, "msg" => "Usuario Registrado con exito"));
    } else {
        $result = json_encode(array("success" => false, 'msg' => 'Hubo un error al registrar al usuario'));
    }
    echo $result;
} else if ($postjson['aksi'] == "update-user") {
    $id_user = $postjson['id_user'];
    $name = $postjson['name'];
    $email = $postjson['email'];
    $id_cargo = $postjson['id_cargo'];

    $res = $mysqli->query("UPDATE tblusers SET name='$name', email='$email', id_cargo='$id_cargo'
    WHERE id_user=$id_user");

    if ($res) {
        $result = json_encode(array("success" => TRUE, "msg" => "Usuario Actualizado"));
    } else {
        $result = json_encode(array("success" => false, 'msg' => 'Hubo un error al actualizar al usuario'));
    }
    echo $result;
} else if ($postjson['aksi'] == "delete-user") {
    $id_user = $postjson['id_user'];

    $res = $mysqli->query("UPDATE tblusers SET estado='0' WHERE id_user=$id_user");
    if ($res) {
        $result = json_encode(array("success" => TRUE, "msg" => "Usuario Eliminado"));
    } else {
        $result = json_encode(array("success" => false, 'msg' => 'Hubo un error al eliminar al usuario'));
    }
    echo $result;
} else if ($postjson['aksi'] == "profile-user") {
    $id_user = $postjson["id_user"];
    $res = $mysqli->query("SELECT id_user, name, email, password FROM tblusers WHERE id_user=$id_user");

    $check = mysqli_num_rows($res);
    if ($check > 0) {
        $data = mysqli_fetch_array($res);
        $datauser = array(
            'id_user' => $data["id_user"],
            'name' => $data["name"],
            'email' => $data["email"],
            'password' => $data["password"]
        );
        $result = json_encode(array('success' => TRUE, "result" => $datauser));
    } else {
        $result = json_encode(array('success' => false, 'msg' => 'error porfavor intente nuevamente'));
    }
    echo $result;
} else if ($postjson['aksi'] == "reactivate-user") {
    $id_user = $postjson['id_user'];

    $res = $mysqli->query("UPDATE tblusers SET estado='1' WHERE id_user=$id_user");
    if ($res) {
        $result = json_encode(array("success" => TRUE, "msg" => "Usuario Eliminado"));
    } else {
        $result = json_encode(array("success" => false, 'msg' => 'Hubo un error al activar al usuario'));
    }
    echo $result;
}
else if ($_GET['aksi'] == "listDis-users") {

    $res = $mysqli->query("SELECT C.ncargo, U.name, U.email, U.id_user 
    FROM tblusers as U INNER JOIN tblcargos as C ON U.id_cargo=C.id_cargo WHERE U.estado='0'");
    $cont = 0;
    $check = mysqli_num_rows($res);

    if ($check > 0) {
        while ($data = mysqli_fetch_assoc($res)) {
            $datauser[$cont] = array(
                'id_user' => $data["id_user"],
                'ncargo' => $data["ncargo"],
                'name' => $data["name"],
                'email' => $data["email"]
            );
            $cont++;
        };
        $result = json_encode(array('success' => TRUE, "listDisUsers" => $datauser));
    } else {
        $result = json_encode(array('success' => false, 'msg' => 'No existen usuarios deshabilitados'));
    }
    echo $result;
}