const products = [
  {
    name: "Apple",
    price: 5.99,
    quantity: 0,
    productId: 1,
    image: "./images/apple.jpg"
  },
  {
    name: "Banana",
    price: 4.99,
    quantity: 0,
    productId: 2,
    image: "./images/banana.JPG"
  },
  {
    name: "Pineapple",
    price: 6.99,
    quantity: 0,
    productId: 3,
    image: "./images/pineapple.JPG"
  }
];

const cart = [];

let totalPaid = 0;

function getProductById(productId) {
  return products.find(product => product.productId === productId);
}

function addProductToCart(productId) {
  const product = getProductById(productId);
  if (product) {
    product.quantity++;
    if (!cart.includes(product)) {
      cart.push(product);
    }
  }
}

function increaseQuantity(productId) {
  const product = products.find(p => p.productId === productId);
  if (product) {
    product.quantity++;
  }
}

function decreaseQuantity(productId) {
  const product = products.find(p => p.productId === productId);
  if (product && product.quantity > 0) {
    product.quantity--;
    if (product.quantity === 0) {
      removeProductFromCart(productId);
    }
  }
}

function removeProductFromCart(productId) {
  const productIndex = cart.findIndex(p => p.productId === productId);
  if (productIndex !== -1) {
    cart[productIndex].quantity = 0;
    cart.splice(productIndex, 1);
  }
}

function cartTotal() {
  return cart.reduce((total, product) => total + product.price * product.quantity, 0);
}

function emptyCart() {
  cart.length = 0;
  products.forEach(product => product.quantity = 0);
}

function pay(amount) {
  totalPaid += amount;
  let remaining = totalPaid - cartTotal();

  if (remaining >= 0) {
    totalPaid = 0;
    emptyCart();
  }

  return remaining;
}

module.exports = {
  products,
  cart,
  addProductToCart,
  increaseQuantity,
  decreaseQuantity,
  removeProductFromCart,
  cartTotal,
  pay,
  emptyCart,
};

