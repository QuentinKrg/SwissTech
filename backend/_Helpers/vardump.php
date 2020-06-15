<?php
// Function vardump customisée
// Cette fonction nous permet de débuger les retours que nous faisons
function vardump($var, $exit=false){

  ?>

  <pre>
    <?php var_dump($var);?>
  </pre>

  <?php

  if($exit){
    Exit();
  }
}

 ?>
