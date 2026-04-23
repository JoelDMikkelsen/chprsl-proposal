import './CommercialCallout.css'

export default function CommercialCallout() {
  return (
    <section className="section-alt">
      <div className="wrap">
        <div className="callout">
          <div className="comet-bg" />
          <div className="callout-body">
            <span className="eyebrow" style={{ color: 'var(--f5-coral)' }}>Commercial summary</span>
            <h3>
              The Fusion5 implementation is fixed at $165,000; vendor licensing runs direct with Zudello, NetGain and Revolut and is modelled line-by-line in the configurator.
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.88)' }}>
              Zudello's licensing model is transaction-based, so the users who approve payments, raise POs or receipt goods access the platform without adding to the cost line. NetAsset is priced per asset, with the tier sized to the consolidated register across all group entities. Variations on the Fusion5 implementation are managed as formal change requests.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
