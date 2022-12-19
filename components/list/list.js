var items = null

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


buildList = () => {
	if (!items) return
	let listItems = ''
	for (let item of items) {
		const listItem = `
			<li>
				<img src="${item.image}">
				<article>
					<h2>${item.name}</h2>
					<div>Adres: ${item.location}, ${item.town}</div>
					<div>Grootte: ${item.size}</div>
					<div>Beschikbaar: Ja</div>
				</article>
			</li>
		`
		listItems = listItems + listItem
	}

	const list = document.getElementsByTagName('ul')[0]
	list.innerHTML = listItems
}

onInit = async () => {
	await getItems()
	buildList()
}
onInit()