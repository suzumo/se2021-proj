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
        var j = i.toString();
        var k = (response[j].geo_facet.length -1).toString();
        getLocationFromBingAPI(coord[i], response[j].geo_facet[k]);
    }
}, 2000); // delay function by 1000ms to allow get info from NYT

var iframe = document.getElementsByClassName('cesium-infoBox-iframe')[0];
iframe.setAttribute('sandbox', 'allow-same-origin allow-scripts allow-popups allow-forms'); 
var colors = [ Cesium.Color.RED,
               Cesium.Color.DARKORANGE,
               Cesium.Color.GOLD,
               Cesium.Color.GREENYELLOW,
               Cesium.Color.DARKTURQUOISE,
               Cesium.Color.DEEPSKYBLUE,
               Cesium.Color.INDIGO,
               Cesium.Color.MEDIUMORCHID,
               Cesium.Color.HOTPINK,
               Cesium.Color.GREY
];
// second loop to put pins on map
setTimeout(function(){
    for (i = 0; i < 10; i++) {
        var j = i.toString();
        pin[i] = viewer.entities.add({
            name: "New York Times",
            position: Cesium.Cartesian3.fromDegrees(coord[i][0], coord[i][1]),
            billboard: {
                image: pinBuilder.fromText((i+1).toString(), colors[i], 48).toDataURL(),
                verticalOrigin: Cesium.VerticalOrigin.BOTTOM
            },
            description: '<embed src='+response[j].url+' height=99% width=100% value=\"' +i+ '\"> </embed>',
            //description: '<embed src=\"'+response[j].short_url+'\"></embed>',
            outline : true
        });

        // populate accordion menu
        var newstitle = '<img src=\"img\/' +(i+1)+ '.png\" class=\"article-numbers\" alt=\"' +(i+1)+ '\">' + response[j].title;
        var newsabstract = "";
        if (response[j].multimedia.length != 0) {
            newsabstract += '<img src=\"'+response[j].multimedia["0"].url+'\" align=\"right\" style=\"padding-left: 5px\">';
        }
        newsabstract += response[j].abstract;
        newsabstract += '<a class=\"btn btn-link btn-sm read-more\" id=\"readmore' + i +'\" title="Click to read more">' +
                        '<span class=\"glyphicon glyphicon-new-window\" aria-hidden=\"true\"></span></a>';
        $("#news"+i+"title").html(newstitle);
        $("#news"+i+"abstract").html(newsabstract);

        var k = (response[j].geo_facet.length -1).toString();
        console.log("complete "+i+" news located at "+response[j].geo_facet[k]);
        console.log("The title of article " +i+ " is: " +response[i].title);
        console.log("location of news " +i+": " + coord[i][0]+ " "+coord[i][1]);
    }
}, 5000); // delay function by 2000ms to get loc info from Bing

// testing function to see if everything is working as expected -- prints in browser console
setTimeout(function() {
    console.log(response); // print out the results from NYT in browser console
    console.log(coord); // print out the results of all the coordinates
    console.log(pin);
}, 5000);