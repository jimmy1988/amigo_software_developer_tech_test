<?php

  function generateMessages($success = false, $data = array(), $successMessages = array(), $errorMessages = array()){
    $messages = array();

    $messages['success'] = $success;
    $messages['messages']['errors'] = $errorMessages;
    $messages['messages']['success'] = $successMessages;
    $messages['data'] = $data;

    return json_encode($messages);
  }

  function get_client_ip()
  {
    $ipaddress = '';
    if (isset($_SERVER['HTTP_CLIENT_IP'])) {
        $ipaddress = $_SERVER['HTTP_CLIENT_IP'];
    } else if (isset($_SERVER['HTTP_X_FORWARDED_FOR'])) {
        $ipaddress = $_SERVER['HTTP_X_FORWARDED_FOR'];
    } else if (isset($_SERVER['HTTP_X_FORWARDED'])) {
        $ipaddress = $_SERVER['HTTP_X_FORWARDED'];
    } else if (isset($_SERVER['HTTP_FORWARDED_FOR'])) {
        $ipaddress = $_SERVER['HTTP_FORWARDED_FOR'];
    } else if (isset($_SERVER['HTTP_FORWARDED'])) {
        $ipaddress = $_SERVER['HTTP_FORWARDED'];
    } else if (isset($_SERVER['REMOTE_ADDR'])) {
        $ipaddress = $_SERVER['REMOTE_ADDR'];
    } else {
        $ipaddress = 'UNKNOWN';
    }

    return $ipaddress;
  }

  function getWeatherData($lat = null, $lng = null){
    if(isset($lat) && !empty($lat) && isset($lng) && !empty($lng) && defined("OPEN_WEATHER_API_URL") && defined("OPEN_WEATHER_API_KEY")){
      $lat = (float) $lat;
      $lng = (float) $lng;

      $json = json_decode(file_get_contents(OPEN_WEATHER_API_URL . "lat=" . $lat . "&lon=" . $lng), true);

      return $json;
    }else{
      return false;
    }
  }

?>
