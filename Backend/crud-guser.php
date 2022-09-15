<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: Content-Type");
    include("conexion.php");

    //METODO GET
    if($_SERVER['REQUEST_METHOD'] === 'GET'){
        if(isset($_GET['id_user'])){
            $id_user = $mysqli ->real_escape_string($_GET['id_user']);
            $sql = $mysqli->query("SELECT tblusers.*, tblcargos.ncargo FROM tblusers INNER JOIN tblcargos ON tblusers.id_cargo = tblcargos.id_cargo WHERE id_user= '$id_user' AND estado = '1'");
            $data = $sql -> fetch_assoc();
        }else{
            $data = array();
            $sql = $mysqli->query("SELECT tblusers.*, tblcargos.ncargo FROM tblusers INNER JOIN tblcargos ON tblusers.id_cargo = tblcargos.id_cargo");
            while ($d = $sql -> fetch_assoc()){
                $data[] = $d;
            }
        }
        exit(json_encode($data));
    }
    //METODO PUT
    if($_SERVER['REQUEST_METHOD'] === 'PUT'){
        if(isset($_GET['id_user'])){
            $id_user = $mysqli->real_escape_string($_GET['id_user']);
            $data = json_decode(file_get_contents("php://input"));
            $sql = $mysqli->query("UPDATE tblusers SET 
            name= '".$data->name."',
            email= '".$data->email."',
            password= '".$data->password."'
            WHERE id_user = '$id_user'");
            if($sql){
                exit(json_encode(array('status' => 'success')));
            }else{
                exit(json_encode(array('status' => 'error')));
            }
        }
    }

?>