import './Home.css'

export default function Home() {
	return (
		<div className="home-page">
			<div className="home-hero">
				<img
					src="/rustcakes3DHome_hero_alpha.png"
					alt="Rustcakes 3D Logo"
					className="home-hero-image"
				/>
			</div>

			<nav className="home-nav">
				<a href="#orders">orders</a>
				<a href="#works">works</a>
				<a href="#about">about</a>
			</nav>

			<footer className="home-footer">
				<a href="https://instagram.com/rustcakes">@rustcakes</a>
				<a href="#privacy">privacy policy</a>
				<a href="#imprint">imprint</a>
			</footer>
		</div>
	)
}
