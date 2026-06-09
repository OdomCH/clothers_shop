// ============================================================================
// 1. DATA & STATE MANAGEMENT (WITH YOUR NEW CLOTHES PRE-LOADED)
// ============================================================================

// Updated Product Catalog using your project images
const PRODUCTS = [
  { id: 1, name: "Multi-Panel Cable Knit Sweater", price: 95.00, category: "tops", sizes: ["S", "M", "L", "XL"], colors: ["Multi-Color Patch"], image: "./assets/pic1.jpg" },
  { id: 2, name: "\"Supra\" Graphic Color-Block Knit", price: 98.00, category: "tops", sizes: ["S", "M", "L", "XL"], colors: ["Green/Brown"], image: "./assets/pic2.jpg" },
  { id: 3, name: "Blaugrana Retro Collared Sweatshirt", price: 85.00, category: "tops", sizes: ["M", "L", "XL"], colors: ["Retro White"], image: "./assets/pic3.jpg" },
  { id: 4, name: "Seleção Quarter-Zip Club Pullover", price: 88.00, category: "tops", sizes: ["S", "M", "L"], colors: ["Pastel Yellow"], image: "./assets/pic4.jpg" },
  { id: 5, name: "Galáctico Monochrome Polo Fleece", price: 82.00, category: "tops", sizes: ["M", "L", "XL"], colors: ["Matte Black"], image: "./assets/pic5.jpg" },
  { id: 6, name: "Veridian Vertical Stripe Knit Polo", price: 65.00, category: "tops", sizes: ["S", "M", "L"], colors: ["Veridian Green"], image: "./assets/pic6.jpg" },
  { id: 7, name: "Espresso V-Neck Contrast Polo", price: 60.00, category: "tops", sizes: ["S", "M", "L", "XL"], colors: ["Espresso Brown"], image: "./assets/pic7.jpg" }
];

// Application State (Loaded from LocalStorage if available)
let cart = JSON.parse(localStorage.getItem("noctvre_cart")) || [];
let orders = JSON.parse(localStorage.getItem("noctvre_orders")) || [];
let currentSelectedProduct = null;
let currentSelectedSize = null;
let currentSelectedColor = null;

// Shipping Configurations
const SHIPPING_BASE = 9.99;
const FREE_SHIPPING_THRESHOLD = 150.00;

// Initialize App Lifecycle on Content Load
document.addEventListener("DOMContentLoaded", () => {
  renderProducts("all");
  updateCartUI();
  showPage("home");
});

// ============================================================================
// 2. NAVIGATION & SINGLE PAGE ROUTING
// ============================================================================
function showPage(pageId) {
  // Hide all template page nodes
  document.querySelectorAll(".page").forEach(page => page.classList.remove("active"));

  // Reveal target section
  const targetPage = document.getElementById(`page-${pageId}`);
  if (targetPage) {
    targetPage.classList.add("active");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Load specific page calculations on routing triggers
  if (pageId === "checkout") renderCheckoutSummary();
  else if (pageId === "orders") renderOrderHistory();

  // Close the cart drawer if open during routing steps
  const cartDrawer = document.getElementById("cartDrawer");
  if (cartDrawer && cartDrawer.classList.contains("open")) toggleCart();
}

function scrollToProducts() {
  const target = document.getElementById("products");
  if (target) target.scrollIntoView({ behavior: "smooth" });
}

// ============================================================================
// 3. PRODUCT DISPLAY CATALOG
// ============================================================================
function renderProducts(categoryFilter) {
  const grid = document.getElementById("productGrid");
  if (!grid) return;
  grid.innerHTML = "";

  const filtered = PRODUCTS.filter(p => categoryFilter === "all" || p.category === categoryFilter);

  filtered.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";

    // Uses your uploaded project filenames as backgrounds if matching assets exist
    card.innerHTML = `
      <div class="product-img-placeholder" style="background-image: url('${product.image}'); background-size: cover; background-position: center; min-height: 350px;">
        <div class="product-badge">${product.category.toUpperCase()}</div>
      </div>
      <div class="product-info">
        <h3 class="product-name">${product.name}</h3>
        <p class="product-price">$${product.price.toFixed(2)}</p>
        <button class="btn-primary btn-full" onclick="openSizeModal(${product.id})">Quick Add</button>
      </div>
    `;
    grid.appendChild(card);
  });
}

