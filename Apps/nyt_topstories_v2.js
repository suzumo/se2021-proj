var response = [];
var url = "https://api.nytimes.com/svc/topstories/v2/world.json";
url += '?' + $.param({
        'api-key': "591e19bb7d974693b30e645f3288102d"
    });
$.ajax({
    url: url,
    method: 'GET',
}).done(function(result) {
    for (i = 0; i < 10; i++) {
        var x = JSON.parse(JSON.stringify(result.results[i]));
        response.push(x);
    }
}).fail(function(err) {
    throw err;
});