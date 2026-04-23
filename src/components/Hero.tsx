import './Hero.css'

export default function Hero() {
  return (
    <header className="hero">
      <div className="hero-grid wrap">
        <div>
          <span className="eyebrow">Together, let's go beyond</span>
          <h1>
            Canterbury-Hurlstone Park RSL Club <span className="accent">×</span> Fusion5
          </h1>
          <p className="lede">
            Twelve entities consolidate into one NetSuite ledger. Three specialised vendors deliver procurement, fixed assets, and corporate cards. Fixed-price implementation, committed to 1 July 2026.
          </p>
          <div className="meta">
            <span>Version 1.1</span>
            <span>April 2026</span>
            <span>Target go-live 1 July 2026</span>
            <span>Fixed-price engagement</span>
            <span>Pricing valid until 31 May 2026</span>
          </div>
        </div>
        <div className="hero-disc" aria-hidden="true">
          <div className="dot-violet" />
          <div className="dot-rose" />
          <div className="dot-coral" />
        </div>
      </div>
    </header>
  )
}
