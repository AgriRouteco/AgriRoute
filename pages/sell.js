import { useEffect, useState } from "react"
import { supabase } from "../lib/supabaseClient"
import { useRouter } from "next/router"

export default function Sell({ user }) {
  const router = useRouter()
  const [products, setProducts] = useState([])
  const [productId, setProductId] = useState("")
  const [quantity, setQuantity] = useState("")
  const [price, setPrice] = useState("")
  const [loading, setLoading] = useState(false)

  // --- AUTH CHECK ---
  if (!user) {
    if (typeof window !== "undefined") router.push("/login")
    return <p style={{ textAlign: "center", marginTop: 20 }}>Redirecting...</p>
  }

  if (user.user_metadata?.role !== "farmer") {
    return (
      <div style={{ textAlign: "center", marginTop: 40 }}>
        <h2>You must be a farmer to add produce.</h2>
        <p style={{ marginTop: 10 }}>Your account is not marked as a farmer.</p>
      </div>
    )
  }

  useEffect(() => {
    async function loadProducts() {
      const { data } = await supabase.from("products").select("*")
      setProducts(data || [])
    }
    loadProducts()
  }, [])

  async function submitContribution(e) {
    e.preventDefault()
    setLoading(true)

    const { error } = await supabase.from("farmer_products").insert([
      {
        farmer_id: user.id,
        product_id: productId,
        units_available: quantity,
        price_per_unit: price,
      }
    ])

    if (error) {
      alert("Could not add your produce.")
      console.error(error)
    } else {
      alert("Your stock has been added.")
      router.push("/account/listings")
    }

    setLoading(false)
  }

  return (
    <div style={{ maxWidth: "600px", margin: "40px auto", padding: "20px" }}>
      <h1 style={{ fontSize: 26, fontWeight: 700 }}>Add Produce to Inventory</h1>

      <form onSubmit={submitContribution} style={{ marginTop: 20 }}>
        <label>Choose Product</label>
        <select
          required
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          style={{ width: "100%", padding: 10, margin: "10px 0" }}
        >
          <option value="">Select…</option>
          {products.map(p => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>

        <label>Your Price per Unit (£)</label>
        <input
          type="number"
          step="0.01"
          required
          style={{ width: "100%", padding: 10, margin: "10px 0" }}
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <label>Units Available</label>
        <input
          type="number"
          required
          style={{ width: "100%", padding: 10, margin: "10px 0" }}
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: 14,
            background: "#16a34a",
            color: "white",
            borderRadius: 6,
            fontWeight: 600,
            marginTop: 10
          }}
        >
          {loading ? "Saving…" : "Add Stock"}
        </button>
      </form>
    </div>
  )
}
