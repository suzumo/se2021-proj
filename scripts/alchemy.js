/**
 * Created by Jiyong on 14-Oct-16.
 */
var watson = require('watson-developer-cloud');
var alchemy_language = watson.alchemy_language({
    api_key: 'd0f07322ff1d42c7e254fad28d242c911e901b7c'
})

var params = {
    text: 'IBM Watson won the Jeopardy television show hosted by Alex Trebek',
    extract: 'entities, keywords'
};

alchemy_language.combined(params, function (err, response) {
    if (err)
        console.log('error:', err);
    else
        console.log(JSON.stringify(response, null, 2));
});