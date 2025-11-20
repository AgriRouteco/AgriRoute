export default function Login() {
  return (
    <div style={{maxWidth: 400, margin: "50px auto", padding: 20}}>
      <h1 style={{fontSize: 24, fontWeight: 600, marginBottom: 20}}>Login</h1>

      <form>
        <label>Email</label>
        <input 
          type="email"
          style={{width: "100%", padding: 10, margin: "10px 0"}}
          placeholder="Enter your email"
        />

        <label>Password</label>
        <input 
          type="password"
          style={{width: "100%", padding: 10, margin: "10px 0"}}
          placeholder="Enter your password"
        />

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
          Login
        </button>
      </form>

      <p style={{marginTop: 20, textAlign: "center"}}>
        Don’t have an account?
        <br/>
        <a href="/signup" style={{color:"#2563eb"}}>
          Sign up here
        </a>
      </p>
    </div>
  )
}
