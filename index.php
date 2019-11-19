<?php
  $pageTitle = "Home";
  include("includes/top.php");
?>
  <div class="row">
    <div class="col-md-12">
      <div class="row">
        <div class="col-md-6">
          <div class="row">
            <div class="col-md-6 no-gutters" id="weather-icon"></div>
            <div class="col-md-6 no-gutters" id="weather-temp"></div>
          </div>
        </div>
        <div class="col-md-6">
          &nbsp;
        </div>
      </div>
      <div class="row">
        <div class="col-md-12 no-gutters" id="weather-location"></div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <div class="row">
            <div class="col-md-6">
              <div class="row">
                <div class="col-md-10 no-gutters" id="weather-updated-info"></div>
                <div class="col-md-2 no-gutters" id="refresh-button">
                  <a href="#" id="refresh-button"><i class="fas fa-sync-alt"></i></a>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              &nbsp;
            </div>
          </div>
        </div>
      </div>
      <div class="row" id="messages-box">
        <div class="col-md-12">
          <div id="messages-all">
            
          </div>
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
