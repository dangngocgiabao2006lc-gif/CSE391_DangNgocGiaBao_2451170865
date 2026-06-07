const products = [
    { id: 1, name: "iPhone 16", price: 25990000, category: "phone", image: "https://placehold.co/300x200", rating: 4.5, inStock: true },
    { id: 2, name: "Samsung S24", price: 22990000, category: "phone", image: "https://placehold.co/300x200", rating: 4.4, inStock: true },
    { id: 3, name: "MacBook Pro", price: 45990000, category: "laptop", image: "https://placehold.co/300x200", rating: 4.9, inStock: true },
    { id: 4, name: "Dell XPS 15", price: 35990000, category: "laptop", image: "https://placehold.co/300x200", rating: 4.7, inStock: true },
    { id: 5, name: "iPad Air", price: 16990000, category: "tablet", image: "https://placehold.co/300x200", rating: 4.6, inStock: false },
    { id: 6, name: "Xiaomi Pad 6", price: 7990000, category: "tablet", image: "https://placehold.co/300x200", rating: 4.3, inStock: true },
    { id: 7, name: "AirPods Pro", price: 6990000, category: "accessory", image: "https://placehold.co/300x200", rating: 4.5, inStock: true },
    { id: 8, name: "Galaxy Buds", price: 3490000, category: "accessory", image: "https://placehold.co/300x200", rating: 4.1, inStock: true },
    { id: 9, name: "ThinkPad X1", price: 32990000, category: "laptop", image: "https://placehold.co/300x200", rating: 4.6, inStock: true },
    { id: 10, name: "Pixel 9", price: 19990000, category: "phone", image: "https://placehold.co/300x200", rating: 4.5, inStock: true },
    { id: 11, name: "Magic Mouse", price: 2490000, category: "accessory", image: "https://placehold.co/300x200", rating: 4.0, inStock: true },
    { id: 12, name: "Lenovo Tab", price: 9990000, category: "tablet", image: "https://placehold.co/300x200", rating: 4.2, inStock: true }
];

const app = document.getElementById("app");

let cartCount = 0;
let currentCategory = "all";
let currentKeyword = "";
let currentSort = "default";

function createLayout() {
    const container = document.createElement("div");
    container.className = "container";

    container.innerHTML = `
        <div class="header">
            <h1>Product Catalog</h1>

            <div style="display:flex; gap:15px; align-items:center;">
                <button id="darkModeBtn">🌙 Dark Mode</button>

                <div class="cart-wrapper">
                    🛒
                    <div class="cart-badge" id="cartBadge">0</div>
                </div>
            </div>
        </div>

        <div class="controls">
            <input type="text" id="searchInput" placeholder="Tìm sản phẩm...">

            <select id="sortSelect">
                <option value="default">Sắp xếp</option>
                <option value="price-asc">Giá tăng dần</option>
                <option value="price-desc">Giá giảm dần</option>
                <option value="name-asc">Tên A-Z</option>
                <option value="rating-desc">Rating cao nhất</option>
            </select>
        </div>

        <div class="category-buttons">
            <button data-category="all" class="active">All</button>
            <button data-category="phone">Phone</button>
            <button data-category="laptop">Laptop</button>
            <button data-category="tablet">Tablet</button>
            <button data-category="accessory">Accessory</button>
        </div>

        <div class="product-grid" id="productGrid"></div>

        <div class="modal hidden" id="modal">
            <div class="modal-content" id="modalContent">
                <span class="close-modal" id="closeModal">×</span>
            </div>
        </div>
    `;

    app.appendChild(container);
}

function formatPrice(price) {
    return price.toLocaleString("vi-VN") + "đ";
}

function renderProducts(productList) {
    const grid = document.getElementById("productGrid");
    grid.innerHTML = "";

    productList.forEach(product => {
        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}">

            <div class="card-content">
                <h3>${product.name}</h3>
                <div class="price">${formatPrice(product.price)}</div>
                <div class="rating">⭐ ${product.rating}</div>
                <div class="stock">
                    ${product.inStock ? "Còn hàng" : "Hết hàng"}
                </div>

                <button class="cart-btn" data-id="${product.id}">
                    Thêm giỏ hàng
                </button>
            </div>
        `;

        card.addEventListener("click", (e) => {
            if (!e.target.classList.contains("cart-btn")) {
                openModal(product);
            }
        });

        grid.appendChild(card);
    });
}

function filterProducts() {
    let filtered = [...products];

    if (currentCategory !== "all") {
        filtered = filtered.filter(product => product.category === currentCategory);
    }

    if (currentKeyword.trim() !== "") {
        filtered = filtered.filter(product =>
            product.name.toLowerCase().includes(currentKeyword.toLowerCase())
        );
    }

    switch (currentSort) {
        case "price-asc":
            filtered.sort((a, b) => a.price - b.price);
            break;

        case "price-desc":
            filtered.sort((a, b) => b.price - a.price);
            break;

        case "name-asc":
            filtered.sort((a, b) => a.name.localeCompare(b.name));
            break;

        case "rating-desc":
            filtered.sort((a, b) => b.rating - a.rating);
            break;
    }

    renderProducts(filtered);
}

function openModal(product) {
    const modal = document.getElementById("modal");
    const content = document.getElementById("modalContent");

    content.innerHTML = `
        <span class="close-modal" id="closeModal">×</span>

        <img src="${product.image}" alt="${product.name}">

        <h2>${product.name}</h2>
        <p><strong>Giá:</strong> ${formatPrice(product.price)}</p>
        <p><strong>Category:</strong> ${product.category}</p>
        <p><strong>Rating:</strong> ⭐ ${product.rating}</p>
        <p><strong>Trạng thái:</strong> ${product.inStock ? "Còn hàng" : "Hết hàng"}</p>
    `;

    modal.classList.remove("hidden");

    document.getElementById("closeModal").addEventListener("click", () => {
        modal.classList.add("hidden");
    });
}

function setupEvents() {
    document.getElementById("searchInput").addEventListener("input", (e) => {
        currentKeyword = e.target.value;
        filterProducts();
    });

    document.getElementById("sortSelect").addEventListener("change", (e) => {
        currentSort = e.target.value;
        filterProducts();
    });

    document.querySelectorAll(".category-buttons button").forEach(button => {
        button.addEventListener("click", () => {
            document
                .querySelectorAll(".category-buttons button")
                .forEach(btn => btn.classList.remove("active"));

            button.classList.add("active");

            currentCategory = button.dataset.category;
            filterProducts();
        });
    });

    document.getElementById("productGrid").addEventListener("click", (e) => {
        if (e.target.classList.contains("cart-btn")) {
            cartCount++;
            document.getElementById("cartBadge").textContent = cartCount;
        }
    });

    document.getElementById("darkModeBtn").addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
    });

    document.getElementById("modal").addEventListener("click", (e) => {
        if (e.target.id === "modal") {
            e.target.classList.add("hidden");
        }
    });
}

createLayout();
renderProducts(products);
setupEvents();

