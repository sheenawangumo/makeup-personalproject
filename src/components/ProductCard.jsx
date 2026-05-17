import { useState } from "react";

function ProductCard({ product, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedPrice, setEditedPrice] = useState(product.price);
  const [editedStock, setEditedStock] = useState(product.stock);

  function handleSave() {
    onUpdate(product.id, {
      price: parseFloat(editedPrice),
      stock: parseInt(editedStock),
    });
    setIsEditing(false);
  }

  return (
    <div style={styles.card}>
      {/* Category Badge */}
      <span style={styles.badge}>{product.category}</span>

      {/* Product Info */}
      <h3 style={styles.name}>{product.name}</h3>
      <p style={styles.brand}>by {product.brand}</p>
      <p style={styles.shade}>Shade: {product.shade}</p>
      <p style={styles.description}>{product.description}</p>

      {/* Editable Fields */}
      {isEditing ? (
        <div style={styles.editSection}>
          <label style={styles.label}>Price ($)</label>
          <input
            type="number"
            value={editedPrice}
            onChange={(e) => setEditedPrice(e.target.value)}
            style={styles.input}
          />
          <label style={styles.label}>Stock</label>
          <input
            type="number"
            value={editedStock}
            onChange={(e) => setEditedStock(e.target.value)}
            style={styles.input}
          />
          <div style={styles.buttonRow}>
            <button onClick={handleSave} style={styles.saveBtn}>
              💾 Save
            </button>
            <button onClick={() => setIsEditing(false)} style={styles.cancelBtn}>
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div style={styles.priceRow}>
          <span style={styles.price}>${product.price.toFixed(2)}</span>
          <span style={styles.stock}>Stock: {product.stock}</span>
        </div>
      )}

      {/* Action Buttons */}
      {!isEditing && (
        <div style={styles.buttonRow}>
          <button onClick={() => setIsEditing(true)} style={styles.editBtn}>
            ✏️ Edit
          </button>
          <button onClick={() => onDelete(product.id)} style={styles.deleteBtn}>
            🗑️ Delete
          </button>
        </div>
      )}
    </div>
  );
}

const styles = {
  card: {
    backgroundColor: "white",
    borderRadius: "12px",
    padding: "1.5rem",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
  badge: {
    backgroundColor: "#fce4ec",
    color: "#e75480",
    padding: "0.2rem 0.8rem",
    borderRadius: "20px",
    fontSize: "0.75rem",
    fontWeight: "bold",
    alignSelf: "flex-start",
  },
  name: {
    fontSize: "1.2rem",
    color: "#333",
  },
  brand: {
    color: "#e75480",
    fontSize: "0.9rem",
    fontWeight: "bold",
  },
  shade: {
    color: "#666",
    fontSize: "0.85rem",
  },
  description: {
    color: "#888",
    fontSize: "0.85rem",
    lineHeight: "1.5",
  },
  priceRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "0.5rem",
  },
  price: {
    fontSize: "1.3rem",
    fontWeight: "bold",
    color: "#e75480",
  },
  stock: {
    fontSize: "0.85rem",
    color: "#888",
  },
  editSection: {
    display: "flex",
    flexDirection: "column",
    gap: "0.4rem",
    marginTop: "0.5rem",
  },
  label: {
    fontSize: "0.85rem",
    color: "#555",
    fontWeight: "bold",
  },
  input: {
    padding: "0.4rem 0.8rem",
    borderRadius: "8px",
    border: "1px solid #e75480",
    fontSize: "0.95rem",
    outline: "none",
  },
  buttonRow: {
    display: "flex",
    gap: "0.5rem",
    marginTop: "0.8rem",
  },
  editBtn: {
    flex: 1,
    padding: "0.5rem",
    backgroundColor: "#fff0f5",
    color: "#e75480",
    border: "1px solid #e75480",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  deleteBtn: {
    flex: 1,
    padding: "0.5rem",
    backgroundColor: "#fff5f5",
    color: "#e53935",
    border: "1px solid #e53935",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  saveBtn: {
    flex: 1,
    padding: "0.5rem",
    backgroundColor: "#e75480",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  cancelBtn: {
    flex: 1,
    padding: "0.5rem",
    backgroundColor: "#eee",
    color: "#333",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
};

export default ProductCard;