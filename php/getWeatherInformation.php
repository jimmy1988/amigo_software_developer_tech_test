<?php
  include("init.php");

  if(isset($_GET['ajax']) && !empty($_GET['ajax']) && $_GET['ajax'] == "true" && isset($_GET['lat']) && isset($_GET['lng'])){
    $weatherData = getWeatherData((float) $_GET['lat'], (float) $_GET['lng']);

    if($weatherData){
      echo generateMessages(true, $weatherData, array("Weather Data Retrieved Successfully"), array());
    }else{
      echo generateMessages(false, array(), array(), array("Cannot retrieve weather data"));
    }
  }elseif(isset($_GET['ajax']) && !empty($_GET['ajax']) && $_GET['ajax'] == "true" && (!isset($_GET['lat']) || !isset($_GET['lng']))){

    $ip_address = get_client_ip();
    if($ip_address == "localhost"  || $ip_address == "127.0.0.1"){
      $ip_address = "151.230.136.143";
    }

    if(defined("IP_INFO_URL")){
      $json = json_decode(file_get_contents(IP_INFO_URL . $ip_address), true);

      if(isset($json['loc']) && !empty($json['loc'])){
        $location = explode(",", $json['loc']);
        $lat = $location[0];
        $lng = $location[1];

        if(isset($lat) && !empty($lat) && isset($lng) && !empty($lng)){
          $weatherData = getWeatherData($lat, $lng);

          if($weatherData){
            echo generateMessages(true, $weatherData, array("Weather Data Retrieved Successfully"), array());
          }else{
            echo generateMessages(false, array(), array(), array("Cannot retrieve weather data"));
          }
        }else{
          echo generateMessages(false, array(), array(), array("Latitude or Longitude is missing from the data needed"));
        }
      }else{
        echo generateMessages(false, array(), array(), array("Cannot find location"));
      }
    }else{
      echo generateMessages(false, array(), array(), array("Constant 'IP_INFO_URL' not defined"));
    }

  }else{
    echo generateMessages(false, array(), array(), array("Incorrect data or amount of parameters submitted"));
  }


?>
