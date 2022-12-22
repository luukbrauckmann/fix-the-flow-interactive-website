var settings = {
	center: { lat: 52.2434979, lng: 5.6343227 },
	zoom: 7,
	disableDefaultUI: true,
	zoomControl: true
}

var map = L.map('map').setView([52.2434979, 5.6343227], 7)

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19 }).addTo(map)