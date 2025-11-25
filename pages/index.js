import { useState } from "react"
import { supabase } from "../lib/supabaseClient"
import { useRouter } from "next/router"

export default function Login() {
const router = useRouter()

const [email, setEmail] = useState("")
const [password, setPassword] = useState("")
const [loading, setLoading] = useState(false)
const [errorMsg, setErrorMsg] = useState("")

async function handleLogin(e) {
e.preventDefault()
setLoading(true)
setErrorMsg("")

const { error } = await supabase.auth.signInWithPassword({
email,
password,
})

if (error) {
setErrorMsg(error.message)
setLoading(false)
return
}

router.push("/account")
}

return (
<div style={{
minHeight: "100vh",
display: "flex",
justifyContent: "center",
alignItems: "center",
background: "#f7faf8"
}}>
<div style={{
width: "100%",
maxWidth: "420px",
background: "white",
padding: "30px",
borderRadius: "12px",
boxShadow: "0 4px 12px rgba(0,0,0,0.07)"
}}>

<h1 style={{ fontSize: "26px", fontWeight: 700, textAlign: "center" }}>
Welcome Back
</h1>

<p style={{ textAlign: "center", color: "#6b7280", marginTop: 6 }}>
Log in to continue
</p>

{errorMsg && (
<p style={{ color: "red", marginTop: 10, textAlign: "center" }}>
{errorMsg}
</p>
)}

<form onSubmit={handleLogin} style={{ marginTop: 20 }}>
<label>Email</label>
<input
required
type="email"
value={email}
onChange={(e) => setEmail(e.target.value)}
style={{
width: "100%",
padding: "12px",
marginTop: 6,
marginBottom: 16,
borderRadius: "8px",
border: "1px solid #d1d5db"
}}
/>

<label>Password</label>
<input
required
type="password"
value={password}
onChange={(e) => setPassword(e.target.value)}
style={{
width: "100%",
padding: "12px",
marginTop: 6,
marginBottom: 18,
borderRadius: "8px",
border: "1px solid #d1d5db"
}}
/>

<button
type="submit"
disabled={loading}
style={{
width: "100%",
padding: "14px",
background: "#16a34a",
color: "white",
borderRadius: "8px",
fontWeight: 600,
letterSpacing: ".3px",
cursor: "pointer"
}}
>
{loading ? "Logging in…" : "Login"}
</button>
</form>

<div style={{ textAlign: "center", marginTop: 20 }}>
<p style={{ color: "#6b7280" }}>
Don’t have an account?
</p>

<a
href="/signup"
style={{
display: "inline-block",
marginTop: 8,
padding: "10px 18px",
background: "#2563eb",
color: "white",
borderRadius: "8px",
textDecoration: "none",
fontWeight: 600
}}
>
Create an Account
</a>
</div>
</div>
</div>
)

