import type { ReactNode } from 'react'
import './Layout.css'

export default function Layout({ children, navAlign = 'center', navBg = false }: { children: ReactNode; navAlign?: 'center' | 'left'; navBg?: boolean }) {
	const scrollToTop = () => window.scrollTo(0, 0)

	return (
		<div className="layout">
			<nav className={`layout-nav${navAlign === 'left' ? ' layout-nav--left' : ''}${navBg ? ' layout-nav--bg' : ''}`}>
				<a href="#works" onClick={scrollToTop}>portfolio</a>
				<a href="#orders" onClick={scrollToTop}>orders</a>
				<a href="#about" onClick={scrollToTop}>about</a>
			</nav>
			<main className="layout-main">
				{children}
				<footer className={`layout-footer${navAlign === 'left' ? ' layout-footer--left' : ''}`}>
					<a href="https://instagram.com/rustcakes" target="_blank" rel="noopener noreferrer">@rustcakes</a>
					<a href="#privacy" onClick={scrollToTop}>privacy</a>
					<a href="#imprint" onClick={scrollToTop}>imprint</a>
					<a href="https://wunistudios.github.io/blogdenzel/" target="_blank" rel="noopener noreferrer">© 2026 cgistudio. A website by Denzel Arthur</a>
				</footer>
			</main>
		</div>
	)
}
