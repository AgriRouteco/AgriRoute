import '../styles/globals.css'
import Layout from '../components/Layout'
import { supabase } from '../lib/supabaseClient'
import { useEffect, useState } from 'react'

export default function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const session = supabase.auth.getUser().then(res => {
      setUser(res.data.user)
    })

    supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null)
    })
  }, [])

  return (
    <Layout user={user}>
      <Component {...pageProps} user={user} />
    </Layout>
  )
}
