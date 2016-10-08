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
  navigationHelpButton: false
  // set default imagery to bing maps aerial with labels
  //selectedImageryProviderViewModel: viewModels[2],
  // set map to be viewed in 2d by default
  //sceneMode: Cesium.SceneMode.SCENE2D
});

// function for getting real-time clock
function startTime() {
  var today = new Date();
  var h = today.getHours();
  var date = [today.getDate(), today.getMonth(), today.getFullYear()].join('/')
  m = checkTime(today.getMinutes());
  s = checkTime(today.getSeconds());
  document.getElementById('date').innerHTML = "Local Date: " + date;
  document.getElementById('time').innerHTML = "Local Time: " + h + ":" + m + ":" + s;
  var t = setTimeout(startTime, 500);
}
function checkTime(i) {
  if (i < 10) {i = "0" + i};
  return i;
}


// when we load the window, accordion-ify the sidebar (for test purposes only. In demo version, accordion-ify + display sidebar will
// occur after pins populate the map)
window.onload = function () {
  startTime();
  // finally, accordion-ify the sidebar
  $(function() {
    $("#testSidebar").accordion({
      heightStyle: "content",
      collapsible: true,
      active: false
    });

    // TODO: must link clicking on bar to focusing map on icon (+showing the more detailed newsarticle sidepanel?)
    //viewer.zoomTo(pin[x]);

  });
};