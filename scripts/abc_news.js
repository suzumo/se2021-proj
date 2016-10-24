/**
 * Created by Jiyong on 16-Oct-16.
 */
function getFromABC(next) {
    australia = [];
    source = "Australian Broadcasting Corporation";
    var page = "https://newsapi.org/v1/articles?source=abc-news-au&sortBy=top&apiKey=3e9f0aff0b9541e38c963d47b406c8f4";
    $.ajax({
        url: page,
        method: 'GET',
    }).done(function(result) {
        console.log(result);
        for (i = 0; i < 10; i++) {
            var x = JSON.parse(JSON.stringify(result.articles[i]));
            x.abstract = result.articles[i].description;
            x.geo_facet = [];
            x.geo_facet[0] = aus_loc[i];
            x.multimedia = [];
            x.url = (x.url).replace('http://www.', 'http://mobile.');
            //x.multimedia.push(result.articles[i].urlToImage);
            australia.push(x);
        }
        console.log(australia);
        next(australia);
    }).fail(function(err) {
        throw err;
    });
}

/* hardcode locations on Australia articles */
aus_loc = [
    "Brisbane",
    "Gold Coast",
    "Brindabella",
    "Tasmania",
    "Geelong",
    "Canberra",
    "Melbourne",
    "Oakey",
    "Deniliquin",
    "Lake Sorell"
]