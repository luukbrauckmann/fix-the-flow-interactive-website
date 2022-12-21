var views = [
	{ label: 'Kaart', alias: 'kaart', value: 'map' },
	{ label: 'Lijst', alias: 'lijst', value: 'list' }
]
var selectedView

getView = async () => {
	const html = await fetch(`components/${selectedView.value}/${selectedView.value}.html`)
		.then((response) => response.text())

	const content = document.getElementById('router-outlet')
	content.innerHTML = html
}

changeView = () => {
	let viewName = window.location.hash.replace('#', '')
	if (!viewName) viewName = 'kaart'
	const view = views.find((viewsItem) => viewsItem.alias === viewName)
	selectedView = view

	const selectButtons = document.getElementsByClassName('select-buttons')[0]
	const buttons = selectButtons.getElementsByTagName('button')
	for(let button of buttons) button.dataset['active'] = button.dataset['view'] === view.value

	getView()

	window.history.pushState(null, null, `#${view.alias}`)
}

document.addEventListener('click', (event) => {
	const { target } = event
	if (!target.matches('button')) return
	const view = views.find((viewsItem) => viewsItem.value === target.dataset.view)
	window.history.pushState(null, null, `#${view.alias}`)
	changeView()
})

changeView()