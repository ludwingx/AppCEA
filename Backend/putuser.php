<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: Content-Type");
    include("conexion.php");
//METODO DELETE
    if($_SERVER['REQUEST_METHOD'] === 'GET'){
        if(isset($_GET['id_user'])){
            $id_user = $mysqli->real_escape_string($_GET['id_user']);
            $sql = $mysqli->query("UPDATE tblusers SET estado = '0' WHERE id_user= '$id_user'");

            if($sql){
                exit(json_encode(array('status' => 'success')));
            }else{
                exit(json_encode(array('status' => 'error')));
            }
        }
    }
?>