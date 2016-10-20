/**
 * Created by Jiyong on 19-Oct-16.
 */

var youtube_data;
// Search for a specified string.
function searchYouTube(query) {
    if (query === "") {
        query = "cats";
        console.log("empty query to YouTube... so you get cats");
    }

    $.ajax({
        cache: false,
        data: $.extend({
                key: 'AIzaSyBGNkwFKR9dZJRRw1sBQCzMuQV2fheOzEA',
                q: query,
                part: 'snippet',
                time: 'this_week'
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
        populateYouTubeVideoFrame(youtube_data);
    }).fail(function(err){
        throw err;
    });
}

function populateYouTubeVideoFrame(data) {

    var html = '<ul class="media-list">';
    for (i = 0; i < data.length; i++) {
        html += ('<li class="media">' +
                    '<div class="media-left">' +
                        '<a href="'+'"www.youtube.com/watch?v=' + data[i].id.videoId + '">' +
                            '<img class="media-object" src="'+ data[i].snippet.thumbnails.default.url + '" ' +
                            'height="90" width="120" alt="thumbnail-pic"></a></div>' +
                    '<div class="media-body">' +
                        '<h4 class="media-heading">' + data[i].snippet.title + '</h4>' +
                        '<div class="video-publisher">'+ data[i].snippet.channelTitle +'</div>' +
                        '</div></li>');
    }
    html += '</ul>';
    $('#youtube-vid-frame').html(html);
}