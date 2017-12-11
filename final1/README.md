# Final Assignment 1

![alt text](https://raw.githubusercontent.com/noalarms/data-structures/master/final1/map1.png "AA map")

### Description
This map shows information for the current day's AA meetings in Manhattan.  Each map marker represents a physical venue. The end user is shown the venue name (if available), address, and an icon for wheelchair access if the venue has it.  Each meeting has a start time to end time, with a meeting type. Meetings are grouped by meeting name/topic. This is the most relevant information to be displayed partly due to space constriants and crowding of content. Showing all meetings for the same day allows the user to see all relevant and available info instead of restricting it further.

Link to map: [AA Map](http://ec2-54-165-90-63.compute-1.amazonaws.com:3000/aa)

### Sample of data

	[{"venue":"St Andrews Church","name":"A DESIGN FOR LIVING -","address":"20 Cardinal Hayes Place, New York, NY","details":"@Duane and Centre behind Federal courthouse enter thru driveway behind Church No meetings on Holidays","hasWheelchairAccess":false,"day":4,"startTime":700,"endTime":800,"type":"OD = Open Discussion meeting","specialInterest":null,"latLong":{"lat":40.7133628,"lng":-74.0026069}},{"venue":"St Andrews Church","name":"A DESIGN FOR LIVING -","address":"20 Cardinal Hayes Place, New York, NY","details":"@Duane and Centre behind Federal courthouse enter thru driveway behind Church No meetings on Holidays","hasWheelchairAccess":false,"day":2,"startTime":700,"endTime":800,"type":"B = Beginners meeting","specialInterest":null,"latLong":{"lat":40.7133628,"lng":-74.0026069}},{"venue":"St. Andrew's Church","name":"CHAMBERS STREET - A BRIDGE BACK - Chambers Street - A Bridge Back","address":"20 Cardinal Hayes Place, New York, NY","details":"No meetings on Holidays. **LOCATION SUBJECT TO CHANGE- Call Inter-Group","hasWheelchairAccess":false,"day":1,"startTime":1215,"endTime":1315,"type":"OD = Open Discussion meeting","specialInterest":null,"latLong":{"lat":40.7133628,"lng":-74.0026069}},{"venue":"St. Andrew's Church","name":"CHAMBERS STREET - A BRIDGE BACK - Chambers Street - A Bridge Back","address":"20 Cardinal Hayes Place, New York, NY","details":"No meetings on Holidays. **LOCATION SUBJECT TO CHANGE- Call Inter-Group","hasWheelchairAccess":false,"day":3,"startTime":1215,"endTime":1315,"type":"S = Step meeting","specialInterest":null,"latLong":{"lat":40.7133628,"lng":-74.0026069}},{"venue":"St. Andrew's Church","name":"CHAMBERS STREET - A BRIDGE BACK - Chambers Street - A Bridge Back","address":"20 Cardinal Hayes Place, New York, NY","details":"No meetings on Holidays. **LOCATION SUBJECT TO CHANGE- Call Inter-Group","hasWheelchairAccess":false,"day":4,"startTime":1215,"endTime":1315,"type":"B = Beginners meeting","specialInterest":null,"latLong":{"lat":40.7133628,"lng":-74.0026069}},{"venue":"St. Andrew's Church","name":"CHAMBERS STREET - A BRIDGE BACK - Chambers Street - A Bridge Back","address":"20 Cardinal Hayes Place, New York, NY","details":"No meetings on Holidays. **LOCATION SUBJECT TO CHANGE- Call Inter-Group","hasWheelchairAccess":false,"day":5,"startTime":1215,"endTime":1315,"type":"BB = Big Book meeting","specialInterest":null,"latLong":{"lat":40.7133628,"lng":-74.0026069}},{"venue":"Church of the Transfiguration","name":"CHINATOWN - Chinatown","address":"29 Mott Street, New York, NY","details":null,"hasWheelchairAccess":false,"day":2,"startTime":1830,"endTime":1930,"type":"C = Closed Discussion meeting","specialInterest":null,"latLong":{"lat":40.7148116,"lng":-73.99911709999999}},{"venue":"St. Margaret's Residence","name":"DOWNTOWN -","address":"49 Fulton Street, New York, NY","details":"Wheelchair access","hasWheelchairAccess":true,"day":1,"startTime":1900,"endTime":2000,"type":"OD = Open Discussion meeting","specialInterest":null,"latLong":{"lat":40.7081354,"lng":-74.00394519999999}},{"venue":"","name":"EXCHANGE VIEWS @ JOHN STREET CHURCH -","address":"44 John Street, New York, NY","details":"Thursday 1:30 = Alt. Step/Tradition Email exchangeviews1215@yahoo.com for questions","hasWheelchairAccess":false,"day":1,"startTime":1215,"endTime":1315,"type":"OD = Open Discussion meeting","specialInterest":null,"latLong":{"lat":40.7091344,"lng":-74.00810179999999}},{"venue":"","name":"EXCHANGE VIEWS @ JOHN STREET CHURCH -","address":"44 John Street, New York, NY","details":"Thursday 1:30 = Alt. Step/Tradition Email exchangeviews1215@yahoo.com for questions","hasWheelchairAccess":false,"day":2,"startTime":1215,"endTime":1315,"type":"S = Step meeting","specialInterest":null,"latLong":{"lat":40.7091344,"lng":-74.00810179999999}},{"venue":"","name":"EXCHANGE VIEWS @ JOHN STREET CHURCH -","address":"44 John Street, New York, NY","details":"Thursday 1:30 = Alt. Step/Tradition Email exchangeviews1215@yahoo.com for questions","hasWheelchairAccess":false,"day":4,"startTime":1215,"endTime":1315,"type":"OD = Open Discussion meeting","specialInterest":null,"latLong":{"lat":40.7091344,"lng":-74.00810179999999}},{"venue":"","name":"EXCHANGE VIEWS @ JOHN STREET CHURCH -","address":"44 John Street, New York, NY","details":"Thursday 1:30 = Alt. Step/Tradition Email exchangeviews1215@yahoo.com for questions","hasWheelchairAccess":false,"day":1,"startTime":1330,"endTime":1430,"type":"B = Beginners meeting","specialInterest":"Living Sober","latLong":{"lat":40.7091344,"lng":-74.00810179999999}},
	...


### Query
	collection.aggregate([ // start of aggregation pipeline
	        
	            { $match : { day : today } },

	            // group by meeting group
	            { $group : { _id : {
	                latLong : "$latLong",
	                meetingVenue : "$venue",
	                meetingName : "$name",
	                meetingAddress1 : "$address",
	                meetingDetails : "$details",
	                meetingWheelchair : "$hasWheelchairAccess",
	                },
	                    meetingDay : { $push : "$day" },
	                    meetingStartTime : { $push : "$startTime" },
	                    meetingEndTime : {$push : "$endTime" }, 
	                    meetingType : { $push : "$type" },
	                    meetingSpecialInterest : { $push : "$specialInterest" }
	            }
	            },
	            
	            // group meeting groups by latLong
	            {
	                $group : { _id : { 
	                    latLong : "$_id.latLong"},
	                    meetingGroups : { $push : {groupInfo : "$_id", meetingDay : "$meetingDay", meetingStartTime : "$meetingStartTime", 
	meetingEndTime : "$meetingEndTime", meetingType : "$meetingType", meetingSpecialInterest : "$meetingSpecialInterest" }}
	                }
	            }

### Binding/Marker Content Creation

	function makeContent(cont) {
	            var contentHolder = '<div id="content">' +
	                '<div id="siteNotice">' +
	                '</div>';
	            for (var i = 0; i < cont.meetingGroups.length; i++) {
	            if (i == 0) {
	                contentHolder = contentHolder + '<div>';
	                contentHolder = contentHolder + '<h1 style="font-size:16px;margin
	-bottom:0;">' + cont.meetingGroups[i].groupInfo.meetingVenue + '</h1>';
	                
	                var wheelchairAccessIcon = '';
	                
	                if (cont.meetingGroups[i].groupInfo.meetingWheelchair)
	                    wheelchairAccessIcon = '<img src="https://i.imgur.com/XC5Fmgp
	.png" width="32" height="32" style="vertical-align:middle;margin-left:0px;" alt="
	Wheelchair Access" title="Wheelchair Access">';
	                
	                contentHolder = contentHolder + '<h2 style="font-size:14px;font-w
	eight:normal;margin-top:3px;">' + cont.meetingGroups[i].groupInfo.meetingAddress1
	.substr(0, cont.meetingGroups[i].groupInfo.meetingAddress1.indexOf(',')) + wheelc
	hairAccessIcon + '</h2>';
	                contentHolder = contentHolder + '</div>';
	           
	            }

	                contentHolder = contentHolder + '<div style="padding:0;">';
	                contentHolder = contentHolder + '<h2 id="firstHeading" class="fir
	stHeading" style="font-weight:normal;margin-bottom:7px;">';
	                contentHolder = contentHolder + cont.meetingGroups[i].groupInfo.m
	eetingName + '</h2>';
	                
	                contentHolder = contentHolder + '<div style="border-top:1px solid
	 #D1D0CE;">';
	                for (var j = 0; j < cont.meetingGroups[i].meetingType.length; j++
	) {
	                    var mt, si;
	                    if (cont.meetingGroups[i].meetingType[j] == "BB = Big Book me
	eting") {
	                        mt = "Big Book";
	                    }
	                    else if (cont.meetingGroups[i].meetingType[j] == "B = Beginne
	rs meeting") {
	                        mt = "Beginners";
	                    }
	                    else if (cont.meetingGroups[i].meetingType[j] == "C = Closed 
	Discussion meeting") {
	                        mt = "Closed Discussion";
	                    }
	                    else if (cont.meetingGroups[i].meetingType[j] == "S = Step me
	eting") {
	                        mt = "Step";
	                    }
	                    else if (cont.meetingGroups[i].meetingType[j] == "T = Traditi
	on meeting") {
	                        mt = "Tradition";
	                    }
	                    else if (cont.meetingGroups[i].meetingType[j] == "O = Open me
	eting") {
	                        mt = "Open Meeting";
	                    }
	                    else if (cont.meetingGroups[i].meetingType[j] == "OD = Open D
	iscussion meeting") {
	                        mt = "Open Discussion";
	                    }
	                    else {
	                        mt = "";
	                    }
	                        
	                    contentHolder = contentHolder + '<div style="margin:8px 0;">'
	 + convert24to12(cont.meetingGroups[i].meetingStartTime[j]) + ' - ' + convert24to
	12(cont.meetingGroups[i].meetingEndTime[j]) + '&nbsp;&nbsp;&nbsp;' + mt;
	                    
	                }
	                contentHolder = contentHolder + '</p>';
	                contentHolder = contentHolder + '<div class="iw-bottom-gradient">
	</div>';
	                contentHolder = contentHolder + '</div>';
	                contentHolder = contentHolder + '</div>';
	            }
	            return contentHolder;
	        }