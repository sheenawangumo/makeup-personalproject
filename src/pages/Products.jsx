import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";

function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  // Fetch all products
  useEffect(() => {
    fetch("http://localhost:3001/products")
      .then((r) => r.json())
      .then((data) => setProducts(data));
  }, []);

  // Filter products based on search
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase()) ||
    product.brand.toLowerCase().includes(search.toLowerCase()) ||
    product.category.toLowerCase().includes(search.toLowerCase())
  );

  // Delete a product
  function handleDelete(id) {
    fetch(`http://localhost:3001/products/${id}`, {
      method: "DELETE",
    }).then(() => {
      setProducts(products.filter((p) => p.id !== id));
    });
  }

  // Update a product price
  function handleUpdate(id, updatedProduct) {
    fetch(`http://localhost:3001/products/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedProduct),
    }).then((r) => r.json())
      .then((updated) => {
        setProducts(products.map((p) => (p.id === id ? updated : p)));
      });
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🛍️ All Products</h2>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="🔍 Search by name, brand or category..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={styles.searchBar}
      />

      {/* Products count */}
      <p style={styles.count}>
        Showing {filteredProducts.length} of {products.length} products
      </p>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <p style={styles.noResults}>No products found 😕</p>
      ) : (
        <div style={styles.grid}>
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
            />
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "1100px",
    margin: "0 auto",
    padding: "2rem",
  },
  title: {
    fontSize: "2rem",
    color: "#e75480",
    marginBottom: "1rem",
  },
  searchBar: {
    width: "100%",
    padding: "0.8rem 1rem",
    borderRadius: "25px",
    border: "2px solid #e75480",
    fontSize: "1rem",
    marginBottom: "1rem",
    outline: "none",
  },
  count: {
    color: "#888",
    marginBottom: "1.5rem",
    fontSize: "0.9rem",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "1.5rem",
  },
  noResults: {
    textAlign: "center",
    fontSize: "1.2rem",
    color: "#888",
    marginTop: "2rem",
  },
};

export default Products;