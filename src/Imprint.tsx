import './About.css'

export default function Imprint() {
  return (
    <div className="about-page" style={{ paddingBottom: 'clamp(40px, 6vw, 80px)' }}>
      <section className="content-section">
        <h2 className="section-header">Impressum</h2>

        <div className="body-text">
          <p><strong>Angaben gemäß § 5 TMG</strong></p>
          <p>
            Hana Betakova<br />
            Monbijouplatz 2<br />
            10178 Berlin
          </p>
          <p>
            Vertreten durch:<br />
            Hana Betakova
          </p>
          <p>
            Kontakt:<br />
            Telefon: +49 152 03708576<br />
            E-Mail: rust.c4kes@gmail.com
          </p>

          <p><strong>Haftungsausschluss:</strong></p>

          <p><strong>Datenschutz</strong></p>
          <p>
            Die Nutzung unserer Webseite ist in der Regel ohne Angabe personenbezogener
            Daten möglich. Soweit auf unseren Seiten personenbezogene Daten
            (beispielsweise Name, Anschrift oder eMail-Adressen) erhoben werden,
            erfolgt dies, soweit möglich, stets auf freiwilliger Basis. Diese Daten
            werden ohne Ihre ausdrückliche Zustimmung nicht an Dritte weitergegeben.
          </p>
          <p>
            Wir weisen darauf hin, dass die Datenübertragung im Internet (z.B. bei
            der Kommunikation per E-Mail) Sicherheitslücken aufweisen kann. Ein
            lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist nicht möglich.
          </p>
          <p>
            Der Nutzung von im Rahmen der Impressumspflicht veröffentlichten
            Kontaktdaten durch Dritte zur Übersendung von nicht ausdrücklich
            angeforderter Werbung und Informationsmaterialien wird hiermit ausdrücklich
            widersprochen. Die Betreiber der Seiten behalten sich ausdrücklich
            rechtliche Schritte im Falle der unverlangten Zusendung von
            Werbeinformationen, etwa durch Spam-Mails, vor.
          </p>
        </div>
      </section>
    </div>
  )
}
