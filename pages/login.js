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
    <div style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "#f4f5f7"
    }}>
      <div style={{
        width: "100%",
        maxWidth: 420,
        background: "white",
        padding: "32px",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
      }}>
        
        <h1 style={{ fontSize: 28, fontWeight: 700, textAlign: "center" }}>
          Login
        </h1>
        <p style={{ color: "#666", textAlign: "center", marginTop: 6 }}>
          Welcome back! Please sign in.
        </p>

        <form onSubmit={handleLogin} style={{ marginTop: 24 }}>
          <label>Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={inputStyle}
          />

          <label>Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={inputStyle}
          />

          <button disabled={loading} style={buttonStyle}>
            {loading ? "Logging in…" : "Login"}
          </button>
        </form>

        <p style={{ marginTop: 20, textAlign: "center" }}>
          Don’t have an account?{" "}
          <a href="/signup" style={{ color: "#2563eb", fontWeight: 600 }}>
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginTop: 6,
  marginBottom: 16,
  borderRadius: "8px",
  border: "1px solid #d1d5db"
};

const buttonStyle = {
  width: "100%",
  padding: "14px",
  background: "#16a34a",
  color: "white",
  borderRadius: "8px",
  fontWeight: 600,
  cursor: "pointer",
  marginTop: 10
};
