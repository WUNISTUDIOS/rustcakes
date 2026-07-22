import { useState, useEffect } from 'react'
import Layout from './Layout'
import Home from './Home'
import About from './About'
import OrderForm from './OrderForm'
import Imprint from './Imprint'
import Privacy from './Privacy'

function App() {
  const [currentPage, setCurrentPage] = useState(() => {
    const hash = window.location.hash
    if (hash === '#orders') return 'orders'
    if (hash === '#about') return 'about'
    if (hash === '#imprint') return 'imprint'
    if (hash === '#privacy') return 'privacy'
    return 'home'
  })

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash
      if (hash === '#orders') {
        setCurrentPage('orders')
      } else if (hash === '#about') {
        setCurrentPage('about')
      } else if (hash === '#imprint') {
        setCurrentPage('imprint')
      } else if (hash === '#privacy') {
        setCurrentPage('privacy')
      } else {
        setCurrentPage('home')
      }
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  return (
    <Layout navAlign="center">
      {currentPage === 'orders' && <OrderForm />}
      {currentPage === 'about' && <About />}
      {currentPage === 'imprint' && <Imprint />}
      {currentPage === 'privacy' && <Privacy />}
      {currentPage === 'home' && <Home />}
    </Layout>
  )
}

export default App
