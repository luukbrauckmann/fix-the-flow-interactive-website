document.addEventListener('click', (event) => {
	const { target } = event
	if (!target.matches('a')) return
	event.preventDefault()
	if (target.href.substring(target.href.lastIndexOf('/')) === window.location.pathname) return
	route()
})

document.addEventListener('submit', (event) => {
	event.preventDefault()
})

const routes = [
	{ path: '/404', title: '404', alias: '404', componentRef: 'components/404/' },
	{ path: '/', title: 'Thuis', alias: 'home', componentRef: 'components/home/' },
	{ path: '/reserveren', title: 'Reserveren', alias: 'reservation', componentRef: 'components/reservation/' },
	{ path: '/registreren', title: 'Registreren', alias: 'registration', componentRef: 'components/registration/' },
	{ path: '/aanmelden', title: 'Aanmelden', alias: 'sign-in', componentRef: 'components/sign-in/' },
	{ path: '/account', title: 'Account', alias: 'account', componentRef: 'components/account/' }
]

getRoute = (path) => {
	if (path === '/') return routes.find((route) => route.path === '/')
	return routes.find((route) => route.path === path) || routes.find((route) => route.path === '/404')
}

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

	document.title = route.title

	const main = document.getElementsByTagName('main')[0]
	main.innerHTML = html

	const oldLink = document.getElementById('component-styles')
	if (oldLink) oldLink.remove()
	const link = document.createElement('link')
	link.id = 'component-styles'
	link.rel = 'stylesheet'
	link.href = `${route.componentRef}${route.alias}.css`
	document.head.appendChild(link)

	const oldScript = document.getElementById('component-scripts')
	if (oldScript) oldScript.remove()
	const script = document.createElement('script')
	script.id = 'component-scripts'
	script.src = `${route.componentRef}${route.alias}.js`
	script.async = true
	document.body.appendChild(script)

	const nav = document.getElementsByTagName('nav')[0]
	const links = nav.getElementsByTagName('a')
	for (let link of links) link.dataset['active'] = link.href.substring(link.href.lastIndexOf('/')) === route.path
}

window.onpopstate = locationHandler
window.route = route
locationHandler()