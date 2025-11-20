export default function SignupFarmer() {
  return (
    <div style={{maxWidth: 400, margin: "50px auto", padding: 20}}>
      <h1 style={{fontSize: 24, fontWeight: 600}}>Farmer Signup</h1>

      <form>
        <label>Farm Name</label>
        <input type="text" placeholder="Farm name" style={{width:"100%", padding:10, margin:"10px 0"}} />

        <label>Your Name</label>
        <input type="text" placeholder="Contact name" style={{width:"100%", padding:10, margin:"10px 0"}} />

        <label>Email</label>
        <input type="email" placeholder="Email" style={{width:"100%", padding:10, margin:"10px 0"}} />

        <label>Password</label>
        <input type="password" placeholder="Password" style={{width:"100%", padding:10, margin:"10px 0"}} />

        <button 
          style={{
            width: "100%", 
            padding: 12, 
            background: "#2563eb", 
            color: "white",
            borderRadius: 6,
            marginTop: 10
          }}
        >
          Create Farmer Account
        </button>
      </form>
    </div>
  )
}
