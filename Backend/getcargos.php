<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: Content-Type");
    include("conexion.php");

    //METODO GET
    if($_SERVER['REQUEST_METHOD'] === 'GET'){
        if(isset($_GET['id_user'])){
            $id_user = $mysqli ->real_escape_string($_GET['id_user']);
            $sql = $mysqli->query("SELECT * FROM tblcargos");
            $data = $sql -> fetch_assoc();
        }else{
            $data = array();
            $sql = $mysqli->query("SELECT * FROM tblcargos");
            while ($d = $sql -> fetch_assoc()){
                $data[] = $d;
            }
        }
        exit(json_encode($data));
    }
?>