/* Pull local concerts from the eventful API and display on 
** Google Maps using GeoLocation or user input zip code. 
*/

$(function() {
	
		// var marketId = []; //returned from the API
		// var allLatlng = []; //returned from the API
		// var allMarkers = []; //returned from the API
		// var marketName = []; //returned from the API
		// var infowindow = null;
		var pos;
	  var userCords;
		//Start geolocation
		
		if (navigator.geolocation) {    
			function error(err) {
			  console.warn('ERROR(' + err.code + '): ' + err.message);
			}
			function success(pos){
			 	userCords = pos.coords;
			 	console.log(userCords.latitude + " " + userCords.longitude);
				return userCords;
			}
			// Get the user's current position
			navigator.geolocation.getCurrentPosition(success, error);
		} else {
				alert('Geolocation is not supported in your browser');
		}
	
// 	//Adding infowindow option
// 	infowindow = new google.maps.InfoWindow({
// 		content: "holding..."
// 	});
	
	//Fire up Google maps and place inside the map-canvas div
 	//map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

	//grab form data
    $('#chooseZip').submit(function() { // bind function to submit event of form
		  var userZip = $("#textZip").val();
		  console.log("This-> " + userCords.latitude);
			if(userZip){
				//accessURL = "https://search.ams.usda.gov/farmersmarkets/v1/data.svc/zipSearch?zip=" + userZip;
			} else {
				console.log('Geolocation was successful:'+userCords.latitude+userCords.longitude);
				//accessURL = "http://api.eventful.com/rest/events/search?app_key=Pk4pz3Sz3DPfkwCN&q=music" + "&l="+userCords.latitude + "," + userCords.longitude + "&within=10&units=miles&callback=?"
		}
			//http://api.eventful.com/rest/events/search?app_key=[key]&l=GREEN+BAY+WEST&page_size=100
			//http://eventful.com/events?q=music&l=92103&within=10&units=miles
			//http://api.eventful.com/rest/events/search?app_key=[key]&l=32.746682,%20-117.162741&within=5&unit=miles&page_size=100
			//Use the zip code and return all market ids in area.
		// 	$.ajax({
		// 		type: "GET",
		// 		contentType: "application/xml",
  //   			dataType: "xml",
  //   			url: accessURL,
		// 		success: function (data) {
		// 			 var parsedData = $.parseXML(data)	
		// 			 $.each(parsedData, function (i, val) {
		// 				marketId.push(val.title);
		// 				marketName.push(val.city_name);
		// 			 });
						
		// 			//console.log(marketName);
					
		// 		}
		// 	})

        return false; // important: prevent the form from submitting
    });
});

