export default function Footer() {
  return (
    <footer style={{
      marginTop: "40px",
      padding: "20px 0",
      textAlign: "center",
      fontSize: "13px",
      color: "#6b7280"
    }}>
      © {new Date().getFullYear()} AgriRoute — Connecting Farmers & Communities
    </footer>
  );
}
