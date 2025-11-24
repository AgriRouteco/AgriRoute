import { useState } from "react"
import { supabase } from "../lib/supabaseClient"
import { useRouter } from "next/router"

export default function Sell({ user }) {
  const router = useRouter()

  // If no user → redirect to login
  if (!user) {
    if (typeof window !== "undefined") router.push("/login")
    return <p style={{textAlign:"center", marginTop:20}}>Redirecting...</p>
  }

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("Fruit")
  const [price, setPrice] = useState("")
  const [unit, setUnit] = useState("kg")
  const [quantity, setQuantity] = useState("")
  const [delivery, setDelivery] = useState("collection")
  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)

    let image_url = null

    // Upload image if provided
    if (image) {
      const fileName = `${user.id}-${Date.now()}-${image.name}`
      const { data: storageData, error: storageError } = await supabase
        .storage
        .from("listing-images")
        .upload(fileName, image)

      if (storageError) {
        alert("Image upload failed.")
        setLoading(false)
        return
      }

      image_url = supabase.storage.from("listing-images").getPublicUrl(fileName).data.publicUrl
    }

    // Insert listing
    const { error } = await supabase
      .from("listings")
      .insert([
        {
          farmer_id: user.id,
          title,
          description,
          category,
          price,
          unit,
          quantity,
          delivery,
          image_url
        }
      ])

    if (error) {
      console.error(error)
      alert("Could not create listing")
    } else {
      alert("Listing created!")
      router.push("/retail")
    }

    setLoading(false)
  }

  return (
    <div style={{maxWidth: "600px", margin: "40px auto", padding: "20px"}}>
      <h1 style={{fontSize: 26, fontWeight: 700}}>Create a Listing</h1>

      <p style={{marginTop: 8, color: "#6b7280"}}>
        Fill in the details below to list your produce.
      </p>

      <form onSubmit={handleSubmit} style={{marginTop: 20}}>

        <label>Title</label>
        <input 
          type="text"
          required
          placeholder="e.g. Fresh Red Apples"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{width:"100%", padding:10, margin:"10px 0"}}
        />

        <label>Description</label>
        <textarea
          required
          placeholder="Describe your product…"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{width:"100%", padding:10, margin:"10px 0", height:100}}
        />

        <label>Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{width:"100%", padding:10, margin:"10px 0"}}
        >
          <option>Fruit</option>
          <option>Vegetables</option>
          <option>Dairy</option>
          <option>Meat</option>
          <option>Grains</option>
          <option>Other</option>
        </select>

        <label>Price per unit (£)</label>
        <input 
          type="number"
          required
          step="0.01"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          style={{width:"100%", padding:10, margin:"10px 0"}}
        />

        <label>Unit</label>
        <select
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
          style={{width:"100%", padding:10, margin:"10px 0"}}
        >
          <option value="kg">kg</option>
          <option value="item">item</option>
          <option value="crate">crate</option>
          <option value="bag">bag</option>
        </select>

        <label>Available Quantity</label>
        <input 
          type="number"
          required
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          style={{width:"100%", padding:10, margin:"10px 0"}}
        />

        <label>Delivery Options</label>
        <select
          value={delivery}
          onChange={(e) => setDelivery(e.target.value)}
          style={{width:"100%", padding:10, margin:"10px 0"}}
        >
          <option value="collection">Collection Only</option>
          <option value="delivery">Delivery Available</option>
          <option value="both">Both</option>
        </select>

        <label>Upload Image</label>
        <input 
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          style={{margin:"10px 0"}}
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            width:"100%",
            padding:14,
            background:"#16a34a",
            color:"white",
            borderRadius:6,
            fontWeight:600,
            marginTop:10
          }}
        >
          {loading ? "Uploading…" : "Create Listing"}
        </button>

      </form>

    </div>
  )
}
