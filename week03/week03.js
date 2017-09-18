var request = require('request'); // npm install request
var async = require('async'); // npm install async

// SETTING ENVIRONMENT VARIABLES (in Linux): 
// export NEW_VAR="Content of NEW_VAR variable"
// printenv | grep NEW_VAR
var apiKey = process.env.GMAKEY;

var fs = require('fs');
var cheerio = require('cheerio');

// load the text file into a variable, `content`
var content = fs.readFileSync('data/m06.txt');

// load `content` into a cheerio object
var $ = cheerio.load(content);

var td = $('td[style="border-bottom:1px solid #e3e3e3; width:260px"]');

var addressArray = [];

td.each(function(i,elem) {
     var address = $(elem).html()
        .split('\n')[3]
        .split(',')[0]
        .split('.')[0]
        .split('-')[0]
        .split('&amp;')[0];
    addressArray.push(address.trim());
});

var addresses = [];

for(var i=0;i<addressArray.length;i++) {
    var newAddress = addressArray[i] + ', New York, NY';
    addresses.push(newAddress);
}

var meetingsData = [];

// eachSeries in the async module iterates over an array and operates on each item in the array in series
async.eachSeries(addresses, function(value, callback) {
    var apiRequest = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + value.split(' ').join('+');
    //var apiRequest = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + value.split(' ').join('+') + '&key=' + apiKey;
    var thisMeeting = new Object;
    thisMeeting.address = value;
    request(apiRequest, function(err, resp, body) {
        if (err) {throw err;}
        thisMeeting.latLong = JSON.parse(body).results[0].geometry.location;
        //thisMeeting.formattedAddress = JSON.parse(body).results[0].formatted_address;
        meetingsData.push(thisMeeting);
    });
    setTimeout(callback, 2000);
}, function() {
    fs.writeFileSync('/home/ubuntu/workspace/data/week03.txt', JSON.stringify(meetingsData));
});