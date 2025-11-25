export default function Signup() {
  return (
    <div style={{maxWidth: 400, margin: "50px auto", textAlign: "center"}}>
      <h1 style={{fontSize: 24, fontWeight: 600}}>Create an Account</h1>
      
      <p style={{marginTop: 10}}>Choose who you are signing up as</p>

      <a 
        href="/signup-customer"
        style={{
          display: "block",
          background: "#16a34a",
          color: "white",
          padding: 15,
          borderRadius: 6,
          marginTop: 25,
          textDecoration: "none"
        }}
      >
        I’m a Customer
      </a>

      <a 
        href="/signup-farmer"
        style={{
          display: "block",
          background: "#2563eb",
          color: "white",
          padding: 15,
          borderRadius: 6,
          marginTop: 20,
          textDecoration: "none"
        }}
      >
        I’m a Farmer
      </a>
    </div>
  )
}
