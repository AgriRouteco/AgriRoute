// components/Layout.js
import Link from 'next/link'

export default function Layout({ children }) {
  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc" }}>

      {/* HEADER */}
      <header style={{ background: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
        <div style={{
          maxWidth: 1024,
          margin: '0 auto',
          padding: 16,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          
          {/* LOGO & HOMEPAGE BUTTON */}
          <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div>
              <div style={{ fontSize: 20, fontWeight: 700 }}>
                AgriRoute
              </div>
              <div style={{ color: '#6b7280', fontSize: 13 }}>
                Direct from farmers
              </div>
            </div>
          </Link>

          {/* NAVIGATION */}
          <nav style={{ display: 'flex', gap: 12 }}>
            <Link href="/retail">For Home</Link>
            <Link href="/business">For Businesses</Link>
            <Link href="/sell">Sell</Link>
            <Link href="/help">Help & FAQ</Link>
            <Link href="/account">Account</Link>
          </nav>
        </div>
      </header>

      {/* PAGE CONTENT */}
      <main style={{ maxWidth: 1024, margin: "24px auto", padding: 12 }}>
        {children}
      </main>

    </div>
  );
}
