import { useEffect, useState } from "react"
import { supabase } from "../lib/supabaseClient"

export default function Business() {
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
      <h1 style={{ fontSize: 26, fontWeight: 700 }}>Bulk Produce for Businesses</h1>

      <table style={{ width: "100%", marginTop: 20, background: "#fff", borderRadius: 10, overflow: "hidden" }}>
        <thead style={{ background: "#f1f5f9" }}>
          <tr>
            <th style={{ padding: 12, textAlign: "left" }}>Product</th>
            <th style={{ padding: 12, textAlign: "left" }}>Price Range</th>
            <th style={{ padding: 12, textAlign: "left" }}>Category</th>
            <th style={{ padding: 12, textAlign: "left" }}>Stock</th>
            <th style={{ padding: 12, textAlign: "left" }}></th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p.id} style={{ borderTop: "1px solid #e5e7eb" }}>
              <td style={{ padding: 12 }}>{p.name}</td>
              <td style={{ padding: 12 }}>£{p.price_min} – £{p.price_max}</td>
              <td style={{ padding: 12 }}>{p.category}</td>
              <td style={{ padding: 12 }}>{p.total_units_available} units</td>
              <td style={{ padding: 12 }}>
                <button 
                  style={{
                    background: "#2563eb",
                    color: "white",
                    padding: "8px 12px",
                    borderRadius: 6
                  }}
                >
                  Request Bulk Order
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
