 // Load order details from localStorage
        document.addEventListener('DOMContentLoaded', function() {
        const urlParams = new URLSearchParams(window.location.search);
        const orderId = urlParams.get('orderId') || 'ORD-' + Date.now();
        const total = urlParams.get('total') || '0';
        const payment = urlParams.get('payment') || 'Cash on Delivery';
        
        // Update order details
        document.getElementById('orderId').textContent = '#' + orderId;
        document.getElementById('orderDate').textContent = new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        document.getElementById('totalAmount').textContent = parseInt(total).toLocaleString() + ' ₫';
        document.getElementById('paymentMethod').textContent = payment;

        // Update cart badge
        updateCartBadge();
        });

        function updateCartBadge() {
        const cartBadge = document.getElementById('cartBadge');
        if (cartBadge) {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
            cartBadge.textContent = totalItems;
        }
        }

        // Load footer
        fetch('footer.html')
        .then(res => res.text())
        .then(html => document.getElementById('footerContainer').innerHTML = html);