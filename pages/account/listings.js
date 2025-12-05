import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabaseClient"

export default function ListingsPage({ user }) {
  const [inventory, setInventory] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadInventory() {
      const { data, error } = await supabase
        .from("farmer_inventory")
        .select(`
          id,
          price,
          quantity,
          delivery_option,
          products (
            name,
            category,
            image_url
          )
        `)
        .eq("farmer_id", user.id)

      if (error) console.error(error)
      setInventory(data || [])
      setLoading(false)
    }

    loadInventory()
  }, [])

  if (loading) return <p>Loading...</p>

  return (
    <div style={{ maxWidth: 900, margin: "40px auto", padding: 20 }}>
      <h1 style={{ fontSize: 26, fontWeight: 700 }}>My Produce</h1>

      {inventory.length === 0 ? (
        <p style={{ marginTop: 20 }}>You currently have no produce listed.</p>
      ) : (
        inventory.map((item) => (
          <div key={item.id} style={{
            display: "flex",
            gap: 16,
            alignItems: "center",
            marginTop: 20,
            padding: 16,
            background: "white",
            borderRadius: 8,
            boxShadow: "0 1px 3px rgba(0,0,0,0.08)"
          }}>
            
            {item.products?.image_url && (
              <img 
                src={item.products.image_url} 
                alt={item.products.name}
                style={{ width: 80, height: 80, borderRadius: 6, objectFit: "cover" }}
              />
            )}

            <div style={{ flex: 1 }}>
              <h3 style={{ margin: 0 }}>{item.products?.name}</h3>
              <p style={{ margin: "4px 0", color: "#6b7280" }}>{item.products?.category}</p>
              <p style={{ margin: "4px 0" }}>£{item.price} / unit</p>
              <p style={{ margin: "4px 0" }}>Stock: {item.quantity}</p>
              <p style={{ margin: "4px 0" }}>Delivery: {item.delivery_option}</p>
            </div>

          </div>
        ))
      )}
    </div>
  )
}
