# Final Assignment 2

I was assigned the Piezo (knock) sensor and temperature sensor. These sensors were placed in my apartment. I live right by my building front door and commonly experience the noise and vibration of the front door slamming. I put the Piezo sensor against the closest wall to my building front door in order to measure door slamming vibration. The temperature sensor records the temperature inside my apartment where the heat can sometimes be erratic.

## Part One

![alt text](http://markdownlivepreview.com/image/logo.png "screenshot")

### Description
This interface is a dual y-axis chart showing the values from the knock sensor vs the values from the temperature sensor. My endpoint data provides min and max values for each, over time. This shows the range of min/max values of each sensor for each day between 11/11 and 12/7 (days that showed valid data).

The mouse cursor in the image shows hover interaction for easier glancing of information. When a user hovers on a column (12/6 in this example), the background of the column highlights and info popovers show the max and min for both knock and temperature for that particular date.

## Part Two

[Real-time JSON query to Postgres database](http://ec2-54-165-90-63.compute-1.amazonaws.com:3000)
