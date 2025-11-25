import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useRouter } from "next/router";

export default function SignupFarmer() {
  const router = useRouter();

  const [farmName, setFarmName] = useState("");
  const [contactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignup(e) {
    e.preventDefault();
    setLoading(true);

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

    await supabase.from("profiles").insert([
      {
        id: user.id,
        role: "farmer",
        farm_name: farmName,
        bio: ""
      }
    ]);

    alert("Farmer account created!");
    router.push("/login");
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
        maxWidth: 480,
        background: "white",
        padding: "32px",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
      }}>
        
        <h1 style={{ fontSize: 28, fontWeight: 700, textAlign: "center" }}>
          Farmer Signup
        </h1>
        <p style={{ color: "#666", textAlign: "center", marginTop: 6 }}>
          Create your farmer profile and start selling.
        </p>

        <form onSubmit={handleSignup} style={{ marginTop: 24 }}>
          <label>Farm Name</label>
          <input
            type="text"
            required
            value={farmName}
            onChange={e => setFarmName(e.target.value)}
            style={inputStyle}
          />

          <label>Your Name</label>
          <input
            type="text"
            required
            value={contactName}
            onChange={e => setContactName(e.target.value)}
            style={inputStyle}
          />

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
            {loading ? "Creating…" : "Create Farmer Account"}
          </button>
        </form>
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
