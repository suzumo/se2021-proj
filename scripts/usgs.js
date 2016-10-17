/**
 * Created by Jiyong on 14-Oct-16.
 */
function getEarthquakesFromUSGS() {
    earthquakes = [];
    /* var url = "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_week.geojson"; /* significant earthquakes */
    var url = "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_day.geojson"; /* all earthquakes 4.5+ in past week */
    $.ajax({
        url: url,
        method: 'GET',
    }).done(function(result) {
        console.log(result);
        for (i = 0; i < result.features.length; i++) {
            var x = JSON.parse(JSON.stringify(result.features[i]));
            earthquakes.push(x);
        }
    }).fail(function(err) {
        throw err;
    });
}

function populateEarthquakes() {
    earthquake_pins = [];
    for (i = 0; i < earthquakes.length; i++) {
        earthquake_pins[i] = viewer.entities.add({
            id: "earthquake"+i,
            name: "United States Geological Survey",
            position: Cesium.Cartesian3.fromDegrees(earthquakes[i].geometry.coordinates["0"], earthquakes[i].geometry.coordinates["1"]),
            billboard: {
                image: 'img/m'+Math.floor(earthquakes[i].properties.mag)+'no.png',
                width: 40,
                height: 40,
                //color: 0.8
                //horizontalOrigin: center,
                //verticalOrigin: center
            },
            description: '<iframe src=\"' +earthquakes[i].properties.url+ '\" height=98% width=100% value=\"' +i+ '\" style=\"background-color:white\"> </iframe>',
            /*label: {
                text: 'M' + earthquakes[i].properties.mag,
                font: '12pt monospace',
                style: Cesium.LabelStyle.FILL_AND_OUTLINE,
                outlineWidth: 1,
                verticalOrigin: Cesium.VerticalOrigin.TOP,
                pixelOffset: new Cesium.Cartesian2(0, -30)
            }*/
        })
    }
    console.log("earthquakes populated!");
}