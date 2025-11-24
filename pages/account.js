import { useEffect, useState } from "react"
import { supabase } from "../lib/supabaseClient"
import { useRouter } from "next/router"

export default function Account({ user }) {
  const router = useRouter()
  const [profile, setProfile] = useState(null)

  // Redirect if not logged in
  if (!user) {
    if (typeof window !== "undefined") router.push("/login")
    return <p style={{ textAlign: "center", marginTop: 20 }}>Redirecting...</p>
  }

  // Load profile
  useEffect(() => {
    async function loadProfile() {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single()

      if (!error) setProfile(data)
    }

    loadProfile()
  }, [user])

  if (!profile) {
    return <p style={{ textAlign: "center", marginTop: 20 }}>Loading profile…</p>
  }

  return (
    <div style={{ maxWidth: 800, margin: "40px auto", padding: 20 }}>
      <h1 style={{ fontSize: 26, fontWeight: 700 }}>My Account</h1>

      <div style={{
        background: "#fff",
        padding: 20,
        borderRadius: 8,
        marginTop: 20,
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
      }}>
        
        <h2 style={{ fontSize: 20, fontWeight: 600 }}>
          {profile.role === "farmer" ? "Farmer Dashboard" : "Customer Dashboard"}
        </h2>

        {/* COMMON INFO */}
        <p style={{ marginTop: 10 }}><strong>Email:</strong> {user.email}</p>

        {profile.avatar_url && (
          <img 
            src={profile.avatar_url} 
            alt="Avatar" 
            style={{ width: 100, height: 100, borderRadius: "50%", marginTop: 10 }}
          />
        )}

        {/* FARMER SECTION */}
        {profile.role === "farmer" && (
          <div style={{ marginTop: 20 }}>
            <h3 style={{ fontSize: 18, fontWeight: 600 }}>Farm Profile</h3>

            <p><strong>Farm Name:</strong> {profile.farm_name || "Not set"}</p>
            <p><strong>Bio:</strong> {profile.bio || "No bio yet"}</p>

            <a 
              href="/sell"
              style={{
                display: "inline-block",
                marginTop: 20,
                background: "#16a34a",
                color: "white",
                padding: "10px 16px",
                borderRadius: 6,
                fontWeight: 600,
                textDecoration: "none"
              }}>
              Create New Listing
            </a>
          </div>
        )}

        {/* CUSTOMER SECTION */}
        {profile.role === "customer" && (
          <div style={{ marginTop: 20 }}>
            <h3 style={{ fontSize: 18, fontWeight: 600 }}>Customer Features</h3>
            <p>Order history, saved items and settings coming soon.</p>
          </div>
        )}

        {/* LOGOUT BUTTON */}
        <button
          onClick={async () => {
            await supabase.auth.signOut()
            router.push("/")
          }}
          style={{
            marginTop: 30,
            background: "#dc2626",
            color: "white",
            padding: 12,
            borderRadius: 6,
            width: "100%",
            fontWeight: 600
          }}
        >
          Logout
        </button>

      </div>
    </div>
  )
}
