// OPEN & CLOSE CART
const cartIcon = document.querySelector("#shopping-card");
const cart = document.querySelector(".cart");
const closeCart = document.querySelector("#cart-close");

cartIcon.addEventListener("click", () => {
  cart.classList.add("active");
});

closeCart.addEventListener("click", () => {
  cart.classList.remove("active");
});

if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", start);
} else {
  start();
}

// =============== START ====================
function start() {
  addEvents();
}

// ============= UPDATE & RERENDER ===========
function update() {
    addEvents();
    updateTotal();
}
// =============== ADD EVENTS ===============
function addEvents() {
    // Remove 
    let cartRemove_btns = document.querySelectorAll(".cart-remove");
    console.log(cartRemove_btns);
    cartRemove_btns.forEach((btn) => {
      btn.addEventListener("click", handle_removeCartItem);
    });
  
    // Change item quantity
    let cartQuantity_inputs = document.querySelectorAll(".cart-quantity");
    cartQuantity_inputs.forEach((input) => {
      input.addEventListener("change", handle_changeItemQuantity);
    });
  
    // Add
    let addCart_btns = document.querySelectorAll(".product-button");
    addCart_btns.forEach((btn) => {
      btn.addEventListener("click", handle_addCartItem);
    });
    // Buy 
    const buy_btn = document.querySelector(".btn-buy");
    buy_btn.addEventListener("click", handle_buyOrder);
  }
  
  //  HANDLE EVENTS FUNCTIONS
  let itemsAdded = [];

  function handle_addCartItem() {
    let product = this.parentElement;
    let title = product.querySelector(".product-title").innerHTML;
    let price = product.querySelector(".product-price").innerHTML;
    let imgSrc = product.querySelector(".product-img").src;
    console.log(title, price, imgSrc);
  
    let newToAdd = {
      title,
      price,
      imgSrc,
    };
  
    
    if (itemsAdded.find((el) => el.title == newToAdd.title)) {
      alert("This item already exists!");
      return;
    } else {
      itemsAdded.push(newToAdd);
      alert("Item added to cart successfully!");
    }
  

    let cartBoxElement = CartBoxComponent(title, price, imgSrc);
    let newNode = document.createElement("div");
    newNode.innerHTML = cartBoxElement;
    const cartContent = cart.querySelector(".cart-content");
    cartContent.appendChild(newNode);
    update();
  }
  
  function handle_removeCartItem() {
    this.parentElement.remove();
    itemsAdded = itemsAdded.filter(
      (el) =>
        el.title !=
        this.parentElement.querySelector(".cart-product-title").innerHTML
    );
   
    update();
  }

  function handle_changeItemQuantity() {
    if (isNaN(this.value) || this.value < 1) {
      this.value = 1;
    }
    this.value = Math.floor(this.value); 
  
    update();
  }
  
  function handle_buyOrder() {
    if (itemsAdded.length <= 0) {
      alert("There is no order to place yet! \nPlease make an order first.");
      return;
    }
    const cartContent = cart.querySelector(".cart-content");
    cartContent.innerHTML = "";
    alert("Your order is placed successfully :)");
    itemsAdded = [];
    update();
  }
  
  //  UPDATE & RERENDER FUNCTIONS 
  function updateTotal() {
    let cartBoxes = document.querySelectorAll(".cart-box");
    const totalElement = cart.querySelector(".total-price");
    let total = 0;
    cartBoxes.forEach((cartBox) => {
      let priceElement = cartBox.querySelector(".cart-price");
      let price = parseFloat(priceElement.innerHTML.replace("$", ""));
      let quantity = cartBox.querySelector(".cart-quantity").value;
      total += price * quantity;
    });
  
    total = total.toFixed(2);
    totalElement.innerHTML = "$" + total;
  }
  
  // HTML COMPONENTS
  function CartBoxComponent(title, price, imgSrc) {
    return `
      <div class="cart-box">
          <img src=${imgSrc} alt="" class="cart-img">
          <div class="detail-box">
              <div class="cart-product-title">${title}</div>
              <div class="cart-price">${price}</div>
              <input type="number" value="1" class="cart-quantity">
          </div>
          <!-- REMOVE CART  -->
          <i class="fas fa-trash cart-remove"></i>
      </div>`;
  }