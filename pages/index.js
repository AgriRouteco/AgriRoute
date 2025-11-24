import Head from 'next/head'
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
      <Head>
        <title>AgriRoute — Fresh from farms</title>
      </Head>

      {/* REMOVE the duplicate <Header /> — it's global now */}

      <div style={{ minHeight: "100vh", background: "#f8fafc" }}>
       <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 20px" }}>

  {/* Hero Section */}
  <section style={{
    background: "#e8f5e9",
    padding: "60px 40px",
    borderRadius: "12px",
    textAlign: "center",
    marginBottom: "40px"
  }}>
    <h1 style={{ fontSize: "40px", fontWeight: 800, marginBottom: 10 }}>
      Fresh Food, Direct From Farmers
    </h1>
    <p style={{ color: "#4b5563", fontSize: "18px", maxWidth: "700px", margin: "0 auto" }}>
      Skip the supermarkets — buy straight from real farmers. Better prices for them, fresher food for you.
    </p>

    <div style={{ marginTop: "30px", display: "flex", justifyContent: "center", gap: "20px" }}>
      <a href="/retail" style={{
        background: "#16a34a",
        color: "white",
        padding: "14px 24px",
        borderRadius: 8,
        fontSize: 18,
        fontWeight: 600
      }}>
        Shop Produce
      </a>

      <a href="/business" style={{
        background: "white",
        border: "2px solid #16a34a",
        color: "#16a34a",
        padding: "14px 24px",
        borderRadius: 8,
        fontSize: 18,
        fontWeight: 600
      }}>
        For Restaurants
      </a>
    </div>
  </section>

  {/* Ticker + Featured */}
  <section style={{ marginBottom: "40px" }}>
    <MarketTicker tickers={tickers} />
  </section>

  <section>
    <h2 style={{ fontSize: "26px", fontWeight: "700", marginBottom: "20px" }}>
      Featured Farmers
    </h2>
    <FeaturedFarmers />
  </section>

</main>
      </div>
    </>
  )
}
