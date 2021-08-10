const productJson = {
  "favorite_products": [
    {
      "id": 1,
      "name": "Morbi condimentum egestas quam - 3m",
      "promotionPrice": 18,
      "currentPrice": 35,
      "tamanho": "3m",
      "cor": "misto",
      "imageUrl": "./Assets/product/product-1.png",
      "status": "out-of-stock"
    },
    {
      "id": 2,
      "name": "Vivamos quam ex. ultrices et blandit sed - 3m",
      "promotionPrice": 28,
      "currentPrice": 45,
      "tamanho": "3m",
      "cor": "verde",
      "imageUrl": "./Assets/product/product-2.png",
      "status": "active"
    }
  ],

  "products": [
    {
      "id": 1,
      "name": "Morbi condimentum egestas quam - 3m",
      "promotionPrice": 18,
      "currentPrice": 35,
      "tamanho": "3m",
      "cor": "misto",
      "imageUrl": "./Assets/product/product-1.png",
      "status": "out-of-stock"
    },
    {
      "id": 2,
      "name": "Vivamos quam ex. ultrices et blandit sed - 3m",
      "promotionPrice": 28,
      "currentPrice": 45,
      "tamanho": "3m",
      "cor": "verde",
      "imageUrl": "./Assets/product/product-2.png",
      "status": "active"
    },
    {
      "id": 1,
      "name": "Morbi condimentum egestas quam - 3m",
      "promotionPrice": 18,
      "currentPrice": 35,
      "tamanho": "3m",
      "cor": "misto",
      "imageUrl": "./Assets/product/product-1.png",
      "status": "out-of-stock"
    },
    {
      "id": 2,
      "name": "Vivamos quam ex. ultrices et blandit sed - 3m",
      "promotionPrice": 28,
      "currentPrice": 45,
      "tamanho": "3m",
      "cor": "verde",
      "imageUrl": "./Assets/product/product-2.png",
      "status": "active"
    }
  ]
};


/* local storage handler */

function getLocalStorage(reference) {
  const data = localStorage.getItem(reference);

  return JSON.parse(data);
}

function setLocalStorage(reference, content) {
  return localStorage.setItem(reference, JSON.stringify(content));
};



/* Cart functions */

function openCart() {
  const element = document
    .querySelector(".cart-overlay")
    .classList.contains("hidden")

  if (!element) return;

  return document
    .querySelector(".cart-overlay")
    .classList.remove("hidden")
}

function closeCart() {
  const element = document
    .querySelector(".cart-overlay")
    .classList.contains("hidden")

  if (element) return;

  return document
    .querySelector(".cart-overlay")
    .classList.add("hidden")
}

function getCartLength() {
  const currentCartStorage = getLocalStorage("auau-cart");

  if (!currentCartStorage) {
    document.querySelector(".cart-quantity").innerHTML = 0;
    document.querySelector(".cart-quantity.second").innerHTML = 0;
    return;
  };
  
  document.querySelector(".cart-quantity").innerHTML = currentCartStorage.length;
  document.querySelector(".cart-quantity.second").innerHTML = currentCartStorage.length;
}

function getCartTotalPrice() {
  const currentCartStorage = getLocalStorage("auau-cart");

  if (!currentCartStorage) {
    document.querySelector(".cart-footer-price").innerHTML = `<strong>SUBTOTAL: R$ ${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(0)}</strong>`;
    return;
  };

  const cartTotalPrice = currentCartStorage.reduce((acumulador, item) => {
    return acumulador + item.promotionPrice;
  }, 0);
  
  document.querySelector(".cart-footer-price").innerHTML = `<strong>SUBTOTAL: R$ ${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(cartTotalPrice)}</strong>`;
}

function renderCart() {
  const currentCartStorage = getLocalStorage("auau-cart");

  if (!currentCartStorage) return;

  const cartProductsHtml = currentCartStorage.map(item => {
    return `
    <div class="product-cart-container">
      <img src=${item.imageUrl} alt=${item.name}>
      <aside>
        <strong>${item.name}</strong>
        <p>Cor: ${item.cor}</p>
        <p>Tamanho: ${item.tamanho}</p>
        <strong>${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.promotionPrice)}</strong>
      </aside>
    </div>
    `
  })

  document.querySelector(".cart-main").innerHTML = cartProductsHtml.join('\n');
}

