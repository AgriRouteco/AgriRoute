import { supabase } from "../lib/supabaseClient"

export default function AuthButtons({ user }) {
  async function signOut() {
    await supabase.auth.signOut()
    window.location.reload()
  }

  if (user) {
    return (
      <>
        <a href="/account" style={{ marginRight: 10 }}>My Account</a>
        <button onClick={signOut}>Logout</button>
      </>
    )
  }

  return (
    <>
      <a href="/login" style={{ marginRight: 10 }}>Login</a>
      <a href="/signup">Sign Up</a>
    </>
  )
}
