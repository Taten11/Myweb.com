const ADMIN_PASSWORD = 'admin123'; // Set the admin password here

let cart = [];
let totalPrice = 0;

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    alert(`Logged in as ${email}`);
});

document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    alert(`Signed up as ${name}`);
});

document.getElementById('adminPasswordForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const password = document.getElementById('adminPassword').value;
    if (password === ADMIN_PASSWORD) {
        document.getElementById('adminPasswordForm').style.display = 'none';
        document.getElementById('adminControls').style.display = 'block';
    } else {
        alert('Incorrect password');
    }
});

document.getElementById('addProductForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('productName').value;
    const price = parseFloat(document.getElementById('productPrice').value);
    const image = document.getElementById('productImage').value;
    addProduct(name, price, image);
});

document.getElementById('removeProductForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('removeProductName').value;
    removeProduct(name);
});

document.getElementById('adminLink').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('admin').style.display = 'block';
});

function addProduct(name, price, image) {
    const productList = document.getElementById('productList');
    const productDiv = document.createElement('div');
    productDiv.className = 'product';
    productDiv.innerHTML = `
        <img src="${image}" alt="${name}">
        <h3>${name}</h3>
        <p>$${price.toFixed(2)}</p>
        <button onclick="addToCart('${name}', ${price})">Add to Cart</button>
    `;
    productList.appendChild(productDiv);
}

function removeProduct(name) {
    const productList = document.getElementById('productList');
    const products = Array.from(productList.getElementsByClassName('product'));
    const productToRemove = products.find(product => product.querySelector('h3').textContent === name);
    if (productToRemove) {
        productList.removeChild(productToRemove);
    } else {
        alert('Product not found');
    }
}

function addToCart(productName, price) {
    cart.push({ name: productName, price: price });
    totalPrice += price;
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    const cartCount = document.getElementById('cart-count');

    cartItems.innerHTML = '';
    cart.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.name} - $${item.price.toFixed(2)}`;
        cartItems.appendChild(listItem);
    });

    totalPriceElement.textContent = totalPrice.toFixed(2);
    cartCount.textContent = cart.length;
}
