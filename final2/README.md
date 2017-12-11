# Final Assignment 2

I was assigned the Piezo (knock) sensor and temperature sensor. These sensors were placed in my apartment. I live right by my building front door and commonly experience the noise and vibration of the front door slamming. I put the Piezo sensor against the closest wall to my building front door in order to measure door slamming vibration. The temperature sensor records the temperature inside my apartment where the heat can sometimes be erratic.

## Part One

![alt text](https://raw.githubusercontent.com/noalarms/data-structures/master/final2/part1.png "Interface")

### Description
This interface is a dual y-axis chart showing the values from the knock sensor vs the values from the temperature sensor. My endpoint data provides min and max values for each, over time. This shows the range of min/max values of each sensor for each day between 11/11 and 12/7 (days that showed valid data).

I've used Analog-to-Digital Conversion (ADC) as the unit of value for Piezo/knock, found from the description here: [https://www.arduino.cc/en/Tutorial/Knock](here)

The mouse cursor in the image shows hover interaction for easier glancing of information. When a user hovers on a column (12/6 in this example), the background of the column highlights and info popovers show the max and min for both knock and temperature for that particular date.

## Part Two

[Real-time JSON query to Postgres database](http://ec2-54-165-90-63.compute-1.amazonaws.com:3000)

### Description

For my endpoint, I've collected the following data (and pictured below):

- __sensorday:__ the month
- __sensormonth:__ the day
- __num_obs:__ number of observations
- __max_knock:__ maximum knock value
- __min_knock:__ maximum temp value
- __max_temp:__ minimum temp value
- __min_temp:__ maximum temp value

![alt text](https://raw.githubusercontent.com/noalarms/data-structures/master/final2/part2-data.png "Data")

In the interface, __sensorday__ and __sensormonth__ run along the x-axis as time.  Knock values are on the left y-axis and temp values are on the right y-axis. The range for each day's  __max_knock__ and __min_knock__ is represented in red, while the range for each day's __max_temp__ and __min_temp__ is represented in green.  When the user hovers on a date column, the min and max of both sensors (__max_knock__/__min_knock__ and __max_temp__/__min_temp__) are shown inside info popovers.