function addToCart(id) {
  const newProductFilter = productJson.favorite_products.filter(product => product.id === id);
  const newProduct = newProductFilter[0];

  const currentCartStorage = getLocalStorage("auau-cart");

  if (!currentCartStorage) {
    const newCart = [];
    newCart.push(newProduct);
    setLocalStorage("auau-cart", newCart);

    alert("Item adicionado ao carrinho!");

    getCartTotalPrice();

    getCartLength();

    return renderCart();
  }

  setLocalStorage("auau-cart", [...currentCartStorage, newProduct]);

  alert("Item adicionado ao carrinho!");

  getCartTotalPrice();

  getCartLength();

  renderCart();

  
}


/* Render favorite product list */

function renderFavoriteProducts() {
  const productsHtml = productJson.favorite_products.map(product => {
    return `
    <div class="product-container">
      <img class="product-image" src=${product.imageUrl} alt=${product.name}>
      <p>${product.name}</p>
      <img class="product-rate" src="./Assets/product/rate.png" alt="product-rate">
      <div class="product-price">
        <strong>${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.promotionPrice)}</strong>
        <span>${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.currentPrice)}</span>
      </div>
      <button class="custom-button ${product.status === "out-of-stock" ? "out-of-stock": ""}" type="button" onclick="addToCart(${product.id})">
        ${product.status === "out-of-stock" ? "ESGOTADO": "COMPRAR"}
      </button>
    </div>
  `
  })

  document.querySelector(".favorite-products-list").innerHTML = productsHtml.join('\n');
  document.querySelector(".favorite-products-list.second").innerHTML = productsHtml.join('\n');
  
}

function renderProdcuts() {
  const productsHtml = productJson.products.map(product => {
    return `
    <div class="product-container">
      <img class="product-image" src=${product.imageUrl} alt=${product.name}>
      <p>${product.name}</p>
      <img class="product-rate" src="./Assets/product/rate.png" alt="product-rate">
      <div class="product-price">
        <strong>${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.promotionPrice)}</strong>
        <span>${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.currentPrice)}</span>
      </div>
      <button class="custom-button ${product.status === "out-of-stock" ? "out-of-stock": ""}" type="button">
        ${product.status === "out-of-stock" ? "ESGOTADO": "COMPRAR"}
      </button>
    </div>
  `
  })

  document.querySelector(".product-list").innerHTML = productsHtml.join('\n');
  document.querySelector(".product-list.second").innerHTML = productsHtml.join('\n');
}

renderFavoriteProducts();

renderProdcuts();





/* close modal function */

function closeModal() {
  return document
    .querySelector(".newsletter-overlay")
    .classList.add("hidden");
}




/* Toggle responsive menu function */

function ToggleMenu() {
  const element = document
    .querySelector(".responsive-menu-container")
    .classList.contains("toggled");

  if (!element) {
    return document
      .querySelector(".responsive-menu-container")
      .classList.add("toggled");
  } else {
    return document
      .querySelector(".responsive-menu-container")
      .classList.remove("toggled");
  }
}



/* Save newsletter email function */

function SaveEmail() {
  const emailToSave = document.querySelector("#newsletter-email").value;
  const initialData = getLocalStorage("auau-newsletter");

  if (emailToSave === "") {
    document.querySelector(".newsletter-input").classList.add("invalid");
    document.querySelector(".invalid-email-message").innerHTML = "O campo e-mail não pode ser vazio";
    return
  }

  if (!initialData) {
    const newsletterEmailList = [];
    newsletterEmailList.push(emailToSave);
    setLocalStorage("auau-newsletter", newsletterEmailList);

    return  closeModal();
  }

  setLocalStorage("auau-newsletter", [...initialData, emailToSave]);

  closeModal();
}

getCartTotalPrice();

getCartLength();

renderCart();