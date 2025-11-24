import { useState, useEffect } from "react"
import MarketTicker from "../components/MarketTicker"

export default function Retail() {
  // --- FILTER + SORT STATE ---
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("")
  const [delivery, setDelivery] = useState("")
  const [sort, setSort] = useState("")

  // --- BASKET STATE ---
  const [basket, setBasket] = useState([])

  // Load basket from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("basket")
    if (saved) setBasket(JSON.parse(saved))
  }, [])

  // Save basket to localStorage on change
  useEffect(() => {
    localStorage.setItem("basket", JSON.stringify(basket))
  }, [basket])

  const addToBasket = (item) => {
    setBasket((prev) => {
      const exists = prev.find((i) => i.id === item.id)
      if (exists) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, count: i.count + 1 } : i
        )
      }
      return [...prev, { ...item, count: 1 }]
    })
  }

  // --- DATA ---
  const tickers = [
    { name: "Apples", price: 1.8, unit: "kg", change: 0.02 },
  ]

  const listings = [
    {
      id: 1,
      product: "Apples",
      category: "Fruit",
      delivery: "both",
      price: 1.8,
      unit: "kg",
      seller: { farmName: "Green Vale", distanceKm: 6 },
      qty: 120,
      image_url: "", // optional
    },
    {
      id: 2,
      product: "Potatoes",
      category: "Vegetables",
      delivery: "collection",
      price: 0.7,
      unit: "kg",
      seller: { farmName: "Hillside Farm", distanceKm: 12 },
      qty: 500,
      image_url: "", // optional
    },
  ]

  // --- FILTER LISTINGS ---
  const filteredListings = listings.filter((item) => {
    const matchesSearch = item.product.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = category ? item.category === category : true
    const matchesDelivery = delivery ? item.delivery === delivery : true
    return matchesSearch && matchesCategory && matchesDelivery
  })

  // --- SORT LISTINGS ---
  const sortedListings = [...filteredListings].sort((a, b) => {
    if (sort === "price_low") return a.price - b.price
    if (sort === "price_high") return b.price - a.price
    if (sort === "distance_near") return a.seller.distanceKm - b.seller.distanceKm
    if (sort === "distance_far") return b.seller.distanceKm - a.seller.distanceKm
    return 0
  })

  // --- MAX QUANTITY FOR PROGRESS BAR ---
  const maxQty = 500

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", padding: 24 }}>
      <div style={{ maxWidth: 1024, margin: "0 auto" }}>
        <h1 style={{ fontSize: 22, fontWeight: 700 }}>Retail Market</h1>

        {/* SEARCH */}
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
            fontSize: "16px",
          }}
        />

        {/* FILTERS + SORT */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            marginTop: "20px",
            flexWrap: "wrap",
          }}
        >
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

        {/* MARKET TICKER */}
        <MarketTicker tickers={tickers} />

        {/* LISTINGS GRID */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
            gap: 12,
            marginTop: 16,
          }}
        >
          {sortedListings.map((l) => {
            const percent = Math.min((l.qty / maxQty) * 100, 100)

            return (
              <div
                key={l.id}
                style={{
                  background: "white",
                  borderRadius: "10px",
                  padding: "16px",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <img
                  src={l.image_url || "/placeholder-produce.jpg"}
                  style={{
                    width: "100%",
                    height: "160px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />

                <h3
                  style={{
                    fontSize: "18px",
                    fontWeight: 700,
                    marginTop: "10px",
                  }}
                >
                  {l.product}
                </h3>

                <p style={{ color: "#6b7280", fontSize: "14px", marginTop: "4px" }}>
                  £{l.price.toFixed(2)} per {l.unit}
                </p>

                <p style={{ color: "#374151", fontSize: "14px", marginTop: "8px" }}>
                  {l.seller.farmName} — {l.seller.distanceKm} km
                </p>

                {/* Quantity Progress Bar */}
                <div style={{ marginTop: "10px" }}>
                  <div
                    style={{
                      height: "8px",
                      background: "#e5e7eb",
                      borderRadius: "6px",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        width: `${percent}%`,
                        background: "#16a34a",
                      }}
                    />
                  </div>
                  <p
                    style={{
                      marginTop: "6px",
                      fontSize: "12px",
                      color: "#6b7280",
                    }}
                  >
                    {l.qty} / {maxQty} {l.unit} available
                  </p>
                </div>

                {/* Add to Basket */}
                <button
                  onClick={() => addToBasket(l)}
                  style={{
                    marginTop: "12px",
                    background: "#16a34a",
                    color: "white",
                    padding: "10px",
                    borderRadius: "6px",
                    fontWeight: 600,
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Add to Basket
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

