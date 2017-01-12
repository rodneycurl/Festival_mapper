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
	  var newMarkers;
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
	
	//grab form data - needs to be updated like replace_markers
    $('#chooseZip').submit(function() { // bind function to submit event of form
		  var userZip = $("#textZip").val();
		  console.log("This-> " + userCords.latitude);
			if(userZip){
				//accessURL = "https://search.ams.usda.gov/farmersmarkets/v1/data.svc/zipSearch?zip=" + userZip;
			} else {
				console.log('Geolocation was successful:'+userCords.latitude+userCords.longitude);
				//accessURL = "http://api.eventful.com/rest/events/search?app_key=Pk4pz3Sz3DPfkwCN&q=music" + "&l="+userCords.latitude + "," + userCords.longitude + "&within=10&units=miles&callback=?"
			}

			$.ajax({
	        url : "/festivals/near",
	        type : "GET",
	        data : { lat: userCords.latitude, long: userCords.longitude },
	        dataType: 'html',
	        success:  Gmaps.map.serviceObject.replaceMarkers(json)
	     
    });
   
		// 			//console.log(marketName);
		return false; // important: prevent the form from submitting    		
	});
	
  $("#replace_markers").click(function(){
        $.getJSON("/festivals/near.json", { lat: userCords.latitude, long: userCords.longitude }, function(newMarkers){
        	console.log("Data:"+newMarkers);
           handler.removeMarkers(markers); // to remove previous markers
           markers = handler.addMarkers(newMarkers);
           handler.bounds.extendWith(markers);
    			 handler.fitMapToBounds(); 
    			// handler.getMap().setCenter(handler.getbounds.getCenter());
    			// handler.getMap().setZoom(10);
    
        });
      });
   
});