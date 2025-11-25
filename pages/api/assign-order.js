import { supabase } from "../../lib/supabaseClient";

export default async function handler(req, res) {
const { order_id } = req.body;

// fetch order
const { data: order } = await supabase
.from("orders")
.select("*")
.eq("id", order_id)
.single();

if (!order) return res.status(400).json({ error: "Order not found" });

// fetch all farmers offering this product
const { data: farmers } = await supabase
.from("farmer_inventory")
.select("*")
.eq("product_id", order.product_id)
.gte("quantity", order.quantity);

if (!farmers || farmers.length === 0) {
return res.status(400).json({ error: "No farmer has enough stock" });
}

// Simple assignment: choose the farmer with most stock
const selectedFarmer = farmers.sort((a, b) => b.quantity - a.quantity)[0];

// update order
await supabase
.from("orders")
.update({
farmer_id: selectedFarmer.farmer_id,
status: "assigned"
})
.eq("id", order_id);

// log
await supabase
.from("order_assignments")
.insert([
{
order_id,
farmer_id: selectedFarmer.farmer_id
}
]);

// deduct stock
await supabase
.from("farmer_inventory")
.update({
quantity: selectedFarmer.quantity - order.quantity
})
.eq("id", selectedFarmer.id);

return res.status(200).json({ assigned_to: selectedFarmer.farmer_id });
}
