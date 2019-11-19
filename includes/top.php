<?php
  include("php/init.php");
?>
<!DOCTYPE html>
<html>
  <head>
    <title><?php echo isset($pageTitle) && !empty($pageTitle) ? $pageTitle : "";?> - <?php echo defined("APP_NAME") ? APP_NAME : ""; ?> </title>
    <?php include("includes/metaTags.php"); ?>
    <?php include("includes/styles.php"); ?>
  </head>
  <body>
    <div id="wrapper">
      <div class="container-fluid">
