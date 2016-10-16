/**
 * Created by Jiyong on 17-Oct-16.
 */
/* twitter buttons not visible when browser starts */
$('.twitter-btn').hide();
$('.twitter').hide();

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

$('.twitter-close').click(function() {
    $('.twitter').hide();
})

function populateTwitter(response) {
    var country = response[selected_index].geo_facet[0];
    var words = response[selected_index].title.split(/[^\w\s]| /);
    var loc = 'https://mobile.twitter.com/search?q=' + country;
    /* add one more word over 3 char's in length from title */
    for (i = 0; i < words.length; i++) {
        if ((words[i].length > 4) && (words[i] !== country)) {
            loc += "+"+words[i];
            break;
        }
    }
    $('#twitter-iframe').attr('src', loc);
}
