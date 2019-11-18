<?php
  $pageTitle = "Home";
  include("includes/top.php");
?>
  <div class="row">
    <div class="col-md-12">
      <div class="row">
        <div class="col-md-6" id="weather-icon"></div>
        <div class="col-md-6" id="weather-temp"></div>
      </div>
      <div class="row">
        <div class="col-md-12" id="weather-location"></div>
      </div>
      <div class="row">
        <div class="col-md-10" id="weather-updated-info"></div>
        <div class="col-md-2" id="refresh-button">

        </div>
      </div>
    </div>
  </div>
  <script type="text/javascript">
    var weatherImageURL = "<?php echo OPEN_WEATHER_IMAGE_URL; ?>";
    var weatherImageType = "<?php echo OPEN_WEATHER_IMAGE_TYPE; ?>";
  </script>
  <script async defer type="text/javascript" src="js/getWeatherInformation.js"></script>
<?php
  include("includes/bottom.php");
?>
