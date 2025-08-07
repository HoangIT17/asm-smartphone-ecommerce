// Profile page functionality
class ProfileManager {
    constructor() {
        this.init();
    }

    init() {
        document.addEventListener('DOMContentLoaded', () => {
            this.loadUserProfile();
            this.loadUserStatistics();
            this.loadFooter();
        });
    }

    loadUserProfile() {
        const currentUser = authService.getCurrentUser();
        
        if (!currentUser) {
            alert('Please login to view your profile');
            window.location.href = 'login.html';
            return;
        }

        // Update profile information
        document.getElementById('profileFullName').textContent = `${currentUser.firstName} ${currentUser.lastName}`;
        document.getElementById('profileEmail').textContent = currentUser.email;
        document.getElementById('profileFirstName').textContent = currentUser.firstName;
        document.getElementById('profileLastName').textContent = currentUser.lastName;
        document.getElementById('profileEmailDetail').textContent = currentUser.email;
        document.getElementById('profileRoleDetail').textContent = currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1);
        document.getElementById('navUserName').textContent = `${currentUser.firstName} ${currentUser.lastName}`;
        
        // Update role badge
        const roleElement = document.getElementById('profileRole');
        roleElement.textContent = currentUser.role.toUpperCase();
        roleElement.className = `role-badge role-${currentUser.role}`;

        // Set Member Since to current date
        const currentDate = new Date();
        document.getElementById('profileCreatedAt').textContent = currentDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        // Format last login
        if (currentUser.loginTime) {
            const loginDate = new Date(currentUser.loginTime);
            document.getElementById('profileLastLogin').textContent = loginDate.toLocaleString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        } else {
            // Use current date if no login time
            document.getElementById('profileLastLogin').textContent = currentDate.toLocaleString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        }

        // Update cart badge if available
        const cartBadge = document.getElementById('cartBadge');
        if (cartBadge) {
            const cartCount = this.getCartItemCount();
            cartBadge.textContent = cartCount;
        }
    }

    loadUserStatistics() {
        const currentUser = authService.getCurrentUser();
        if (!currentUser) return;

        // Fixed statistics as requested
        const ordersCount = 17; // Fixed number as requested
        const cartCount = this.getCartItemCount() || Math.floor(Math.random() * 5) + 1; // Real cart or random 1-5
        const wishlistCount = Math.floor(Math.random() * 10) + 5; // Random 5-15

        // Animate the numbers with delay
        setTimeout(() => this.animateNumber('ordersCount', ordersCount), 300);
        setTimeout(() => this.animateNumber('cartCount', cartCount), 600);
        setTimeout(() => this.animateNumber('wishlistCount', wishlistCount), 900);
    }

    getCartItemCount() {
        try {
            const cart = JSON.parse(localStorage.getItem('cart') || '[]');
            return cart.length;
        } catch (e) {
            return 0;
        }
    }

    animateNumber(elementId, targetNumber) {
        const element = document.getElementById(elementId);
        if (!element) return;
        
        const startNumber = 0;
        const duration = 2000; // 2 seconds
        const steps = 60;
        let currentStep = 0;

        const timer = setInterval(() => {
            currentStep++;
            const progress = currentStep / steps;
            
            // Easing function for smooth animation
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const currentNumber = Math.floor(startNumber + (targetNumber - startNumber) * easeOut);
            
            element.textContent = currentNumber;
            
            if (currentStep >= steps) {
                element.textContent = targetNumber;
                clearInterval(timer);
            }
        }, duration / steps);
    }

    exitToHome() {
        window.location.href = 'index.html';
    }

    confirmLogout() {
        if (typeof Swal !== 'undefined') {
            Swal.fire({
                title: 'Confirm Logout',
                text: 'Are you sure you want to log out?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#dc3545',
                cancelButtonColor: '#6c757d',
                confirmButtonText: 'Yes, log out',
                cancelButtonText: 'Cancel'
            }).then((result) => {
                if (result.isConfirmed) {
                    authService.logout();
                    Swal.fire({
                        title: 'Logged Out',
                        text: 'You have been successfully logged out.',
                        icon: 'success',
                        timer: 1500,
                        showConfirmButton: false
                    }).then(() => {
                        window.location.href = 'login.html';
                    });
                }
            });
        } else {
            if (confirm('Are you sure you want to log out?')) {
                authService.logout();
                window.location.href = 'login.html';
            }
        }
    }

    logout() {
        this.confirmLogout();
    }

    loadFooter() {
        fetch('footer.html')
            .then(res => res.text())
            .then(html => document.getElementById('footerContainer').innerHTML = html)
            .catch(err => console.log('Footer not loaded'));
    }
}

// Initialize profile manager
const profileManager = new ProfileManager();

// Global functions for onclick events
function exitToHome() {
    profileManager.exitToHome();
}

function confirmLogout() {
    profileManager.confirmLogout();
}

function logout() {
    profileManager.logout();
}
