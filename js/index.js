// Function to redirect to login when trying to purchase
        function redirectToLogin() {
            showToast('Please login to add items to cart!', 'warning');
            
            // Redirect to login page after 2 seconds
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 2000);
        }
        
        // Toast notification function
        function showToast(message, type = 'info') {
            const toastContainer = document.getElementById('toastContainer');
            
            // Create toast element
            const toast = document.createElement('div');
            toast.className = `toast align-items-center text-dark bg-${type === 'success' ? 'success' : type === 'warning' ? 'warning' : 'primary'} border-0 shadow-lg`;
            toast.setAttribute('role', 'alert');
            toast.setAttribute('aria-live', 'assertive');
            toast.setAttribute('aria-atomic', 'true');
            toast.setAttribute('data-bs-autohide', 'false'); // Disable auto hide, we'll handle it manually
            
            // Add slide down animation
            toast.style.transform = 'translateY(-100%)';
            toast.style.transition = 'transform 0.3s ease-out, opacity 0.3s ease-out';
            toast.style.opacity = '0';
            
            toast.innerHTML = `
                <div class="d-flex">
                    <div class="toast-body fw-bold">
                        <i class="fas fa-exclamation-triangle me-2"></i>
                        ${message}
                    </div>
                    <button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
            `;
            
            toastContainer.appendChild(toast);
            
            // Initialize Bootstrap toast
            const bsToast = new bootstrap.Toast(toast);
            
            // Trigger slide down animation
            requestAnimationFrame(() => {
                toast.style.transform = 'translateY(0)';
                toast.style.opacity = '1';
            });
            
            // Show toast
            bsToast.show();
            
            // Auto hide after 2000ms (2 seconds) to match redirect timing
            setTimeout(() => {
                hideToast(toast, bsToast);
            }, 2000);
            
            // Handle manual close
            toast.addEventListener('hidden.bs.toast', () => {
                toast.remove();
            });
            
            // Handle close button click
            const closeBtn = toast.querySelector('.btn-close');
            closeBtn.addEventListener('click', () => {
                hideToast(toast, bsToast);
            });
        }
        
        // Function to hide toast with animation
        function hideToast(toastElement, bsToast) {
            toastElement.style.transform = 'translateY(-100%)';
            toastElement.style.opacity = '0';
            
            setTimeout(() => {
                bsToast.hide();
            }, 300);
        }
        
        // Handle logout for any logged in users who might access this page
        function logout() {
            if (confirm('Are you sure you want to logout?')) {
                authService.logout();
            }
        }