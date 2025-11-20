export default function SignupCustomer() {
  return (
    <div style={{maxWidth: 400, margin: "50px auto", padding: 20}}>
      <h1 style={{fontSize: 24, fontWeight: 600}}>Customer Signup</h1>

      <form>
        <label>Name</label>
        <input type="text" placeholder="Full name" style={{width:"100%", padding:10, margin:"10px 0"}} />

        <label>Email</label>
        <input type="email" placeholder="Email" style={{width:"100%", padding:10, margin:"10px 0"}} />

        <label>Password</label>
        <input type="password" placeholder="Password" style={{width:"100%", padding:10, margin:"10px 0"}} />

        <button 
          style={{
            width: "100%", 
            padding: 12, 
            background: "#16a34a", 
            color: "white",
            borderRadius: 6,
            marginTop: 10
          }}
        >
          Create Account
        </button>
      </form>
    </div>
  )
}
