import { useState, useEffect } from 'react'
import Home from './Home'
import About from './About'
import OrderForm from './OrderForm'

function App() {
	const [currentPage, setCurrentPage] = useState(() => {
		const hash = window.location.hash
		if (hash === '#orders') return 'orders'
		if (hash === '#about') return 'about'
		return 'home'
	})

	useEffect(() => {
		const handleHashChange = () => {
			const hash = window.location.hash
			if (hash === '#orders') {
				setCurrentPage('orders')
			} else if (hash === '#about') {
				setCurrentPage('about')
			} else {
				setCurrentPage('home')
			}
		}

		window.addEventListener('hashchange', handleHashChange)
		return () => window.removeEventListener('hashchange', handleHashChange)
	}, [])

	if (currentPage === 'orders') {
		return <OrderForm />
	}

	if (currentPage === 'about') {
		return <About />
	}

	return <Home />
}

export default App
