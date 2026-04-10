import type { ReactNode } from 'react'
import './Layout.css'

export default function Layout({ children, navAlign = 'center' }: { children: ReactNode; navAlign?: 'center' | 'left' }) {
	return (
		<div className="layout">
			<nav className={`layout-nav${navAlign === 'left' ? ' layout-nav--left' : ''}`}>
				<a href="#works">works</a>
				<a href="#orders">orders</a>
				<a href="#about">about</a>
			</nav>
			<main className="layout-main">
				{children}
			</main>
			<footer className={`layout-footer${navAlign === 'left' ? ' layout-footer--left' : ''}`}>
				<a href="https://instagram.com/rustcakes" target="_blank" rel="noopener noreferrer">@rustcakes</a>
				<a href="#privacy">privacy policy</a>
				<a href="#imprint">imprint</a>
			</footer>
		</div>
	)
}
