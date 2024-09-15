// catalogo.js
document.addEventListener('DOMContentLoaded', function() {
    const productContainer = document.getElementById('product-container');
    const cartQuantityElement = document.getElementById('cart-quantity');
    const cartAveragePriceElement = document.getElementById('cart-average-price');
    const cartSubtotalElement = document.getElementById('cart-subtotal');
    const cartIvaElement = document.getElementById('cart-iva');
    const cartTotalElement = document.getElementById('cart-total');
    const confirmPurchaseButton = document.getElementById('confirm-purchase');

    const products = [
        { id: 1, name: 'Nevera Nofrost Benitez', price: 1500000 },
        { id: 2, name: 'Televisor Samsung 50 pulg', price: 2000000 },
        { id: 3, name: 'Equipo de Sonido Wirpool', price: 450000 },
        { id: 4, name: 'Estufa 4 puestos Gas', price: 385000 },
        { id: 5, name: 'Estufa 2 Puestos Gas', price: 150000 },
        { id: 6, name: 'Computador Azus Escritorio', price: 2400000 },
        // Agregar más productos según sea necesario
    ];

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function renderProducts() {
        productContainer.innerHTML = '';
        products.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.className = 'product';
            productDiv.innerHTML = `
                <h3>${product.name}</h3>
                <p>Precio: $${product.price.toLocaleString()}</p>
                <button class="add" data-id="${product.id}">Agregar</button>
                <button class="remove" data-id="${product.id}">Quitar</button>
            `;
            productContainer.appendChild(productDiv);
        });
        attachEventListeners();
    }

    function attachEventListeners() {
        document.querySelectorAll('.product .add').forEach(button => {
            button.addEventListener('click', function() {
                const productId = parseInt(this.getAttribute('data-id'));
                const product = products.find(p => p.id === productId);
                addToCart(product);
            });
        });

        document.querySelectorAll('.product .remove').forEach(button => {
            button.addEventListener('click', function() {
                const productId = parseInt(this.getAttribute('data-id'));
                const product = products.find(p => p.id === productId);
                removeFromCart(product);
            });
        });
    }

    function addToCart(product) {
        const existingProduct = cart.find(p => p.id === product.id);
        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartSummary();
    }

    function removeFromCart(product) {
        const productIndex = cart.findIndex(p => p.id === product.id);
        if (productIndex !== -1) {
            if (cart[productIndex].quantity > 1) {
                cart[productIndex].quantity -= 1;
            } else {
                cart.splice(productIndex, 1);
            }
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartSummary();
        }
    }

    function updateCartSummary() {
        let quantity = 0;
        let subtotal = 0;

        cart.forEach(item => {
            quantity += item.quantity;
            subtotal += item.price * item.quantity;
        });

        const iva = subtotal * 0.19;
        const total = subtotal + iva;
        const averagePrice = quantity > 0 ? subtotal / quantity : 0;

        cartQuantityElement.textContent = `Cantidad de productos agregados: ${quantity}`;
        cartAveragePriceElement.textContent = `Precio promedio: $${averagePrice.toLocaleString()}`;
        cartSubtotalElement.textContent = `Subtotal: $${subtotal.toLocaleString()}`;
        cartIvaElement.textContent = `IVA 19%: $${iva.toLocaleString()}`;
        cartTotalElement.textContent = `Total a pagar: $${total.toLocaleString()}`;
    }

    confirmPurchaseButton.addEventListener('click', function() {
        window.location.href = '../carrito/carrito.html';
    });

    renderProducts();
    updateCartSummary();
});
