import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useRouter } from "next/router";

export default function Sell({ user }) {
  const router = useRouter();

  // Redirect if not logged in
  if (!user) {
    return (
      <div style={{ maxWidth: 400, margin: "50px auto", textAlign: "center" }}>
        <h2>You must be logged in to sell produce</h2>
        <a href="/login" style={{ color: "#2563eb", marginTop: 10, display: "block" }}>
          Go to Login
        </a>
      </div>
    );
  }

  // Form state
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [unit, setUnit] = useState("kg");
  const [cat, setCat] = useState("Vegetables");
  const [qty, setQty] = useState("");
  const [delivery, setDelivery] = useState("both");
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  async function uploadImage() {
    if (!imageFile) return null;

    const fileName = `${user.id}-${Date.now()}.jpg`;

    const { data, error } = await supabase.storage
      .from("listing-images")
      .upload(fileName, imageFile);

    if (error) {
      console.log(error);
      return null;
    }

    return supabase.storage.from("listing-images").getPublicUrl(fileName).data.publicUrl;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const imageUrl = await uploadImage();

    const { error } = await supabase.from("listings").insert({
      farmer_id: user.id,
      title,
      description: desc,
      price,
      unit,
      category: cat,
      quantity: qty,
      delivery_options: delivery,
      image_url: imageUrl,
    });

    setLoading(false);

    if (!error) {
      router.push("/retail"); // send them to their listings marketplace
    } else {
      console.log(error);
      alert("Error creating listing");
    }
  }

  return (
    <div style={{ maxWidth: 600, margin: "40px auto" }}>
      <h1 style={{ fontSize: 26, fontWeight: 700 }}>Create a New Listing</h1>
      <p style={{ color: "#6b7280", marginBottom: 20 }}>
        Fill out the details below to sell your produce.
      </p>

      <form onSubmit={handleSubmit}>

        <label>Title</label>
        <input 
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Example: Fresh Organic Apples"
          style={{ width:"100%", padding:10, margin:"8px 0" }}
          required
        />

        <label>Description</label>
        <textarea
          value={desc}
          onChange={e => setDesc(e.target.value)}
          placeholder="Describe your produce..."
          style={{ width:"100%", padding:10, height:100, margin:"8px 0" }}
          required
        />

        <label>Price</label>
        <input
          type="number"
          step="0.01"
          value={price}
          onChange={e => setPrice(e.target.value)}
          placeholder="1.80"
          style={{ width:"100%", padding:10, margin:"8px 0" }}
          required
        />

        <label>Unit</label>
        <select value={unit} onChange={e => setUnit(e.target.value)} style={{ width:"100%", padding:10, margin:"8px 0" }}>
          <option value="kg">kg</option>
          <option value="each">each</option>
          <option value="box">box</option>
          <option value="dozen">dozen</option>
        </select>

        <label>Category</label>
        <select value={cat} onChange={e => setCat(e.target.value)} style={{ width:"100%", padding:10, margin:"8px 0" }}>
          <option>Vegetables</option>
          <option>Fruit</option>
          <option>Dairy</option>
          <option>Meat</option>
          <option>Fish</option>
          <option>Eggs</option>
          <option>Flowers</option>
        </select>

        <label>Available Quantity</label>
        <input
          type="number"
          value={qty}
          onChange={e => setQty(e.target.value)}
          placeholder="100"
          style={{ width:"100%", padding:10, margin:"8px 0" }}
          required
        />

        <label>Delivery Options</label>
        <select value={delivery} onChange={e => setDelivery(e.target.value)} style={{ width:"100%", padding:10, margin:"8px 0" }}>
          <option value="delivery">Delivery</option>
          <option value="collection">Collection</option>
          <option value="both">Both</option>
        </select>

        <label>Image</label>
        <input 
          type="file"
          accept="image/*"
          onChange={e => setImageFile(e.target.files[0])}
          style={{ margin:"8px 0" }}
        />

        <button 
          disabled={loading}
          style={{
            width:"100%",
            padding:12,
            background:"#16a34a",
            color:"white",
            borderRadius:6,
            marginTop:15,
            fontWeight:600
          }}
        >
          {loading ? "Uploading..." : "Create Listing"}
        </button>
      </form>
    </div>
  );
}
