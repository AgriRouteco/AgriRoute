import { useEffect, useState } from "react"
import { supabase } from "../lib/supabaseClient"
import { useRouter } from "next/router"

export default function Sell({ user }) {
  const router = useRouter()

  // --- AUTH + ROLE CHECK ---
  if (!user) {
    if (typeof window !== "undefined") router.push("/login")
    return <p style={{ textAlign:"center", marginTop:20 }}>Redirecting…</p>
  }

  const role = user.user_metadata?.role
  if (role !== "farmer") {
    return (
      <div style={{ textAlign:"center", marginTop:50 }}>
        <h2>You must be a farmer to contribute inventory.</h2>
        <p style={{ marginTop:8 }}>Please register as a farmer.</p>
      </div>
    )
  }

  // --- STATE ---
  const [products, setProducts] = useState([])
  const [productId, setProductId] = useState("")
  const [price, setPrice] = useState("")
  const [quantity, setQuantity] = useState("")
  const [delivery, setDelivery] = useState("collection")
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(false)

  const [priceRange, setPriceRange] = useState(null)

  // --- LOAD PRODUCT CATALOG ---
  useEffect(() => {
    async function loadProducts() {
      const { data, error } = await supabase.from("products").select("*")
      if (!error) setProducts(data)
    }
    loadProducts()
  }, [])

  // --- Auto-load price range when product changes ---
  useEffect(() => {
    if (!productId) return
    const p = products.find(p => p.id === productId)
    if (p) {
      setPriceRange({
        min: p.min_price,
        max: p.max_price,
        recommended: p.recommended_price
      })
    }
  }, [productId])

  // --- SUBMIT ---
  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)

    // Upload private verification images
    let imageUrls = []

    if (images.length > 0) {
      for (let file of images) {
        const fileName = `${user.id}-${Date.now()}-${file.name}`

        const { data, error } = await supabase.storage
          .from("farmer-verification-images")
          .upload(fileName, file)

        if (!error) {
          const publicUrl = supabase.storage
            .from("farmer-verification-images")
            .getPublicUrl(fileName).data.publicUrl

          imageUrls.push(publicUrl)
        }
      }
    }

    // Insert record into farmer_inventory
    const { error } = await supabase.from("farmer_inventory").insert([
      {
        farmer_id: user.id,
        product_id: productId,
        price: price,
        quantity: quantity,
        delivery_option: delivery,
        images: imageUrls
      }
    ])

    if (error) {
      alert("Could not save inventory.")
      console.error(error)
    } else {
      alert("Inventory added!")
      router.push("/account/listings")
    }

    setLoading(false)
  }

  return (
    <div style={{ maxWidth:600, margin:"40px auto", padding:20 }}>
      <h1 style={{ fontSize:26, fontWeight:700 }}>Add Produce Inventory</h1>

      <p style={{ marginTop:6, color:"#6b7280" }}>
        Select a product and contribute your stock.
      </p>

      <form onSubmit={handleSubmit} style={{ marginTop:20 }}>
        
        {/* Product picker */}
        <label>Select Product</label>
        <select
          required
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          style={{ width:"100%", padding:10, margin:"10px 0" }}
        >
          <option value="">Choose a product...</option>
          {products.map(p => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>

        {/* Price range info */}
        {priceRange && (
          <div style={{
            background:"#eefbf0",
            padding:10,
            borderRadius:6,
            marginBottom:10
          }}>
            <p>Allowed: £{priceRange.min} – £{priceRange.max}</p>
            <p>Recommended: £{priceRange.recommended}</p>
          </div>
        )}

        <label>Your Price (£)</label>
        <input
          required
          type="number"
          step="0.01"
          value={price}
          onChange={e => setPrice(e.target.value)}
          style={{ width:"100%", padding:10, margin:"10px 0" }}
        />

        <label>Available Quantity</label>
        <input
          required
          type="number"
          value={quantity}
          onChange={e => setQuantity(e.target.value)}
          style={{ width:"100%", padding:10, margin:"10px 0" }}
        />

        <label>Delivery Option</label>
        <select
          value={delivery}
          onChange={e => setDelivery(e.target.value)}
          style={{ width:"100%", padding:10, margin:"10px 0" }}
        >
          <option value="collection">Collection Only</option>
          <option value="delivery">Delivery Available</option>
          <option value="both">Both</option>
        </select>

        <label>Upload Verification Images</label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => setImages([...e.target.files])}
          style={{ margin:"10px 0" }}
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            width:"100%",
            padding:14,
            marginTop:10,
            background:"#16a34a",
            color:"white",
            borderRadius:6,
            fontWeight:600
          }}
        >
          {loading ? "Saving…" : "Add Inventory"}
        </button>

      </form>
    </div>
  )
}
