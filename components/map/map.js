var map;
var settings = {
	center: { lat: 52.2434979, lng: 5.6343227 },
	zoom: 7,
	disableDefaultUI: true,
	zoomControl: true
}

/**
 * Initializes map with Google Maps API
 */
initMap = () => {
  map = new google.maps.Map(document.getElementById('map'), settings)
}

onInit = async () => {
	initMap()
}
onInit()