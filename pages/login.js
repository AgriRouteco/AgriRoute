import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }

    router.push("/");
  }

  return (
    <div style={{maxWidth:400, margin:"50px auto"}}>
      <h1 style={{fontSize:24, fontWeight:700}}>Login</h1>

      <form onSubmit={handleLogin}>
        <label>Email</label>
        <input type="email" required value={email} onChange={e=>setEmail(e.target.value)} />

        <label>Password</label>
        <input type="password" required value={password} onChange={e=>setPassword(e.target.value)} />

        <button disabled={loading} style={{marginTop:10}}>
          {loading ? "Logging in…" : "Login"}
        </button>
      </form>

      <p style={{marginTop:15}}>
        Don’t have an account? <a href="/signup">Sign up here</a>
      </p>
    </div>
  );
}

