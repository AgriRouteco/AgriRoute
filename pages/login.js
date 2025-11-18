import { supabase } from "../lib/supabaseClient"

export default function Login() {
  async function handleLogin(e) {
    e.preventDefault()

    const email = e.target.email.value
    const password = e.target.password.value

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      alert(error.message)
      return
    }

    alert("Logged in!")
  }

  return (
    <div style={{ maxWidth: 500, margin: "40px auto" }}>
      <h1>Login</h1>

      <form onSubmit={handleLogin}>
        <label>Email</label>
        <input name="email" type="email" required />

        <label>Password</label>
        <input name="password" type="password" required />

        <button type="submit">Login</button>
      </form>
    </div>
  )
}
