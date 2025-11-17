import Header from "./Header"

export default function Layout({ children, user }) {
  return (
    <>
      <Header user={user} />
      <main style={{ paddingTop: "20px" }}>
        {children}
      </main>
    </>
  )
}
