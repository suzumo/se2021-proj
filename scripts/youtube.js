/**
 * Created by Jiyong on 19-Oct-16.
 */

var youtube_data;

// Search for a specified string.
function populateYoutube(response) {
    var keywords = [];

    var country = response[selected_index].geo_facet[0].split(/[^\w\s]| /);
    country = country.filter(function(n) {
        return n != "";
    });

    var words = response[selected_index].title.split(/[^\w\s]| /);
    /* add one more word over 3 char's in length from title */
    for (i = 0; i < words.length; i++) {
        if (words[i].length > 4) {
            for (j = 0; j < country.length; j++) {
                if (words[i].indexOf(country[j]) === -1) {
                    if (country[j].indexOf(words[i]) === -1) {
//                        console.log("found keyword " + words[i]);
                        keywords.push(words[i]);
                        break;
                    }
                }
            }
        }
    }
    var query = country.join("+") + "+" + keywords[keywords.length-3] + "+" + keywords[keywords.length-2] + "+" + keywords[keywords.length-1] ;
    console.log(query);

    if (query === "") {
        query = "cats";
        console.log("empty query to YouTube... so you get cats");
    }

    $.ajax({
        cache: false,
        data: $.extend({
                key: 'AIzaSyBGNkwFKR9dZJRRw1sBQCzMuQV2fheOzEA',
                q: query,
                part: 'snippet'
//                time: 'this_week'
                }, {maxResults: 20}),
                dataType: 'json',
                type: 'GET',
                timeout: 5000,
                url: 'https://www.googleapis.com/youtube/v3/search'
    }).done(function(result) {
//        console.log(result); // raw result
        youtube_data= [];
        for (i = 0; i < result.items.length; i++) {
            var x = JSON.parse(JSON.stringify(result.items[i]));
            youtube_data.push(x);
        }
        console.log(youtube_data); // array containing neat results
        setYoutubePlayer(youtube_data);
    }).fail(function(err){
        throw err;
    });
}

function setYoutubePlayer(data) {

    var html = '<ul class="media-list">';
    for (i = 0; i < data.length; i++) {
        var string_date = data[i].snippet.publishedAt;
        var date = string_date.substring(0,9);
        var time = string_date.substring(11,19);
        html += ('<li class="media">' +
                    '<div class="media-left">' +
                        '<button type="button" class="youtube-image-button" data-toggle="tooltip" data-trigger="hover" title="Click to watch this video!" value="http://www.youtube.com/embed/'+ data[i].id.videoId +'">' +
                            '<img class="media-object" src="'+ data[i].snippet.thumbnails.default.url + '" ' +
                            'height="90" width="120" alt="thumbnail-pic"></button></div>' +
                    '<div class="media-body">' +
                        '<h4 class="media-heading">' + data[i].snippet.title + '</h4>' +
                        '<div class="video-publisher">' +
                            '<div>'+ data[i].snippet.channelTitle +'</div>' +
                            '<div>'+ date +' '+ time + '</div>' +
                        '</div>' +
                     '</div></li>');
    }
    html += '</ul>';
    $('#youtube-vid-frame').html(html);

    setTimeout(function(){
        $('[data-toggle="tooltip"]').tooltip();

        $(".youtube-image-button").click(function(){
            console.log("youtube image clicked!");
            var url = $(this).attr("value");
            $('.youtube-player').show();
            $('#youtube-player-iframe').attr("src", url);
        })

    },100);
}

$(document).ready(function(){
    insertYoutubeIcon();

    $(".youtube-player-close").click(function() {
        $('.youtube-player').hide();
        $("#youtube-player-iframe").attr("src", "");
    })

    $('.youtube-close').click(function(){
        $('.youtube').hide();
    })
})

/* add youtube button to cesium infobox */
function insertYoutubeIcon() {
    var newItem = document.createElement("BUTTON");
    newItem.setAttribute("class", "cesium-button cesium-infoBox-camera youtube-btn");
    newItem.setAttribute("id", "youtube-btn");
    newItem.setAttribute("title", "Watch about this in Youtube!");
    newItem.setAttribute("data-toggle", "tooltip");
    newItem.setAttribute("data-trigger", "hover");
    newItem.setAttribute("data-placement", "bottom");
    newItem.innerHTML = '<img src="img/youtube-icon.png" width="18" style="position:relative;left:-4px;top:-1px">';

    setTimeout(function(){
        var element = $('.cesium-infoBox.cesium-infoBox-bodyless')[0];
        element.insertBefore(newItem, element.childNodes[3]);
        (element.childNodes[3]).setAttribute("style", "margin-left: 52px;");

        /* twitter button opens twitter window */
        $('.youtube-btn').click(function() {
            console.log("youtube button pressed!");
            $('.youtube').toggle(function(){
                if ($('.youtube').is(":visible")) {
                    populateYoutube(response);
                }
            });
        })
    },50);
}