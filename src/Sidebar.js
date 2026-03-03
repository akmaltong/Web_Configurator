import { useState } from "react"
import { categories } from "./products"

export function Sidebar({ products, activeProduct, onSelectProduct }) {
  const [activeCategory, setActiveCategory] = useState("all")

  const filtered = Object.values(products).filter(
    (p) => activeCategory === "all" || p.category === activeCategory,
  )

  return (
    <div style={styles.sidebar}>
      <h2 style={styles.logo}>⬡ Конфигуратор</h2>

      <div style={styles.section}>
        <label style={styles.label}>Категория</label>
        <div style={styles.categories}>
          {Object.entries(categories).map(([key, name]) => (
            <button
              key={key}
              onClick={() => setActiveCategory(key)}
              style={{
                ...styles.catBtn,
                background: activeCategory === key ? "#00aaff" : "#2a2a2a",
                color: activeCategory === key ? "#000" : "#999",
              }}
            >
              {name}
            </button>
          ))}
        </div>
      </div>

      <div style={styles.section}>
        <label style={styles.label}>Продукт</label>
        <div style={styles.productList}>
          {filtered.map((p) => (
            <button
              key={p.id}
              onClick={() => onSelectProduct(p.id)}
              style={{
                ...styles.productBtn,
                background: activeProduct === p.id ? "#00aaff" : "#2a2a2a",
                color: activeProduct === p.id ? "#000" : "#ccc",
              }}
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>

      <div style={{ ...styles.section, marginTop: "auto" }}>
        <label style={styles.label}>{products[activeProduct]?.name}</label>
        <p style={styles.desc}>{products[activeProduct]?.description}</p>
      </div>
    </div>
  )
}

const styles = {
  sidebar: {
    width: 280,
    minWidth: 280,
    background: "#1a1a1a",
    color: "#eee",
    padding: 20,
    display: "flex",
    flexDirection: "column",
    gap: 4,
    overflowY: "auto",
    fontFamily: "'Inter var', sans-serif",
  },
  logo: {
    margin: "0 0 16px 0",
    fontSize: 18,
    fontWeight: 600,
    color: "#fff",
  },
  section: { marginBottom: 16 },
  label: {
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: 1,
    color: "#888",
    marginBottom: 8,
    display: "block",
  },
  categories: { display: "flex", flexWrap: "wrap", gap: 4 },
  catBtn: {
    padding: "4px 10px",
    border: "none",
    borderRadius: 12,
    cursor: "pointer",
    fontSize: 11,
    transition: "background 0.15s",
  },
  productList: {
    maxHeight: 320,
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: 3,
  },
  productBtn: {
    display: "block",
    width: "100%",
    padding: "8px 12px",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
    fontSize: 13,
    textAlign: "left",
    transition: "background 0.15s",
    flexShrink: 0,
  },
  desc: {
    fontSize: 12,
    color: "#666",
    lineHeight: 1.5,
    margin: 0,
  },
}
