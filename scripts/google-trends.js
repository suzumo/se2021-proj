/**
 * Created by Jiyong on 15-Oct-16.
 */

/* cannot figure out how to make this work */
var googleTrends = require('google-trends-api');

setTimeout(function(){
    googleTrends.topRelated({keywords: 'dog house'})
        .then(function(results){
            console.log("Here are the results!", results);
        })
        .catch(function(err){
            console.error('We have an error!', err);
        })
},5000);