function filterProducts(category, buttonElement) {
  document.querySelectorAll(".filter-btn").forEach(btn => btn.classList.remove("active"));
  buttonElement.classList.add("active");
  renderProducts(category);
}

// ============================================================================
// 4. CONFIGURATION MODAL (WITH ACTIVE HIGHLIGHT FIXED)
// ============================================================================
function openSizeModal(productId) {
  currentSelectedProduct = PRODUCTS.find(p => p.id === productId);
  currentSelectedSize = null;
  currentSelectedColor = null;

  if (!currentSelectedProduct) return;

  document.getElementById("sizeModalTitle").innerText = `Configure ${currentSelectedProduct.name}`;

  const optionsContainer = document.getElementById("sizeOptions");
  optionsContainer.innerHTML = "";

  // A. Generate Size Label and Button Groups
  const sizeLabel = document.createElement("p");
  sizeLabel.innerText = "Select Size:";
  sizeLabel.style.margin = "15px 0 8px 0";
  sizeLabel.style.fontWeight = "bold";
  sizeLabel.style.color = "#fff";
  optionsContainer.appendChild(sizeLabel);

  const sizeRow = document.createElement("div");
  sizeRow.style.display = "flex";
  sizeRow.style.gap = "10px";
  sizeRow.style.flexWrap = "wrap";
  sizeRow.style.marginBottom = "20px";

  currentSelectedProduct.sizes.forEach(size => {
    const btn = document.createElement("button");
    btn.className = "size-btn";
    btn.innerText = size;

    // Default Unselected Theme State
    btn.style.background = "transparent";
    btn.style.border = "1px solid #444";
    btn.style.color = "#fff";
    btn.style.padding = "10px 18px";
    btn.style.cursor = "pointer";
    btn.style.transition = "all 0.2s ease";

    btn.onclick = () => {
      // Clear active styling state across other local size option nodes
      sizeRow.querySelectorAll("button").forEach(b => {
        b.style.background = "transparent";
        b.style.color = "#fff";
        b.style.borderColor = "#444";
      });
      // Apply white active theme highlight to show selection instantly
      btn.style.background = "#fff";
      btn.style.color = "#000";
      btn.style.borderColor = "#fff";

      currentSelectedSize = size;
    };
    sizeRow.appendChild(btn);
  });
  optionsContainer.appendChild(sizeRow);

  // B. Generate Color Label and Button Groups
  const colorLabel = document.createElement("p");
  colorLabel.innerText = "Select Color:";
  colorLabel.style.margin = "15px 0 8px 0";
  colorLabel.style.fontWeight = "bold";
  colorLabel.style.color = "#fff";
  optionsContainer.appendChild(colorLabel);

  const colorRow = document.createElement("div");
  colorRow.style.display = "flex";
  colorRow.style.gap = "10px";
  colorRow.style.flexWrap = "wrap";
  colorRow.style.marginBottom = "20px";

  currentSelectedProduct.colors.forEach(color => {
    const btn = document.createElement("button");
    btn.className = "size-btn";
    btn.innerText = color;

    // Default Unselected Theme State
    btn.style.background = "transparent";
    btn.style.border = "1px solid #444";
    btn.style.color = "#fff";
    btn.style.padding = "10px 18px";
    btn.style.cursor = "pointer";
    btn.style.transition = "all 0.2s ease";

    btn.onclick = () => {
      // Clear active styling state across other local color option nodes
      colorRow.querySelectorAll("button").forEach(b => {
        b.style.background = "transparent";
        b.style.color = "#fff";
        b.style.borderColor = "#444";
      });
      // Apply white active theme highlight to show selection instantly
      btn.style.background = "#fff";
      btn.style.color = "#000";
      btn.style.borderColor = "#fff";

      currentSelectedColor = color;
    };
    colorRow.appendChild(btn);
  });
  optionsContainer.appendChild(colorRow);

  // Reveal Modal Windows
  document.getElementById("sizeModalOverlay").classList.add("open");
  document.getElementById("sizeModal").classList.add("open");
}

