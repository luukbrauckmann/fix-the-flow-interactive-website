selectedView = 'map'

getView = async () => {
	console.log();
	const html = await fetch(`components/${selectedView}/${selectedView}.html`)
		.then((response) => response.text())

	const content = document.getElementById('router-outlet')
	content.innerHTML = html
}

changeView = (view) => {
	selectedView = view
	const selectButtons = document.getElementsByClassName('select-buttons')[0]
	const buttons = selectButtons.getElementsByTagName('button')
	for(let button of buttons) button.dataset['active'] = button.dataset['view'] === selectedView
	getView()
}

document.addEventListener('click', (event) => {
	const { target } = event
	if (!target.matches('button')) return
	changeView(target.dataset.view)
})

changeView('map')