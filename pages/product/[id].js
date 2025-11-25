import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function ProductDetail({ user }) {
const router = useRouter();
const { id } = router.query;

const [product, setProduct] = useState(null);
const [inventory, setInventory] = useState([]);
const [quantity, setQuantity] = useState(1);
const [loading, setLoading] = useState(false);

// Fetch product
useEffect(() => {
if (!id) return;
loadProduct();
loadInventory();
}, [id]);

async function loadProduct() {
const { data, error } = await supabase
.from("products")
.select("*")
.eq("id", id)
.single();

if (!error) setProduct(data);
}

async function loadInventory() {
const { data, error } = await supabase
.from("farmer_inventory")
.select("price, quantity")
.eq("product_id", id);

if (!error) setInventory(data);
}

// Calculate range
const totalAvailable = inventory.reduce((sum, i) => sum + Number(i.quantity), 0);
const minFarmerPrice = inventory.length
? Math.min(...inventory.map(i => Number(i.price)))
: 0;

const maxFarmerPrice = inventory.length
? Math.max(...inventory.map(i => Number(i.price)))
: 0;

async function createOrder() {
if (!user) {
router.push("/login");
return;
}

setLoading(true);

const unitPrice = product.recommended_price;
const totalPrice = unitPrice * quantity;

// Create order with no farmer assigned YET
const { data, error } = await supabase.from("orders").insert([
{
customer_id: user.id,
product_id: product.id,
quantity,
unit_price: unitPrice,
total_price: totalPrice,
status: "pending"
}
]).select().single();

if (error) {
alert("Order failed.");
setLoading(false);
return;
}

// Redirect to order success page OR dashboard
router.push("/account");
}

if (!product) return <p style={{ margin: 30 }}>Loading…</p>;

return (
<div style={{ maxWidth: 900, margin: "30px auto", padding: 20 }}>
<h1 style={{ fontSize: 28, fontWeight: 700 }}>{product.name}</h1>

<img
src={product.image_url}
style={{ width: "100%", borderRadius: 10, marginTop: 20 }}
/>

<p style={{ color: "#555", marginTop: 20 }}>
{product.description}
</p>

<h3 style={{ marginTop: 25 }}>Available</h3>
<p>Total available: {totalAvailable}</p>
<p>Price range: £{minFarmerPrice} — £{maxFarmerPrice}</p>
<p>Recommended price: <b>£{product.recommended_price}</b></p>

<div style={{ marginTop: 30 }}>
<label>Quantity:</label>
<input
type="number"
value={quantity}
min="1"
onChange={(e) => setQuantity(Number(e.target.value))}
style={{ padding: 8, marginLeft: 10, width: 80 }}
/>
</div>

<button
onClick={createOrder}
disabled={loading}
style={{
marginTop: 30,
padding: "12px 20px",
background: "#16a34a",
color: "white",
borderRadius: 6,
fontWeight: 600
}}
>
{loading ? "Processing…" : "Order Now"}
</button>
</div>
);
}
