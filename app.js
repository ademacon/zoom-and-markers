$(document).ready(function(){
	var map = L.map('map').setView(new L.LatLng(0,0), 0);

    L.tileLayer.zoomify('assets/tiles/', { 
        width: 7680, 
        height: 4320,
        minZoom: 1,
        maxZoom: 3,
        zoom: 1
    }).addTo(map);

    var hash = new L.Hash(map);

	$.ajax({
	  dataType: "json",
	  url: "markers.json",
	  success: function(result){
	  	$.each(result.markers, function(i, field){
	  		var content = "<h3>"+field.titre+"</h3>";
	  		content += "<h4>"+field.description+"</h4>";

	  		if(field.pitch) {
	  			content += "<p>"+field.pitch+"</p>";
	  		}

	  		var audiostart = "<audio controls autoplay src='src/";
	  		var audioend = "'></audio>";

	  		var videostart = "<video controls autoplay src='src/";
	  		var videoend = "'></video>";

	  		var pdfstart = "<iframe src='src/";
	  		var pdfend = "'></iframe>";

	  		var imgstart = "<img src='src/";
	  		var imgend = "'></img>";

	  		if(field.type == "audio") {
	  			content += audiostart+field.type+'/'+field.src+audioend;
	  			var iconname = L.icon({
				    iconUrl: 'assets/icons/icon_audio.png',
				    iconSize:     [50, 50],
				    iconAnchor:   [25, 25],
				    popupAnchor:  [0, -25]
				});
	  		}
	  		if(field.type == "video") {
	  			content += videostart+field.type+'/'+field.src+videoend;
	  			var iconname = L.icon({
				    iconUrl: 'assets/icons/icon_video_camera.png',
				    iconSize:     [50, 50],
				    iconAnchor:   [25, 25],
				    popupAnchor:  [0, -25]
				});
	  		}
	  		if(field.type == "pdf") {
	  			content += pdfstart+field.type+'/'+field.src+pdfend;
	  			var iconname = L.icon({
				    iconUrl: 'assets/icons/icon_dialog.png',
				    iconSize:     [50, 50],
				    iconAnchor:   [25, 25],
				    popupAnchor:  [0, -25]
				});
	  		}
	  		if(field.type == "image") {
	  			content += imgstart+field.type+'/'+field.src+imgend;
	  			var iconname = L.icon({
				    iconUrl: 'assets/icons/icon_img.png',
				    iconSize:     [50, 50],
				    iconAnchor:   [25, 25],
				    popupAnchor:  [0, -25]
				});
	  		}

	  		var customOptions = {
	  			'maxWidth' : '600',
			    'width': '500',
			    'className' : 'popupCustom'
		    }

	  		var marker = L.marker([field.lattitude, field.longitude], {icon: iconname}).addTo(map);
	  		marker.bindPopup(content, customOptions);
	  	});
	  }
	});
});