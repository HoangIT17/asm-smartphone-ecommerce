document.addEventListener('DOMContentLoaded', () => {

    // Load data from localStorage or use default data
    let orders = JSON.parse(localStorage.getItem('orders')) || getDefaultOrders();
    let products = JSON.parse(localStorage.getItem('products')) || getDefaultProducts();
    let accounts = JSON.parse(localStorage.getItem('accounts')) || getDefaultAccounts();

    // Force update with new default data (15 orders, 6 accounts)
    localStorage.setItem('orders', JSON.stringify(getDefaultOrders()));
    localStorage.setItem('products', JSON.stringify(getDefaultProducts()));
    localStorage.setItem('accounts', JSON.stringify(getDefaultAccounts()));

    // Reload data after update
    orders = JSON.parse(localStorage.getItem('orders'));
    products = JSON.parse(localStorage.getItem('products'));
    accounts = JSON.parse(localStorage.getItem('accounts'));

    function getDefaultOrders() {
        return [
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
                status: 'Delivered'
            },
            {
                id: 'ORD002',
                customerId: 3,
                customerName: 'John Doe',
                customerEmail: 'john.doe@gmail.com',
                items: [
                    { productId: 'CP004', productName: 'Logitech G305', quantity: 2, price: 1590000 },
                    { productId: 'CP005', productName: 'Logitech G915', quantity: 1, price: 5990000 }
                ],
                totalAmount: 9170000,
                orderDate: '2025-01-18',
                status: 'Shipped'
            },
            {
                id: 'ORD003',
                customerId: 4,
                customerName: 'Jane Smith',
                customerEmail: 'jane.smith@gmail.com',
                items: [
                    { productId: 'CP002', productName: 'Apple MacBook Air M2', quantity: 1, price: 25990000 }
                ],
                totalAmount: 25990000,
                orderDate: '2025-02-01',
                status: 'Processing'
            },
            {
                id: 'ORD004',
                customerId: 5,
                customerName: 'Mike Wilson',
                customerEmail: 'mike.wilson@gmail.com',
                items: [
                    { productId: 'CP006', productName: 'Logitech G733', quantity: 1, price: 2690000 },
                    { productId: 'CP008', productName: 'Razer Viper Mini', quantity: 3, price: 690000 }
                ],
                totalAmount: 4760000,
                orderDate: '2025-02-05',
                status: 'Pending'
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
                status: 'Cancelled'
            },
            // Thêm orders cho các tháng khác để chart đẹp hơn
            {
                id: 'ORD006',
                customerId: 3,
                customerName: 'John Doe',
                customerEmail: 'john.doe@gmail.com',
                items: [
                    { productId: 'CP003', productName: 'Dell XPS 13', quantity: 1, price: 29990000 }
                ],
                totalAmount: 29990000,
                orderDate: '2025-03-10',
                status: 'Delivered'
            },
            {
                id: 'ORD007',
                customerId: 4,
                customerName: 'Jane Smith',
                customerEmail: 'jane.smith@gmail.com',
                items: [
                    { productId: 'CP007', productName: 'HP Pavilion 15 i7', quantity: 1, price: 18490000 },
                    { productId: 'CP009', productName: 'Razer Huntsman', quantity: 1, price: 4990000 }
                ],
                totalAmount: 23480000,
                orderDate: '2025-03-15',
                status: 'Delivered'
            },
            {
                id: 'ORD008',
                customerId: 5,
                customerName: 'Mike Wilson',
                customerEmail: 'mike.wilson@gmail.com',
                items: [
                    { productId: 'CP004', productName: 'Logitech G305', quantity: 1, price: 1590000 },
                    { productId: 'CP005', productName: 'Logitech G915', quantity: 1, price: 5990000 }
                ],
                totalAmount: 7580000,
                orderDate: '2025-04-02',
                status: 'Shipped'
            },
            {
                id: 'ORD009',
                customerId: 6,
                customerName: 'Sarah Johnson',
                customerEmail: 'sarah.johnson@gmail.com',
                items: [
                    { productId: 'CP001', productName: 'ASUS ROG Zephyrus G14', quantity: 1, price: 32990000 }
                ],
                totalAmount: 32990000,
                orderDate: '2025-04-20',
                status: 'Processing'
            },
            {
                id: 'ORD010',
                customerId: 6,
                customerName: 'Sarah Johnson',
                customerEmail: 'sarah.johnson@gmail.com',
                items: [
                    { productId: 'CP002', productName: 'Apple MacBook Air M2', quantity: 1, price: 25990000 },
                    { productId: 'CP006', productName: 'Logitech G733', quantity: 1, price: 2690000 }
                ],
                totalAmount: 28680000,
                orderDate: '2025-05-05',
                status: 'Delivered'
            },
            {
                id: 'ORD011',
                customerId: 2,
                customerName: 'Marson Pham',
                customerEmail: 'customer@gmail.com',
                items: [
                    { productId: 'CP007', productName: 'HP Pavilion 15 i7', quantity: 1, price: 18490000 }
                ],
                totalAmount: 18490000,
                orderDate: '2025-05-12',
                status: 'Processing'
            },
            {
                id: 'ORD012',
                customerId: 3,
                customerName: 'John Doe',
                customerEmail: 'john.doe@gmail.com',
                items: [
                    { productId: 'CP008', productName: 'Razer Viper Mini', quantity: 4, price: 690000 },
                    { productId: 'CP009', productName: 'Razer Huntsman', quantity: 1, price: 4990000 }
                ],
                totalAmount: 7750000,
                orderDate: '2025-05-18',
                status: 'Shipped'
            },
            {
                id: 'ORD013',
                customerId: 4,
                customerName: 'Jane Smith',
                customerEmail: 'jane.smith@gmail.com',
                items: [
                    { productId: 'CP010', productName: 'Apple AirPods Max', quantity: 1, price: 2990000 }
                ],
                totalAmount: 2990000,
                orderDate: '2025-06-03',
                status: 'Delivered'
            },
            {
                id: 'ORD014',
                customerId: 5,
                customerName: 'Mike Wilson',
                customerEmail: 'mike.wilson@gmail.com',
                items: [
                    { productId: 'CP001', productName: 'ASUS ROG Zephyrus G14', quantity: 1, price: 32990000 },
                    { productId: 'CP004', productName: 'Logitech G305', quantity: 2, price: 1590000 }
                ],
                totalAmount: 36170000,
                orderDate: '2025-06-15',
                status: 'Processing'
            },
            {
                id: 'ORD015',
                customerId: 6,
                customerName: 'Sarah Johnson',
                customerEmail: 'sarah.johnson@gmail.com',
                items: [
                    { productId: 'CP003', productName: 'Dell XPS 13', quantity: 1, price: 29990000 },
                    { productId: 'CP005', productName: 'Logitech G915', quantity: 1, price: 5990000 }
                ],
                totalAmount: 35980000,
                orderDate: '2025-06-22',
                status: 'Shipped'
            }
        ];
    }

    function getDefaultProducts() {
        return [
            {
                id: 'CP001',
                name: 'ASUS ROG Zephyrus G14',
                category: 'Laptop',
                price: '32,990,000 VND',
                stock: 15,
                status: 'In Stock',
                image: 'https://laptoptld.com/wp-content/uploads/2023/05/Screenshot-2023-05-19-101017.png'
            },
            {
                id: 'CP002',
                name: 'Apple MacBook Air M2',
                category: 'Laptop',
                price: '25,990,000 VND',
                stock: 8,
                status: 'Out of Stock',
                image: 'https://cdn.tgdd.vn/Products/Images/44/282827/apple-macbook-air-m2-2022-01-750x500.jpg'
            },
            {
                id: 'CP003',
                name: 'Dell XPS 13',
                category: 'Laptop',
                price: '29,990,000 VND',
                stock: 12,
                status: 'In Stock',
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmxbzhG6fw0b8w6aVz75aJk7dfvjPY2ALhfg&s'
            },
            {
                id: 'CP004',
                name: 'Logitech G305',
                category: 'Mouse',
                price: '1,590,000 VND',
                stock: 35,
                status: 'In Stock',
                image: 'https://resource.logitech.com/content/dam/gaming/en/products/g305/g305-mint-gallery-1.png'
            },
            {
                id: 'CP005',
                name: 'Logitech G915',
                category: 'Keyboard',
                price: '5,990,000 VND',
                stock: 28,
                status: 'In Stock',
                image: 'https://resource.logitech.com/content/dam/gaming/en/products/g915/g915-gallery/us-g915-wireless-gallery-topdown.png'
            },
            {
                id: 'CP006',
                name: 'Logitech G733',
                category: 'Headphone',
                price: '2,690,000 VND',
                stock: 18,
                status: 'In Stock',
                image: 'https://resource.logitechg.com/w_692,c_lpad,ar_4:3,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/gaming/en/products/g733/gallery/g733-white-gallery-1.png?v=1'
            },
            {
                id: 'CP007',
                name: 'HP Pavilion 15 i7',
                category: 'Laptop',
                price: '18,490,000 VND',
                stock: 22,
                status: 'In Stock',
                image: 'https://www.hp.com/gb-en/shop/Html/Merch/Images/A2SA8EA-ABU_1750x1285.jpg'
            },
            {
                id: 'CP008',
                name: 'Razer Viper Mini',
                category: 'Mouse',
                price: '690,000 VND',
                stock: 45,
                status: 'In Stock',
                image: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSfW3A7dmS0ZIkQE9YJxZsQox6kclsSL_Rp2x6u_0yItmDU1Ysbp7jWNpi0bJrRPWN4KoOZ9nDsVYho1T3XVQ8VaVRU6Wjx6mck1tF2Jb9J4Y6H3nj0Hg6xu-8'
            },
            {
                id: 'CP009',
                name: 'Razer Huntsman',
                category: 'Keyboard',
                price: '4,990,000 VND',
                stock: 6,
                status: 'Out of Stock',
                image: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRBFht9us42hXs3oX4K6udZSWtD87P3qk6L5EEE5V4tDgGj1_bj2YqxUsuC9Rh26b3rLAxZdnVtlkFwyg0jJwn7_b04J71n5CdY7ZHgyeFp4pwl2N63Mgjgxg'
            },
            {
                id: 'CP010',
                name: 'Apple AirPods Max',
                category: 'Headphone',
                price: '2,990,000 VND',
                stock: 4,
                status: 'Out of Stock',
                image: 'https://i5.walmartimages.com/seo/Apple-AirPods-Max-Wireless-Over-Ear-Headphones-Sky-Blue-MGYL3AM-A_a3c12352-69d2-4eb1-972b-f49bad518210.aac6348b4b2fcd16bd5e7ff1fbdc5804.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF'
            }
        ];
    }

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
                email: "john.doe@gmail.com",
                password: "123456",
                role: "customer",
                firstName: "John",
                lastName: "Doe",
                createdAt: "2025-01-15",
                status: "Active"
            },
            {
                id: 4,
                email: "jane.smith@gmail.com",
                password: "password123",
                role: "customer",
                firstName: "Jane",
                lastName: "Smith",
                createdAt: "2025-02-01",
                status: "Inactive"
            },
            {
                id: 5,
                email: "mike.wilson@gmail.com",
                password: "mike123",
                role: "customer",
                firstName: "Mike",
                lastName: "Wilson",
                createdAt: "2025-02-10",
                status: "Active"
            },
            {
                id: 6,
                email: "sarah.johnson@gmail.com",
                password: "sarah123",
                role: "customer",
                firstName: "Sarah",
                lastName: "Johnson",
                createdAt: "2025-03-05",
                status: "Active"
            }
        ];
    }

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    font: {
                        family: "'Be Vietnam Pro', sans-serif"
                    }
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    font: { family: "'Be Vietnam Pro', sans-serif" }
                }
            },
            x: {
                ticks: {
                    font: { family: "'Be Vietnam Pro', sans-serif" }
                }
            }
        }
    };

    // Update dashboard stats
    updateDashboardStats();

    function updateDashboardStats() {
        // Calculate total revenue from orders (excluding cancelled orders)
        const totalRevenue = orders.reduce((sum, order) => {
            if (order.status !== 'Cancelled') {
                return sum + order.totalAmount;
            }
            return sum;
        }, 0);

        // Count new orders (not cancelled)
        const newOrders = orders.filter(order => order.status !== 'Cancelled').length;

        // Count total customers (excluding admin)
        const totalCustomers = accounts.filter(account => account.role === 'customer').length;

        // Calculate conversion rate (orders per customer ratio)
        const conversionRate = totalCustomers > 0 ? ((newOrders / totalCustomers) * 100).toFixed(1) : 0;

        // Update stat cards
        const statCards = document.querySelectorAll('.custom-card p.text-2xl');
        if (statCards[0]) statCards[0].textContent = `${totalRevenue.toLocaleString('vi-VN')} VND`;
        if (statCards[1]) statCards[1].textContent = newOrders;
        if (statCards[2]) statCards[2].textContent = totalCustomers;
        if (statCards[3]) statCards[3].textContent = `${conversionRate}%`;
    }
    
    // --- DASHBOARD CHARTS ---

    // 1. Monthly Revenue Chart (based on order dates)
    const monthlyRevenueCtx = document.getElementById('monthlyRevenueChart').getContext('2d');
    
    // Calculate monthly revenue from orders
    const monthlyRevenue = getMonthlyRevenue();
    
    new Chart(monthlyRevenueCtx, {
        type: 'bar',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Revenue (VND)',
                data: monthlyRevenue,
                backgroundColor: 'rgba(79, 70, 229, 0.8)',
                borderColor: 'rgba(79, 70, 229, 1)',
                borderWidth: 1,
                borderRadius: 5
            }]
        },
        options: {
            ...chartOptions,
            scales: {
                ...chartOptions.scales,
                y: {
                    ...chartOptions.scales.y,
                    ticks: {
                        ...chartOptions.scales.y.ticks,
                        callback: function(value) {
                            return (value / 1000000).toFixed(1) + 'M VND';
                        }
                    }
                }
            }
        }
    });

    function getMonthlyRevenue() {
        const monthlyData = [0, 0, 0, 0, 0, 0]; // Jan to Jun
        
        orders.forEach(order => {
            if (order.status !== 'Cancelled') {
                const orderDate = new Date(order.orderDate);
                const month = orderDate.getMonth(); // 0-11
                if (month < 6) { // Only first 6 months
                    monthlyData[month] += order.totalAmount;
                }
            }
        });
        
        // If no data for some months, add some realistic simulation
        const hasData = monthlyData.some(value => value > 0);
        if (!hasData) {
            // Fallback with simulated data based on total revenue
            const totalRevenue = orders.reduce((sum, order) => {
                return order.status !== 'Cancelled' ? sum + order.totalAmount : sum;
            }, 0);
            
            // Distribute across months with seasonal pattern
            const baseAmount = totalRevenue / 6;
            monthlyData[0] = baseAmount * 0.8; // Jan: slower
            monthlyData[1] = baseAmount * 1.2; // Feb: valentine boost
            monthlyData[2] = baseAmount * 1.0; // Mar: normal
            monthlyData[3] = baseAmount * 1.1; // Apr: spring
            monthlyData[4] = baseAmount * 0.9; // May: slower
            monthlyData[5] = baseAmount * 1.0; // Jun: normal
        }
        
        return monthlyData;
    }

    // 2. Product Category Chart (based on actual products)
    const productCategoryCtx = document.getElementById('productCategoryChart').getContext('2d');
    
    // Calculate category distribution from products
    const categoryData = getCategoryDistribution();
    
    new Chart(productCategoryCtx, {
        type: 'doughnut',
        data: {
            labels: categoryData.labels,
            datasets: [{
                label: 'Products Count',
                data: categoryData.data,
                backgroundColor: [
                    '#4f46e5', // Indigo - Laptop
                    '#10b981', // Emerald - Mouse
                    '#f59e0b', // Amber - Keyboard
                    '#3b82f6', // Blue - Headphone
                    '#ef4444'  // Red - Others
                ],
                hoverOffset: 4
            }]
        },
        options: { ...chartOptions, plugins: { legend: { position: 'right' } } }
    });

    function getCategoryDistribution() {
        const categories = {};
        
        products.forEach(product => {
            const category = product.category;
            categories[category] = (categories[category] || 0) + 1;
        });
        
        return {
            labels: Object.keys(categories),
            data: Object.values(categories)
        };
    }

    // 3. New Orders Chart (based on order status distribution)
    const newOrdersCtx = document.getElementById('newOrdersChart').getContext('2d');
    
    // Calculate orders by status over time (simulated weekly data)
    const ordersData = getOrdersOverTime();
    
    new Chart(newOrdersCtx, {
        type: 'line',
        data: {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
            datasets: [{
                label: 'New Orders',
                data: ordersData,
                fill: true,
                borderColor: '#10b981',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                tension: 0.4
            }]
        },
        options: chartOptions
    });

    function getOrdersOverTime() {
        // Group orders by weeks based on actual order dates
        const weeks = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
        const weeklyData = [0, 0, 0, 0];
        
        // Get orders from current month and distribute by weeks
        const currentMonth = new Date().getMonth();
        const monthlyOrders = orders.filter(order => {
            const orderDate = new Date(order.orderDate);
            return orderDate.getMonth() === currentMonth && order.status !== 'Cancelled';
        });
        
        // If no orders in current month, simulate data based on all orders
        if (monthlyOrders.length === 0) {
            const activeOrders = orders.filter(order => order.status !== 'Cancelled');
            // Distribute orders across 4 weeks with realistic pattern
            weeklyData[0] = Math.floor(activeOrders.length * 0.15); // Week 1: slow start
            weeklyData[1] = Math.floor(activeOrders.length * 0.35); // Week 2: peak
            weeklyData[2] = Math.floor(activeOrders.length * 0.30); // Week 3: good
            weeklyData[3] = Math.floor(activeOrders.length * 0.20); // Week 4: decline
        } else {
            // Distribute actual monthly orders by day ranges
            monthlyOrders.forEach(order => {
                const day = new Date(order.orderDate).getDate();
                if (day <= 7) weeklyData[0]++;
                else if (day <= 14) weeklyData[1]++;
                else if (day <= 21) weeklyData[2]++;
                else weeklyData[3]++;
            });
        }
        
        return weeklyData;
    }

    // 4. New Customers Chart (based on customer accounts)
    const newCustomersCtx = document.getElementById('newCustomersChart').getContext('2d');
    
    // Calculate customer registration over time
    const customersData = getCustomersOverTime();
    
    new Chart(newCustomersCtx, {
        type: 'line',
        data: {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
            datasets: [{
                label: 'New Customers',
                data: customersData,
                fill: true,
                borderColor: '#f59e0b',
                backgroundColor: 'rgba(245, 158, 11, 0.1)',
                tension: 0.4
            }]
        },
        options: chartOptions
    });

    function getCustomersOverTime() {
        // Calculate customer registration based on actual creation dates
        const customers = accounts.filter(account => account.role === 'customer');
        const weeklyData = [0, 0, 0, 0];
        
        // Group customers by creation month and simulate weekly distribution
        const customersByMonth = {};
        customers.forEach(customer => {
            const createdDate = new Date(customer.createdAt);
            const monthKey = createdDate.getMonth();
            if (!customersByMonth[monthKey]) {
                customersByMonth[monthKey] = [];
            }
            customersByMonth[monthKey].push(customer);
        });
        
        // Get current month data or simulate realistic pattern
        const currentMonth = new Date().getMonth();
        const monthlyCustomers = customersByMonth[currentMonth] || customers;
        
        // Distribute across weeks with realistic registration pattern
        if (monthlyCustomers.length <= 4) {
            // If few customers, distribute evenly
            monthlyCustomers.forEach((customer, index) => {
                weeklyData[index % 4]++;
            });
        } else {
            // Realistic pattern: slow start, peak mid-month, gradual decline
            const total = monthlyCustomers.length;
            weeklyData[0] = Math.floor(total * 0.20); // Week 1: 20%
            weeklyData[1] = Math.floor(total * 0.40); // Week 2: 40% (peak)
            weeklyData[2] = Math.floor(total * 0.25); // Week 3: 25%
            weeklyData[3] = total - weeklyData[0] - weeklyData[1] - weeklyData[2]; // Week 4: remainder
        }
        
        return weeklyData;
    }

    // Function to refresh dashboard data (useful for real-time updates)
    window.refreshDashboard = function() {
        // Reload data from localStorage
        orders = JSON.parse(localStorage.getItem('orders')) || getDefaultOrders();
        products = JSON.parse(localStorage.getItem('products')) || getDefaultProducts();
        accounts = JSON.parse(localStorage.getItem('accounts')) || getDefaultAccounts();
        
        // Update stats
        updateDashboardStats();
        
        // Note: In real app, you would also need to destroy and recreate charts
        console.log('Dashboard data refreshed');
    };

});