function closeSizeModal() {
  document.getElementById("sizeModalOverlay").classList.remove("open");
  document.getElementById("sizeModal").classList.remove("open");
  currentSelectedProduct = null;
  currentSelectedSize = null;
  currentSelectedColor = null;
}

function confirmAddToCart() {
  if (!currentSelectedSize) {
    alert("Please select a size first.");
    return;
  }
  if (!currentSelectedColor) {
    alert("Please select a color variant first.");
    return;
  }

  addToCart(currentSelectedProduct.id, currentSelectedSize, currentSelectedColor);
  closeSizeModal();
  toggleCart();
}

// ============================================================================
// 5. CART CONTROLS (កែប្រែថ្មី៖ បន្ថែមរូបភាពទៅក្នុង Cart Item Row)
// ============================================================================
function toggleCart() {
  document.getElementById("cartOverlay").classList.toggle("open");
  document.getElementById("cartDrawer").classList.toggle("open");
}

function addToCart(id, size, color) {
  const existingIndex = cart.findIndex(item => item.id === id && item.size === size && item.color === color);

  if (existingIndex > -1) {
    cart[existingIndex].quantity += 1;
  } else {
    const originalItem = PRODUCTS.find(p => p.id === id);
    cart.push({
      id: originalItem.id,
      name: originalItem.name,
      price: originalItem.price,
      size: size,
      color: color,
      image: originalItem.image, // រក្សាទុកឈ្មោះរូបភាពទៅក្នុង Cart object
      quantity: 1
    });
  }
  saveCartAndRefresh();
}

function removeWholeItemFromCart(id, size, color) {
  cart = cart.filter(item => !(item.id === id && item.size === size && item.color === color));
  saveCartAndRefresh();
}

function updateCartQuantity(id, size, color, change) {
  const index = cart.findIndex(item => item.id === id && item.size === size && item.color === color);
  if (index === -1) return;

  cart[index].quantity += change;
  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }
  saveCartAndRefresh();
}

function saveCartAndRefresh() {
  localStorage.setItem("noctvre_cart", JSON.stringify(cart));
  updateCartUI();
}

