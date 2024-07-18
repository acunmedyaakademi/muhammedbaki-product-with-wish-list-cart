let menuProducts = [];
let salesProduct = [];

let productadet = 1;

let salestotal = 0;
let salesProductArray = 0;

function handleAddToCart() {
  let productId = Number(this.dataset.productid);
  let product = menuProducts.data.find((x) => x.id === productId);
  if (!product.adet) {
    product.adet = 1;
  }

  if (!product.toplam) {
    product.toplam = 0;
  }

  product.toplam = product.price * product.adet;

  if (!salesProduct.includes(product)) {
    salesProduct.push(product);
  }

  this.innerHTML = `<div class="addNumberCart">
  <img src="assets/img/-.png" class="eksiNumber" alt="- isareti">
  <p id="productsNumber">${product.adet}</p>
  <img src="assets/img/+.png" class="artiNumber" alt="+ isareti">
</div>`;

  this.style.padding = "0px";


  salestotal = salesProduct.reduce(
    (total, current) => total + current.toplam,
    0
  );
  confirmProduct.innerHTML = `
        <div class="orderTotal">
          <h4>Order Total</h4>
          <p>$${salestotal}</p>
        </div>
        <div class="carbon">
          <img src="assets/img/carbon_tree.svg" alt="carbon tree">
          <p>This is a <span>carbon-neutral</span> delivery</p>
        </div>
        <button class="Confirm">Confirm Order</button>`;

  orderAdd.innerText = `(${salesProduct.length})`;

  document.querySelectorAll(".eksiNumber").forEach((x) =>
    x.addEventListener("click", () => {
      product.adet--;
    })
  );
  document.querySelectorAll(".artiNumber").forEach((x) =>
    x.addEventListener("click", () => {
      product.adet++;
    })
  );
  
  productOrder.innerHTML = salesProduct
    .map((x) => CreateOrderaddHtml(x))
    .join("");

  document
    .querySelectorAll(".deletebtn")
    .forEach((x) => x.addEventListener("click", handleDeleteCart));

  document
    .querySelectorAll(".Confirm")
    .forEach((x) => x.addEventListener("click", handleConfirmClick));

}
function handleConfirmClick() {
  modal.innerHTML = `
      <div class="modal-container">
        <div class="modalheader">
          <img src="assets/img/carbon_checkmark-outline.svg" alt="">
          <h1>Order Confirmed</h1>
          <p>We hope enjoy your food</p>
        </div>

          <div class="orderLast">
            <div class="modalPorductList" id="modalPorductList">
          </div>
          
          <div class="modalorderTotal">
            <h4>Order Total</h4>
            <p>$${salestotal}</p>
          </div>
        </div>

        <button class="newOrder">Start New Order</button>
      </div>
`;
  modalPorductList.innerHTML = salesProduct
    .map((x) => CreateModalOrderaddHtml(x))
    .join("");

  document
    .querySelectorAll(".newOrder")
    .forEach((x) => x.addEventListener("click", handleNewOrderClick));
  modal.showModal();
}

function handleNewOrderClick() {
  salesProduct = [];
  modal.close();
  productOrder.innerHTML = "";
  orderAdd.innerText = "(0)";
  confirmProduct.innerHTML = "";
  init();
  renderProduct();
}

function CreateOrderaddHtml(product) {
  return `<div class="order-item">
    <div class="order-text">
      <h5>${product.name}</h5>
      <p>${product.adet}x <span>@${product.price}</span> <span><b>$${product.toplam}</b></span></p>
    </div>
  <a href="#" class="deletebtn" data-deleteid="${product.id}"><img src="assets/img/removeBtn.png" alt=""></a>
  </div>`;
}
function CreateModalOrderaddHtml(product) {
  return `<div class="modal-order-item">
    <div class="modalproduct-info">
    <img src="${product.image.thumbnail}" alt="">
    <div class="modal-text">
      <h5>${product.name}</h5>
      <p>${product.adet}x <span>@${product.price}</span></p>
    </div>
    </div>
    <p class="modaltotal">$${product.toplam}</p>
  </div>`;
}

function CreateOrderHtml(order) {
  return `<div class="order-item">
    <div class="order-text">
      <h5>${order.name}</h5>
      <p>${order.adet}x <span>@${order.price}</span> <span><b>$5.50</b></span></p>
    </div>
  <a href="#" class="deletebtn" data-deleteid="${order.id}"><img src="assets/img/removeBtn.png" alt=""></a>
  </div>`;
}

function createProductListHtml(product) {
  return `<div class="product-item">
              <img src="${product.image.desktop}" class="desktop" id="fetchİmg" alt="${product.image.desktop}">

          <div class="addTocart" id="addTocart" data-productid="${product.id}">
            <img src="assets/img/carbon_shopping-cart-plus.svg" alt="">
            <p>Add to Cart</p>
          </div>

          <div class="product-text">
            <h4>${product.category}</h4>
            <h3>${product.name}</h3>
            <p>$${product.price}</p>
          </div>
        </div>`;
}
function handleDeleteCart() {
  salesProduct = salesProduct.filter(
    (x) => x.id !== Number(this.dataset.deleteid)
  );
  
  orderAdd.innerText = `(${salesProduct.length})`;
}


function renderProduct() {
  productList.innerHTML = menuProducts.data
    .map((x) => createProductListHtml(x))
    .join("");

  document
    .querySelectorAll(".addTocart")
    .forEach((x) => x.addEventListener("click", handleAddToCart));

}

function init() {
  fetch("https://dummyjson.czaylabs.com.tr/api/products")
    .then((res) => res.json())
    .then((res) => {
      menuProducts = res;
      renderProduct();
    });
}
init();
