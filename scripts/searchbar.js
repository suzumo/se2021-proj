/**
 * Created by Jiyong on 17-Oct-16.
 */
/* function to make search bar orientate by name of country */
var longitude, latitude;
$('#searchForm').on("submit",function(e) {
    e.preventDefault();
    $('.twitter').hide();
    region = document.getElementById("search-word").value;
    console.log(region);
    $.getJSON('http://dev.virtualearth.net/REST/v1/Locations?q='+region+'&key=AoFgEWwWs5F5jvzub_gTZzRfF0DLFUNj-2hoS2xIsM-RlGZ33SAEXTdN7vxaEmX4&jsonp=?', function(result) {
        longitude = result.resourceSets["0"].resources["0"].point.coordinates["1"]; // longitude
        latitude = result.resourceSets["0"].resources["0"].point.coordinates["0"]; // latitude
        console.log(longitude + " " + latitude);
        var target_country = viewer.entities.add({
            name: region,
            position: Cesium.Cartesian3.fromDegrees(longitude, latitude),
            outline: true,
            billboard: {
                image: "",
                verticalOrigin: Cesium.VerticalOrigin.BOTTOM
            }
        });
        var heading = Cesium.Math.toRadians(0);
        var pitch = Cesium.Math.toRadians(-60);
        var range = 7500000; // viewing at 7500km from ground
        viewer.zoomTo(target_country, new Cesium.HeadingPitchRange(heading, pitch, range));
        category_name = 'search'; // when user submits a search, search icon will show up next to title
        if (region === "Australia") {
            console.log("showing results for Australia");
            getFromABC(populateSidebar);
        } else {
            console.log("showing results for America");
            getFromNYT(populateSidebar, category_name);
        }
        //document.getElementById('focus').innerHTML = "Focus: " + region;
    });
});

/* initialize all popovers (for search-categories popover) */
$(function () {
    $('[data-toggle="popover"]').popover()
})

/* initialize the 3x3 grid for search-categories popover */
$('#search-categories').popover({
    html: true,
    content: function(){
        return $(this).next('.popper-content').html();
    },
})

$('#search-categories').click(function(){
    setTimeout(function(){
        $(".categories").click(function() {
            console.log("categories clicked! category name: " + $(this).attr('value'));
            // when user clicks on a category, clear the search bar (so that search bar results don't override category results)
            $("#search-word").val("");
            category_name = $(this).attr('value');
            getFromNYT(populateSidebar, category_name);
        });
    },100);
})

/* when home button pressed, resets news to world setting */
$('.cesium-home-button').click(function(){
    /* empty search bar empty */
    $('#search-word').val("");
    region = "world";
    getFromNYT(populateSidebar, region);
    //document.getElementById('focus').innerHTML = "Focus: " + region;
});

$('.cesium-infoBox-close').not('.twitter-close').click(function () {
    $('.twitter').hide();
    selected_index = undefined;
});

$(document).ready(function() {

    /* setting tooltip appearance to bootstrap's */
    $(":button").each(function () {
        $(this).attr('data-toggle', 'tooltip');
        $(this).attr('data-trigger', 'hover');
    });
    $(".cesium-toolbar-button").each(function () {
        $(this).attr('data-placement', 'bottom');
    });

    /* feedback email modal upon clicking send show success email message */
    $('#send-feedback-btn').click(function () {
        console.log("send feedback button clicked!");
        $(".feedback").show();
    });

    $('#sign-in-btn').click(function () {
        console.log("sign in button clicked!");
    });

    $('#login-signin-btn').on('click', function () {
        var $btn = $(this).button('loading');
        logged = 1;
        $btn.button('reset');
        setTimeout(function () {
            $('#welcome').html("Welcome Mathew!");
            $('#loginModal').modal('hide');
            $('#sign-in-btn-wrapper').html('<button type="button" class="btn btn-default" id="signed-in-btn" style="border:none;margin:7px 30px 7px 23px;padding:0;background:none" data-toggle="tooltip" data-placement="bottom" data-trigger="hover" title="You are logged in."><img src="img/signed-in-btn.png"></span></button>');
            $('[data-toggle="tooltip"]').tooltip();
        }, 1000);
    });

    $('#feedbackModal').on('hide.bs.modal', function (event) {
        $(".feedback").hide();
        $("#sender-name").val($("#sender-name").attr(""));
        $("#sender-email").val($("#sender-email").attr(""));
        $("#message-text").val("");
    })
});
