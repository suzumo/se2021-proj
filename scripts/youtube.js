/**
 * Created by Jiyong on 19-Oct-16.
 */
/* youtube buttons not visible when browser starts
$('.youtube').hide();
$('.youtube-player').hide();
*/

$('.youtube-close').click(function() {
    $('.youtube').hide();
})

$('.youtube-player-close').click(function() {
    $('.youtube-player').hide();
})

var youtube_data;
// Search for a specified string.
function searchYouTube() {
//    var q = $('#query').val();
    $.ajax({
        cache: false,
        data: $.extend({
                key: 'AIzaSyBGNkwFKR9dZJRRw1sBQCzMuQV2fheOzEA',
                q: "cats",
                part: 'snippet'
                }, {maxResults: 20, pageToken: 10}),
                dataType: 'json',
                type: 'GET',
                timeout: 5000,
                url: 'https://www.googleapis.com/youtube/v3/search'
    }).done(function(result) {
        console.log(result);
        youtube_data= [];
        for (i = 0; i < result.items.length; i++) {
            var x = JSON.parse(JSON.stringify(result.items[i]));
            youtube_data.push(x);
        }
        console.log(youtube_data);
    }).fail(function(err){
        throw err;
    });
}