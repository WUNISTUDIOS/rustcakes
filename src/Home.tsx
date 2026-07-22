import './Home.css'

const cakeImages = [
  'Photo_04_12_2025__17_34_17.webp',
  'Photo_09_01_2026__15_54_31.webp',
  'Photo_12_12_2025__16_49_20.webp',
  'Photo_14_04_2026__16_56_24.webp',
  'Photo_14_08_2025__16_27_07.webp',
  'Photo_15_05_2026__16_15_39.webp',
  'Photo_18_02_2026__19_04_31.webp',
  'Photo_18_03_2026__14_52_44.webp',
  'Photo_18_12_2025__17_33_37.webp',
  'Photo_19_03_2025__13_25_23.webp',
  'Photo_21_03_2025__15_15_09.webp',
  'Photo_21_05_2026__15_38_27.webp',
  'Photo_22_10_2025__17_16_20.webp',
  'Photo_23_08_2024__19_31_29.webp',
  'Photo_29_01_2025__17_22_08.webp',
  'Photo_29_01_2026__14_48_09.webp',
]

export default function Home() {
  return (
    <div className="home-page">
      <div className="home-hero">
        <a href="#">
          <img
            src="/RustOriginalRerender.webp"
            alt="Rustcakes 3D Logo"
            className="home-hero-image"
          />
        </a>
      </div>
      <div className="cake-gallery">
        {cakeImages.map((filename) => (
          <img
            key={filename}
            src={`/cakesNoBG/${filename}`}
            alt="Rustcakes cake"
          />
        ))}
      </div>
    </div>
  )
}
