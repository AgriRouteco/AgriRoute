// pages/index.js
import Head from 'next/head'
import { useEffect, useState } from 'react'
import Header from '../components/Header'
import { supabase } from '../lib/supabaseClient'

export default function Home({ user }) {
  const [products, setProducts] = useState([])
  const [category, setCategory] = useState('all')
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadProducts() {
      setLoading(true)
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error(error)
      } else {
        setProducts(data || [])
      }
      setLoading(false)
    }

    loadProducts()
  }, [])

  const filtered = products.filter(p => {
    const matchesCategory =
      category === 'all' ? true : (p.category || '').toLowerCase() === category.toLowerCase()

    const matchesSearch =
      search.trim() === ''
        ? true
        : (p.name || '').toLowerCase().includes(search.toLowerCase()) ||
          (p.description || '').toLowerCase().includes(search.toLowerCase())

    return matchesCategory && matchesSearch
  })

  return (
    <>
      <Head>
        <title>AgriRoute — Direct from farmers</title>
      </Head>

      <div style={{ minHeight: '100vh', background: '#f3f4f6' }}>
        <Header user={user} />

        {/* Hero section */}
        <section style={{ background: '#ecfdf5', borderBottom: '1px solid #d1fae5' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 16px' }}>
            <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 8 }}>
              Fresh local produce, fairly priced
            </h1>
            <p style={{ maxWidth: 600, color: '#4b5563', fontSize: 15 }}>
              AgriRoute connects local farmers with homes and restaurants. Browse seasonal produce,
              compare fair prices, and support farmers directly.
            </p>
          </div>
        </section>

        {/* Filters + search */}
        <main style={{ maxWidth: 1100, margin: '24px auto', padding: '0 16px 32px' }}>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 12,
              marginBottom: 16,
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                style={{
                  padding: '8px 10px',
                  borderRadius: 6,
                  border: '1px solid #d1d5db',
                  background: 'white',
                }}
              >
                <option value="all">All categories</option>
                <option value="Fruit">Fruit</option>
                <option value="Vegetables">Vegetables</option>
                <option value="Dairy">Dairy</option>
                <option value="Meat">Meat</option>
                <option value="Grains">Grains</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search produce…"
              style={{
                flex: 1,
                minWidth: 200,
                maxWidth: 320,
                padding: '8px 10px',
                borderRadius: 6,
                border: '1px solid #d1d5db',
              }}
            />
          </div>

          {/* Product grid */}
          {loading ? (
            <p style={{ marginTop: 20 }}>Loading products…</p>
          ) : filtered.length === 0 ? (
            <p style={{ marginTop: 20, color: '#6b7280' }}>
              No products found. Try a different search or category.
            </p>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: 16,
                marginTop: 8,
              }}
            >
              {filtered.map((p) => (
                <div
                  key={p.id}
                  style={{
                    background: 'white',
                    borderRadius: 10,
                    boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <div
                    style={{
                      height: 150,
                      background:
                        p.image_url
                          ? `url(${p.image_url}) center/cover no-repeat`
                          : '#e5e7eb',
                    }}
                  />
                  <div style={{ padding: 12, flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <h3 style={{ fontSize: 16, fontWeight: 600 }}>{p.name}</h3>
                    <p
                      style={{
                        fontSize: 13,
                        color: '#6b7280',
                        marginTop: 4,
                        minHeight: 36,
                      }}
                    >
                      {p.description || 'Locally sourced seasonal produce.'}
                    </p>

                    <div
                      style={{
                        marginTop: 8,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <div>
                        {p.recommended_price && (
                          <div style={{ fontWeight: 600 }}>
                            £{Number(p.recommended_price).toFixed(2)}{" "}
                            <span style={{ fontSize: 12, color: '#6b7280' }}>/kg (guide)</span>
                          </div>
                        )}
                        {p.min_price && p.max_price && (
                          <div style={{ fontSize: 12, color: '#6b7280' }}>
                            Range: £{Number(p.min_price).toFixed(2)} – £
                            {Number(p.max_price).toFixed(2)}
                          </div>
                        )}
                      </div>

                      <a
                        href={`/product/${p.id}`}
                        style={{
                          padding: '6px 10px',
                          background: '#16a34a',
                          color: 'white',
                          borderRadius: 6,
                          fontSize: 13,
                          textDecoration: 'none',
                        }}
                      >
                        View
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </>
  )
}
