import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";

function Landing() {
  const { data, loading, error } = useFetch("https://glam-hub-api.onrender.com/store_info");

  if (loading) return <p style={styles.loading}>Loading...</p>;
  if (error) return <p style={styles.loading}>Error: {error}</p>;

  const storeInfo = data[0];

  return (
    <div style={styles.container}>
      {/* Hero Section */}
      <div style={styles.hero}>
        <h1 style={styles.heroTitle}>💄 Welcome to {storeInfo.name}</h1>
        <p style={styles.heroSubtitle}>{storeInfo.description}</p>
        <Link to="/products" style={styles.button}>
          View Products
        </Link>
      </div>

      {/* Info Cards */}
      <div style={styles.cardsContainer}>
        <div style={styles.card}>
          <h3>📦 Manage Products</h3>
          <p>View, edit, and delete products in your store inventory.</p>
        </div>
        <div style={styles.card}>
          <h3>➕ Add Products</h3>
          <p>Easily add new makeup products to your store catalogue.</p>
        </div>
        <div style={styles.card}>
          <h3>🔍 Search</h3>
          <p>Quickly find any product using the search feature.</p>
        </div>
      </div>

      {/* Store Info */}
      <div style={styles.storeInfo}>
        <h2>Contact Us</h2>
        <p>📞 Phone: {storeInfo.phone_number}</p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "1100px",
    margin: "0 auto",
    padding: "2rem",
  },
  loading: {
    textAlign: "center",
    marginTop: "2rem",
    fontSize: "1.2rem",
  },
  hero: {
    backgroundColor: "#e75480",
    borderRadius: "12px",
    padding: "4rem 2rem",
    textAlign: "center",
    marginBottom: "2rem",
  },
  heroTitle: {
    color: "white",
    fontSize: "2.5rem",
    marginBottom: "1rem",
  },
  heroSubtitle: {
    color: "white",
    fontSize: "1.2rem",
    marginBottom: "2rem",
  },
  button: {
    backgroundColor: "white",
    color: "#e75480",
    padding: "0.8rem 2rem",
    borderRadius: "25px",
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: "1rem",
  },
  cardsContainer: {
    display: "flex",
    gap: "1.5rem",
    marginBottom: "2rem",
    flexWrap: "wrap",
  },
  card: {
    flex: 1,
    minWidth: "250px",
    backgroundColor: "white",
    borderRadius: "12px",
    padding: "1.5rem",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    textAlign: "center",
    lineHeight: "1.8",
  },
  storeInfo: {
    backgroundColor: "white",
    borderRadius: "12px",
    padding: "1.5rem 2rem",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    lineHeight: "2",
  },
};

export default Landing;
