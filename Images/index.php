<?php

// Vérifier les paramètres reçus
if(isset($_GET['f'])) {
  // Récupération de la fonction
  $function = $_GET['f'];

  // Vérifier que la fonction existe
  if(!function_exists($function)) {
    return http_response_code(404);
  }

  // Vérifier s'il on reçoit un paramètre pour la fonction (le nom de l'image)
  if(isset($_GET['img'])) {
    $function(htmlspecialchars($_GET['img']));
  } else {
    $function();
  }



}

// Fonction d'ajout d'une image
function getImg($imgName) {
  $im = file_get_contents('Products/'.$imgName);
  header('content-type: image/jpg');
  echo $im;
}
// Fonction de vérification d'une image

// Fonction d'affichage d'une image


 ?>

 <!DOCTYPE html>
 <html lang="en" dir="ltr">
   <head>
     <meta charset="utf-8">
     <title></title>
   </head>
   <body>
      <img src="http://localhost/swisstech/Images/index.php?f=getImg&img=58905748_xxl.jpg" alt="">
   </body>
 </html>
