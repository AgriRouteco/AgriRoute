import { useEffect, useState } from "react"
import { supabase } from "../lib/supabaseClient"
import Link from "next/link"

export default function Account({ user }) {
  const [profile, setProfile] = useState(null)

  // If not logged in → redirect to login
  useEffect(() => {
    if (!user) {
      window.location.href = "/login"
    }
  }, [user])

  // Load profile
  useEffect(() => {
    async function load() {
      if (!user) return
      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single()
      setProfile(data)
    }
    load()
  }, [user])

  // Logout
  async function handleLogout() {
    await supabase.auth.signOut()
    window.location.href = "/"
  }

  if (!user || !profile) {
    return <p style={{textAlign: "center", marginTop: 40}}>Loading…</p>
  }

  return (
    <div style={{maxWidth: 600, margin: "40px auto", padding: 20}}>
      <h1 style={{fontSize: 26, fontWeight: 700}}>Your Account</h1>

      <div style={{marginTop: 20, background: "#fff", padding: 20, borderRadius: 8}}>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {profile.role}</p>
        {profile.role === "farmer" && (
          <>
            <p><strong>Farm Name:</strong> {profile.farm_name || "Not set"}</p>
            <p><strong>Bio:</strong> {profile.bio || "No bio yet"}</p>
          </>
        )}
      </div>

      {/* Farmer-only section */}
      {profile.role === "farmer" && (
        <div style={{marginTop: 20}}>
          <Link href="/sell"
            style={{
              display: "block",
              padding: 14,
              background: "#16a34a",
              color: "white",
              textAlign: "center",
              borderRadius: 6,
              fontWeight: 600
            }}>
            Create a New Listing
          </Link>
        </div>
      )}

      <button
        onClick={handleLogout}
        style={{
          marginTop: 30,
          width: "100%",
          padding: 14,
          background: "#d9534f",
          color: "white",
          borderRadius: 6,
          fontWeight: 600
        }}>
        Log Out
      </button>
    </div>
  )
}
