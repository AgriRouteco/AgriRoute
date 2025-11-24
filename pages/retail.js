import { useState } from 'react'
import MarketTicker from '../components/MarketTicker'
import SellerCard from '../components/SellerCard'

export default function Retail() {
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("")
  const [delivery, setDelivery] = useState("")
  const [sort, setSort] = useState("")

  const tickers = [
    { name: 'Apples', price: 1.80, unit: 'kg', change: 0.02 }
  ]

const listings = [
  { 
    id: 1,
    product: 'Apples',
    category: 'Fruit',       // <-- NEW
    delivery: 'both',        // <-- NEW
    price: 1.80,
    unit: 'kg',
    seller: { farmName: 'Green Vale', distanceKm: 6 },
    qty: 120
  },
  { 
    id: 2,
    product: 'Potatoes',
    category: 'Vegetables',  // <-- NEW
    delivery: 'collection',  // <-- NEW
    price: 0.70,
    unit: 'kg',
    seller: { farmName: 'Hillside Farm', distanceKm: 12 },
    qty: 500
  }
]

  // 1. FILTER FIRST
const filteredListings = listings.filter((item) => {
  const matchesSearch =
    item.product.toLowerCase().includes(search.toLowerCase())

  const matchesCategory =
    category ? item.category === category : true

  const matchesDelivery =
    delivery ? item.delivery === delivery : true

  return matchesSearch && matchesCategory && matchesDelivery
})

// 2. THEN SORT
const sortedListings = [...filteredListings].sort((a, b) => {
  if (sort === "price_low") {
    return a.price - b.price
  }
  if (sort === "price_high") {
    return b.price - a.price
  }
  if (sort === "distance_near") {
    return a.seller.distanceKm - b.seller.distanceKm
  }
  if (sort === "distance_far") {
    return b.seller.distanceKm - a.seller.distanceKm
  }
  return 0 // “Recommended”: no sort
})


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
<select
  value={sort}
  onChange={(e) => setSort(e.target.value)}
  style={{ padding: "10px", borderRadius: "6px" }}
>
  <option value="">Recommended</option>
  <option value="price_low">Price: Low → High</option>
  <option value="price_high">Price: High → Low</option>
  <option value="distance_near">Distance: Near → Far</option>
  <option value="distance_far">Distance: Far → Near</option>
</select>

            
        </div>

        <MarketTicker tickers={tickers} />

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))',
          gap: 12,
          marginTop: 16
        }}>

{sortedListings.map(l => (
  <div 
    key={l.id}
    style={{
      background: "white",
      borderRadius: "10px",
      padding: "16px",
      boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
      display: "flex",
      flexDirection: "column"
    }}
  >
    <img 
      src={l.image_url || "/placeholder-produce.jpg"} 
      style={{
        width: "100%",
        height: "160px",
        objectFit: "cover",
        borderRadius: "8px"
      }} 
    />

    <h3 style={{ fontSize: "18px", fontWeight: 700, marginTop: "10px" }}>
      {l.product}
    </h3>

    <p style={{ color: "#6b7280", fontSize: "14px", marginTop: "4px" }}>
      £{l.price} per {l.unit}
    </p>

    <p style={{ color: "#374151", fontSize: "14px", marginTop: "8px" }}>
      {l.seller.farmName}
    </p>

    <button style={{
      marginTop: "12px",
      background: "#16a34a",
      color: "white",
      padding: "10px",
      borderRadius: "6px",
      fontWeight: 600
    }}>
      View
    </button>
  </div>
))}
  
        </div>

      </div>
    </div>
  )
}


