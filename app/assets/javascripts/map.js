/* Pull local concerts from the eventful API and display on 
** Google Maps using GeoLocation or user input zip code. 
*/

$(document).ready(function(){
		console.warn("helo");
	  alert('here');
		var pos;
	  var userCords;
	  var newMarkers;
	  var fetchedFestivals;
	  var type;
	  var path;
		//Start geolocation
		var toType = function(obj) {
  		return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
		}
		 $("#use-geo").on('click', function(){
		 	alert('here');
		 });
		$('td').on('click', function (e) {
    	myRowIndex = $(this).parent().index();
  		  e.stopPropagation();
		  	handler.getMap().setZoom(10);
		  	map.setCenter(markers[1].getPosition());
		});
		
		if (navigator.geolocation) {    
			function error(err) {
			  console.warn('ERROR(' + err.code + '): ' + err.message);
			}
			function success(pos){
			 	userCords = pos.coords;
				return userCords;
			}
			// Get the user's current position
			navigator.geolocation.getCurrentPosition(success, error);
		} else {
				alert('Geolocation is not supported in your browser');
		}
	  
	  $("#use-geo").on('click', function(){
	  			alert('here');
	  	    var latlong = { lat:userCords.latitude, long:userCords.longitude};
	  	    console.log("latlong:" + latlong);
	  	    $.ajax({
	  			  url: '/festivals/near_latlong',
	    			data: latlong,
	    			type: "GET",
	    			dataType: 'script'
					});
	  });

   
});