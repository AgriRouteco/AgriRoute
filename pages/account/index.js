import Link from "next/link";

export default function AccountDashboard({ user }) {
  if (!user) {
    return (
      <div style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f4f5f7"
      }}>
        <p style={{ fontSize: 18, color: "#555" }}>Not logged in.</p>
      </div>
    );
  }

  const role = user.user_metadata?.role || "customer";

  return (
    <div style={{
      minHeight: "100vh",
      background: "#f4f5f7",
      display: "flex",
      justifyContent: "center",
      paddingTop: 60
    }}>
      <div style={{
        width: "100%",
        maxWidth: 700,
        background: "white",
        padding: "32px",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
      }}>

        <h1 style={{ fontSize: 30, fontWeight: 700, textAlign: "center" }}>
          My Account
        </h1>

        <p style={{
          marginTop: 10,
          color: "#6b7280",
          textAlign: "center",
          fontSize: 16
        }}>
          Logged in as <strong>{user.email}</strong> <br />
          Role: <strong>{role}</strong>
        </p>

        {/* Dashboard Options */}
        <div style={{
          marginTop: 32,
          display: "grid",
          gap: 18
        }}>
          
          <Link href="/account/profile" style={{ textDecoration: "none" }}>
            <div style={cardStyle}>
              <h3 style={cardTitle}>Edit Profile</h3>
              <p style={cardDesc}>Update your name, bio, avatar, etc.</p>
            </div>
          </Link>

          {role === "farmer" && (
            <>
              <Link href="/account/listings" style={{ textDecoration: "none" }}>
                <div style={cardStyle}>
                  <h3 style={cardTitle}>My Listings</h3>
                  <p style={cardDesc}>View and manage your produce listings.</p>
                </div>
              </Link>

              <Link href="/sell" style={{ textDecoration: "none" }}>
                <div style={{
                  padding: "18px",
                  background: "#16a34a",
                  color: "white",
                  borderRadius: "10px",
                  fontWeight: 600,
                  cursor: "pointer",
                  textAlign: "center",
                }}>
                  Create New Listing
                </div>
              </Link>
            </>
          )}

          <button
            onClick={async () => {
              const { supabase } = await import("../../lib/supabaseClient");
              await supabase.auth.signOut();
              window.location.href = "/";
            }}
            style={{
              marginTop: 15,
              padding: "14px",
              background: "#dc2626",
              color: "white",
              borderRadius: "10px",
              fontWeight: 600,
              cursor: "pointer",
              border: "none"
            }}
          >
            Logout
          </button>

        </div>
      </div>
    </div>
  );
}

const cardStyle = {
  padding: "18px",
  background: "white",
  borderRadius: "10px",
  boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
  cursor: "pointer",
  border: "1px solid #e5e7eb",
};

const cardTitle = {
  margin: 0,
  fontWeight: 600,
  fontSize: 18,
  color: "#111",
};

const cardDesc = {
  margin: "4px 0 0",
  color: "#6b7280",
  fontSize: 15,
};

