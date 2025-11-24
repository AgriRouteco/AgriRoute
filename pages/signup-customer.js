import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useRouter } from "next/router";

export default function SignupCustomer() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignup(e) {
    e.preventDefault();
    setLoading(true);

    // 1. Create auth user
    const { data: auth, error: authError } = await supabase.auth.signUp({
      email,
      password
    });

    if (authError) {
      alert(authError.message);
      setLoading(false);
      return;
    }

    const user = auth.user;

    // 2. Insert customer profile
    await supabase.from("profiles").insert([
      {
        id: user.id,
        role: "customer",
        farm_name: null,
        bio: ""
      }
    ]);

    alert("Account created!");
    router.push("/login");
    setLoading(false);
  }

  return (
    <div style={{maxWidth:400, margin:"40px auto"}}>
      <h1 style={{fontSize:24, fontWeight:700}}>Customer Signup</h1>

      <form onSubmit={handleSignup}>
        <label>Email</label>
        <input type="email" required value={email} onChange={e=>setEmail(e.target.value)} />

        <label>Password</label>
        <input type="password" required value={password} onChange={e=>setPassword(e.target.value)} />

        <button style={{marginTop:10}} disabled={loading}>
          {loading ? "Creating..." : "Create Account"}
        </button>
      </form>
    </div>
  );
}
