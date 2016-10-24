/**
 * Created by Jiyong on 17-Oct-16.
 */
/* function to make search bar orientate by name of country */
var longitude, latitude;
$('#searchForm').on("submit",function(e) {
    e.preventDefault();
    $('.twitter').hide();
    $('.youtube').hide();

    /* update search history list if valid non-empty word */
    region = document.getElementById("search-word").value;
    if (region !== "") {
        search_history.push(region);
        var children_nodes = "";
        for (i = search_history.length-1 ; i >=0; i--) {
            children_nodes += '<div class="search-history-item">'+search_history[i]+'</div>';
        }
        $('#search-history-list').html(children_nodes);
    }

    $.getJSON('http://dev.virtualearth.net/REST/v1/Locations?q='+region+'&key=AoFgEWwWs5F5jvzub_gTZzRfF0DLFUNj-2hoS2xIsM-RlGZ33SAEXTdN7vxaEmX4&jsonp=?', function(result) {
        longitude = result.resourceSets["0"].resources["0"].point.coordinates["1"]; // longitude
        latitude = result.resourceSets["0"].resources["0"].point.coordinates["0"]; // latitude
        //console.log(longitude + " " + latitude);
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
        } else if (region === "America" || region === "US" || region === "U.S" || region === "U.S.") {
            category_name = "national";
            getFromNYT(populateSidebar, category_name);
        } else {
            console.log("showing results for categories");
            getFromNYT(populateSidebar, category_name);
        }
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
    category_name = 'world';
    /* empty search bar empty */
    $('#search-word').val("");
    region = "world";
    getFromNYT(populateSidebar, region);
});

$('.cesium-infoBox-close').not('.twitter-close').not('.youtube-close').not('.youtube-player-close').click(function () {
    $('.youtube').hide();
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
        console.log('log-in button clicked!');
        var $this = $(this).button('loading');
        logged = 1;
        setTimeout(function () {
            $('#welcome').html("Welcome Mathew!");
            $('#loginModal').modal('hide');
            $('#sign-in-btn-wrapper').attr('data-toggle', 'tooltip');
            $('#sign-in-btn-wrapper').attr('data-trigger', 'hover');
            $('#sign-in-btn-wrapper').attr('data-placement', 'bottom');
            $('#sign-in-btn-wrapper').attr('title', 'You are logged in.');
            $('#sign-in-btn-wrapper').html('<div class="dropdown">' +
                '<button type="button" data-toggle="dropdown" class="btn btn-default" id="signed-in-btn" style="border:none;margin:7px 30px 7px 23px;padding:0;background:none" aria-haspopup="true" aria-expanded="false">' +
                    '<img src="img/signed-in-btn.png">' +
                '</button>' +
                '<ul class="dropdown-menu" aria-labelledby="signed-in-btn" style="right:10px">' +
                     '<li>Welcome Mathew!</li>' +
                     '<li role="separator" class="divider"></li>' +
                     '<li>' +
                        '<span class="glyphicon glyphicon-cog" aria-hidden="true" style="margin:5px"></span>' +
                        '<button type="button" class="dropdown-menu-btn" id="settings-btn" style="border:none;background:none" data-toggle="modal" data-target="#settingsModal">Setting</button></li>' +
                     '<li>' +
                        '<span class="glyphicon glyphicon-log-out" aria-hidden="true" style="margin:5px"></span>' +
                        '<button type="button" class="dropdown-menu-btn" id="logout-btn" data-loading-text="Logging out..." style="border:none;background:none" data-toggle="tooltip" title="Log out?" data-trigger="hover">Log out</button></li>' +
                    '</li>' +
                '</ul></div>'
            );
            $('[data-toggle="tooltip"]').tooltip();
            $this.button('reset');

            $('#logout-btn').click(function() {
                console.log('log-out btn clicked!');
                logged = 0;
                //var $this = $(this).button('loading');
                setTimeout(function() {
                    $('#sign-in-btn-wrapper').attr('title', 'Please log in');
                    $('#sign-in-btn-wrapper').html('<button type="button" class="btn btn-primary navbar-btn" id="sign-in-btn" style="border:none;margin:7px 10px 7px 7px" data-toggle="modal" data-target="#loginModal">Log In</button>');
                }, 2000);
            })
        }, 2000);
    });

    $('#feedbackModal').on('hide.bs.modal', function (event) {
        $(".feedback").hide();
        $("#sender-name").val($("#sender-name").attr(""));
        $("#sender-email").val($("#sender-email").attr(""));
        $("#message-text").val("");
    })
});
