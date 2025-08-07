document.addEventListener('DOMContentLoaded', () => {

    // Load admin information
    loadAdminInfo();

    // Orders data storage - Load from localStorage or use default data
    let orders = JSON.parse(localStorage.getItem('orders')) || [
        {
            id: 'ORD001',
            customerId: 2,
            customerName: 'Marson Pham',
            customerEmail: 'customer@gmail.com',
            items: [
                { productId: 'CP001', productName: 'ASUS ROG Zephyrus G14', quantity: 1, price: 32990000 }
            ],
            totalAmount: 32990000,
            orderDate: '2025-01-15',
            status: 'Delivered',
            shippingAddress: '123 Nguyen Trai, District 1, Ho Chi Minh City'
        },
        {
            id: 'ORD002',
            customerId: 3,
            customerName: 'Duc Hp',
            customerEmail: 'duchp@gmail.com',
            items: [
                { productId: 'CP004', productName: 'Logitech G305', quantity: 2, price: 1590000 },
                { productId: 'CP005', productName: 'Logitech G915', quantity: 1, price: 5990000 }
            ],
            totalAmount: 9170000,
            orderDate: '2025-01-18',
            status: 'Shipped',
            shippingAddress: '456 Le Lai, District 3, Ho Chi Minh City'
        },
        {
            id: 'ORD003',
            customerId: 4,
            customerName: 'Kieu Linh',
            customerEmail: 'kieulinh@gmail.com',
            items: [
                { productId: 'CP002', productName: 'Apple MacBook Air M2', quantity: 1, price: 25990000 }
            ],
            totalAmount: 25990000,
            orderDate: '2025-02-01',
            status: 'Processing',
            shippingAddress: '789 Hai Ba Trung, District 1, Ho Chi Minh City'
        },
        {
            id: 'ORD004',
            customerId: 5,
            customerName: 'Linh Nhi',
            customerEmail: 'linhnhi@gmail.com',
            items: [
                { productId: 'CP006', productName: 'Logitech G733', quantity: 1, price: 2690000 },
                { productId: 'CP008', productName: 'Razer Viper Mini', quantity: 3, price: 690000 }
            ],
            totalAmount: 4760000,
            orderDate: '2025-02-05',
            status: 'Pending',
            shippingAddress: '321 Vo Van Tan, District 3, Ho Chi Minh City'
        },
        {
            id: 'ORD005',
            customerId: 2,
            customerName: 'Marson Pham',
            customerEmail: 'customer@gmail.com',
            items: [
                { productId: 'CP010', productName: 'Apple AirPods Max', quantity: 2, price: 2990000 }
            ],
            totalAmount: 5980000,
            orderDate: '2025-02-08',
            status: 'Cancelled',
            shippingAddress: '123 Nguyen Trai, District 1, Ho Chi Minh City'
        }
    ];

    // Save orders to localStorage
    function saveOrders() {
        localStorage.setItem('orders', JSON.stringify(orders));
    }

    // Get status badge class
    function getStatusBadgeClass(status) {
        switch(status) {
            case 'Pending': return 'bg-yellow-100 text-yellow-800';
            case 'Processing': return 'bg-blue-100 text-blue-800';
            case 'Shipped': return 'bg-purple-100 text-purple-800';
            case 'Delivered': return 'bg-green-100 text-green-800';
            case 'Cancelled': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    }

    // Render orders table
    function renderOrders() {
        const tbody = document.querySelector('.custom-table tbody');
        if (!tbody) return;

        tbody.innerHTML = orders.map(order => `
            <tr class="hover:bg-gray-50 transition-colors">
                <td>
                    <span class="font-mono text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">${order.id}</span>
                </td>
                <td>
                    <div>
                        <div class="font-semibold text-gray-800">${order.customerName}</div>
                        <div class="text-sm text-gray-500">${order.customerEmail}</div>
                    </div>
                </td>
                <td>
                    <div class="text-sm">
                        ${order.items.map(item => `
                            <div class="mb-1">
                                <span class="font-medium">${item.productName}</span>
                                <span class="text-gray-500">(x${item.quantity})</span>
                            </div>
                        `).join('')}
                    </div>
                </td>
                <td class="font-semibold text-green-600">
                    ${order.totalAmount.toLocaleString('vi-VN')} VND
                </td>
                <td class="text-gray-600">
                    ${new Date(order.orderDate).toLocaleDateString('vi-VN')}
                </td>
                <td>
                    <span class="px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(order.status)}">
                        ${order.status}
                    </span>
                </td>
                <td class="flex gap-2">
                    <button class="custom-btn-outline p-2 hover:bg-blue-50" onclick="viewOrderDetails('${order.id}')" title="View Details">
                        <span class="material-symbols-outlined text-lg">visibility</span>
                    </button>
                    <button class="custom-btn-outline p-2 hover:bg-green-50" onclick="updateOrderStatus('${order.id}')" title="Update Status">
                        <span class="material-symbols-outlined text-lg">edit</span>
                    </button>
                    <button class="custom-btn-danger p-2 hover:bg-red-50" onclick="deleteOrder('${order.id}')" title="Delete Order">
                        <span class="material-symbols-outlined text-lg">delete</span>
                    </button>
                </td>
            </tr>
        `).join('');
    }

    // View order details
    window.viewOrderDetails = function(orderId) {
        const order = orders.find(o => o.id === orderId);
        if (!order) return;

        const modal = createOrderDetailsModal(order);
        document.body.appendChild(modal);
        
        const bootstrapModal = new bootstrap.Modal(modal);
        bootstrapModal.show();

        // Clean up modal after hiding
        modal.addEventListener('hidden.bs.modal', () => {
            modal.remove();
        });
    }

    // Create Order Details Modal
    function createOrderDetailsModal(order) {
        const modal = document.createElement('div');
        modal.className = 'modal fade';
        modal.id = 'orderDetailsModal';
        modal.innerHTML = `
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Order Details - ${order.id}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row mb-3">
                            <div class="col-md-6">
                                <h6>Customer Information</h6>
                                <p class="mb-1"><strong>Name:</strong> ${order.customerName}</p>
                                <p class="mb-1"><strong>Email:</strong> ${order.customerEmail}</p>
                                <p class="mb-0"><strong>Address:</strong> ${order.shippingAddress}</p>
                            </div>
                            <div class="col-md-6">
                                <h6>Order Information</h6>
                                <p class="mb-1"><strong>Order ID:</strong> ${order.id}</p>
                                <p class="mb-1"><strong>Date:</strong> ${new Date(order.orderDate).toLocaleDateString('vi-VN')}</p>
                                <p class="mb-0"><strong>Status:</strong> 
                                    <span class="px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(order.status)}">
                                        ${order.status}
                                    </span>
                                </p>
                            </div>
                        </div>
                        
                        <h6>Order Items</h6>
                        <div class="table-responsive">
                            <table class="table table-sm">
                                <thead>
                                    <tr>
                                        <th>Product</th>
                                        <th>Quantity</th>
                                        <th>Unit Price</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${order.items.map(item => `
                                        <tr>
                                            <td>${item.productName}</td>
                                            <td>${item.quantity}</td>
                                            <td>${item.price.toLocaleString('vi-VN')} VND</td>
                                            <td>${(item.price * item.quantity).toLocaleString('vi-VN')} VND</td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <th colspan="3">Total Amount:</th>
                                        <th>${order.totalAmount.toLocaleString('vi-VN')} VND</th>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        `;
        
        return modal;
    }

    // Update order status
    window.updateOrderStatus = function(orderId) {
        const order = orders.find(o => o.id === orderId);
        if (!order) return;

        const modal = createStatusUpdateModal(order);
        document.body.appendChild(modal);
        
        const bootstrapModal = new bootstrap.Modal(modal);
        bootstrapModal.show();

        // Handle form submission
        const form = modal.querySelector('#statusForm');
        form.onsubmit = function(e) {
            e.preventDefault();
            
            const formData = new FormData(form);
            const newStatus = formData.get('status');
            
            // Update order status
            const index = orders.findIndex(o => o.id === orderId);
            orders[index].status = newStatus;
            
            // Save to localStorage
            saveOrders();
            
            renderOrders();
            updateCharts();
            bootstrapModal.hide();
            showToast(`Order status updated to ${newStatus}!`, 'success');
        };

        // Clean up modal after hiding
        modal.addEventListener('hidden.bs.modal', () => {
            modal.remove();
        });
    }

    // Create Status Update Modal
    function createStatusUpdateModal(order) {
        const modal = document.createElement('div');
        modal.className = 'modal fade';
        modal.id = 'statusUpdateModal';
        modal.innerHTML = `
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Update Order Status - ${order.id}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <form id="statusForm">
                            <div class="mb-3">
                                <label for="status" class="form-label">Status</label>
                                <select class="form-select" id="status" name="status" required>
                                    <option value="Pending" ${order.status === 'Pending' ? 'selected' : ''}>Pending</option>
                                    <option value="Processing" ${order.status === 'Processing' ? 'selected' : ''}>Processing</option>
                                    <option value="Shipped" ${order.status === 'Shipped' ? 'selected' : ''}>Shipped</option>
                                    <option value="Delivered" ${order.status === 'Delivered' ? 'selected' : ''}>Delivered</option>
                                    <option value="Cancelled" ${order.status === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
                                </select>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="submit" form="statusForm" class="btn btn-primary">Update Status</button>
                    </div>
                </div>
            </div>
        `;
        
        return modal;
    }

    // Delete order
    window.deleteOrder = function(orderId) {
        const order = orders.find(o => o.id === orderId);
        if (!order) return;

        if (confirm(`Are you sure you want to delete order "${order.id}"?`)) {
            orders = orders.filter(o => o.id !== orderId);
            
            // Save to localStorage
            saveOrders();
            
            renderOrders();
            updateCharts();
            showToast('Order deleted successfully!', 'success');
        }
    }

    // Search functionality
    document.getElementById('searchInput')?.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        filterOrders();
    });

    // Status filter functionality
    document.getElementById('statusFilter')?.addEventListener('change', function(e) {
        filterOrders();
    });

    // Filter orders
    function filterOrders() {
        const searchTerm = document.getElementById('searchInput').value.toLowerCase();
        const statusFilter = document.getElementById('statusFilter').value;
        
        let filteredOrders = orders.filter(order => {
            const matchesSearch = order.id.toLowerCase().includes(searchTerm) ||
                                order.customerName.toLowerCase().includes(searchTerm) ||
                                order.customerEmail.toLowerCase().includes(searchTerm);
            
            const matchesStatus = !statusFilter || order.status === statusFilter;
            
            return matchesSearch && matchesStatus;
        });
        
        renderFilteredOrders(filteredOrders);
    }

    // Render filtered orders
    function renderFilteredOrders(filteredOrders) {
        const tbody = document.querySelector('.custom-table tbody');
        if (!tbody) return;

        tbody.innerHTML = filteredOrders.map(order => `
            <tr class="hover:bg-gray-50 transition-colors">
                <td>
                    <span class="font-mono text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">${order.id}</span>
                </td>
                <td>
                    <div>
                        <div class="font-semibold text-gray-800">${order.customerName}</div>
                        <div class="text-sm text-gray-500">${order.customerEmail}</div>
                    </div>
                </td>
                <td>
                    <div class="text-sm">
                        ${order.items.map(item => `
                            <div class="mb-1">
                                <span class="font-medium">${item.productName}</span>
                                <span class="text-gray-500">(x${item.quantity})</span>
                            </div>
                        `).join('')}
                    </div>
                </td>
                <td class="font-semibold text-green-600">
                    ${order.totalAmount.toLocaleString('vi-VN')} VND
                </td>
                <td class="text-gray-600">
                    ${new Date(order.orderDate).toLocaleDateString('vi-VN')}
                </td>
                <td>
                    <span class="px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(order.status)}">
                        ${order.status}
                    </span>
                </td>
                <td class="flex gap-2">
                    <button class="custom-btn-outline p-2 hover:bg-blue-50" onclick="viewOrderDetails('${order.id}')" title="View Details">
                        <span class="material-symbols-outlined text-lg">visibility</span>
                    </button>
                    <button class="custom-btn-outline p-2 hover:bg-green-50" onclick="updateOrderStatus('${order.id}')" title="Update Status">
                        <span class="material-symbols-outlined text-lg">edit</span>
                    </button>
                    <button class="custom-btn-danger p-2 hover:bg-red-50" onclick="deleteOrder('${order.id}')" title="Delete Order">
                        <span class="material-symbols-outlined text-lg">delete</span>
                    </button>
                </td>
            </tr>
        `).join('');
    }

    // Toast notification function
    function showToast(message, type = 'success') {
        const toastContainer = document.getElementById('toastContainer');
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
        
        const bootstrapToast = new bootstrap.Toast(toast);
        bootstrapToast.show();
        
        // Auto hide after 800ms
        setTimeout(() => {
            bootstrapToast.hide();
        }, 800);
        
        // Remove from DOM after hidden
        toast.addEventListener('hidden.bs.toast', () => {
            toast.remove();
        });
    }

    // Chart instances for management
    let chartInstances = {};

    // Update charts
    function updateCharts() {
        updateSalesTrendsChart();
        updateOrderStatusChart();
        updateRevenueChart();
        updateTopProductsChart();
    }

    // Chart functions
    function updateSalesTrendsChart() {
        const ctx = document.getElementById('salesTrendsChart')?.getContext('2d');
        if (!ctx) return;

        // Destroy existing chart if it exists
        if (chartInstances.salesTrends) {
            chartInstances.salesTrends.destroy();
        }

        chartInstances.salesTrends = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'Sales Count',
                    data: [12, 19, 8, 15, 22, 18],
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

    function updateOrderStatusChart() {
        const ctx = document.getElementById('orderStatusChart')?.getContext('2d');
        if (!ctx) return;

        // Destroy existing chart if it exists
        if (chartInstances.orderStatus) {
            chartInstances.orderStatus.destroy();
        }

        const statusCounts = orders.reduce((acc, order) => {
            acc[order.status] = (acc[order.status] || 0) + 1;
            return acc;
        }, {});

        chartInstances.orderStatus = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: Object.keys(statusCounts),
                datasets: [{
                    data: Object.values(statusCounts),
                    backgroundColor: ['#F59E0B', '#3B82F6', '#8B5CF6', '#10B981', '#EF4444']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }

    function updateRevenueChart() {
        const ctx = document.getElementById('revenueChart')?.getContext('2d');
        if (!ctx) return;

        // Destroy existing chart if it exists
        if (chartInstances.revenue) {
            chartInstances.revenue.destroy();
        }

        chartInstances.revenue = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'Revenue (VND)',
                    data: [65000000, 59000000, 80000000, 81000000, 56000000, 55000000],
                    backgroundColor: 'rgba(16, 185, 129, 0.8)'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        ticks: {
                            callback: function(value) {
                                return value.toLocaleString('vi-VN') + ' VND';
                            }
                        }
                    }
                }
            }
        });
    }

    function updateTopProductsChart() {
        const ctx = document.getElementById('topProductsChart')?.getContext('2d');
        if (!ctx) {
            console.error('Canvas element topProductsChart not found');
            return;
        }

        // Destroy existing chart if it exists
        if (chartInstances.topProducts) {
            chartInstances.topProducts.destroy();
        }

        // Calculate product sales from orders
        const productSales = {};
        orders.forEach(order => {
            order.items.forEach(item => {
                if (productSales[item.productName]) {
                    productSales[item.productName] += item.quantity;
                } else {
                    productSales[item.productName] = item.quantity;
                }
            });
        });

        const sortedProducts = Object.entries(productSales)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 5);

        console.log('Product sales data:', sortedProducts);

        if (sortedProducts.length === 0) {
            console.warn('No product sales data found');
            return;
        }

        try {
            chartInstances.topProducts = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: sortedProducts.map(([name]) => name),
                    datasets: [{
                        label: 'Units Sold',
                        data: sortedProducts.map(([,quantity]) => quantity),
                        backgroundColor: [
                            'rgba(139, 92, 246, 0.8)',
                            'rgba(59, 130, 246, 0.8)',
                            'rgba(16, 185, 129, 0.8)',
                            'rgba(245, 158, 11, 0.8)',
                            'rgba(239, 68, 68, 0.8)'
                        ]
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    indexAxis: 'y',
                    plugins: {
                        legend: {
                            display: false
                        },
                        title: {
                            display: true,
                            text: 'Top 5 Products by Sales Volume'
                        }
                    },
                    scales: {
                        x: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Units Sold'
                            }
                        }
                    }
                }
            });
            console.log('Top Products chart created successfully');
        } catch (error) {
            console.error('Error creating Top Products chart:', error);
        }
    }

    // Reset data to default
    window.resetOrderData = function() {
        if (confirm('Are you sure you want to reset all data to default? This action cannot be undone.')) {
            localStorage.removeItem('orders');
            location.reload();
        }
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
    renderOrders();
    
    // Delay chart initialization to ensure canvas elements are ready
    setTimeout(() => {
        updateCharts();
    }, 100);

});
