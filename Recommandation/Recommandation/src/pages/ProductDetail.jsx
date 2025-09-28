import React, { useEffect, useState } from "react";

const productsData = {
  "Home": [
    { name: "Rice Bag 50kg", price: "₹2200 per bag", img: "https://via.placeholder.com/150" },
    { name: "Sunflower Oil 15L", price: "₹1800 per tin", img: "https://via.placeholder.com/150" },
    { name:"Biscuit Carton (50 packs)", price:"₹750 per carton", img:"https://via.placeholder.com/150" },
    { name:"Wheat Flour 25kg", price:"₹1100 per bag", img:"https://via.placeholder.com/150" },
    { name:"Green Tea 1kg", price:"₹900 per pack", img:"https://via.placeholder.com/150" },
    { name:"Coffee Beans 5kg", price:"₹2200 per pack", img:"https://via.placeholder.com/150" }
  ],
  "bulk": [
    {name:"Soft Drink Crate (24 Bottles)", price:"Buy 5 Get 10% Off", img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEI0wqQfkW0SkbQ2Dx94--nIWeGG0AWAXPwbgymeAlb1ZDyT4NKkoPCQ3YNNyzTYPjyyI&usqp=CAU"},
    {name:"Detergent 10kg", price:"₹950 each (Min order 5)", img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVyVkc_5sdUxdYz43hEQoa7LZxPRSXmkJviS-DVUXpNJa3ABtUQAinnAV2PViA39zGsjg&usqp=CAU"},
    {name:"Chocolate Box 2kg", price:"Buy 10 Get 15% Off", img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXinUU9xiHgYbx2FgIZ-93YUGjZM8Xc_iGww&s"},
    {name:"UHT Milk 12L", price:"₹720 per pack (Min order 6)", img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6sd_HABLz_gbcbOWBVal8itc3fz87g_oZ_A&s"},
    {name:"Whole Wheat Bread 50pcs", price:"₹850 per carton", img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRg_2KXoGMdcQMoLo39Expbpdy-kHWbJldIw&s"},
    {name:"Fruit Juice Pack 24pcs", price:"Buy 3 Get 20% Off", img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFv0gCgY4_-daxliQCnZY0H0A4OUXBTmJHqg&s"}
  ],
  "Staples & Grains": [
    {name:"Basmati Rice 25kg", price:"₹1800", img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrgVEMmeKHIljaH5OGQirp8eaL0u7Dv6jGEw&s"},
    {name:"Brown Rice 25kg", price:"₹1600", img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXt2HnEPraBlluIYQ16tad1nj_dh-K1pvswg&s"},
    {name:"Wheat Flour 10kg", price:"₹420", img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMy28TZjVWm-M4e2Wmwlt1CSA4W-bbuutvEw&s"},
    {name:"Maida 10kg", price:"₹400", img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYFjjMiY88qOFMX7oW_BTNdZNzzw90RrxlzQ&s"},
    {name:"Sugar 5kg", price:"₹220", img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJOrFh1PaJFIucj__m1TLcqyEImpnkPkB2Rg&s"},
    {name:"Jaggery 1kg", price:"₹90", img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbgbH_THs5EakDW4Q3xo_YCN1Z5RJ6wZ4__w&s"},
    {name:"Toor Dal 5kg", price:"₹650", img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7jGkjbyWy9WGhrR1eUz7nJtaQl9W8tybekA&s"},
    {name:"Moong Dal 5kg", price:"₹600", img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVqj7BaNEJBfIpw940yCVvxN59qSgGtVLKGQ&s"},
    {name:"Chana Dal 5kg", price:"₹580", img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpZxp7Nj1W9cgz2C5n9ySx1DIcrWPaGIMxKQ&s"},
    {name:"Groundnut 5kg", price:"₹700", img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfWENt4GBy-yJDtro4fyacCEdE4Twk_lZDwA&s"}
  ],
  "Packaged Foods": [
    {name:"Maggie Noodles Pack (12)", price:"₹150", img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzGkl1c6tlABhfRieR_w1kyzgEWb6VgbJm6g&s"},
    {name:"Oreo Biscuits Pack (20)", price:"₹250", img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0QOVuqiaKrPgoTPAt-jHYWDIwgO-ADQx7UA&s"},
    {name:"Lays Chips (20 pcs)", price:"₹300", img:"https://5.imimg.com/data5/EI/YU/LH/SELLER-35654876/corn-flakes-original-500x500.jpg"},
    {name:"Kellogg’s Cornflakes 1kg", price:"₹350", img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRm6K1JU6k3uUQ4xtg6GCef0u6637GyZONAw&s"},
    {name:"Britannia Cake (12 pcs)", price:"₹200", img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEpOxNID4A4NL3rAlHvUKU8rl97zGQpyEqoQ&s"},
    {name:"Good Day Biscuits (20 packs)", price:"₹280", img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3RTZVNxkemZB-8K7wK4u3wvkV3-5ZKRVkmQ&s"}
  ],
  "Beverages": [
    {name:"Pepsi Crate (24)", price:"₹600", img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4tZ91nuEXrPXi6Kthb6QIM5tRMzxbVhuNgA&s"},
    {name:"Coca-Cola Crate (24)", price:"₹620", img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlBZZKr30r0DQt5uMXrkyZO7xnZh2Lisvbkg&s"},
    {name:"Frooti 1L (12 pcs)", price:"₹480", img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyNLXdTb7MfjdZ27b3ZY0u6FdxZZG8WaEAiQ&s"}
  ],
  "Dairy & Bakery": [
    {name:"Amul Butter 500g", price:"₹250", img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiUe2yfl8QsqNZd7ptvt9URowpDOHBQRTpEA&s"},
    {name:"Cheese Block 1kg", price:"₹480", img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQom0sJhzDZ4ztCZnNtHm6W1krAaY2ggH61jA&s"},
    {name:"Milk Packet 1L (12)", price:"₹720", img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXUUiNVdHooJzgsfZjWrnEnZ30bNvkx8A4GA&s"}
  ],
  "Personal Care": [
    {name:"Dove Soap Pack (4)", price:"₹160", img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkV4eOV0WmUvlIjrNg6WK5nYxw74_u_8m80g&s"},
    {name:"Lifebuoy Handwash 500ml", price:"₹90", img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuBqtjdl9srBKThQzyijunzheF-2oS7IOMjQ&s"}
  ]
  // Continue adding remaining categories (Cleaning, Baby Care, Fresh Produce, Stationery, Seasonal) in same format
};

const categories = Object.keys(productsData);

export default function ProductListing() {
  const [selectedCategory, setSelectedCategory] = useState("Home");
  const [products, setProducts] = useState(productsData["Home"]);

  useEffect(() => {
    setProducts(productsData[selectedCategory]);
  }, [selectedCategory]);

  const addToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.name} added to cart!`);
  };

  return (
    <div style={{
      display: "flex",
      minHeight: "100vh",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      background: "linear-gradient(135deg, #f5f7fa, #c3cfe2)",
      position: "relative",
    }}>
      {/* Sidebar */}
      <aside style={{
        width: "260px",
        padding: "30px 20px",
        background: "#fff",
        boxShadow: "2px 0 15px rgba(0,0,0,0.08)",
        position: "sticky",
        top: 0,
        height: "100vh",
        borderRight: "1px solid #eee"
      }}>
        <h2 style={{ marginBottom: "25px", color: "#4b0082", fontSize: "22px", fontWeight: "700" }}>Categories</h2>
        {categories.map(cat => (
          <button key={cat} onClick={() => setSelectedCategory(cat)} style={{
            display: "block", width: "100%", padding: "12px 15px", marginBottom: "12px",
            borderRadius: "10px",
            border: selectedCategory === cat ? "2px solid #4b0082" : "1px solid #ddd",
            background: selectedCategory === cat ? "#f3e9ff" : "#fff",
            cursor: "pointer",
            fontWeight: selectedCategory === cat ? "600" : "500",
            textAlign: "left",
            color: selectedCategory === cat ? "#4b0082" : "#444",
            fontSize: "15px",
            transition: "all 0.3s ease"
          }}>{cat}</button>
        ))}
      </aside>

      {/* Main Products */}
      <main style={{
        flexGrow: 1,
        padding: "30px",
        display: "flex",
        flexWrap: "wrap",
        gap: "25px",
        justifyContent: "flex-start"
      }}>
        {products.map((product, index) => (
          <div key={index} style={{
            background: "#fff",
            borderRadius: "14px",
            boxShadow: "0 6px 15px rgba(0,0,0,0.08)",
            padding: "20px",
            textAlign: "center",
            width: "240px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            transition: "transform 0.3s, box-shadow 0.3s"
          }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = "translateY(-8px) scale(1.02)";
              e.currentTarget.style.boxShadow = "0 12px 25px rgba(0,0,0,0.15)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = "translateY(0) scale(1)";
              e.currentTarget.style.boxShadow = "0 6px 15px rgba(0,0,0,0.08)";
            }}>
            <img src={product.img} alt={product.name} style={{ width: "100%", height: "160px", objectFit: "contain", marginBottom: "15px", borderRadius: "10px", background: "#fafafa", padding: "8px" }} />
            <h3 style={{ color: "#4b0082", fontSize: "16px", marginBottom: "8px", fontWeight: "600", minHeight: "45px" }}>{product.name}</h3>
            <p style={{ color: "#222", fontWeight: "600", marginBottom: "15px", fontSize: "15px" }}>{product.price}</p>
            <button style={{
              background: "linear-gradient(90deg,#6a11cb,#a4508b)",
              color: "#fff",
              border: "none",
              padding: "10px 18px",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "14px",
              transition: "all 0.3s ease",
              width: "100%",
            }}
              onClick={() => addToCart(product)}
              onMouseEnter={e => e.currentTarget.style.background = "linear-gradient(90deg,#5a0dbf,#9030a0)"}
              onMouseLeave={e => e.currentTarget.style.background = "linear-gradient(90deg,#6a11cb,#a4508b)"}>
              Add to Cart
            </button>
          </div>
        ))}
      </main>
    </div>
  );
}
