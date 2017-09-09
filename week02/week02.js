// npm install cheerio

var fs = require('fs');
var cheerio = require('cheerio');

// load the thesis text file into a variable, `content`
var content = fs.readFileSync('data/m06.txt');

// load `content` into a cheerio object
var $ = cheerio.load(content);

var td = $('td[style="border-bottom:1px solid #e3e3e3; width:260px"]');

td.each(function(i,elem) {
     var address = $(elem).html()
        .split('\n')[3]
        .split(',')[0]
        .split('.')[0]
        .split('-')[0]
        .split('&amp;')[0];
    console.log(address.trim());
});