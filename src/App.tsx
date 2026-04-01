import { useState, useEffect } from 'react'
import Layout from './Layout'
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

  return (
    <Layout navAlign={currentPage === 'home' ? 'center' : 'left'}>
      {currentPage === 'orders' && <OrderForm />}
      {currentPage === 'about' && <About />}
      {currentPage === 'home' && <Home />}
    </Layout>
  )
}

export default App
