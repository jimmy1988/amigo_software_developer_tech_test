var xhr = null;
var currentlocation = {};

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
    jsonResponseData = jsonResponseData.data;
    var src = weatherImageURL + jsonResponseData.weather[0].icon + weatherImageType;
    $("#weather-icon").html("<img alt='weather icon' class='weather-icon' width='100%' height='100%' src='" + src + "'/>");
    $("#weather-temp").html(Math.floor(jsonResponseData.main.temp) + "&#8451;");
    $("#weather-location").html(jsonResponseData.name);
    var now = new Date();
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var timeSetting = "";
    if(now.getHours() >= 0 && now.getHours() < 12){
      timeSetting = "AM";
    }else{
      timeSetting = "PM";
    }
    $("#weather-updated-info").html(now.getDate() + " " + months[now.getMonth()] + " " + now.getFullYear() + " " + now.getHours() + ":" + now.getMinutes() + timeSetting);
  }
}

function sendWeatherRequest(){
  var query = "ajax=true&lat=" + currentlocation.lat + "&lng=" + currentlocation.lng;

  xhr.onreadystatechange = getWeatherResponse;

  xhr.open("GET", "php/getWeatherInformation.php?" + query, true);
  xhr.send();
}

$(document).ready(function(){
  getLocationInformation();
});
