// Authentication and Authorization Functions
class AuthService {
    constructor() {
        this.users = [];
        this.currentUser = null;
        this.loadUsers();
    }

  // Load users from JSON file
    async loadUsers() {
        try {
        const response = await fetch('./data/users.json');
        this.users = await response.json();
        } catch (error) {
        console.error('Error loading users:', error);
        // Fallback users if file loading fails
        this.users = [
            {
            id: 1,
            email: "admin@gmail.com",
            password: "123123",
            role: "admin",
            firstName: "Pham",
            lastName: "Hoang",
            createdAt: "2025-01-01"
            },
            {
            id: 2,
            email: "customer@gmail.com",
            password: "123123",
            role: "customer",
            firstName: "Marson",
            lastName: "Pham",
            createdAt: "2025-01-01"
            }
        ];
        }
    }

    // Login function
    login(email, password) {
        const user = this.users.find(u => u.email === email && u.password === password);
        
        if (user) {
        // Store user in localStorage
        const userSession = {
            id: user.id,
            email: user.email,
            role: user.role,
            firstName: user.firstName,
            lastName: user.lastName,
            loginTime: new Date().toISOString()
        };
        
        localStorage.setItem('currentUser', JSON.stringify(userSession));
        this.currentUser = userSession;
        
        return {
            success: true,
            user: userSession,
            message: 'Login successful'
        };
        } else {
        return {
            success: false,
            message: 'Invalid email or password'
        };
        }
    }

    // Register function
    register(userData) {
    // Check if email already exists
        const existingUser = this.users.find(u => u.email === userData.email);
        
        if (existingUser) {
        return {
            success: false,
            message: 'Email already exists'
        };
        }

        // Create new user
        const newUser = {
        id: this.users.length + 1,
        email: userData.email,
        password: userData.password,
        role: 'customer', // Default role is customer
        firstName: userData.firstName,
        lastName: userData.lastName,
        createdAt: new Date().toISOString()
        };

        this.users.push(newUser);
        
        // In a real application, you would save this to the server
        // For demo purposes, we'll just store it in memory
        
        return {
        success: true,
        message: 'Registration successful',
        user: newUser
        };
    }

    // Get current user from localStorage
    getCurrentUser() {
        const userJson = localStorage.getItem('currentUser');
        if (userJson) {
        this.currentUser = JSON.parse(userJson);
        return this.currentUser;
        }
        return null;
    }

    // Check if user is logged in
    isLoggedIn() {
        return this.getCurrentUser() !== null;
    }

    // Check if user is admin
    isAdmin() {
        const user = this.getCurrentUser();
        return user && user.role === 'admin';
    }

    // Check if user is customer
    isCustomer() {
        const user = this.getCurrentUser();
        return user && user.role === 'customer';
    }

    // Logout function
    logout() {
        localStorage.removeItem('currentUser');
        this.currentUser = null;
        
        // Check if we're in admin folder and redirect accordingly
        const currentPath = window.location.pathname;
        if (currentPath.includes('/admin/')) {
            window.location.href = '../login.html';
        } else {
            window.location.href = 'login.html';
        }
    }

    // Redirect based on user role
    redirectAfterLogin() {
        const user = this.getCurrentUser();
        
        if (!user) {
        window.location.href = 'login.html';
        return;
        }

        if (user.role === 'admin') {
        window.location.href = 'admin/dashboard.html';
        } else if (user.role === 'customer') {
        window.location.href = 'homepages.html';
        }
    }

    // Protect admin pages
    requireAdmin() {
        if (!this.isLoggedIn()) {
        alert('Please login to access this page');
        window.location.href = '../login.html';
        return false;
        }

        if (!this.isAdmin()) {
        alert('Access denied. Admin privileges required.');
        window.location.href = 'homepages.html';
        return false;
        }

        return true;
    }

    // Protect customer pages (optional)
    requireAuth() {
        if (!this.isLoggedIn()) {
        alert('Please login to access this page');
        window.location.href = 'login.html';
        return false;
        }
        return true;
    }
    }

    // Create global auth service instance
    const authService = new AuthService();

    // Export for use in other files
    if (typeof module !== 'undefined' && module.exports) {
    module.exports = AuthService;
    }
