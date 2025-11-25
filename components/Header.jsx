import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Header({ user }) {
  const router = useRouter()

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Retail", href: "/retail" },
    { name: "Business", href: "/business" },
    { name: "Sell", href: "/sell" },
    { name: "FAQ", href: "/faq" }
  ]

  return (
    <header style={{
      background: "#ffffff",
      boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
      position: "sticky",
      top: 0,
      zIndex: 100,
    }}>
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "14px 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }}>

  {/* Logo */}
<div style={{ cursor: "pointer" }}>
  <Link href="/">
    <img 
      src="/logo.png"   // <-- update name if your file is different
      alt="AgriRoute Logo"
      style={{ height: "50px", width: "auto" }}
    />
  </Link>
</div>

        {/* Navigation */}
        <nav style={{ display: "flex", gap: "16px" }}>
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}
              style={{
                padding: "6px 10px",
                borderRadius: "6px",
                color: router.pathname === item.href ? "#16a34a" : "#374151",
                fontWeight: router.pathname === item.href ? "700" : "500"
              }}>
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Account Area */}
        <div>
          {user ? (
            <Link href="/account">
              <button style={{
               padding: "10px 18px",
      borderRadius: "8px",
      background: "white",
      border: "2px solid #15803d",
      color: "#15803d",
      fontWeight: 700,
      transition: "0.2s",
              }}>
                Account
              </button>
            </Link>
          ) : (
           <div style={{ display: "flex", gap: "10px" }}>
  
  <Link href="/login">
    <button style={{
      padding: "10px 18px",
      borderRadius: "8px",
      background: "white",
      border: "2px solid #15803d",
      color: "#15803d",
      fontWeight: 700,
      transition: "0.2s",
    }}>
      Login / Signup
    </button>
  </Link>

</div>
          )}
        </div>

      </div>
    </header>
  )
}
