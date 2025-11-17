import MarketTicker from '../components/MarketTicker'
import SellerCard from '../components/SellerCard'

export default function Retail() {
  const tickers = [{name:'Apples', price:1.80, unit:'kg', change:0.02}]
  const listings = [
    { id:1, product:'Apples', price:1.80, unit:'kg', seller:{farmName:'Green Vale', distanceKm:6}, qty:120 },
    { id:2, product:'Potatoes', price:0.70, unit:'kg', seller:{farmName:'Hillside Farm', distanceKm:12}, qty:500 },
  ]
  return (
    <div style={{minHeight:'100vh', background:'#f8fafc', padding:24}}>
      <div style={{maxWidth:1024, margin:'0 auto'}}>
        <h1 style={{fontSize:22, fontWeight:700}}>Retail Market</h1>
        <MarketTicker tickers={tickers} />
        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(320px,1fr))', gap:12, marginTop:16}}>
          {listings.map(l => (
            <div key={l.id} style={{background:'#fff', padding:16, borderRadius:8}}>
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start'}}>
                <div>
                  <div style={{fontWeight:700}}>{l.product}</div>
                  <div style={{color:'#6b7280'}}>£{l.price.toFixed(2)} / {l.unit}</div>
                  <div style={{color:'#9ca3af', fontSize:13}}>Available: {l.qty} {l.unit}</div>
                </div>
                <div style={{textAlign:'right'}}>
                  <div style={{fontSize:13}}>{l.seller.farmName}</div>
                  <div style={{color:'#9ca3af', fontSize:12}}>{l.seller.distanceKm} km</div>
                  <button style={{marginTop:8, padding:'6px 10px', background:'#16a34a', color:'#fff', borderRadius:6}}>Add</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
