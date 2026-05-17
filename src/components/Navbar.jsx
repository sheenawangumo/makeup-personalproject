import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={styles.nav}>
      <h1 style={styles.logo}>💄 Glam Hub Admin</h1>
      <div style={styles.links}>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/products" style={styles.link}>Products</Link>
        <Link to="/add-product" style={styles.link}>Add Product</Link>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#e75480",
    padding: "1rem 2rem",
  },
  logo: {
    color: "white",
    fontSize: "1.5rem",
  },
  links: {
    display: "flex",
    gap: "1.5rem",
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontSize: "1rem",
    fontWeight: "bold",
  },
};

export default Navbar;