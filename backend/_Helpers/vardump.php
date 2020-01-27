<?php
// Function vardump pimpée
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
