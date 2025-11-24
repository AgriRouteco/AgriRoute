import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabaseClient"

export default function ListingsPage({ user }) {
const [listings, setListings] = useState([])

useEffect(() => {
async function loadListings() {
const { data } = await supabase
.from("listings")
.select("*")
.eq("farmer_id", user.id)

setListings(data)
}
loadListings()
}, [])

return (
<div style={{ maxWidth: 800, margin: "40px auto", padding: 20 }}>
<h1 style={{ fontSize: 26, fontWeight: 700 }}>My Listings</h1>

{listings.length === 0 ? (
<p style={{ marginTop: 20 }}>You have no listings yet.</p>
) : (
listings.map((item) => (
<div key={item.id} style={{
marginTop: 20,
padding: 16,
background: "white",
borderRadius: 8,
boxShadow: "0 1px 3px rgba(0,0,0,0.08)"
}}>
<h3 style={{ margin: 0 }}>{item.title}</h3>
<p style={{ margin: "6px 0", color: "#6b7280" }}>{item.category}</p>
<p style={{ margin: 0 }}>£{item.price} / {item.unit}</p>
<p style={{ margin: 0 }}>Available: {item.quantity}</p>
</div>
))
)}
</div>
)
}
