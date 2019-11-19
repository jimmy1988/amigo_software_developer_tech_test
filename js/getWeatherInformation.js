var xhr = null;
var currentlocation = {};
var refreshButton = false;

function resetWidget(){
  $("#weather-icon").html("");
  $("#weather-temp").html("");
  $("#weather-location").html("");
  $("#weather-updated-info").html("");
  refreshButton = false;
  xhr = null;
  currentlocation = {};
  $("#messages-box").hide();
  $("#messages-all").html("");
}

function generateMessages(type = "error", message = ""){
  if(message != undefined && message != null && message != ""){
    var alertClass = "alert ";
    if(type == "error"){
      alertClass = alertClass + "alert-danger";
    }
  }else{
    return "";
  }
}

function getLocationInformation(){

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      currentlocation.lat = parseFloat(position.coords.latitude);
      currentlocation.lng = parseFloat(position.coords.longitude);
      prepareXHR();
    }, function() {
      console.log("error");
    }, {maximumAge:50, timeout:5000, enableHighAccuracy: true});
  }else{
    currentlocation.lat = 0;
    currentlocation.lng = 0;
    prepareXHR();
  }

}

function prepareXHR(){
  if (window.XMLHttpRequest) {
     // code for modern browsers
     xhr = new XMLHttpRequest();
   } else {
     // code for old IE browsers
     xhr = new ActiveXObject("Microsoft.XMLHTTP");
  }
  sendWeatherRequest();
}

function getWeatherResponse(){
  if (xhr.readyState == 4 && xhr.status == 200) {
    var jsonResponseData = JSON.parse(xhr.responseText);
    if(jsonResponseData.success == true || jsonResponseData.success == "true"){
      jsonResponseData = jsonResponseData.data;
      var src = weatherImageURL + jsonResponseData.weather[0].icon + "@2x" + weatherImageType;
      $("#weather-icon").html("<div id='weather-icon-container'><img alt='weather icon' class='weather-icon' width='100%' height='100%' src='" + src + "'/></div>");
      $("#weather-temp").html("<p id='temp-main'>" + Math.floor(jsonResponseData.main.temp) + "&#8451;" + "</p>");
      $("#weather-location").html("<p id='location-main'>" + jsonResponseData.name + "</p>");
      var now = new Date();
      var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      var timeSetting;
      var hour;
      var minutes;

      if(now.getHours() >= 0 && now.getHours() < 10){
        hour = "0" + now.getHours();
      }else{
        hour = now.getHours();
      }

      if(now.getMinutes() >= 0 && now.getMinutes() < 10){
        minutes = "0" + now.getMinutes();
      }else{
        minutes = now.getMinutes();
      }

      if(now.getHours() >= 0 && now.getHours() < 12){
        timeSetting = "AM";
      }else{
        timeSetting = "PM";
      }

      $("#weather-updated-info").html("<p id='date-info'><span>" + now.getDate() + " " + months[now.getMonth()] + " " + now.getFullYear() + "</span>&nbsp;<span> " + hour + ":" + minutes + timeSetting + "</span></p>");
    }else{
      var errors = jsonResponseData.messages.errors;
      for(var i = 0; i < errors.length; i++){
        $("#messages-all").append(generateMessages("error", errors[i]));
      }
      $("#messages-box").show();
    }

    if(refreshButton){
      $("#refresh-button").children().first().removeClass("fa-spin");
      refreshButton = false;
    }

  }
}

function sendWeatherRequest(){
  var query = "ajax=true&lat=" + currentlocation.lat + "&lng=" + currentlocation.lng;

  xhr.onreadystatechange = getWeatherResponse;

  xhr.open("GET", "php/getWeatherInformation.php?" + query, true);
  xhr.send();
}

$(document).ready(function(){
  resetWidget();
  getLocationInformation();

  $("#refresh-button").on("click", function(){
    event.preventDefault();
    $("#messages-box").hide();
    $("#messages-all").html("");
    refreshButton = true;
    $(this).children().first().addClass("fa-spin");
    setTimeout(getLocationInformation, 3000);
  })
});
