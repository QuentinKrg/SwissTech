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
// Ajout d'une image
function uploadImg()
{
  // Vérifier que l'on reçoit bien un fichier dans la requête HTTP
  if($_FILES != null)
  {
    // Chemin de où sont stockées les images
    $target_dir = "Products/";
    // Chemin complet avec le nom du fichier reçu
    $target_file = $target_dir . basename($_FILES["image"]["name"]);
    // Boolean qui permettra de dire si on peut ou pas enregistrer l'image
    $uploadOk = 1;
    // Extension du fichier reçu
    $imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
    // Nom du fichier reçu
    $imageFileName = strtolower(pathinfo($target_file,PATHINFO_FILENAME));
    // Nom complet : nom + extension
    $fileName = $_FILES["image"]["name"];

    // Vérifier si l'image existe déjà
    if(file_exists($target_file))
    {
      $uploadOk = 0;
    }

    // Définir une taille limite pour les images si plus grande que 500 KB
    if($_FILES["image"]["size"] > 500000)
    {
      $uploadOk = 0;
    }

    // Définir les types de fichiers voulues (png, jpg, jpeg, gif)
    if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg" && $imageFileType != "gif")
    {
      $uploadOk = 0;
    }
    // Résultats
    if ($uploadOk == 0) {
      // Retourner une erreur
    } else {
      // Déplacement du fichier vers le répertoire voulu et check si ça c'est correctement passé
      if(move_uploaded_file($_FILES["image"]["tmp_name"], $target_file))
      {
        // Requête pour voir si le fichier existe déjà en bdd ou non
        $sql0 = "SELECT * FROM t_images WHERE t_images.ImagePath= '$fileName'";
        // Exécution de la requête + stockage du retour
        $tmpResult = ($this->Query($sql0)->fetch( PDO::FETCH_ASSOC));
        // Si le retour est égal à NULL cela veut dire que l'image n'existe pas en bdd, on peut donc l'insert
        if($tmpResult==null){
          // Ajout des informations de l'image en DB
          $sql = "INSERT INTO t_images (t_images.ImageName, t_images.ImagePath)
          VALUES ( '$imageFileName','$fileName')";
          $this->Query($sql);
        }else{
          // Cela signifie que l'image existe déjà en bdd => nme retourne rien
          return;
        }
      }
    }
  }
}

 ?>
