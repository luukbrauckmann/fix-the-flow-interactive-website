document.addEventListener('click', (e) => {
	const { target } = e
	if (!target.matches('a')) return
	e.preventDefault()
	if (target.href === window.location.pathname) return
	route()
})

const routes = [
	{ path: '/404', title: '404', alias: '404', componentRef: 'components/404/' },
	{ path: '/', title: 'Reserveren', alias: 'reservation', componentRef: 'components/reservation/' },
	{ path: '/registreren', title: 'Registreren', alias: 'registration', componentRef: 'components/registration/' },
	{ path: '/aanmelden', title: 'Aanmelden', alias: 'sign-in', componentRef: 'components/sign-in/' },
	{ path: '/account', title: 'Account', alias: 'account', componentRef: 'components/account/' }
]

const route = (event) => {
	event = event || window.event
	event.preventDefault()

	window.history.pushState({}, '', event.target.href)
	locationHandler()
}

const locationHandler = async () => {
	let path = window.location.pathname
	if (path.length == 0) path = '/'

	const route = getRoute(path)

	const html = await fetch(`${route.componentRef}${route.alias}.html`)
		.then((response) => response.text())

	const main = document.getElementById('main-content')
	main.innerHTML = html
	main.title = route.title

	const link = document.getElementById('component-styles')
	link.href = `${route.componentRef}${route.alias}.css`

	const script = document.getElementById('component-scripts')
	script.src = `${route.componentRef}${route.alias}.js`
}

getRoute = (path) => routes.find((route) => route.path === path) || routes.find((route) => route.path === '/404')

window.onpopstate = locationHandler
window.route = route
locationHandler()