<?php 
    const SERVER="localhost";
    const DB="ejemplo";
    const USER="root";
    const PASS="";
    const UTF8="utf8";

    const SGBD= "mysql:host=".SERVER.";dbname=".DB.";charset=".UTF8;

    class dbconexion{
        
        protected function conexion()
        {
            $con = new PDO(SGBD,USER,PASS);
            return $con;
        }
    }
   

?>