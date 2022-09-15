<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: Content-Type");
    include("conexion.php");

//METODO POST 
    if($_SERVER['REQUEST_METHOD'] === 'POST'){
        $data = json_decode(file_get_contents("php://input"));
        // echo $data;
        // $sql = $mysqli -> query("INSERT INTO tblusers (name, email, password, id_cargo) VALUES ('".$data->name.
        // "', '".$data->email."','".$data->password."', '".$data->id_cargo."')");
        $sql = $mysqli -> query("SELECT * FROM tblusers");
        if($sql){
            $data->id_user= $mysqli->insert_id_user;
            exit(json_encode($data));
        }else{
            exit(json_encode(array('status' => 'error')));
        }
    }
?>