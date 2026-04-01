import './About.css'

export default function About() {
  return (
    <div className="about-page">
      <section className="content-section">
        <p className="intro-text">
          hi, my name is Hana and I bake vegan cakes in Berlin. If you haven't
          seen my work yet, please check the portfolio to see what I do. I'm
          always up for a trade, whether it's art or any other skill or service.
        </p>
      </section>

      <h2 className="section-header">baking process</h2>

      <section className="content-section">
        <div className="body-text">
          <p>
            if you want to order a cake, please note that the design is mostly
            up to me. You can choose colors and moods, but every cake is unique.
          </p>
          <p>
            In general, my cakes are not too sweet, but still full of flavor.
            All my cakes are made with plant-based butter, so you still get the
            texture and taste of a classic fluffy sponge.
          </p>
          <p>
            with a variety of options available, you can tailor each cake to
            include your favorite flavors. If you aren't sure what will work, I
            can help you find the perfect match.
          </p>
          <p>
            If you see a cake you like on my Instagram, we can talk about how we
            can adjust it to your style, as all my cakes are unique.
          </p>
          <p>
            thanks for taking a look at my work and I hope to hear from you
            soon.
          </p>
          <p>With love,</p>
        </div>
      </section>

      <div className="bottom-hero">
        <img
          src="/rustcakes-hero.png"
          alt="Rustcakes 3D Logo"
          className="hero-image"
        />
      </div>
    </div>
  )
}
