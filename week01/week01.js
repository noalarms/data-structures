var request = require('request');
var fs = require('fs');

request('http://visualizedata.github.io/datastructures/data/m01.html', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    fs.writeFileSync('/home/ubuntu/workspace/data/m01.txt', body);
  }
  else {console.error('request failed')}
})

request('http://visualizedata.github.io/datastructures/data/m02.html', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    fs.writeFileSync('/home/ubuntu/workspace/data/m02.txt', body);
  }
  else {console.error('request failed')}
})

request('http://visualizedata.github.io/datastructures/data/m03.html', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    fs.writeFileSync('/home/ubuntu/workspace/data/m03.txt', body);
  }
  else {console.error('request failed')}
})

request('http://visualizedata.github.io/datastructures/data/m04.html', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    fs.writeFileSync('/home/ubuntu/workspace/data/m04.txt', body);
  }
  else {console.error('request failed')}
})

request('http://visualizedata.github.io/datastructures/data/m05.html', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    fs.writeFileSync('/home/ubuntu/workspace/data/m05.txt', body);
  }
  else {console.error('request failed')}
})

request('http://visualizedata.github.io/datastructures/data/m06.html', function (error, response, body) {
console.log('two');
  if (!error && response.statusCode == 200) {
    fs.writeFileSync('/home/ubuntu/workspace/data/m06.txt', body);
    console.log('three');
    test();
  }
  else {console.error('request failed')}
})

request('http://visualizedata.github.io/datastructures/data/m07.html', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    fs.writeFileSync('/home/ubuntu/workspace/data/m07.txt', body);
  }
  else {console.error('request failed')}
})

request('http://visualizedata.github.io/datastructures/data/m08.html', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    fs.writeFileSync('/home/ubuntu/workspace/data/m08.txt', body);
  }
  else {console.error('request failed')}
})

request('http://visualizedata.github.io/datastructures/data/m09.html', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    fs.writeFileSync('/home/ubuntu/workspace/data/m09.txt', body);
  }
  else {console.error('request failed')}
})

request('http://visualizedata.github.io/datastructures/data/m10.html', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    fs.writeFileSync('/home/ubuntu/workspace/data/m10.txt', body);
  }
  else {console.error('request failed')}
})