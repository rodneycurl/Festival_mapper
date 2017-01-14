/* Pull local concerts from the eventful API and display on 
** Google Maps using GeoLocation or user input zip code. 
*/

$(function() {
		var pos;
	  var userCords;
	  var newMarkers;
	  var fetchedFestivals;
		//Start geolocation
		var toType = function(obj) {
  		return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
		}
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
	//grab form data - needs to be updated like replace_markers
    $('#chooseZip').submit(function() { // bind function to submit event of form
		  var userZip = $("#textZip").val();
		 	if(userZip){
				//accessURL = "https://search.ams.usda.gov/farmersmarkets/v1/data.svc/zipSearch?zip=" + userZip;
			} else {
				//console.log('Geolocation was successful:'+userCords.latitude+userCords.longitude);
				//accessURL = "http://api.eventful.com/rest/events/search?app_key=Pk4pz3Sz3DPfkwCN&q=music" + "&l="+userCords.latitude + "," + userCords.longitude + "&within=10&units=miles&callback=?"
			}
			$.getJSON("/festivals/near.json", { lat: userCords.latitude, long: userCords.longitude }, function(response){
				fetchedFestivals = response.fetched_festivals;
				var markerHash = response.hash;
				handler.removeMarkers(markers); // to remove previous markers
				handler.resetBounds();
				newMarkers = handler.addMarkers(markerHash);
				handler.bounds.extendWith(newMarkers);
				handler.fitMapToBounds(); 
				handler.getMap().setZoom(10);
				$(".main-table tr:gt(0)").remove();
				$(fetchedFestivals).each(function(index, value) {
					 var element = document.createElement('tr');
	         $(element).data('dataItem', this);
	         var html = '<td>' + value.title + '</td>' +
	                    '<td>' + value.venue_name + '</td>';
	        $(element).html(html); 
	        $('.main-table #content').append($(element)); //append your new tr
        });
			
			});
			return false; // important: prevent the form from submitting    
	  });
	  
		//this is no longer needed but leaving it temporarily
  $("#replace_markers").click(function(){
        $.getJSON("/festivals/near.json", { lat: userCords.latitude, long: userCords.longitude }, function(newMarkers){
        	console.log("Data:"+newMarkers);
           handler.removeMarkers(markers); // to remove previous markers
           markers = handler.addMarkers(newMarkers);
           handler.bounds.extendWith(markers);
    			 handler.fitMapToBounds(); 
    	  });
      });
   
});