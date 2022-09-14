<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: Content-Type");
    include("conexion.php");

    //METODO GET
    if($_SERVER['REQUEST_METHOD'] === 'GET'){
        if(isset($_GET['id_user'])){
            $id_user = $mysqli ->real_escape_string($_GET['id_user']);
            $sql = $mysqli->query("SELECT tblusers.*, tblcargos.ncargo FROM tblusers INNER JOIN tblcargos ON tblusers.id_cargo = tblcargos.id_cargo WHERE id_user= '$id_user'");
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
    //METODO POST 
    if($_SERVER['REQUEST_METHOD'] === 'POST'){
        $data = json_decode(file_get_contents("php://input"));
        echo $data;
        $sql = $mysqli -> query("INSERT INTO tblusers (name, email, password, id_cargo) VALUES ('".$data->name.
        "', '".$data->email."','".$data->password."', '".$data->id_cargo."')");
        if($sql){
            $data->id_user= $mysqli->insert_id_user;
            exit(json_encode($data));
        }else{
            exit(json_encode(array('status' => 'error')));
        }
    }
    //METODO PUT
    if($_SERVER['REQUEST_METHOD'] === 'PUT'){
        if(isset($_GET['id_user'])){
            $id_user = $mysqli->real_escape_string($_GET['id_user']);
            $data = json_decode(file_get_contents("php://input"));
            $sql = $mysqli->query("UPDATE students SET 
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
    //METODO DELETE
    if($_SERVER['REQUEST_METHOD'] === 'DELETE'){
        if(isset($_GET['id_user'])){
            $id_user = $mysqli->real_escape_string($_GET['id_user']);
            $sql = $mysqli->query("DELETE FROM tblusers WHERE id_user = '$id_user'");

            if($sql){
                exit(json_encode(array('status' => 'success')));
            }else{
                exit(json_encode(array('status' => 'error')));
            }
        }
    }
?>