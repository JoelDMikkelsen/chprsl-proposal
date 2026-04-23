import './CTA.css'

export default function CTA() {
  return (
    <section className="cta">
      <span className="eyebrow" style={{ color: 'white', opacity: 0.8 }}>On approval</span>
      <h2>Together, let's go beyond.</h2>
      <p style={{ maxWidth: 640, margin: '0 auto', opacity: 0.9 }}>
        Once the scope and commercial are approved, the programme mobilises to 1 July 2026.
      </p>
      <a
        className="btn"
        href="mailto:joel.mikkelsen@fusion5.com.au?subject=CHPRSL%20Proposal%20v1.1%20approval"
      >
        Confirm approval
      </a>
    </section>
  )
}
