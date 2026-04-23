import './StatBar.css'

type Stat = { num: string; lab: string }

const STATS: Stat[] = [
  { num: '12', lab: 'Entities consolidated into one group ledger' },
  { num: '$165K', lab: 'Fixed-price NetSuite implementation' },
  { num: '1 Jul', lab: 'Committed go-live, 2026' },
  { num: '0', lab: 'NetSuite licences for ~40–50 receipters; they transact in Zudello' },
]

export default function StatBar() {
  return (
    <div className="statbar">
      <div className="stats">
        {STATS.map((s) => (
          <div key={s.lab} className="stat">
            <div className="num">{s.num}</div>
            <div className="lab">{s.lab}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
