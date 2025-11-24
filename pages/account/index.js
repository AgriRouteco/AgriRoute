import { useEffect } from "react"
import { useRouter } from "next/router"
import { supabase } from "../lib/supabaseClient"

export default function Account({ user }) {
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push("/login")
      return
    }

    // Redirect based on role
    if (user.user_metadata?.role === "farmer") {
      router.push("/account/farmer")
    } else {
      router.push("/account/customer")
    }
  }, [user])

  return <p style={{textAlign:"center", marginTop:40}}>Loading dashboard...</p>
}



