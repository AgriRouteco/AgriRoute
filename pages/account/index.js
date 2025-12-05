import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabaseClient"

export default function ListingsPage({ user }) {
  const [items, setItems] = useState([])

  useEffect(() => {
    async function loadInventory() {
      const { data, error } = await supabase
        .from("farmer_inventory")
        .select(`
          id,
          price,
          quantity,
          delivery_option,
          products ( name, category )
        `)
        .eq("farmer_id", user.id)

      if (error) {
        console.error(error)
      } else {
        setItems(data)
      }
    }

    loadInventory()
  }, [])

  return (
    <div style={{ maxWidth: 800, margin: "40px auto", padding: 20 }}>
      <h1 style={{ fontSize: 26, fontWeight: 700 }}>My Inventory</h1>

      {items.length === 0 ? (
        <p style={{ marginTop: 20 }}>You have not added any stock yet.</p>
      ) : (
        items.map((item) => (
          <div key={item.id} style={{
            marginTop: 20,
            padding: 16,
            background: "white",
            borderRadius: 8,
            boxShadow: "0 1px 3px rgba(0,0,0,0.08)"
          }}>
            <h3>{item.products?.name}</h3>
            <p style={{ color: "#6b7280" }}>{item.products?.category}</p>
            <p>£{item.price}</p>
            <p>Stock: {item.quantity}</p>
            <p>Delivery: {item.delivery_option}</p>
          </div>
        ))
      )}
    </div>
  )
}
