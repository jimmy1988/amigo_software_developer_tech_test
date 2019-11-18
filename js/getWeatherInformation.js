var xhr = null;
var currentloc = {};

function getLocationInformation(){

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      currentloc.lat = parseFloat(position.coords.latitude);
      currentloc.lng = parseFloat(position.coords.longitude);
    }, function() {
      console.log("error");
    }, {maximumAge:50, timeout:5000, enableHighAccuracy: true});
  }else{
    currentloc.lat = 0;
    currentloc.lng = 0;
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
}

function getWeatherResponse(){
  xhr.open("GET", "demo_get.asp?t=" + Math.random(), true);
  xhr.send();
}

function sendWeatherRequest(){

}


$(document).ready(function(){
  getLocationInformation();
  prepareXHR();
  sendWeatherRequest();
});
