import { supabase } from "../lib/supabaseClient"

export default function Signup() {
  async function handleSignup(e) {
    e.preventDefault()

    const email = e.target.email.value
    const password = e.target.password.value
    const role = e.target.role.value   // 'farmer' or 'customer'
    const farmName = e.target.farmName?.value || null

    // 1. Create Supabase auth user
    const { data, error } = await supabase.auth.signUp({
      email,
      password
    })

    if (error) {
      alert(error.message)
      return
    }

    // 2. Insert into profiles table
    await supabase.from("profiles").insert({
      id: data.user.id,
      email,
      role,
      farm_name: farmName,
      bio: "",
    })

    alert("Signup successful!")
  }

  return (
    <div style={{ maxWidth: 500, margin: "40px auto" }}>
      <h1>Create Account</h1>

      <form onSubmit={handleSignup}>
        <label>Email</label>
        <input name="email" required type="email" />

        <label>Password</label>
        <input name="password" required type="password" />

        <label>Account Type</label>
        <select name="role">
          <option value="customer">Customer</option>
          <option value="farmer">Farmer</option>
        </select>

        <label>Farm Name (Farmers Only)</label>
        <input name="farmName" placeholder="If farmer" />

        <button type="submit">Create Account</button>
      </form>
    </div>
  )
}
