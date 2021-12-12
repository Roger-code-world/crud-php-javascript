<?php
class consultas extends dbconexion{
    public function select_persona()
    {
        $sqlp = dbconexion::conexion()->prepare("SELECT * FROM persona");
        $sqlp->execute();
        return $array = $sqlp->fetchAll(PDO::FETCH_ASSOC);
    }
    public function insert_persona($nombre,$apellidos,$sexo)
    {
        $sql = dbconexion::conexion()->prepare("INSERT INTO persona(nombre,apellidos,sexo)VALUES('$nombre','$apellidos','$sexo')");
        if ($sql->execute()) {
            $resultado = self::select_persona();
            return $resultado;
        }
    }
    public function obtener_persona($id){
        $sql = dbconexion::conexion()->prepare("SELECT * FROM persona WHERE idpersona='".$id."'");
        if($sql->execute()){
            return $array = $sql->fetchAll(PDO::FETCH_ASSOC);
        }else {
            return "error";
        }
    }
    public function update_persona($id,$nombre,$apellidos,$sexo){
        $sql = dbconexion::conexion()->prepare("UPDATE persona SET nombre='".$nombre."', apellidos='".$apellidos."', sexo='".$sexo."'  WHERE idpersona='".$id."'");
        $sql->execute();
        if ($sql->rowCount() > 0) {
            $resultado = self::select_persona();
            return $resultado;
        }else{
            return "error";
       }
    }
    public function eliminar_persona($id){
        $sql=dbconexion::conexion()->prepare("DELETE FROM persona WHERE idpersona='".$id."'");
        $sql->execute();
        if ($sql->rowCount() > 0) {
            $resultado = self::select_persona();
            return $resultado;
            // return "Se elimino correctamente el registro";
        }else{
            return "Ocurrio un problema";
        }
    }
   
}
?>