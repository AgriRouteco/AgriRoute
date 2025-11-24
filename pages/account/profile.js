import { useState, useEffect } from "react"
import { supabase } from "../../lib/supabaseClient"

export default function ProfilePage({ user }) {
const [profile, setProfile] = useState(null)

useEffect(() => {
async function loadProfile() {
const { data } = await supabase
.from("profiles")
.select("*")
.eq("id", user.id)
.single()

setProfile(data)
}
loadProfile()
}, [])

async function saveProfile() {
await supabase.from("profiles").update({
farm_name: profile.farm_name,
bio: profile.bio
}).eq("id", user.id)

alert("Profile updated!")
}

if (!profile) return <p>Loading...</p>

return (
<div style={{ maxWidth: 600, margin: "40px auto", padding: 20 }}>
<h1 style={{ fontSize: 26, fontWeight: 700 }}>My Profile</h1>

<label>Farm Name (farmers only)</label>
<input
value={profile.farm_name || ""}
onChange={(e) => setProfile({ ...profile, farm_name: e.target.value })}
style={{ width: "100%", padding: 10, margin: "10px 0" }}
/>

<label>Bio</label>
<textarea
value={profile.bio || ""}
onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
style={{ width: "100%", padding: 10, margin: "10px 0", height: 100 }}
/>

<button
onClick={saveProfile}
style={{
background: "#16a34a",
color: "white",
padding: 12,
borderRadius: 6,
marginTop: 10
}}
>
Save Changes
</button>
</div>
)
}
