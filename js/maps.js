	(function(A) {

	if (!Array.prototype.forEach)
		A.forEach = A.forEach || function(action, that) {
			for (var i = 0, l = this.length; i < l; i++)
				if (i in this)
					action.call(that, this[i], i, this);
			};

		})(Array.prototype);

		var
		mapObject,
		markers = [],
		// mark data to show on the map
		markersData = {'Marker': [
			{
				type_point: 'user1',
				name: 'user1',
				location_latitude: 31.771959, 
				location_longitude: 35.217018,
				// map_image_url: '../images/temp.jpag',
				rate: '4.5',
				name_point: 'user1',
				url_point: 'user1.html',
				review: '13 reviews'
			}
		]};

			var mapOptions = {
				zoom: 11.2,
				center: new google.maps.LatLng(31.771959, 35.217018),
				mapTypeId: google.maps.MapTypeId.ROADMAP,

				mapTypeControl: false,
				mapTypeControlOptions: {
					style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
					position: google.maps.ControlPosition.LEFT_CENTER
				},
				panControl: false,
				panControlOptions: {
					position: google.maps.ControlPosition.TOP_RIGHT
				},
				zoomControl: true,
				zoomControlOptions: {
					position: google.maps.ControlPosition.RIGHT_CENTER
				},
				scrollwheel: false,
				scaleControl: false,
				scaleControlOptions: {
					position: google.maps.ControlPosition.TOP_LEFT
				},
				streetViewControl: true,
				streetViewControlOptions: {
					position: google.maps.ControlPosition.LEFT_TOP
				},
			};
			var marker;
			mapObject = new google.maps.Map(document.getElementById('map_right_listing'), mapOptions);
			for (var key in markersData)
				markersData[key].forEach(function (item) {
					marker = new google.maps.Marker({
						position: new google.maps.LatLng(item.location_latitude, item.location_longitude),
						map: mapObject,
						icon: 'images/others/marker.png',
					});

					if ('undefined' === typeof markers[key])
						markers[key] = [];
					markers[key].push(marker);
					google.maps.event.addListener(marker, 'click', (function () {
				  closeInfoBox();
				  getInfoBox(item).open(mapObject, this);
				  mapObject.setCenter(new google.maps.LatLng(item.location_latitude, item.location_longitude));
				 }));

	});
var marker;
mapObject = new google.maps.Map(document.getElementById('map_right_listing'), mapOptions);
for (var key in markersData)
	markersData[key].forEach(function (item) {
		marker = new google.maps.Marker({
			position: new google.maps.LatLng(item.location_latitude, item.location_longitude),
			map: mapObject,
			icon: 'images/others/marker.png',
		});

		if ('undefined' === typeof markers[key])
			markers[key] = [];
		markers[key].push(marker);
		google.maps.event.addListener(marker, 'click', (function () {
	  closeInfoBox();
	  getInfoBox(item).open(mapObject, this);
	  mapObject.setCenter(new google.maps.LatLng(item.location_latitude, item.location_longitude));
	 }));

});