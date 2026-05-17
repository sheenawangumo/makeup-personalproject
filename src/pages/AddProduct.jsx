import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddProduct() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    category: "",
    shade: "",
    price: "",
    stock: "",
    description: "",
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    // Basic validation
    if (!formData.name || !formData.brand || !formData.price) {
      setError("Please fill in at least the name, brand and price.");
      return;
    }

    const newProduct = {
      ...formData,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock) || 0,
    };

    fetch("https://glam-hub-api.onrender.com/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct),
    })
      .then((r) => r.json())
      .then(() => {
        setSuccess(true);
        setError("");
        setFormData({
          name: "",
          brand: "",
          category: "",
          shade: "",
          price: "",
          stock: "",
          description: "",
        });
        // Redirect to products page after 2 seconds
        setTimeout(() => navigate("/products"), 2000);
      });
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>➕ Add New Product</h2>
      <p style={styles.subtitle}>Fill in the details below to add a new makeup product</p>

      {/* Success Message */}
      {success && (
        <div style={styles.success}>
          ✅ Product added successfully! Redirecting to products...
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div style={styles.error}>
          ⚠️ {error}
        </div>
      )}

      <form onSubmit={handleSubmit} style={styles.form}>
        {/* Row 1 */}
        <div style={styles.row}>
          <div style={styles.field}>
            <label style={styles.label}>Product Name *</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Matte Lipstick"
              style={styles.input}
            />
          </div>
          <div style={styles.field}>
            <label style={styles.label}>Brand *</label>
            <input
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              placeholder="e.g. MAC"
              style={styles.input}
            />
          </div>
        </div>

        {/* Row 2 */}
        <div style={styles.row}>
          <div style={styles.field}>
            <label style={styles.label}>Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              style={styles.input}
            >
              <option value="">Select category</option>
              <option value="Lips">Lips</option>
              <option value="Eyes">Eyes</option>
              <option value="Face">Face</option>
              <option value="Skincare">Skincare</option>
              <option value="Nails">Nails</option>
            </select>
          </div>
          <div style={styles.field}>
            <label style={styles.label}>Shade</label>
            <input
              name="shade"
              value={formData.shade}
              onChange={handleChange}
              placeholder="e.g. Ruby Woo"
              style={styles.input}
            />
          </div>
        </div>

        {/* Row 3 */}
        <div style={styles.row}>
          <div style={styles.field}>
            <label style={styles.label}>Price ($) *</label>
            <input
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              placeholder="e.g. 19.99"
              style={styles.input}
            />
          </div>
          <div style={styles.field}>
            <label style={styles.label}>Stock</label>
            <input
              name="stock"
              type="number"
              value={formData.stock}
              onChange={handleChange}
              placeholder="e.g. 50"
              style={styles.input}
            />
          </div>
        </div>

        {/* Description */}
        <div style={styles.field}>
          <label style={styles.label}>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe the product..."
            rows={4}
            style={{ ...styles.input, resize: "vertical" }}
          />
        </div>

        {/* Buttons */}
        <div style={styles.buttonRow}>
          <button type="submit" style={styles.submitBtn}>
            ➕ Add Product
          </button>
          <button
            type="button"
            onClick={() => navigate("/products")}
            style={styles.cancelBtn}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "750px",
    margin: "2rem auto",
    padding: "2rem",
    backgroundColor: "white",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  title: {
    fontSize: "2rem",
    color: "#e75480",
    marginBottom: "0.3rem",
  },
  subtitle: {
    color: "#888",
    marginBottom: "1.5rem",
    fontSize: "0.95rem",
  },
  success: {
    backgroundColor: "#e8f5e9",
    color: "#2e7d32",
    padding: "1rem",
    borderRadius: "8px",
    marginBottom: "1rem",
    fontWeight: "bold",
  },
  error: {
    backgroundColor: "#fdecea",
    color: "#c62828",
    padding: "1rem",
    borderRadius: "8px",
    marginBottom: "1rem",
    fontWeight: "bold",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  row: {
    display: "flex",
    gap: "1rem",
    flexWrap: "wrap",
  },
  field: {
    flex: 1,
    minWidth: "200px",
    display: "flex",
    flexDirection: "column",
    gap: "0.4rem",
  },
  label: {
    fontSize: "0.9rem",
    fontWeight: "bold",
    color: "#555",
  },
  input: {
    padding: "0.7rem 1rem",
    borderRadius: "8px",
    border: "1.5px solid #ddd",
    fontSize: "0.95rem",
    outline: "none",
    width: "100%",
  },
  buttonRow: {
    display: "flex",
    gap: "1rem",
    marginTop: "0.5rem",
  },
  submitBtn: {
    flex: 1,
    padding: "0.8rem",
    backgroundColor: "#e75480",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "1rem",
    fontWeight: "bold",
    cursor: "pointer",
  },
  cancelBtn: {
    flex: 1,
    padding: "0.8rem",
    backgroundColor: "#eee",
    color: "#333",
    border: "none",
    borderRadius: "8px",
    fontSize: "1rem",
    cursor: "pointer",
  },
};

export default AddProduct;
