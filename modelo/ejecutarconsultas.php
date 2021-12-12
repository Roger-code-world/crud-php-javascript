<?php
    require_once "../php/conexion.php";
    require_once "../controlador/ConsultasController.php";
    $tipo_consulta = $_POST['tipo_operacion'];
    switch ($tipo_consulta) {
        case 'guardar':
            $nombre = $_POST['nombre'];
            $apellidos = $_POST['apellidos'];
            $sexo =$_POST['sexo'];
            $consultas = new consultas();
            $ejecutar = $consultas->insert_persona($nombre,$apellidos,$sexo);
            echo json_encode($ejecutar);
        break;
        case 'editar':
            $id = $_POST['id'];
            $consultas = new consultas();
            $ejecutar = $consultas->obtener_persona($id);
            echo json_encode($ejecutar);
            break;
        case 'update':
                $id = $_POST["idu"];
                $nombre = $_POST["nombreu"];
                $apellidos= $_POST["apellidosu"];
                $sexo= $_POST["sexou"];
                $consultas = new consultas();
                $ejecutar = $consultas->update_persona($id,$nombre,$apellidos,$sexo);
                echo json_encode($ejecutar);
            break;    
        case 'eliminar':
            $id = $_POST['id'];
            $consultas = new consultas();
            $ejecutar = $consultas->eliminar_persona($id);
            echo json_encode($ejecutar);
            break;    
        default:
            # code...
            break;
    }

?>