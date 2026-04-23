const THIS_WEEK = [
  'Board paper finalisation (Brendan McDowell)',
  'Zudello demo this week; CHPRSL to make the final platform decision on the back of it',
  'Revolut plan tier confirmation with account manager',
  'Asset register clean-up planning ahead of NetAsset migration',
]

const ON_APPROVAL = [
  'Statement of Work execution',
  'Kick-off & Initiate phase (week 1–2)',
  'Design workshops including Zudello data-sync decision',
  'Formal NetSuite database tier assessment',
  'Go-live on 1 July 2026',
]

export default function NextSteps() {
  return (
    <section>
      <div className="wrap">
        <span className="eyebrow">Next steps</span>
        <h2>Two confirmations this week take us to Statement of Work</h2>
        <div className="grid-2" style={{ marginTop: '1.5rem' }}>
          <div className="card">
            <h4>This week</h4>
            <ul style={{ paddingLeft: '1.1rem', color: 'var(--f5-jet)' }}>
              {THIS_WEEK.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
          <div className="card">
            <h4>On approval</h4>
            <ul style={{ paddingLeft: '1.1rem', color: 'var(--f5-jet)' }}>
              {ON_APPROVAL.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
