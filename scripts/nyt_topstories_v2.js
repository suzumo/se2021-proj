/* get top 10 stories in the world */
function getFromNYT(next, category_name) {
    response = [];
    source = "New York Times";
    var url = "";
    if (category_name === "me") {
    	// result = my_result.json
    	populateResponse('my_results.json', next);
    } else {
    	var url = "https://api.nytimes.com/svc/topstories/v2/" + category_name + ".json";
	    url += '?' + $.param({
	            'api-key': "591e19bb7d974693b30e645f3288102d"
	        });
	    populateResponse(url, next);
    }
}

/* Given a url, populates global response array */
function populateResponse (url, next) {
	$.ajax({
        url: url,
        method: 'GET',
    }).done(function(result) {
    		var i = 0;
		    var j = 0;
		    while (i < 10) {
		        var x = JSON.parse(JSON.stringify(result.results[j]));
		        if (x.geo_facet.length == 0) {
		            ++j;
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

/* get most recent 10 stories by country */
function getFromNYTByCountry(country, next) {
    response = [];
    source = "New York Times";
    var url = "https://api.nytimes.com/svc/topstories/v2/national.json";
    url += '?' + $.param({
            'api-key': "591e19bb7d974693b30e645f3288102d",
        });
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
