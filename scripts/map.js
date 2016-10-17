// change default camera centre on opening application
var west = -95.0;
var south = -20.0;
var east = 180.0;
var north = 21.0;
var rectangle = Cesium.Rectangle.fromDegrees(west, south, east, north);
Cesium.Camera.DEFAULT_VIEW_FACTOR = 2.01;
Cesium.Camera.DEFAULT_VIEW_RECTANGLE = rectangle;

var viewModels = Cesium.createDefaultImageryProviderViewModels();
var viewer = new Cesium.Viewer('cesiumContainer', {
  fullscreenButton: false, // disable fullscreen button
  geocoder: false, // disable default searchbar
  homeButton: true, // disable home button
  sceneModePicker: true, // disable 2d/3d toggler
  animation: false,
  timeline: false,
  navigationHelpButton: true,
  // set default imagery to bing maps aerial with labels
  selectedImageryProviderViewModel: viewModels[1]
  // set map to be viewed in 2d by default
  //sceneMode: Cesium.SceneMode.SCENE2D
});

// function for getting real-time clock
function startTime() {
  var today = new Date();
  var date = today.toString().substr(0,15);

  //date
  var h = today.getHours();
  var meridiem = "";
  if(h > 11){
    meridiem = "pm"
  }else{
    meridiem ="am"
  }
  //time
  if(h==0){
    h = 12;
  }else{
    h = h%12;
  }
  m = checkTime(today.getMinutes());
  s = checkTime(today.getSeconds());
  var time =  h + ":" + m + ":" + s + meridiem;

  document.getElementById('time-date').innerHTML = time + "<span style=\"display:inline-block; width: 50px;\"></span>" + date;
  var t = setTimeout(startTime, 500);
}
function checkTime(i) {
  if (i < 10) {i = "0" + i};
  return i;
}