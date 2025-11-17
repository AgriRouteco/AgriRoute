import MarketTicker from '../components/MarketTicker'

export default function Business() {
  const tickers = [{name:'Tomatoes', price:1.80, unit:'kg', change:0.02}]
  const rows = [
    {product:'Tomatoes', price:1.80, unit:'kg', available:120, distance:5, farm:'Green Vale'},
    {product:'Potatoes', price:0.70, unit:'kg', available:500, distance:8, farm:'Hillside Farm'},
  ]
  return (
    <div style={{minHeight:'100vh', background:'#f8fafc', padding:24}}>
      <div style={{maxWidth:1100, margin:'0 auto'}}>
        <h1 style={{fontSize:22, fontWeight:700}}>Business Market</h1>
        <MarketTicker tickers={tickers} />
        <div style={{background:'#fff', padding:12, borderRadius:8, marginTop:16}}>
          <table style={{width:'100%', borderCollapse:'collapse'}}>
            <thead>
              <tr>
                <th style={{textAlign:'left', padding:8}}>Produce</th>
                <th style={{textAlign:'left', padding:8}}>Price/kg</th>
                <th style={{textAlign:'left', padding:8}}>Available</th>
                <th style={{textAlign:'left', padding:8}}>Distance (km)</th>
                <th style={{textAlign:'left', padding:8}}>Farm</th>
                <th style={{textAlign:'left', padding:8}}>Action</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(r => (
                <tr key={r.product} style={{borderTop:'1px solid #e5e7eb'}}>
                  <td style={{padding:8}}>{r.product}</td>
                  <td style={{padding:8}}>£{r.price.toFixed(2)}</td>
                  <td style={{padding:8}}>{r.available} {r.unit}</td>
                  <td style={{padding:8}}>{r.distance}</td>
                  <td style={{padding:8}}>{r.farm}</td>
                  <td style={{padding:8}}><button style={{padding:'6px 10px', background:'#2563eb', color:'#fff', borderRadius:6}}>Bulk order</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
