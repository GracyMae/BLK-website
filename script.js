// Utility to get cart from localStorage
function getCart() {
  return JSON.parse(localStorage.getItem('cart')) || [];
}

// Save cart to localStorage
function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Product page logic
if (document.querySelector('.add-to-cart')) {
  document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
      const productEl = button.parentElement;
      const id = productEl.dataset.id;
      const name = productEl.dataset.name;
      const price = parseFloat(productEl.dataset.price);
      const quantity = parseInt(productEl.querySelector('.quantity').value);

      let cart = getCart();
      const existing = cart.find(item => item.id === id);
      if (existing) {
        existing.quantity += quantity;
      } else {
        cart.push({ id, name, price, quantity });
      }

      saveCart(cart);
      alert(`${name} added to cart!`);
    });
  });
}

// Cart page logic
if (document.getElementById('cart-items')) {
  const cart = getCart();
  const cartItemsContainer = document.getElementById('cart-items');
  const totalAmountEl = document.getElementById('total-amount');

  function renderCart() {
    cartItemsContainer.innerHTML = '';
    let total = 0;
    cart.forEach((item, index) => {
      const itemTotal = item.price * item.quantity;
      total += itemTotal;

      const div = document.createElement('div');
      div.innerHTML = `
        <strong>${item.name}</strong> - ₱${item.price} x 
        <input type="number" min="1" value="${item.quantity}" data-index="${index}" class="update-qty">
        = ₱${itemTotal.toFixed(2)}
        <button data-index="${index}" class="delete-item">Delete</button>
      `;
      cartItemsContainer.appendChild(div);
    });
    totalAmountEl.textContent = `Total: ₱${total.toFixed(2)}`;
    saveCart(cart);
  }

  // Event delegation for updating quantity or deleting item
  cartItemsContainer.addEventListener('input', e => {
    if (e.target.classList.contains('update-qty')) {
      const index = e.target.dataset.index;
      cart[index].quantity = parseInt(e.target.value);
      renderCart();
    }
  });

  cartItemsContainer.addEventListener('click', e => {
    if (e.target.classList.contains('delete-item')) {
      const index = e.target.dataset.index;
      cart.splice(index, 1);
      renderCart();
    }
  });

  renderCart();
}

// Checkout function
function checkout() {
  if (confirm("Proceed to checkout?")) {
    localStorage.removeItem('cart');
    alert("Thank you for your purchase!");
    window.location.href = "index.html";
  }
}
