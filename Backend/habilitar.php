<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
include("conexion.php");
$postjson = json_decode(file_get_contents("php://input"),TRUE);
if ($postjson['aksi'] == "reactivate-user") {
    $id_user = $postjson['id_user'];
    $res = $mysqli->query("UPDATE tblusers SET estado='1' WHERE id_user=$id_user");

    if ($res) {
        $result = json_encode(array("success" => TRUE, "msg" => "Usuario Actualizado"));
    } else {
        $result = json_encode(array("success" => false, 'msg' => 'Hubo un error al actualizar al usuario'));
    }
    echo $result;
}
?>