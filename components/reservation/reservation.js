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

	const oldLink = document.getElementById('reservation-styles')
	if (oldLink) oldLink.remove()
	const link = document.createElement('link')
	link.id = 'reservation-styles'
	link.rel = 'stylesheet'
	link.href = `components/${selectedView.value}/${selectedView.value}.css`
	content.appendChild(link)

	const oldScript = document.getElementById('reservation-scripts')
	if (oldScript) oldScript.remove()
	const script = document.createElement('script')
	script.id = 'reservation-scripts'
	script.src = `components/${selectedView.value}/${selectedView.value}.js`
	script.async = true
	content.appendChild(script)


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
	const newViewValue = target.dataset.view
	const oldView = views.find((view) => view.alias === window.location.hash.replace('#', ''))
	if (newViewValue === oldView.value) return
	const view = views.find((viewsItem) => viewsItem.value === target.dataset.view)
	window.history.pushState(null, null, `#${view.alias}`)
	changeView()
})

changeView()