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

var rows = $('tr[style="margin-bottom:10px"]');

var firstTDarray = [];
var secondTDarray = [];

var meetings = [];

rows.each(function(i,elem) {
    
    var firstTD = $(elem).children('td[style="border-bottom:1px solid #e3e3e3; width:260px"]').text();
    var secondTD = $(elem).children('td[style="border-bottom:1px solid #e3e3e3;width:350px;"]').text();
    
    firstTDarray.push(firstTD);
    secondTDarray.push(secondTD);
    
    
    var firstTDcontent = [];
    firstTDcontent = firstTD.split('\n');
    
    var venue = firstTDcontent[1].trim();
    var name = firstTDcontent[2].trim();
    var address = firstTDcontent[3]
        .split(',')[0]
        .split('.')[0]
        .split('-')[0]
        .split('&amp;')[0]
        .trim() +  ', New York, NY';
    var details;
    var line9 = firstTDcontent[9].trim();
    if (line9.length < 2) {
        details = null;
    }
    else {
        details = firstTDcontent[9].trim();
    }
    
    var hasWheelchairAccess;
    for(var i=0;i<firstTDcontent.length;i++) {
        if (firstTDcontent[i].indexOf("Wheelchair access") > -1) {
            hasWheelchairAccess = true;
            i=firstTDcontent.length;
        }
        else {
            hasWheelchairAccess = false;
        }
    }
    
    var secondTDcontent = secondTD.split('\n');

    for(var i=0;i<secondTDcontent.length;i++) {
        secondTDcontent[i] = secondTDcontent[i].trim();
    }
    
    for(var i=0;i<secondTDcontent.length;i++) {
        var meeting = new Object();
        var meetingLine = secondTDcontent[i];
        var day;
        var startTime;
        var endTime;
        var type = null;
        var specialInterest = null;
        if (meetingLine !== '') {
            day = meetingLine.split('From')[0].trim();
            startTime = meetingLine.split('From')[1].split('to')[0].trim();
            endTime = meetingLine.split('From')[1].split('to')[1].split('Meeting Type')[0].trim();
            if (meetingLine.indexOf('Meeting Type') > -1)
                type = meetingLine.split('From')[1].split('to')[1].split('Meeting Type')[1].split('Special Interest')[0].trim();
            if (meetingLine.indexOf('Special Interest') > -1)
                specialInterest = meetingLine.split('From')[1].split('to')[1].split('Meeting Type')[1].split('Special Interest')[1].trim();
            
            meeting.venue = venue;
            meeting.name = name;
            meeting.address = address;
            meeting.details = details;
            meeting.hasWheelchairAccess = hasWheelchairAccess;
            meeting.day = day;
            meeting.startTime = convertTime12to24(startTime);
            meeting.endTime = convertTime12to24(endTime);
            meeting.type = type;
            meeting.specialInterest = specialInterest;
            
            meetings.push(meeting);
        }
    }

});

// Resarched function to convert 12-hour time to 24-hour time to easily compare values
function convertTime12to24(time12h) {
  const [time, modifier] = time12h.split(' ');

  let [hours, minutes] = time.split(':');

  if (hours === '12') {
    hours = '00';
  }

  if (modifier === 'PM') {
    hours = parseInt(hours, 10) + 12;
  }

  return parseInt(hours + minutes);
}

// eachSeries in the async module iterates over an array and operates on each item in the array in series
async.eachSeries(meetings, function(value, callback) {
    var apiRequest = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + value.address.split(' ').join('+');
    request(apiRequest, function(err, resp, body) {
        if (err) { throw err; }
        value.latLong = JSON.parse(body).results[0].geometry.location;
    });
    setTimeout(callback, 2000);
}, function() {
    fs.writeFileSync('/home/ubuntu/workspace/week0506-all_meetings.txt', JSON.stringify(meetings));
});