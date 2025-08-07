// Default accounts data
function getDefaultAccounts() {
    return [
        {
            id: 1,
            email: "admin@gmail.com",
            password: "123123",
            role: "admin",
            firstName: "Pham",
            lastName: "Hoang",
            createdAt: "2025-01-01",
            status: "Active"
        },
        {
            id: 2,
            email: "customer@gmail.com",
            password: "123123",
            role: "customer",
            firstName: "Marson",
            lastName: "Pham",
            createdAt: "2025-01-01",
            status: "Active"
        },
        {
            id: 3,
            email: "linhnhi@gmail.com",
            password: "123456",
            role: "customer",
            firstName: "Linh",
            lastName: "Nhi",
            createdAt: "2025-01-15",
            status: "Active"
        },
        {
            id: 4,
            email: "duchp@gmail.com",
            password: "password123",
            role: "customer",
            firstName: "Duc",
            lastName: "Hp",
            createdAt: "2025-02-01",
            status: "Active"
        },
        {
            id: 5,
            email: "kieulinh@gmail.com",
            password: "kieulinh123",
            role: "customer",
            firstName: "Kieu",
            lastName: "Linh",
            createdAt: "2025-02-10",
            status: "Active"
        }
    ];
}

document.addEventListener('DOMContentLoaded', () => {
    // FORCE RESET TO DEFAULT DATA (uncomment next 2 lines to reset)
    // localStorage.removeItem('accounts');
    // console.log('Force reset to default data');
    
    // Load data from localStorage, if not exists then use default data
    let accounts = JSON.parse(localStorage.getItem('accounts'));
    
    console.log('Data from localStorage:', accounts);
    
    // If no data in localStorage, initialize with default data
    if (!accounts || accounts.length === 0) {
        console.log('No data in localStorage, using default data');
        accounts = getDefaultAccounts();
        localStorage.setItem('accounts', JSON.stringify(accounts));
    } else {
        console.log('Using existing data from localStorage');
    }

    console.log('Final accounts array:', accounts); // Debug log

    // Load admin information
    loadAdminInfo();

    // Save accounts to localStorage
    function saveAccounts() {
        localStorage.setItem('accounts', JSON.stringify(accounts));
    }

    // Render accounts table
    function renderAccounts() {
        console.log('renderAccounts called');
        const tbody = document.querySelector('.custom-table tbody');
        console.log('Table tbody found:', tbody);
        console.log('Accounts to render:', accounts);
        
        if (!tbody) {
            console.error('Table tbody not found!');
            return;
        }

        tbody.innerHTML = accounts.map(account => `
            <tr class="hover:bg-gray-50 transition-colors">
                <td>
                    <span class="font-mono text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">#${account.id}</span>
                </td>
                <td class="font-semibold text-gray-800">
                    ${account.firstName} ${account.lastName}
                </td>
                <td class="text-gray-600">
                    ${account.email}
                </td>
                <td>
                    <span class="px-2 py-1 rounded-full text-xs font-medium ${account.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'}">
                        ${account.role.charAt(0).toUpperCase() + account.role.slice(1)}
                    </span>
                </td>
                <td class="text-gray-600">
                    ${new Date(account.createdAt).toLocaleDateString('vi-VN')}
                </td>
                <td>
                    <span class="status-badge ${account.status === 'Active' ? 'status-active' : 'status-inactive'}">
                        ${account.status}
                    </span>
                </td>
                <td class="flex gap-2">
                    <button class="custom-btn-outline p-2 hover:bg-blue-50" onclick="editAccount(${account.id})">
                        <i class="fas fa-edit text-lg"></i>
                    </button>
                    <button class="custom-btn-danger p-2 hover:bg-red-50" onclick="deleteAccount(${account.id})">
                        <span class="material-symbols-outlined text-lg">delete</span>
                    </button>
                    <button class="custom-btn-outline p-2 hover:bg-green-50" onclick="toggleAccountStatus(${account.id})">
                        <span class="material-symbols-outlined text-lg">${account.status === 'Active' ? 'block' : 'check_circle'}</span>
                    </button>
                </td>
            </tr>
        `).join('');
        
        console.log('Table rendered with', accounts.length, 'accounts');
        console.log('Table HTML:', tbody.innerHTML.substring(0, 200) + '...');
    }

    // Create Account Function
    window.createAccount = function(accountData) {
        const newId = Math.max(...accounts.map(a => a.id)) + 1;
        const newAccount = {
            id: newId,
            ...accountData,
            createdAt: new Date().toISOString().split('T')[0],
            status: 'Active'
        };
        accounts.push(newAccount);
        
        // Save to localStorage
        saveAccounts();
        
        renderAccounts();
        updateCharts();
        showToast('Account created successfully!', 'success');
    }

    // Edit account
    window.editAccount = function(id) {
        const account = accounts.find(acc => acc.id === parseInt(id));
        if (!account) return;

        const modal = document.getElementById('accountModal');
        const form = document.getElementById('accountForm');
        const modalTitle = modal.querySelector('.modal-title');
        const editNotice = document.getElementById('editNotice');
        
        modalTitle.textContent = 'Edit Account';
        
        // Show security notice
        editNotice.style.display = 'block';
        
        // Hide email and password fields completely for editing
        const emailField = document.getElementById('email').parentElement;
        const passwordField = document.getElementById('password').parentElement;
        const confirmPasswordField = document.getElementById('confirmPassword');
        
        emailField.style.display = 'none';
        passwordField.style.display = 'none';
        
        // Hide confirm password field for editing
        if (confirmPasswordField && confirmPasswordField.parentElement) {
            confirmPasswordField.parentElement.style.display = 'none';
        }
        
        // Remove required attribute from hidden fields
        document.getElementById('email').removeAttribute('required');
        document.getElementById('password').removeAttribute('required');
        if (confirmPasswordField) {
            confirmPasswordField.removeAttribute('required');
        }
        
        // Remove any existing read-only email info
        const existingEmailInfo = document.getElementById('emailInfo');
        if (existingEmailInfo) {
            existingEmailInfo.remove();
        }
        
        // Add read-only email display
        const emailInfo = document.createElement('div');
        emailInfo.className = 'mb-3';
        emailInfo.id = 'emailInfo';
        emailInfo.innerHTML = `
            <label class="form-label">Email (Read-only)</label>
            <input type="text" class="form-control" value="${account.email}" readonly 
                   style="background-color: #f8f9fa; cursor: not-allowed; color: #6c757d;">
            <small class="text-muted">Email cannot be changed for security reasons</small>
        `;
        
        // Insert before role field
        const roleField = document.getElementById('role').parentElement;
        form.insertBefore(emailInfo, roleField);
        
        // Fill only editable fields
        document.getElementById('role').value = account.role;
        document.getElementById('firstName').value = account.firstName;
        document.getElementById('lastName').value = account.lastName;
        document.getElementById('status').value = account.status;
        
        // Update submit button text
        const submitBtn = document.querySelector('button[type="submit"][form="accountForm"]');
        submitBtn.textContent = 'Update Account';
        
        // Update form submission for edit
        form.onsubmit = function(e) {
            e.preventDefault();
            
            console.log('Form submitted for edit');
            
            const formData = new FormData(form);
            
            // Update only editable fields (NO email, NO password)
            const oldName = account.firstName + ' ' + account.lastName;
            
            account.role = formData.get('role');
            account.firstName = formData.get('firstName');
            account.lastName = formData.get('lastName');
            account.status = formData.get('status');
            
            console.log('Updated account:', account);
            
            // Save to localStorage
            saveAccounts();
            
            // Re-render accounts to show updated info
            renderAccounts();
            
            // Close modal
            bootstrap.Modal.getInstance(modal).hide();
            
            // Show success message for 0.5s
            console.log('Showing toast...');
            showToast(`Account "${account.firstName} ${account.lastName}" updated successfully!`, 'success', 500);
            
            // Update charts
            updateCharts();
        };
        
        // Show modal
        new bootstrap.Modal(modal).show();
    }

    // Delete account
    window.deleteAccount = function(accountId) {
        const account = accounts.find(a => a.id === accountId);
        if (!account) return;

        if (confirm(`Are you sure you want to delete "${account.firstName} ${account.lastName}"?`)) {
            accounts = accounts.filter(a => a.id !== accountId);
            
            // Save to localStorage
            saveAccounts();
            
            renderAccounts();
            updateCharts();
            showToast('Account deleted successfully!', 'success');
        }
    }

    // Toggle account status
    window.toggleAccountStatus = function(accountId) {
        const account = accounts.find(a => a.id === accountId);
        if (!account) return;

        account.status = account.status === 'Active' ? 'Inactive' : 'Active';
        
        // Save to localStorage
        saveAccounts();
        
        renderAccounts();
        updateCharts();
        showToast(`Account ${account.status.toLowerCase()} successfully!`, 'success');
    }

    // Create Account Modal
    function createAccountModal(account = null) {
        const isEdit = account !== null;
        const modalId = 'accountModal';
        
        const modal = document.createElement('div');
        modal.className = 'modal fade';
        modal.id = modalId;
        modal.innerHTML = `
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">${isEdit ? 'Edit Account' : 'Add New Account'}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <form id="accountForm">
                            <div class="row">
                                <div class="col-md-6 mb-3">
                                    <label for="firstName" class="form-label">First Name</label>
                                    <input type="text" class="form-control" id="firstName" name="firstName" value="${isEdit ? account.firstName : ''}" required>
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label for="lastName" class="form-label">Last Name</label>
                                    <input type="text" class="form-control" id="lastName" name="lastName" value="${isEdit ? account.lastName : ''}" required>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label for="email" class="form-label">Email</label>
                                <input type="email" class="form-control" id="email" name="email" value="${isEdit ? account.email : ''}" required>
                            </div>
                            <div class="row">
                                <div class="col-md-6 mb-3">
                                    <label for="password" class="form-label">${isEdit ? 'New Password (leave blank to keep current)' : 'Password'}</label>
                                    <input type="password" class="form-control" id="password" name="password" ${!isEdit ? 'required' : ''}>
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label for="role" class="form-label">Role</label>
                                    <select class="form-select" id="role" name="role" required>
                                        <option value="">Select Role</option>
                                        <option value="customer" ${isEdit && account.role === 'customer' ? 'selected' : ''}>Customer</option>
                                        <option value="admin" ${isEdit && account.role === 'admin' ? 'selected' : ''}>Admin</option>
                                    </select>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="submit" form="accountForm" class="btn btn-primary">${isEdit ? 'Update Account' : 'Create Account'}</button>
                    </div>
                </div>
            </div>
        `;
        
        return modal;
    }

    // Open Add Account Modal
    window.openAddAccountModal = function() {
        console.log('openAddAccountModal called');
        
        const modal = document.getElementById('accountModal');
        console.log('Modal found:', modal);
        
        if (!modal) {
            console.error('Modal not found!');
            return;
        }
        
        const form = document.getElementById('accountForm');
        const modalTitle = modal.querySelector('.modal-title');
        const editNotice = document.getElementById('editNotice');
        
        console.log('Form:', form, 'Title:', modalTitle, 'Notice:', editNotice);
        
        modalTitle.textContent = 'Add New Account';
        
        // Hide security notice for new account
        if (editNotice) {
            editNotice.style.display = 'none';
        }
        
        // Show ALL fields for creating new account
        const emailField = document.getElementById('email');
        const passwordField = document.getElementById('password');
        const confirmPasswordField = document.getElementById('confirmPassword');
        
        if (emailField && emailField.parentElement) {
            emailField.parentElement.style.display = 'block';
        }
        if (passwordField && passwordField.parentElement) {
            passwordField.parentElement.style.display = 'block';
        }
        if (confirmPasswordField && confirmPasswordField.parentElement) {
            confirmPasswordField.parentElement.style.display = 'block';
        }
        
        // Add back required attribute for new account creation
        if (emailField) emailField.setAttribute('required', 'required');
        if (passwordField) passwordField.setAttribute('required', 'required');
        if (confirmPasswordField) confirmPasswordField.setAttribute('required', 'required');
        
        // Remove any read-only email info from previous edit
        const existingEmailInfo = document.getElementById('emailInfo');
        if (existingEmailInfo) {
            existingEmailInfo.remove();
        }
        
        // Clear form
        form.reset();
        
        // Set defaults
        const statusField = document.getElementById('status');
        if (statusField) {
            statusField.value = 'Active';
        }
        
        // Update submit button text
        const submitBtn = document.querySelector('button[type="submit"][form="accountForm"]');
        if (submitBtn) {
            submitBtn.textContent = 'Save Account';
        }
        
        // Set form submission for create
        form.onsubmit = function(e) {
            e.preventDefault();
            
            const formData = new FormData(form);
            
            // Validate email is unique
            const email = formData.get('email');
            const existingAccount = accounts.find(acc => acc.email === email);
            if (existingAccount) {
                showToast('Email already exists! Please use a different email.', 'error');
                return;
            }
            
            // Validate password
            const password = formData.get('password');
            const confirmPassword = formData.get('confirmPassword');
            
            if (password.length < 6) {
                showToast('Password must be at least 6 characters long.', 'error');
                return;
            }
            
            // Validate passwords match
            if (password !== confirmPassword) {
                showToast('Passwords do not match! Please check and try again.', 'error');
                return;
            }
            
            // Generate new ID
            const newId = Math.max(...accounts.map(acc => acc.id)) + 1;
            
            const newAccount = {
                id: newId,
                email: email,
                password: password,
                role: formData.get('role'),
                firstName: formData.get('firstName'),
                lastName: formData.get('lastName'),
                createdAt: new Date().toISOString().split('T')[0],
                status: formData.get('status')
            };
            
            // Add to accounts array
            accounts.push(newAccount);
            
            // Save to localStorage
            saveAccounts();
            
            // Re-render accounts
            renderAccounts();
            
            // Close modal
            bootstrap.Modal.getInstance(modal).hide();
            
            // Show success message
            showToast(`New account created for ${newAccount.firstName} ${newAccount.lastName}!`, 'success');
            
            // Update charts
            updateCharts();
        };
        
        // Show modal
        console.log('Showing modal...');
        const bootstrapModal = new bootstrap.Modal(modal);
        bootstrapModal.show();
        console.log('Modal should be visible now');
    };

    // Search functionality
    document.getElementById('searchInput')?.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        const filteredAccounts = accounts.filter(account => 
            account.firstName.toLowerCase().includes(searchTerm) ||
            account.lastName.toLowerCase().includes(searchTerm) ||
            account.email.toLowerCase().includes(searchTerm) ||
            account.role.toLowerCase().includes(searchTerm)
        );
        renderFilteredAccounts(filteredAccounts);
    });

    // Render filtered accounts
    function renderFilteredAccounts(filteredAccounts) {
        const tbody = document.querySelector('.custom-table tbody');
        if (!tbody) return;

        tbody.innerHTML = filteredAccounts.map(account => `
            <tr class="hover:bg-gray-50 transition-colors">
                <td>
                    <span class="font-mono text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">#${account.id}</span>
                </td>
                <td class="font-semibold text-gray-800">
                    ${account.firstName} ${account.lastName}
                </td>
                <td class="text-gray-600">
                    ${account.email}
                </td>
                <td>
                    <span class="px-2 py-1 rounded-full text-xs font-medium ${account.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'}">
                        ${account.role.charAt(0).toUpperCase() + account.role.slice(1)}
                    </span>
                </td>
                <td class="text-gray-600">
                    ${new Date(account.createdAt).toLocaleDateString('vi-VN')}
                </td>
                <td>
                    <span class="status-badge ${account.status === 'Active' ? 'status-active' : 'status-inactive'}">
                        ${account.status}
                    </span>
                </td>
                <td class="flex gap-2">
                    <button class="custom-btn-outline p-2 hover:bg-blue-50" onclick="editAccount(${account.id})">
                        <i class="fas fa-edit text-lg"></i>
                    </button>
                    <button class="custom-btn-danger p-2 hover:bg-red-50" onclick="deleteAccount(${account.id})">
                        <span class="material-symbols-outlined text-lg">delete</span>
                    </button>
                    <button class="custom-btn-outline p-2 hover:bg-green-50" onclick="toggleAccountStatus(${account.id})">
                        <span class="material-symbols-outlined text-lg">${account.status === 'Active' ? 'block' : 'check_circle'}</span>
                    </button>
                </td>
            </tr>
        `).join('');
    }

    // Toast notification function
    function showToast(message, type = 'success', duration = 800) {
        console.log('showToast called with:', message, type, duration);
        
        const toastContainer = document.getElementById('toastContainer');
        console.log('Toast container found:', toastContainer);
        
        if (!toastContainer) {
            console.error('Toast container not found!');
            return;
        }
        
        const toastId = 'toast-' + Date.now();
        
        const toast = document.createElement('div');
        toast.id = toastId;
        toast.className = `toast align-items-center text-white bg-${type === 'success' ? 'success' : 'danger'} border-0`;
        toast.setAttribute('role', 'alert');
        toast.innerHTML = `
            <div class="d-flex">
                <div class="toast-body">${message}</div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
            </div>
        `;
        
        toastContainer.appendChild(toast);
        console.log('Toast element created and added to container');
        
        const bootstrapToast = new bootstrap.Toast(toast);
        bootstrapToast.show();
        console.log('Bootstrap toast shown');
        
        // Auto hide after specified duration
        setTimeout(() => {
            bootstrapToast.hide();
            console.log('Toast hidden after', duration, 'ms');
        }, duration);
        
        // Remove from DOM after hidden
        toast.addEventListener('hidden.bs.toast', () => {
            toast.remove();
            console.log('Toast removed from DOM');
        });
    }

    // Update charts
    function updateCharts() {
        updateUserRegistrationChart();
        updateRoleDistributionChart();
        updateAccountStatusChart();
        updateActiveUsersChart();
    }

    // Chart functions
    function updateUserRegistrationChart() {
        const ctx = document.getElementById('userRegistrationChart')?.getContext('2d');
        if (!ctx) return;

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'New Registrations',
                    data: [12, 19, 8, 5, 2, 3],
                    borderColor: 'rgb(59, 130, 246)',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    tension: 0.1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }

    function updateRoleDistributionChart() {
        const ctx = document.getElementById('roleDistributionChart')?.getContext('2d');
        if (!ctx) return;

        const roleCounts = accounts.reduce((acc, account) => {
            acc[account.role] = (acc[account.role] || 0) + 1;
            return acc;
        }, {});

        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: Object.keys(roleCounts),
                datasets: [{
                    data: Object.values(roleCounts),
                    backgroundColor: ['#10B981', '#8B5CF6', '#F59E0B']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }

    function updateAccountStatusChart() {
        const ctx = document.getElementById('accountStatusChart')?.getContext('2d');
        if (!ctx) return;

        const statusCounts = accounts.reduce((acc, account) => {
            acc[account.status] = (acc[account.status] || 0) + 1;
            return acc;
        }, {});

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: Object.keys(statusCounts),
                datasets: [{
                    label: 'Account Count',
                    data: Object.values(statusCounts),
                    backgroundColor: ['#10B981', '#EF4444']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }

    function updateActiveUsersChart() {
        const ctx = document.getElementById('activeUsersChart')?.getContext('2d');
        if (!ctx) return;

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'Active Users',
                    data: [65, 59, 80, 81, 56, 55],
                    backgroundColor: 'rgba(59, 130, 246, 0.8)'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }

    // Reset data to default
    window.resetAccountData = function() {
        if (confirm('Are you sure you want to reset all data to default? This action cannot be undone.')) {
            localStorage.removeItem('accounts');
            location.reload();
        }
    }

    // Test toast function
    window.testToast = function() {
        showToast('This is a test toast message!', 'success', 2000);
    }

    // Load admin information from users.json
    async function loadAdminInfo() {
        try {
            const response = await fetch('../data/users.json');
            const users = await response.json();
            
            // Find admin user
            const admin = users.find(user => user.role === 'admin');
            
            if (admin) {
                const adminNameElement = document.getElementById('adminName');
                if (adminNameElement) {
                    adminNameElement.textContent = `${admin.firstName} ${admin.lastName}`;
                }
            }
        } catch (error) {
            console.error('Error loading admin info:', error);
            // Keep default "Admin" text if error occurs
        }
    }

    // Initialize the page
    renderAccounts();
    updateCharts();

});
