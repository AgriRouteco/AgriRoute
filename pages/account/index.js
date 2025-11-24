import Link from "next/link"

export default function AccountDashboard({ user }) {
if (!user) {
return <p style={{ textAlign: "center", marginTop: 40 }}>Not logged in.</p>
}

const role = user.user_metadata?.role || "customer"

return (
<div style={{ maxWidth: 700, margin: "40px auto", padding: 20 }}>
<h1 style={{ fontSize: 26, fontWeight: 700 }}>My Account</h1>

<p style={{ marginTop: 6, color: "#6b7280" }}>
Logged in as: <strong>{user.email}</strong><br />
Account type: <strong>{role}</strong>
</p>

<div style={{ marginTop: 30, display: "grid", gap: 16 }}>
<Link href="/account/profile">
<div style={{
padding: 16, background: "white",
borderRadius: 8, boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
cursor: "pointer"
}}>
<h3 style={{ margin: 0, fontWeight: 600 }}>Edit Profile</h3>
<p style={{ margin: 0, color: "#6b7280" }}>Update your name, bio, avatar, etc.</p>
</div>
</Link>

{role === "farmer" && (
<>
<Link href="/account/listings">
<div style={{
padding: 16, background: "white",
borderRadius: 8, boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
cursor: "pointer"
}}>
<h3 style={{ margin: 0, fontWeight: 600 }}>My Listings</h3>
<p style={{ margin: 0, color: "#6b7280" }}>View and manage your produce listings.</p>
</div>
</Link>

<Link href="/sell">
<div style={{
padding: 16, background: "#16a34a", color: "white",
borderRadius: 8, cursor: "pointer"
}}>
<h3 style={{ margin: 0, fontWeight: 600 }}>Create New Listing</h3>
</div>
</Link>
</>
)}

<button
onClick={async () => {
const { supabase } = await import("../../lib/supabaseClient")
await supabase.auth.signOut()
window.location.href = "/"
}}
style={{
marginTop: 20,
padding: 12,
background: "#dc2626",
color: "white",
borderRadius: 6,
fontWeight: 600
}}
>
Logout
</button>
</div>
</div>
)
}
