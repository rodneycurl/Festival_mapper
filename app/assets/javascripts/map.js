/* Pull local concerts from the eventful API and display on 
** Google Maps using GeoLocation or user input zip code. 
*/

$(function() {
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
		// $.getJSON(path, { data }, function(response){
		// 		fetchedFestivals = response.fetched_festivals;
		// 		var markerHash = response.hash;
		// 		handler.removeMarkers(markers); // to remove previous markers
		// 		handler.resetBounds();
		// 		newMarkers = handler.addMarkers(markerHash);
		// 		handler.bounds.extendWith(newMarkers);
		// 		handler.fitMapToBounds(); 
		// 		handler.getMap().setZoom(10);
		// 		$(".main-table tr:gt(0)").remove();
		// 		$(fetchedFestivals).each(function(index, value) {
		// 			 var element = document.createElement('tr');
	 //        $(element).data('dataItem', this);
	 //        var html = '<td>' + value.title + '</td>' +
	 //                   '<td>' + value.venue_name + '</td>';
	 //       $(element).html(html); 
	 //       $('.main-table #content').append($(element)); //append your new tr
  //       });
			
		// 	});
		// 	return false; // important: prevent the form from submitting    
	 // });
	  
		//this is no longer needed but leaving it temporarily
  $("#use-zip").click(function(){
  	    var latlong = { lat:userCords.latitude, long:userCords.longitude};
  	    $.ajax({
  			  url: '/festivals/near_latlong',
    			data: latlong,
    			type: "GET",
    			dataType: 'script'
				});
				console.log("latlong:" + latlong);
  });

   
});