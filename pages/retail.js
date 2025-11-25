import { useEffect, useState } from "react"
import { supabase } from "../lib/supabaseClient"

export default function Retail() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    async function load() {
      // Get aggregated product catalog
      const { data } = await supabase.from("products").select("*")
      setProducts(data || [])
    }
    load()
  }, [])

  return (
    <div style={{ maxWidth:900, margin:"40px auto", padding:20 }}>
      <h1 style={{ fontSize:26, fontWeight:700 }}>Fresh Produce</h1>

      <div style={{
        display:"grid",
        gridTemplateColumns:"repeat(auto-fill, minmax(250px, 1fr))",
        gap:20,
        marginTop:20
      }}>
        {products.map(p => (
          <div key={p.id}
            style={{
              background:"#fff",
              padding:16,
              borderRadius:8,
              boxShadow:"0 1px 3px rgba(0,0,0,0.1)"
            }}
          >
            <img
              src={p.image_url}
              style={{ width:"100%", height:160, objectFit:"cover", borderRadius:6 }}
            />

            <h2 style={{ fontSize:18, marginTop:10 }}>{p.name}</h2>
            <p style={{ color:"#6b7280", fontSize:14 }}>
              Recommended: £{p.recommended_price}
            </p>

            <a
              href={`/product/${p.id}`}
              style={{
                display:"block",
                marginTop:10,
                padding:"10px 12px",
                background:"#16a34a",
                color:"#fff",
                textAlign:"center",
                borderRadius:6
              }}
            >
              View Product
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}
