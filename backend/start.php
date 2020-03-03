<?php
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS' ) {
     return http_response_code(200);
}
// Vérification des paramètres reçus dans l'URL
if (isset($_GET["c"]) != '' && isset($_GET["f"]) != '')
{
    // Faire corresponde le nom de la class
    $class = ucfirst(strtolower($_GET["c"]));
    $function = $_GET["f"];

    // Vérifier que la class existe
    if (!file_exists("Entities/$class.php"))
    {
        return http_response_code(404);
    }

    // Appel des class
    require_once "Entities/Entity.php";
    require_once "Entities/$class.php";

    // Création d'une instance de la class
    $object = new $class();
    $object->Init();

    // Vérifier que la function voulue existe
    if (!method_exists($class, $function))
    {
        return http_response_code(404);
    }

    // Si la function contient une certaine chaine de charachtère
    // MLD = Must Be Logged
    if (strpos($function, 'MBL') !== false)
    {
      if ($object->CheckToken()) {
        echo json_encode($object->$function());
      } else {
        return http_response_code(401);
      }
    // MBAD = Must Be Administrator (et aussi connecté)
    } elseif(strpos($function, 'MBAD') !== false)
    {
      if ($object->CheckToken(true)) {
        echo json_encode($object->$function());
      } else {
        return http_response_code(401);
      }
    } else {
      // Executer la fonction voulue
      echo json_encode($object->$function());
    }



}
