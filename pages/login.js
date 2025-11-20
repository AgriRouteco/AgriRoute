import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const email = e.target.email.value;
    const password = e.target.password.value;

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMsg(error.message);
    } else {
      window.location.href = "/"; // Send user home after login
    }

    setLoading(false);
  }

  return (
    <div style={{ maxWidth: "420px", margin: "60px auto", padding: "20px" }}>
      <h1 style={{ fontSize: "24px", fontWeight: "700", marginBottom: "20px" }}>
        Login
      </h1>

      {errorMsg && (
        <div style={{ background: "#fee2e2", padding: "10px", borderRadius: "6px", marginBottom: "12px", color: "#dc2626" }}>
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleLogin}>
        <label>Email</label>
        <input
          name="email"
          type="email"
          required
          style={{ width: "100%", padding: "10px", marginBottom: "12px", borderRadius: "6px", border: "1px solid #ccc" }}
        />

        <label>Password</label>
        <input
          name="password"
          type="password"
          required
          style={{ width: "100%", padding: "10px", marginBottom: "16px", borderRadius: "6px", border: "1px solid #ccc" }}
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "12px",
            background: "#16a34a",
            color: "white",
            fontWeight: "600",
            borderRadius: "6px",
          }}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <p style={{ marginTop: "16px", textAlign: "center" }}>
        Don't have an account?{" "}
        <a href="/signup" style={{ color: "#2563eb" }}>
          Sign up here
        </a>
      </p>
    </div>
  );
}
