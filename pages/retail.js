import { useEffect, useState } from "react"
import { supabase } from "../lib/supabaseClient"

export default function Retail() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadProducts() {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("is_active", true)

      if (error) console.error(error)
      setProducts(data || [])
      setLoading(false)
    }

    loadProducts()
  }, [])

  if (loading) return <p style={{ textAlign: "center", marginTop: 20 }}>Loading...</p>

  return (
    <div style={{ maxWidth: "1100px", margin: "30px auto", padding: "20px" }}>
      <h1 style={{ fontSize: 26, fontWeight: 700 }}>Fresh Produce</h1>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
        gap: 20,
        marginTop: 20
      }}>
        {products.map(p => (
          <div key={p.id} style={{
            background: "#fff",
            borderRadius: 10,
            boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
            padding: 16
          }}>
            <img 
              src={p.main_image_url} 
              style={{ width: "100%", height: 150, objectFit: "cover", borderRadius: 8 }}
            />

            <h3 style={{ fontSize: 18, fontWeight: 600, marginTop: 10 }}>{p.name}</h3>

            <p style={{ color: "#6b7280", marginTop: 5 }}>{p.description}</p>

            <p style={{ marginTop: 10, fontWeight: 600 }}>£{p.price_min.toFixed(2)} – £{p.price_max.toFixed(2)}</p>

            <button 
              style={{
                width: "100%",
                padding: 12,
                marginTop: 10,
                background: "#16a34a",
                color: "white",
                borderRadius: 6,
                fontWeight: 600
              }}
            >
              View Product
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}


