import { supabase } from "../lib/supabaseClient"

export default function Signup() {
  async function handleSignup(e) {
    e.preventDefault()

    const email = e.target.email.value
    const password = e.target.password.value
    const role = e.target.role.value

    const { data, error } = await supabase.auth.signUp({
      email,
      password
    })

    if (error) {
      alert(error.message)
      return
    }

    // Add profile row
    await supabase.from("profiles").insert({
      id: data.user.id,
      role
    })

    alert("Account created! Please check your email to verify.")
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Create Account</h1>
      <form onSubmit={handleSignup}>
        <input name="email" placeholder="email" /><br/>
        <input name="password" type="password" placeholder="password" /><br/>
        
        <label>
          Role: 
          <select name="role">
            <option value="buyer">Buyer</option>
            <option value="farmer">Farmer</option>
          </select>
        </label><br/>

        <button type="submit">Sign Up</button>
      </form>
    </div>
  )
}