function calculateSubtotal() {
  return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

function calculateShipping(subtotal) {
  if (subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD) return 0.00;
  return SHIPPING_BASE;
}

function updateCartUI() {
  const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.getElementById("cartCount").innerText = totalQty;

  const cartItemsContainer = document.getElementById("cartItems");
  if (!cartItemsContainer) return;
  cartItemsContainer.innerHTML = "";

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `<div class="cart-empty-message" style="color: #666; text-align: center; padding: 40px 0;">Your cart is currently empty.</div>`;
    document.getElementById("cartTotal").innerText = "$0.00";
    return;
  }

  cart.forEach(item => {
    const row = document.createElement("div");
    row.className = "cart-item";
    row.style.display = "flex";
    row.style.justifyContent = "space-between";
    row.style.alignItems = "center";
    row.style.padding = "12px 0";
    row.style.borderBottom = "1px solid #222";
    row.style.gap = "12px";

    row.innerHTML = `
      <div class="cart-item-img-wrapper" style="width: 70px; height: 85px; flex-shrink: 0; background-color: #111; border: 1px solid #333; overflow: hidden;">
        <img src="${item.image}" alt="${item.name}" style="width: 100%; height: 100%; object-fit: cover;" />
      </div>

      <div class="cart-item-details" style="flex-grow: 1;">
        <p class="cart-item-name" style="margin: 0; font-weight: 500; font-size: 0.95rem; line-height: 1.3;">${item.name}</p>
        <p class="cart-item-meta" style="margin: 4px 0 0 0; font-size: 0.8rem; color: #888;">
          Size: ${item.size} | Color: ${item.color}
        </p>
        <p class="cart-item-price" style="margin: 4px 0 0 0; font-size: 0.9rem; font-weight: 600; color: #fff;">$${item.price.toFixed(2)}</p>
      </div>

      <div class="cart-item-controls" style="display: flex; flex-direction: column; align-items: flex-end; gap: 8px;">
        <div class="quantity-selectors" style="display: flex; align-items: center; border: 1px solid #333; background: #111;">
          <button style="background: none; border: none; color: #fff; padding: 4px 8px; cursor: pointer;" onclick="updateCartQuantity(${item.id}, '${item.size}', '${item.color}', -1)">-</button>
          <span style="min-width: 18px; text-align: center; font-size: 0.85rem;">${item.quantity}</span>
          <button style="background: none; border: none; color: #fff; padding: 4px 8px; cursor: pointer;" onclick="updateCartQuantity(${item.id}, '${item.size}', '${item.color}', 1)">+</button>
        </div>
        <button class="cart-delete-btn"
                style="background: transparent; border: none; color: #ff5555; cursor: pointer; font-size: 0.8rem; padding: 0; text-decoration: underline;"
                onclick="removeWholeItemFromCart(${item.id}, '${item.size}', '${item.color}')">
          Remove
        </button>
      </div>
    `;
    cartItemsContainer.appendChild(row);
  });

  const subtotal = calculateSubtotal();
  document.getElementById("cartTotal").innerText = `$${subtotal.toFixed(2)}`;
}

// ============================================================================
// 6. CHECKOUT MANAGEMENT SCREEN
// ============================================================================
function goToCheckout() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }
  showPage("checkout");
}

function renderCheckoutSummary() {
  const summaryContainer = document.getElementById("summaryItems");
  if (!summaryContainer) return;
  summaryContainer.innerHTML = "";

  cart.forEach(item => {
    const el = document.createElement("div");
    el.className = "summary-item-row";
    el.style.display = "flex";
    el.style.justifyContent = "space-between";
    el.style.marginBottom = "0.5rem";
    el.innerHTML = `
      <span>${item.name} (x${item.quantity}) <small style="color: #888;">[${item.size} / ${item.color}]</small></span>
      <span>$${(item.price * item.quantity).toFixed(2)}</span>
    `;
    summaryContainer.appendChild(el);
  });

  const subtotal = calculateSubtotal();
  const shipping = calculateShipping(subtotal);
  const total = subtotal + shipping;

  document.getElementById("summarySubtotal").innerText = `$${subtotal.toFixed(2)}`;
  document.getElementById("summaryShipping").innerText = shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`;
  document.getElementById("summaryTotal").innerText = `$${total.toFixed(2)}`;
}

// Form field text formatting masks
function formatCard(input) {
  let val = input.value.replace(/\D/g, "");
  let matches = val.match(/\d{4,16}/g);
  let match = (matches && matches[0]) || "";
  let parts = [];
  for (let i = 0, len = match.length; i < len; i += 4) {
    parts.push(match.substring(i, i + 4));
  }
  input.value = parts.length > 0 ? parts.join(" ") : val;
}

function formatExpiry(input) {
  let val = input.value.replace(/\D/g, "");
  input.value = val.length >= 2 ? val.slice(0, 2) + " / " + val.slice(2, 4) : val;
}

// ============================================================================
// 7. ORDER PLACEMENT AND INVOICING RECEIPTS
// ============================================================================
function submitOrder(event) {
  event.preventDefault();
  if (cart.length === 0) return;

  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const address = document.getElementById("address").value;
  const city = document.getElementById("city").value;
  const zip = document.getElementById("zip").value;
  const countrySelect = document.getElementById("country");
  const countryName = countrySelect.options[countrySelect.selectedIndex].text;

  const subtotal = calculateSubtotal();
  const shipping = calculateShipping(subtotal);
  const total = subtotal + shipping;
  const generatedOrderId = "NCT-" + Math.floor(100000 + Math.random() * 900000);

  const orderObject = {
    orderId: generatedOrderId,
    date: new Date().toLocaleDateString(),
    customerName: `${firstName} ${lastName}`,
    shippingAddress: `${address}, ${city}, ${zip}, ${countryName}`,
    items: [...cart],
    subtotal: subtotal,
    shipping: shipping,
    total: total
  };

  orders.unshift(orderObject);
  localStorage.setItem("noctvre_orders", JSON.stringify(orders));

  populateReceiptView(orderObject);

  // Clear data sets to reset checkout completely
  cart = [];
  saveCartAndRefresh();
  document.getElementById("checkoutForm").reset();
  showPage("receipt");
}

function populateReceiptView(order) {
  document.getElementById("receiptOrderId").innerText = `Order ID: ${order.orderId}`;
  document.getElementById("receiptName").innerText = order.customerName;
  document.getElementById("receiptAddress").innerText = order.shippingAddress;

  const itemsTableBody = document.getElementById("receiptItems");
  itemsTableBody.innerHTML = "";

  order.items.forEach(item => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${item.name} <br/><small style="color:#888;">Variant: ${item.color}</small></td>
      <td>${item.size}</td>
      <td>${item.quantity}</td>
      <td>$${(item.price * item.quantity).toFixed(2)}</td>
    `;
    itemsTableBody.appendChild(tr);
  });

  document.getElementById("receiptSubtotal").innerText = `$${order.subtotal.toFixed(2)}`;
  document.getElementById("receiptShipping").innerText = order.shipping === 0 ? "FREE" : `$${order.shipping.toFixed(2)}`;
  document.getElementById("receiptTotal").innerText = `$${order.total.toFixed(2)}`;
}

