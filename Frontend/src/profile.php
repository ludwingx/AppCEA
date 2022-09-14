<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: Content-Type");
    include("conexion.php");
    //Traer datos de usuarios
    if($_SERVER['REQUEST_METHOD'] === 'GET'){
        if(isset($_GET['id_user'])){
            $id_user = $mysqli ->real_escape_string($_GET['id_user']);
            $sql = $mysqli->query("SELECT * FROM tblusers WHERE id_user= '$id_user'");
            $data = $sql -> fetch_assoc();
        }else{
            $data = array();
            $sql = $mysqli->query("SELECT * FROM tblusers");
            while ($d = $sql -> fetch_assoc()){
                $data[] = $d;
            }
        }
        exit(json_encode($data));
    }
    // if($_SERVER['REQUEST_METHOD'] === 'POST'){
        
    // }
    // if($_SERVER['REQUEST_METHOD'] === 'PUT'){
        
    // }
    // if($_SERVER['REQUEST_METHOD'] === 'DELETE'){
        
    // }
?>