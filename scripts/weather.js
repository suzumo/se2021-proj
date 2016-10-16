/**
 * Created by Jiyong on 15-Oct-16.
 */

var hurricanes = [];
var hurricane_pins = [];
var raw_hurricane_json;

function getHurricanesFromWU() {
    hurricanes = [];
    var url = "http://api.wunderground.com/api/621f68f11fcb30b5/currenthurricane/view.json";
    $.ajax({
        url: url,
        method: 'GET',
    }).done(function(result) {
        console.log(result);
        raw_hurricane_json = result;
        for (i = 0; i < result.currenthurricane.length; i++) {
            var x = JSON.parse(JSON.stringify(result.currenthurricane[i]));
            hurricanes.push(x);
        }
    }).fail(function(err) {
        throw err;
    });
}

function populateHurricanes() {
    hurricane_pins = [];
    for (i = 0; i < hurricanes.length; i++) {
        var radius = 50 + hurricanes[i].Current.SaffirSimpsonCategory *10;
        hurricane_pins[i] = viewer.entities.add({
            id: "hurricane"+i,
            name: "Weather Underground: "+hurricanes[i].stormInfo.stormName_Nice,
            position: Cesium.Cartesian3.fromDegrees(hurricanes[i].Current.lon, hurricanes[i].Current.lat),
            billboard: {
                image: 'img/hurricane.png',
                width: radius,
                height: radius
                //color: 0.8
                //horizontalOrigin: center,
                //verticalOrigin: center
            },
            description: '<iframe src=\"' +hurricanes[i].stormInfo.wuiurl+ '\" height=98% width=100% value=\"' +i+ '\"> </iframe>',
            label: {
                text: hurricanes[i].stormInfo.stormName_Nice,
                font: '10pt monospace',
                style: Cesium.LabelStyle.FILL_AND_OUTLINE,
                outlineWidth: 1,
                verticalOrigin: Cesium.VerticalOrigin.TOP
                //pixelOffset: new Cesium.Cartesian2(0, -30)
            }
        })
    }
    console.log("hurricanes populated!");
}