/**
 * Created by Jiyong on 25-Oct-16.
 */
function getFromTheGuardian(query, country, next) {
    response = [];
    source = "The Guardian UK";
    var page = "http://content.guardianapis.com/search?q="+query+"&order-by=newest&api-key=59ce1afb-ea95-4ab7-971e-dc59c7189718";
    $.ajax({
        url: page,
        method: 'GET',
    }).done(function(result) {
        console.log(result);
        for (i = 0; i < 10; i++) {
            var x = JSON.parse(JSON.stringify(result.response.results[i]));
            x.abstract = result.response.results[i].webTitle;
            x.geo_facet = [];
            x.geo_facet[0] = country;
            x.multimedia = [];
            x.url = result.response.results[i].webUrl;
            x.title = result.response.results[i].webTitle;
            //x.multimedia.push(result.articles[i].urlToImage);
            response.push(x);
        }
        console.log(response);
        next(response);
    }).fail(function(err) {
        throw err;
    });
}