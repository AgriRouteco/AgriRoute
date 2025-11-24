import { useState } from 'react'
import MarketTicker from '../components/MarketTicker'
import SellerCard from '../components/SellerCard'

export default function Retail() {
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("")
  const [delivery, setDelivery] = useState("")

  const tickers = [
    { name: 'Apples', price: 1.80, unit: 'kg', change: 0.02 }
  ]

  const listings = [
    { id: 1, product: 'Apples', price: 1.80, unit: 'kg', seller: { farmName: 'Green Vale', distanceKm: 6 }, qty: 120 },
    { id: 2, product: 'Potatoes', price: 0.70, unit: 'kg', seller: { farmName: 'Hillside Farm', distanceKm: 12 }, qty: 500 },
  ]

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', padding: 24 }}>
      <div style={{ maxWidth: 1024, margin: '0 auto' }}>
        <h1 style={{ fontSize: 22, fontWeight: 700 }}>Retail Market</h1>

        <input
          type="text"
          placeholder="Search produce (e.g. apples, milk, tomatoes)…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "10px",
            border: "1px solid #d1d5db",
            borderRadius: "8px",
            fontSize: "16px"
          }}
        />

        <div style={{
          display: "flex",
          gap: "12px",
          marginTop: "20px",
          flexWrap: "wrap"
        }}>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{ padding: "10px", borderRadius: "6px" }}
          >
            <option value="">All Categories</option>
            <option value="Fruit">Fruit</option>
            <option value="Vegetables">Vegetables</option>
            <option value="Dairy">Dairy</option>
            <option value="Meat">Meat</option>
            <option value="Grains">Grains</option>
            <option value="Other">Other</option>
          </select>

          <select
            value={delivery}
            onChange={(e) => setDelivery(e.target.value)}
            style={{ padding: "10px", borderRadius: "6px" }}
          >
            <option value="">All Delivery</option>
            <option value="collection">Collection</option>
            <option value="delivery">Delivery</option>
            <option value="both">Both</option>
          </select>
        </div>

        <MarketTicker tickers={tickers} />

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))',
          gap: 12,
          marginTop: 16
        }}>
          {listings.map(l => (
            <div key={l.id} style={{ background: '#fff', padding: 16, borderRadius: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ fontWeight: 700 }}>{l.product}</div>
                  <div style={{ color: '#6b7280' }}>£{l.price.toFixed(2)} / {l.unit}</div>
                  <div style={{ color: '#9ca3af', fontSize: 13 }}>Available: {l.qty} {l.unit}</div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 13 }}>{l.seller.farmName}</div>
                  <div style={{ color: '#9ca3af', fontSize: 12 }}>{l.seller.distanceKm} km</div>
                  <button style={{ marginTop: 8, padding: '6px 10px', background: '#16a34a', color: '#fff', borderRadius: 6 }}>Add</button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}


