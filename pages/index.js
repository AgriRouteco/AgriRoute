import Head from 'next/head'
import Header from '../components/Header'
import MarketTicker from '../components/MarketTicker'
import FeaturedFarmers from '../components/FeaturedFarmers'

export default function Home() {
  const tickers = [
    { name: 'Apples', price: 1.80, unit: 'kg', change: 0.02 },
    { name: 'Potatoes', price: 0.70, unit: 'kg', change: -0.01 },
    { name: 'Eggs', price: 0.20, unit: 'egg', change: 0.00 },
  ]
  return (   
 <>
      <Head><title>AgriRoute — Fresh from farms</title></Head>
      <div style={{minHeight:'100vh', background:'#f8fafc'}}>
<Header /> 
  
        <main style={{maxWidth:1024, margin:'24px auto', padding:12}}>
        <section style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:12}}>
            <a href="/retail" style={{background:'#fff', padding:20, borderRadius:8, boxShadow:'0 1px 3px rgba(0,0,0,0.06)'}}>
              <h2 style={{fontSize:18, fontWeight:600}}>For Home — Fresh produce, local</h2>
              <p style={{color:'#6b7280'}}>Order pick-up or delivery — apples, veg, dairy & more.</p>
            </a>
            <a href="/business" style={{background:'#fff', padding:20, borderRadius:8, boxShadow:'0 1px 3px rgba(0,0,0,0.06)'}}>
              <h2 style={{fontSize:18, fontWeight:600}}>For Restaurants — Reliable local supply</h2>
              <p style={{color:'#6b7280'}}>Bulk supply, recurring deliveries and trusted farms.</p>
            </a>
          </section>

          <section style={{marginTop:20}}>
            <MarketTicker tickers={tickers} />
          </section>

          <section style={{marginTop:20}}>
            <h3 style={{fontSize:16, fontWeight:600, marginBottom:8}}>Featured farmers</h3>
            <FeaturedFarmers />
          </section>
        </main>
      </div>
    </>
  )
}
