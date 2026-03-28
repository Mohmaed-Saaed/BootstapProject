import { getTotalQtyItems } from "./Helper.js";

var container = document.querySelector(".products");

fetch("https://fakestoreapi.com/products")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((element) => {
      container.append(product(element));
    });
    document.getElementById("cartCount").textContent = getTotalQtyItems();
  })
  .catch(() => {
    container.innerHTML = `
        <p class="text-muted small">Please check your connection and try again.</p>
        `;
  });

function product(element) {
  const col = document.createElement("div");
  col.className = "col-sm-6 col-lg-4 mb-4";

  col.innerHTML = `
    <div class="card h-100 border-0 shadow-sm">
      <div class="position-relative">
        <img
          src="${element.image}"
          class="card-img-top p-3"
          style="height:200px; object-fit:contain;"
          alt="${element.title}"
        />
      </div>
      <div class="card-body pb-0">
        <small class="text-muted text-capitalize">${element.category}</small>
        <h6 class="card-title font-weight-semibold mt-1">
          ${element.title.length > 40 ? element.title.slice(0, 40) + "…" : element.title}
        </h6>
        <div class="text-warning small mb-2">
        </div>
        <p class="font-weight-bold mb-0">
          $${element.price.toFixed(2)} 
        </p>
      </div>
      <div class="card-footer bg-white border-0 pt-2">
        <button class="btn btn-dark btn-sm btn-block add-btn">
          <i class="bi bi-cart-plus mr-1"></i> Add to Cart
        </button>
      </div>
    </div>
  `;

  const btn = col.querySelector(".add-btn");
  btn.addEventListener("click", () => {
    addToCart(element);

    btn.innerHTML = '<i class="bi bi-check-lg mr-1"></i>';
    btn.classList.replace("btn-dark", "btn-success");
    btn.disabled = true;
    setTimeout(() => {
      btn.innerHTML = '<i class="bi bi-cart-plus mr-1"></i> Add to Cart';
      btn.classList.replace("btn-success", "btn-dark");
      btn.disabled = false;
    }, 1200);
  });

  return col;
}

function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existing = cart.find((i) => i.id === product.id);
  if (existing) {
    existing.qty = (existing.qty || 1) + 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  document.getElementById("cartCount").textContent = getTotalQtyItems();
}
