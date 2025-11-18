import { supabase } from "../lib/supabaseClient";

export default function Login() {
  async function handleLogin(e) {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    // Redirect after login
    window.location.href = "/account";
  }

  return (
    <div style={{ maxWidth: "400px", margin: "60px auto" }}>
      <h2 style={{ fontSize: "24px", fontWeight: "bold" }}>Login</h2>
      <form onSubmit={handleLogin} style={{ marginTop: "20px" }}>
        
        <label>Email</label>
        <input
          name="email"
          type="email"
          required
          style={{ width: "100%", padding: "8px", marginBottom: "12px" }}
        />

        <label>Password</label>
        <input
          name="password"
          type="password"
          required
          style={{ width: "100%", padding: "8px", marginBottom: "12px" }}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            background: "#16a34a",
            color: "white",
            padding: "10px",
            borderRadius: "6px",
            marginTop: "10px"
          }}
        >
          Login
        </button>
      </form>

      <p style={{ marginTop: "15px" }}>
        Don’t have an account?{" "}
        <a href="/signup" style={{ color: "#2563eb" }}>
          Create one here
        </a>
      </p>
    </div>
  );
}
