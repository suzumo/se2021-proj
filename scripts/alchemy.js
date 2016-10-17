/**
 * Created by Jiyong on 14-Oct-16.
 */

/* don't know how to make this work */

var params = {
    text: 'IBM Watson won the Jeopardy television show hosted by Alex Trebek',
    extract: 'entities, keywords'
};

function getKeywords(country, next) {
    $.ajax({
        url: url,
        method: 'GET',
    }).done(function(result) {
        var i = 0;
        var j = 0;
        while (i <= result.results.length -1) {
            var x = JSON.parse(JSON.stringify(result.results[i]));
            if (x.geo_facet.length == 0) {
                ++i;
                continue;
            }
            response.push(x);
            ++j;
            ++i;
        }
        next(response);
    }).fail(function(err) {
        throw err;
    });
}

alchemy_language.combined(params, function (err, response) {
    if (err)
        console.log('error:', err);
    else
        console.log(JSON.stringify(response, null, 2));
});