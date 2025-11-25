import Head from "next/head"
import Link from "next/link"
import { useState } from "react"

export default function Home() {
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("all")

  const categories = [
    { id: "all", name: "All Produce" },
    { id: "fruit", name: "Fruit" },
    { id: "veg", name: "Vegetables" },
    { id: "dairy", name: "Dairy" },
    { id: "meat", name: "Meat" },
    { id: "grains", name: "Grains" },
  ]

  return (
    <>
      <Head>
        <title>AgriRoute — Fresh, Fair, Local</title>
      </Head>

      <div style={{ background: "#f4f8f3", minHeight: "100vh" }}>
        
        {/* Hero Section */}
        <section style={{
          padding: "60px 20px",
          textAlign: "center",
          background: "linear-gradient(135deg, #2f855a, #16a34a)",
          color: "white"
        }}>
          <h1 style={{ fontSize: 40, fontWeight: 800 }}>
            Fresh Food. Fair Prices. Local Farmers.
          </h1>
          <p style={{ marginTop: 12, fontSize: 18, opacity: 0.9 }}>
            A marketplace that connects communities with real farms.
          </p>

          {/* SEARCH BAR */}
          <div style={{ marginTop: 30, maxWidth: 500, marginLeft: "auto", marginRight: "auto" }}>
            <input
              type="text"
              placeholder="Search for produce…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: "100%",
                padding: 16,
                borderRadius: 8,
                border: "none",
                outline: "none",
                fontSize: 16
              }}
            />
          </div>
        </section>

        {/* Category Filters */}
        <div style={{
          display: "flex",
          gap: 10,
          justifyContent: "center",
          marginTop: 20,
          flexWrap: "wrap",
          padding: "0 20px"
        }}>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              style={{
                padding: "10px 16px",
                borderRadius: 20,
                border: category === cat.id ? "2px solid #15803d" : "1px solid #d1d5db",
                background: category === cat.id ? "#dcfce7" : "white",
                fontWeight: 600,
                cursor: "pointer"
              }}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Placeholder Product Grid */}
        <main style={{
          maxWidth: 1100,
          margin: "40px auto",
          padding: "0 20px"
        }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 20 }}>
            Popular Produce
          </h2>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: 20
          }}>
            {/* Example placeholder items */}
            {[1,2,3,4,5,6].map((i) => (
              <div key={i} style={{
                background: "white",
                padding: 20,
                borderRadius: 10,
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
              }}>
                <div style={{
                  background: "#e5e7eb",
                  height: 120,
                  borderRadius: 8
                }} />

                <h3 style={{ marginTop: 12, fontWeight: 600 }}>Product {i}</h3>
                <p style={{ color: "#6b7280", fontSize: 14 }}>Local • Fresh</p>

                <Link href={`/product/${i}`}>
                  <button style={{
                    width: "100%",
                    marginTop: 12,
                    padding: "10px 0",
                    background: "#16a34a",
                    color: "white",
                    borderRadius: 6,
                    fontWeight: 600,
                    cursor: "pointer"
                  }}>
                    View
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </main>
      </div>
    </>
  )
}
