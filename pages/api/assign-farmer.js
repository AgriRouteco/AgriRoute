import { supabase } from "../../lib/supabaseClient";

export default async function handler(req, res) {
const { order_id, product_id } = req.body;

// 1. Load order
const { data: order } = await supabase
.from("orders")
.select("*")
.eq("id", order_id)
.single();

const quantity = order.quantity;

// 2. Get all farmers offering this product
const { data: candidates } = await supabase
.from("farmer_inventory")
.select("*")
.eq("product_id", product_id)
.gte("quantity", quantity)
.order("price", { ascending: true });

if (!candidates || candidates.length === 0) {
return res.status(400).json({ error: "No farmers available" });
}

// Select cheapest farmer
const farmer = candidates[0];

// 3. Update order with assigned farmer & price
await supabase
.from("orders")
.update({
farmer_id: farmer.farmer_id,
unit_price: farmer.price,
total_price: farmer.price * quantity,
status: "assigned"
})
.eq("id", order_id);

// 4. Log assignment
await supabase.from("order_assignments").insert([
{ order_id, farmer_id: farmer.farmer_id }
]);

// 5. Reduce farmer stock
await supabase
.from("farmer_inventory")
.update({
quantity: farmer.quantity - quantity
})
.eq("id", farmer.id);

return res.status(200).json({ success: true });
}
