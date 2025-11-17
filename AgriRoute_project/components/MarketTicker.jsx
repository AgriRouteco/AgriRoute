export default function MarketTicker({ tickers = [] }) {
  return (
    <div style={{overflowX:'auto', whiteSpace:'nowrap', padding:'12px', background:'#fff', borderRadius:6}}>
      <div style={{display:'inline-flex', gap:24}}>
        {tickers.map((t)=> {
          const changePct = (t.change*100).toFixed(1)
          const color = t.change>0 ? '#16a34a' : (t.change<0 ? '#dc2626' : '#6b7280')
          return (
            <div key={t.name} style={{display:'inline-block', minWidth:160}}>
              <div style={{fontWeight:600}}>{t.name}</div>
              <div>£{t.price.toFixed(2)} / {t.unit}</div>
              <div style={{color}}>{changePct}%</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
