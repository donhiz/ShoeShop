// Sample cart items array
const cartItems = [
    { id: 1, name: "Red Printed T-Shirt", price: 50.00, quantity: 1, image: "images/buy-1.jpg" },
    { id: 2, name: "Blue Printed T-Shirt", price: 60.00, quantity: 1, image: "images/buy-2.jpg" },
    { id: 3, name: "Green Printed T-Shirt", price: 55.00, quantity: 1, image: "images/buy-3.jpg" }
];

// Sample wishlist items array
const wishlistItems = [
    { id: 4, name: "Black Hoodie", price: 80.00, image: "images/buy-1.jpg" },
    { id: 5, name: "White Sneakers", price: 90.00, image: "images/buy-3.jpg" }
];

const cartTable = document.getElementById('cartTable');
const wishlistContainer = document.getElementById('wishlist');

function updateCart() {
    let subtotal = 0;
    // Clear the cart table first
    cartTable.innerHTML = `
        <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Subtotal</th>
        </tr>
    `;

    cartItems.forEach(item => {
        const row = cartTable.insertRow();
        row.innerHTML = `
            <td>
                <div class="cart-info">
                    <img src="${item.image}" alt="${item.name}">
                    <div>
                        <p>${item.name}</p>
                        <small>Price: $${item.price.toFixed(2)}</small><br>
                        <a href="#" class="remove-item">Remove</a>
                    </div>
                </div>
            </td>
            <td><input type="number" value="${item.quantity}" min="1" class="quantity-input"></td>
            <td>$${(item.price * item.quantity).toFixed(2)}</td>
        `;

        subtotal += item.price * item.quantity;

        // Add event listener for removing item
        row.querySelector('.remove-item').addEventListener('click', function (event) {
            event.preventDefault();
            cartItems.splice(cartItems.indexOf(item), 1); // Remove item from array
            updateCart(); // Recalculate cart totals
        });
    });

    document.getElementById('subtotal').innerText = `$${subtotal.toFixed(2)}`;
    const tax = subtotal * 0.15; // Example tax rate of 15%
    document.getElementById('tax').innerText = `$${tax.toFixed(2)}`;
    document.getElementById('total').innerText = `$${(subtotal + tax).toFixed(2)}`;
}

function updateWishlist() {
    wishlistContainer.innerHTML = ''; // Clear existing wishlist items
    wishlistItems.forEach(item => {
        const wishlistItem = document.createElement('div');
        wishlistItem.className = 'wishlist-item';
        wishlistItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div>
                <p>${item.name}</p>
                <small>Price: $${item.price.toFixed(2)}</small><br>
                <button class="add-to-cart-btn">Add to Cart</button>
            </div>
        `;
        wishlistContainer.appendChild(wishlistItem);

        // Add event listener for adding item to cart
        wishlistItem.querySelector('.add-to-cart-btn').addEventListener('click', function () {
            // Check if item already exists in cart
            const existingItem = cartItems.find(cartItem => cartItem.id === item.id);
            if (existingItem) {
                // Increase quantity if item already in cart
                existingItem.quantity++;
            } else {
                // Add new item to cart
                cartItems.push({ ...item, quantity: 1 });
            }
            updateCart(); // Update cart after adding item
        });
    });
}

// Update the cart and wishlist initially
updateCart();
updateWishlist();

// Event listener for "Check in" button
document.getElementById("checkIn-btn").addEventListener("click", function () {
    window.location.href = "form.html"; // Redirect to form page
});

// Add event listener for quantity change
document.querySelectorAll('.quantity-input').forEach(input => {
    input.addEventListener('change', function () {
        const quantity = parseInt(this.value);
        const row = this.closest('tr');
        const price = parseFloat(row.querySelector('small').innerText.replace('Price: $', ''));
        const subtotalCell = row.querySelector('td:nth-child(3)');
        subtotalCell.innerText = `$${(price * quantity).toFixed(2)}`;
        updateCart(); // Recalculate cart totals
    });
});
