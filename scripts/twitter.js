/**
 * Created by Jiyong on 17-Oct-16.
 */
/* twitter buttons not visible when browser starts */
$('.twitter').hide();

$('.twitter-close').click(function() {
    $('.twitter').hide();
})

function populateTwitter(response) {
    var country = response[selected_index].geo_facet[0];
    var words = response[selected_index].title.split(/[^\w\s]| /);
    var loc = 'https://mobile.twitter.com/search?q=' + country;
    /* add one more word over 3 char's in length from title */
    for (i = 0; i < words.length; i++) {
        if ((words[i].length > 4) && (words[i].indexOf(country) === -1)) {
            loc += "+"+words[i];
            break;
        }
    }
    $('#twitter-iframe').attr('src', loc);
}

/* add twitter button to cesium infobox */
$(document).ready(function(){
    var newItem = document.createElement("BUTTON");
    newItem.setAttribute("class", "cesium-button cesium-infoBox-camera twitter-btn");
    newItem.setAttribute("id", "twitter-btn");
    newItem.setAttribute("title", "Read about this on Twitter");
    newItem.setAttribute("data-toggle", "tooltip");
    newItem.setAttribute("data-trigger", "hover");
    newItem.innerHTML = '<img src="img/Twitter.svg" width="18" style="position:relative;top:-2px;left:-3px">';

    setTimeout(function(){
        var element = $('.cesium-infoBox.cesium-infoBox-bodyless')[0];
        element.insertBefore(newItem, element.childNodes[2]);
        (element.childNodes[2]).setAttribute("style", "margin-left: 25px;");

        /* twitter button opens twitter window */
        $('.twitter-btn').click(function() {
            console.log("twitter button pressed!");
            $('.twitter').toggle(function(){
                if ($('.twitter').is(":visible")) {
                    if (region === "Australia") {
                        populateTwitter(australia);
                    } else {
                        populateTwitter(response);
                    }
                }
            });
        })
    },50);
})