import { useRouter } from "next/router";
import { supabase } from "../../lib/supabaseClient";
import { useEffect, useState } from "react";

export default function ProductDetail({ user }) {
const router = useRouter();
const { id } = router.query;

const [product, setProduct] = useState(null);
const [quantity, setQuantity] = useState(1);
const [loading, setLoading] = useState(false);

// Fetch product
useEffect(() => {
if (!id) return;
async function load() {
const { data, error } = await supabase
.from("products")
.select("*")
.eq("id", id)
.single();

if (error) console.error(error);
else setProduct(data);
}
load();
}, [id]);

async function createOrder() {
if (!user) {
router.push("/login");
return;
}

setLoading(true);

const { data, error } = await supabase
.from("orders")
.insert([
{
customer_id: user.id,
product_id: id,
quantity: quantity
}
])
.select("*")
.single();

if (error) {
alert("Order failed");
setLoading(false);
return;
}

// Call assignment endpoint
await fetch("/api/assign-farmer", {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({ order_id: data.id, product_id: id })
});

alert("Order placed!");
router.push("/account/orders");
}

if (!product) return <p>Loading...</p>;

return (
<div style={{ maxWidth: 800, margin: "40px auto", padding: "20px" }}>
<h1 style={{ fontSize: 28, fontWeight: 700 }}>{product.name}</h1>
<img
src={product.image_url}
style={{ width: "100%", maxHeight: 300, objectFit: "cover", borderRadius: 10, marginTop: 20 }}
/>

<p style={{ marginTop: 20, color: "#444" }}>{product.description}</p>

<p style={{ marginTop: 10 }}>
<strong>Price Range:</strong> £{product.min_price} – £{product.max_price}
</p>

<div style={{ marginTop: 20 }}>
<label>Quantity:</label>
<input
type="number"
value={quantity}
min={1}
onChange={(e) => setQuantity(e.target.value)}
style={{ padding: 8, width: "60px", marginLeft: 10 }}
/>
</div>

<button
onClick={createOrder}
disabled={loading}
style={{
marginTop: 20,
padding: "12px 18px",
background: "#16a34a",
borderRadius: 6,
color: "white",
fontWeight: 600
}}
>
{loading ? "Processing…" : "Buy Now"}
</button>
</div>
);
}
