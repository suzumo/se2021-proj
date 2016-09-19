/**
 * Created by Jiyong on 18-Sep-16.
 */
    //testing: pin from JSON object
    // below function is hack job to access the populated NYT articles, which is now stored in response
var pinBuilder = new Cesium.PinBuilder();

// function to translate from location name to longitude and latitude
function getLocationFromBingAPI(location, name) {
    $.getJSON('http://dev.virtualearth.net/REST/v1/Locations?q='+name+'&key=AoFgEWwWs5F5jvzub_gTZzRfF0DLFUNj-2hoS2xIsM-RlGZ33SAEXTdN7vxaEmX4&jsonp=?', function(result) {
        location.push(result.resourceSets["0"].resources["0"].point.coordinates["1"]); // longitude
        location.push(result.resourceSets["0"].resources["0"].point.coordinates["0"]); // latitude
    });
};

var coord = []; // this will hold all the coordinates (longitude,latitude) of the articles in 2D array
var pin = []; // store all pins in this array

// first loop to find coordinates for the articles first
setTimeout(function(){
    for (i = 0; i < 10; i++) {
        coord[i] = [];
        getLocationFromBingAPI(coord[i], response[i.toString()].geo_facet["0"]);
    }
}, 1000); // delay function by 1000ms to allow get info from NYT

// second loop to put pins on map
setTimeout(function(){
    for (i = 0; i < 10; i++) {
        var j = i.toString();
        pin[i] = viewer.entities.add({
            name: response[j].title,
            position: Cesium.Cartesian3.fromDegrees(coord[i][0], coord[i][1]),
            billboard: {
                image: pinBuilder.fromText((i+1).toString(), Cesium.Color.fromRandom({alpha : 1.0}), 48).toDataURL(),
                verticalOrigin: Cesium.VerticalOrigin.BOTTOM
            },
            description: response[j].abstract,
            outline : true
        });

        // populate accordion menu
        var newstitle = (i+1) + ". " + response[j].title;
        var newsabstract = "";
        if (response[j].multimedia.length != 0) {
            newsabstract += '<img src=\"'+response[j].multimedia["0"].url+'\" align=\"right\" style=\"padding-left: 5px\">';
        }
        newsabstract += response[j].abstract;
        $("#news"+i+"title").html(newstitle);
        $("#news"+i+"abstract").html(newsabstract);

        console.log("complete "+i+" news located at "+response[i.toString()].geo_facet["0"]);
        console.log("The title of article " +i+ " is: " +response[i].title);
        console.log(coord[i][0]+ " "+coord[i][1]);
    }
}, 2000); // delay function by 2000ms to get loc info from Bing

// testing function to see if everything is working as expected -- prints in browser console
setTimeout(function() {
    console.log(response); // print out the results from NYT in browser console
    console.log(coord); // print out the results of all the coordinates
    console.log(pin);
}, 5000);