// ============================================================================
// 8. PAST TRANSACTION ARCHIVES
// ============================================================================
function renderOrderHistory() {
  const emptyState = document.getElementById("ordersEmpty");
  const tableWrap = document.getElementById("ordersTable");
  if (!emptyState || !tableWrap) return;

  if (orders.length === 0) {
    emptyState.style.display = "block";
    tableWrap.style.display = "none";
    return;
  }

  emptyState.style.display = "none";
  tableWrap.style.display = "block";

  let html = `
    <table class="orders-history-table" style="width:100%; border-collapse: collapse; text-align: left;">
      <thead>
        <tr style="border-bottom: 2px solid #333;">
          <th style="padding: 12px 8px;">Order ID</th>
          <th style="padding: 12px 8px;">Date</th>
          <th style="padding: 12px 8px;">Items</th>
          <th style="padding: 12px 8px;">Total</th>
          <th style="padding: 12px 8px;">Action</th>
        </tr>
      </thead>
      <tbody>
  `;

  orders.forEach((order, index) => {
    const totalItemsCount = order.items.reduce((acc, item) => acc + item.quantity, 0);
    html += `
      <tr style="border-bottom: 1px solid #222;">
        <td style="padding: 12px 8px; font-weight: 600;">${order.orderId}</td>
        <td style="padding: 12px 8px;">${order.date}</td>
        <td style="padding: 12px 8px;">${totalItemsCount}</td>
        <td style="padding: 12px 8px;">$${order.total.toFixed(2)}</td>
        <td style="padding: 12px 8px;"><button class="btn-outline" style="padding: 4px 12px; font-size: 0.8rem;" onclick="viewPastReceiptByIndex(${index})">View Invoice</button></td>
      </tr>
    `;
  });

  html += `</tbody></table>`;
  tableWrap.innerHTML = html;
}

function viewPastReceiptByIndex(index) {
  const targetedOrder = orders[index];
  if (targetedOrder) {
    populateReceiptView(targetedOrder);
    showPage("receipt");
  }
}
