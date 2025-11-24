import '../styles/globals.css'
import Layout from '../components/Layout'
import { supabase } from '../lib/supabaseClient'
import { useEffect, useState } from 'react'

export default function MyApp({ Component, pageProps }) {

  const [user, setUser] = useState(null)

  supabase.auth.getUser().then(async (res) => {
  const authUser = res.data.user
  setUser(authUser)

  if (authUser) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', authUser.id)
      .single()

    setUser({ ...authUser, profile })
  }
})

  useEffect(() => {
    // Load the currently logged-in user
    supabase.auth.getUser().then(res => {
      setUser(res.data.user)
    })

    // Listen for login/logout changes
    supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null)
    })
  }, [])

  return (
    <Layout user={user}>
      <Component {...pageProps} user={user} />
    </Layout>
  )
}
