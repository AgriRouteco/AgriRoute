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
            <div style={{ fontSize: "22px", fontWeight: 700 }}>
              AgriRoute
            </div>
            <div style={{ color: "#6b7280", fontSize: "13px", marginTop: "-3px" }}>
              Direct from farmers
            </div>
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
                background: "#16a34a",
                color: "white",
                padding: "8px 12px",
                borderRadius: "6px",
                fontWeight: 600
              }}>
                Account
              </button>
            </Link>
          ) : (
            <Link href="/login">
              <button
                style={{
                  border: "1px solid #16a34a",
                  color: "#16a34a",
                  padding: "8px 12px",
                  borderRadius: "6px",
                  fontWeight: 600
                }}
              >
                Login / Signup
              </button>
            </Link>
          )}
        </div>

      </div>
    </header>
  )
}
