import './About.css'

export default function About() {
  return (
    <div className="about-page" style={{ paddingBottom: 'clamp(40px, 6vw, 80px)' }}> 
      <section className="content-section">
        <div className="body-text">
          <p>
            hiiiii, my name is hana and I bake vegan cakes in berlin.
          </p>
        </div>
      </section>

      {/* <h2 className="section-header">baking process</h2> */}

      <section className="content-section">
        <div className="body-text">
          <p>
            if you want to order a cake, please note that the design is mostly up to me. you can choose colors, moods and provide additional references.
          </p>
          <p>
            In general, my cakes are not too sweet, but still full of flavor.
            all my cakes are made with plant-based butter, so you still get the
            texture and taste of a classic fluffy sponge.
          </p>
          <p>
            with a variety of options available, you can tailor each cake to
            include your favorite flavors. if you aren't sure what will work, I
            can help you find the perfect match.
          </p>
          <p>
            If you see a cake you like from my portfolio or instagram, the design can be tailored to fit your style or event! but all cakes must remain unique.
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
          src={`${import.meta.env.BASE_URL}Rusty_rustcakes3D_footer_alpha.webp`}
          alt="Rustcakes 3D Logo"
          className="hero-image"
        />
      </div>
    </div>
  )
}
