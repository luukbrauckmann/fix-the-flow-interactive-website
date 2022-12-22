var map = L.map('map').setView([52.2434979, 5.6343227], 7)
var marker
var items = null

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19 }).addTo(map)

/**
 * Functie om data te halen door middel van de fetch api
 * @returns fetch as promise
 */
getItems = async () => {
	return fetch('https://raw.githubusercontent.com/luukbrauckmann/coding-the-curbs/main/assets/smart-zones.json')
		.then((response) => response.json())
		.then((data) => items = data)
		.catch(() => undefined)
}

setMarkers = () => {
	for(let item of items) {
		L.circle([item.coordinates.lat, item.coordinates.lng], {
			color: 'red',
			fillColor: '#f03',
			fillOpacity: 0.5,
			radius: 5
		}).addTo(map)
	}
}

onInit = async () => {
	await getItems()
	setMarkers()
}
// onInit()