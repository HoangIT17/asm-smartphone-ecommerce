document.addEventListener('DOMContentLoaded', () => {

    // Load admin information
    loadAdminInfo();

    // Products data storage - Load from localStorage or use default data
    let products = JSON.parse(localStorage.getItem('products')) || [
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

    // Save products to localStorage
    function saveProducts() {
        localStorage.setItem('products', JSON.stringify(products));
    }

    // Reset data to default
    window.resetData = function() {
        if (confirm('Are you sure you want to reset all data to default? This action cannot be undone.')) {
            localStorage.removeItem('products');
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

    // CRUD Functions
    function renderProducts() {
        const tbody = document.querySelector('.custom-table tbody');
        if (!tbody) return;

        tbody.innerHTML = '';
        
        products.forEach(product => {
            const row = document.createElement('tr');
            row.className = 'hover:bg-gray-50 transition-colors';
            
            const statusClass = product.stock < 10 ? 'status-low' : 'status-active';
            const statusText = product.stock < 10 ? 'Out of Stock' : 'In Stock';
            
            const categoryColors = {
                'Laptop': 'bg-green-100 text-green-800',
                'Mouse': 'bg-blue-100 text-blue-800',
                'Keyboard': 'bg-purple-100 text-purple-800',
                'Headphone': 'bg-yellow-100 text-yellow-800'
            };
            
            row.innerHTML = `
                <td class="flex items-center gap-3">
                    <img src="${product.image}" alt="Product Image" class="product-image rounded-lg w-16 h-16 object-cover">
                    <span class="font-semibold text-gray-800">${product.name}</span>
                </td>
                <td><span class="font-mono text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">${product.id}</span></td>
                <td><span class="${categoryColors[product.category]} px-2 py-1 rounded-full text-xs font-medium">${product.category}</span></td>
                <td class="font-semibold text-green-600">${product.price}</td>
                <td><span class="font-bold text-gray-700">${product.stock}</span></td>
                <td><span class="status-badge ${statusClass}">${statusText}</span></td>
                <td class="flex gap-2">
                    <button class="custom-btn-outline p-2 hover:bg-blue-50" onclick="editProduct('${product.id}')">
                        <span class="material-symbols-outlined text-lg">edit</span>
                    </button>
                    <button class="custom-btn-danger p-2 hover:bg-red-50" onclick="deleteProduct('${product.id}')">
                        <span class="material-symbols-outlined text-lg">delete</span>
                    </button>
                </td>
            `;
            
            tbody.appendChild(row);
        });
    }

    // Create new product
    window.createProduct = function(productData) {
        const newId = 'CP' + String(products.length + 1).padStart(3, '0');
        const newProduct = {
            id: newId,
            ...productData,
            // Ensure status is calculated based on stock
            status: productData.stock < 10 ? 'Out of Stock' : 'In Stock'
        };
        products.push(newProduct);
        
        // Save to localStorage
        saveProducts();
        
        renderProducts();
        updateCharts();
        showToast('Product created successfully!', 'success');
    }

    // Edit product
    window.editProduct = function(productId) {
        const product = products.find(p => p.id === productId);
        if (!product) return;

        // Create modal for editing
        const modal = createProductModal(product);
        document.body.appendChild(modal);
        
        // Show modal
        const bootstrapModal = new bootstrap.Modal(modal);
        bootstrapModal.show();

        // Handle form submission
        const form = modal.querySelector('#productForm');
        form.onsubmit = function(e) {
            e.preventDefault();
            
            const formData = new FormData(form);
            let price = formData.get('price');
            const imageValue = formData.get('image');
            
            // Validate that we have an image (either URL or base64)
            if (!imageValue || imageValue.trim() === '') {
                showToast('Please provide an image (URL or upload)', 'error');
                return;
            }
            
            // Format price if it doesn't contain VND
            if (!price.includes('VND')) {
                // Add commas for thousands and VND suffix
                const numericPrice = parseInt(price.replace(/,/g, ''));
                price = numericPrice.toLocaleString('vi-VN') + ' VND';
            }
            
            const updatedProduct = {
                id: productId,
                name: formData.get('name'),
                category: formData.get('category'),
                price: price,
                stock: parseInt(formData.get('stock')),
                image: imageValue,
                // Update status based on new stock value
                status: parseInt(formData.get('stock')) < 10 ? 'Out of Stock' : 'In Stock'
            };

            // Update product
            const index = products.findIndex(p => p.id === productId);
            products[index] = updatedProduct;
            
            // Save to localStorage
            saveProducts();
            
            renderProducts();
            updateCharts();
            bootstrapModal.hide();
            showToast('Product updated successfully!', 'success');
        };

        // Clean up modal after hiding
        modal.addEventListener('hidden.bs.modal', () => {
            modal.remove();
        });

        // Setup drag and drop after modal is shown
        modal.addEventListener('shown.bs.modal', () => {
            setupDragAndDrop();
        });
    }

    // Delete product
    window.deleteProduct = function(productId) {
        const product = products.find(p => p.id === productId);
        if (!product) return;

        if (confirm(`Are you sure you want to delete "${product.name}"?`)) {
            products = products.filter(p => p.id !== productId);
            
            // Save to localStorage
            saveProducts();
            
            renderProducts();
            updateCharts();
            showToast('Product deleted successfully!', 'success');
        }
    }

    // Create product modal
    function createProductModal(product = null) {
        const isEdit = product !== null;
        const modal = document.createElement('div');
        modal.className = 'modal fade';
        modal.id = 'productModal';
        modal.setAttribute('tabindex', '-1');
        
        modal.innerHTML = `
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">${isEdit ? 'Edit Product' : 'Add New Product'}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <form id="productForm">
                            <div class="row">
                                <div class="col-md-6 mb-3">
                                    <label for="productName" class="form-label">Product Name</label>
                                    <input type="text" class="form-control" id="productName" name="name" 
                                           value="${isEdit ? product.name : ''}" required>
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label for="productCategory" class="form-label">Category</label>
                                    <select class="form-select" id="productCategory" name="category" required>
                                        <option value="">Select Category</option>
                                        <option value="Laptop" ${isEdit && product.category === 'Laptop' ? 'selected' : ''}>Laptop</option>
                                        <option value="Mouse" ${isEdit && product.category === 'Mouse' ? 'selected' : ''}>Mouse</option>
                                        <option value="Keyboard" ${isEdit && product.category === 'Keyboard' ? 'selected' : ''}>Keyboard</option>
                                        <option value="Headphone" ${isEdit && product.category === 'Headphone' ? 'selected' : ''}>Headphone</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6 mb-3">
                                    <label for="productPrice" class="form-label">Price (VND)</label>
                                    <input type="text" class="form-control" id="productPrice" name="price" 
                                           value="${isEdit ? product.price : ''}" placeholder="1,000,000 VND" required>
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label for="productStock" class="form-label">Quantity</label>
                                    <input type="number" class="form-control" id="productStock" name="stock" 
                                           value="${isEdit ? product.stock : ''}" min="0" required>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label for="productImage" class="form-label">Product Image</label>
                                
                                <!-- Image Upload Tabs -->
                                <ul class="nav nav-pills mb-3" id="imageUploadTabs" role="tablist">
                                    <li class="nav-item" role="presentation">
                                        <button class="nav-link active" id="url-tab" data-bs-toggle="pill" data-bs-target="#url-panel" type="button" role="tab">
                                            <span class="material-symbols-outlined me-1">link</span>URL
                                        </button>
                                    </li>
                                    <li class="nav-item" role="presentation">
                                        <button class="nav-link" id="upload-tab" data-bs-toggle="pill" data-bs-target="#upload-panel" type="button" role="tab">
                                            <span class="material-symbols-outlined me-1">upload</span>Upload
                                        </button>
                                    </li>
                                </ul>
                                
                                <!-- Tab Content -->
                                <div class="tab-content" id="imageUploadContent">
                                    <!-- URL Panel -->
                                    <div class="tab-pane fade show active" id="url-panel" role="tabpanel">
                                        <div class="input-group mb-2">
                                            <input type="url" class="form-control" id="productImage" name="image" 
                                                   value="${isEdit ? product.image : ''}" placeholder="https://example.com/image.jpg"
                                                   oninput="previewImage(this)">
                                            <button type="button" class="btn btn-outline-secondary" onclick="useSampleImage()" title="Random sample image">
                                                <span class="material-symbols-outlined">shuffle</span>
                                            </button>
                                        </div>
                                        
                                        <!-- Quick Image Links -->
                                        <div class="mb-2">
                                            <small class="text-muted">Quick Links:</small>
                                            <div class="btn-group-sm d-flex flex-wrap gap-1 mt-1">
                                                <button type="button" class="btn btn-outline-info btn-sm" onclick="setImageUrl('https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500')">Laptop 1</button>
                                                <button type="button" class="btn btn-outline-info btn-sm" onclick="setImageUrl('https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500')">Laptop 2</button>
                                                <button type="button" class="btn btn-outline-success btn-sm" onclick="setImageUrl('https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500')">Mouse 1</button>
                                                <button type="button" class="btn btn-outline-warning btn-sm" onclick="setImageUrl('https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=500')">Keyboard 1</button>
                                                <button type="button" class="btn btn-outline-danger btn-sm" onclick="setImageUrl('https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500')">Headphone 1</button>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <!-- Upload Panel -->
                                    <div class="tab-pane fade" id="upload-panel" role="tabpanel">
                                        <div class="upload-area border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                                            <input type="file" id="imageUpload" accept="image/*" class="d-none" onchange="handleImageUpload(this)">
                                            <div class="upload-content">
                                                <span class="material-symbols-outlined text-gray-400" style="font-size: 48px;">cloud_upload</span>
                                                <p class="mb-2">Drag & drop your image here, or <button type="button" class="btn btn-link p-0" onclick="document.getElementById('imageUpload').click()">browse</button></p>
                                                <small class="text-muted">Supports: JPG, PNG, GIF, WebP (max 5MB)</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="form-text">Choose between URL link or upload from your computer</div>
                                
                                <!-- Image Preview -->
                                <div class="mt-2">
                                    <img id="imagePreview" src="${isEdit ? product.image : ''}" 
                                         alt="Image Preview" class="img-thumbnail" 
                                         style="max-width: 200px; max-height: 150px; display: ${isEdit ? 'block' : 'none'};">
                                </div>
                            </div>
                            <div class="d-flex justify-content-end gap-2">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                <button type="submit" class="btn btn-primary">${isEdit ? 'Update Product' : 'Create Product'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        `;
        
        return modal;
    }

    // Add product modal handler
    window.openAddProductModal = function() {
        const modal = createProductModal();
        document.body.appendChild(modal);
        
        const bootstrapModal = new bootstrap.Modal(modal);
        bootstrapModal.show();

        // Handle form submission for new product
        const form = modal.querySelector('#productForm');
        form.onsubmit = function(e) {
            e.preventDefault();
            
            const formData = new FormData(form);
            let price = formData.get('price');
            const imageValue = formData.get('image');
            
            // Validate that we have an image (either URL or base64)
            if (!imageValue || imageValue.trim() === '') {
                showToast('Please provide an image (URL or upload)', 'error');
                return;
            }
            
            // Format price if it doesn't contain VND
            if (!price.includes('VND')) {
                // Add commas for thousands and VND suffix
                const numericPrice = parseInt(price.replace(/,/g, ''));
                price = numericPrice.toLocaleString('vi-VN') + ' VND';
            }
            
            const newProduct = {
                name: formData.get('name'),
                category: formData.get('category'),
                price: price,
                stock: parseInt(formData.get('stock')),
                image: imageValue,
                // Add status based on stock
                status: parseInt(formData.get('stock')) < 10 ? 'Out of Stock' : 'In Stock'
            };

            createProduct(newProduct);
            bootstrapModal.hide();
        };

        // Clean up modal after hiding
        modal.addEventListener('hidden.bs.modal', () => {
            modal.remove();
        });

        // Setup drag and drop after modal is shown
        modal.addEventListener('shown.bs.modal', () => {
            setupDragAndDrop();
        });
    };

    // Add product button handler
    const addProductBtn = document.querySelector('a[href="add_product.html"]');
    if (addProductBtn) {
        addProductBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const modal = createProductModal();
            document.body.appendChild(modal);
            
            const bootstrapModal = new bootstrap.Modal(modal);
            bootstrapModal.show();

            // Handle form submission for new product
            const form = modal.querySelector('#productForm');
            form.onsubmit = function(e) {
                e.preventDefault();
                
                const formData = new FormData(form);
                let price = formData.get('price');
                const imageValue = formData.get('image');
                
                // Validate that we have an image (either URL or base64)
                if (!imageValue || imageValue.trim() === '') {
                    showToast('Please provide an image (URL or upload)', 'error');
                    return;
                }
                
                // Format price if it doesn't contain VND
                if (!price.includes('VND')) {
                    // Add commas for thousands and VND suffix
                    const numericPrice = parseInt(price.replace(/,/g, ''));
                    price = numericPrice.toLocaleString('vi-VN') + ' VND';
                }
                
                const newProduct = {
                    name: formData.get('name'),
                    category: formData.get('category'),
                    price: price,
                    stock: parseInt(formData.get('stock')),
                    image: imageValue,
                    // Add status based on stock
                    status: parseInt(formData.get('stock')) < 10 ? 'Out of Stock' : 'In Stock'
                };

                createProduct(newProduct);
                bootstrapModal.hide();
            };

            // Clean up modal after hiding
            modal.addEventListener('hidden.bs.modal', () => {
                modal.remove();
            });

            // Setup drag and drop after modal is shown
            modal.addEventListener('shown.bs.modal', () => {
                setupDragAndDrop();
            });
        });
    }

    // Toast notification function
    window.showToast = function(message, type = 'info') {
        // Create toast container if it doesn't exist
        let toastContainer = document.getElementById('toastContainer');
        if (!toastContainer) {
            toastContainer = document.createElement('div');
            toastContainer.id = 'toastContainer';
            toastContainer.className = 'position-fixed bottom-0 end-0 p-3';
            toastContainer.style.zIndex = '1055';
            document.body.appendChild(toastContainer);
        }

        // Create toast element
        const toast = document.createElement('div');
        toast.className = `toast align-items-center text-white bg-${type === 'success' ? 'success' : type === 'error' ? 'danger' : 'primary'} border-0`;
        toast.setAttribute('role', 'alert');
        toast.setAttribute('aria-live', 'assertive');
        toast.setAttribute('aria-atomic', 'true');

        toast.innerHTML = `
            <div class="d-flex">
                <div class="toast-body">
                    ${message}
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
            </div>
        `;

        toastContainer.appendChild(toast);

        // Initialize and show toast with auto-hide after 800ms
        const bsToast = new bootstrap.Toast(toast, {
            autohide: true,
            delay: 500  // 0.1 seconds
        });
        bsToast.show();

        // Remove toast after it's hidden
        toast.addEventListener('hidden.bs.toast', () => {
            toast.remove();
        });
    }

    // Update charts with current data
    function updateCharts() {
        // Update inventory chart with real data
        const inventoryChart = Chart.getChart('inventoryLevelsChart');
        if (inventoryChart) {
            const currentStock = products.map(p => p.stock);
            const productNames = products.map(p => p.name);
            const stockColors = currentStock.map(stock => stock < 10 ? '#ef4444' : '#22c55e');
            
            inventoryChart.data.labels = productNames;
            inventoryChart.data.datasets[0].data = currentStock;
            inventoryChart.data.datasets[0].backgroundColor = stockColors;
            inventoryChart.update();
        }
        
        console.log('Charts updated with current data');
    }

    // Search functionality
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            filterProducts(searchTerm);
        });
    }

    function filterProducts(searchTerm) {
        const filteredProducts = products.filter(product => 
            product.name.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm) ||
            product.id.toLowerCase().includes(searchTerm)
        );
        renderFilteredProducts(filteredProducts);
    }

    function renderFilteredProducts(filteredProducts) {
        const tbody = document.querySelector('.custom-table tbody');
        if (!tbody) return;

        tbody.innerHTML = '';
        
        filteredProducts.forEach(product => {
            const row = document.createElement('tr');
            row.className = 'hover:bg-gray-50 transition-colors';
            
            const statusClass = product.stock < 10 ? 'status-low' : 'status-active';
            const statusText = product.stock < 10 ? 'Out of Stock' : 'In Stock';
            
            const categoryColors = {
                'Laptop': 'bg-green-100 text-green-800',
                'Mouse': 'bg-blue-100 text-blue-800',
                'Keyboard': 'bg-purple-100 text-purple-800',
                'Headphone': 'bg-yellow-100 text-yellow-800'
            };
            
            row.innerHTML = `
                <td class="flex items-center gap-3">
                    <img src="${product.image}" alt="Product Image" class="product-image rounded-lg w-16 h-16 object-cover">
                    <span class="font-semibold text-gray-800">${product.name}</span>
                </td>
                <td><span class="font-mono text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">${product.id}</span></td>
                <td><span class="${categoryColors[product.category]} px-2 py-1 rounded-full text-xs font-medium">${product.category}</span></td>
                <td class="font-semibold text-green-600">${product.price}</td>
                <td><span class="font-bold text-gray-700">${product.stock}</span></td>
                <td><span class="status-badge ${statusClass}">${statusText}</span></td>
                <td class="flex gap-2">
                    <button class="custom-btn-outline p-2 hover:bg-blue-50" onclick="editProduct('${product.id}')">
                        <span class="material-symbols-outlined text-lg">edit</span>
                    </button>
                    <button class="custom-btn-danger p-2 hover:bg-red-50" onclick="deleteProduct('${product.id}')">
                        <span class="material-symbols-outlined text-lg">delete</span>
                    </button>
                </td>
            `;
            
            tbody.appendChild(row);
        });

        // Show no results message if no products found
        if (filteredProducts.length === 0) {
            const noResultsRow = document.createElement('tr');
            noResultsRow.innerHTML = `
                <td colspan="7" class="text-center py-8 text-gray-500">
                    <span class="material-symbols-outlined text-6xl mb-2 block opacity-50">search_off</span>
                    No products found matching your search.
                </td>
            `;
            tbody.appendChild(noResultsRow);
        }
    }

    // Handle image upload
    window.handleImageUpload = function(input) {
        const file = input.files[0];
        if (!file) return;

        // Validate file type
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
        if (!validTypes.includes(file.type)) {
            showToast('Please select a valid image file (JPG, PNG, GIF, WebP)', 'error');
            return;
        }

        // Validate file size (5MB)
        const maxSize = 5 * 1024 * 1024; // 5MB in bytes
        if (file.size > maxSize) {
            showToast('File size must be less than 5MB', 'error');
            return;
        }

        // Create FileReader to convert to base64
        const reader = new FileReader();
        reader.onload = function(e) {
            const base64Data = e.target.result;
            
            // Set the base64 data to the image input
            const imageInput = document.getElementById('productImage');
            imageInput.value = base64Data;
            
            // Show preview
            const preview = document.getElementById('imagePreview');
            preview.src = base64Data;
            preview.style.display = 'block';
            
            showToast('Image uploaded successfully!', 'success');
        };
        
        reader.onerror = function() {
            showToast('Error reading file', 'error');
        };
        
        reader.readAsDataURL(file);
    }

    // Drag and drop functionality
    function setupDragAndDrop() {
        const uploadArea = document.querySelector('.upload-area');
        if (!uploadArea) return;

        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            uploadArea.addEventListener(eventName, preventDefaults, false);
        });

        function preventDefaults(e) {
            e.preventDefault();
            e.stopPropagation();
        }

        ['dragenter', 'dragover'].forEach(eventName => {
            uploadArea.addEventListener(eventName, highlight, false);
        });

        ['dragleave', 'drop'].forEach(eventName => {
            uploadArea.addEventListener(eventName, unhighlight, false);
        });

        function highlight(e) {
            uploadArea.classList.add('border-primary', 'bg-light');
        }

        function unhighlight(e) {
            uploadArea.classList.remove('border-primary', 'bg-light');
        }

        uploadArea.addEventListener('drop', handleDrop, false);

        function handleDrop(e) {
            const dt = e.dataTransfer;
            const files = dt.files;
            
            if (files.length > 0) {
                const fileInput = document.getElementById('imageUpload');
                fileInput.files = files;
                handleImageUpload(fileInput);
            }
        }
    }

    // Image preview function
    window.previewImage = function(input) {
        const preview = document.getElementById('imagePreview');
        if (input.value && isValidImageUrl(input.value)) {
            preview.src = input.value;
            preview.style.display = 'block';
            preview.onerror = function() {
                this.style.display = 'none';
                showToast('Invalid image URL', 'error');
            };
        } else {
            preview.style.display = 'none';
        }
    }

    // Validate image URL
    function isValidImageUrl(url) {
        return /\.(jpg|jpeg|png|webp|gif|svg)(\?.*)?$/i.test(url) || url.includes('imgur') || url.includes('unsplash') || url.includes('pexels');
    }

    // Set specific image URL
    window.setImageUrl = function(url) {
        const imageInput = document.getElementById('productImage');
        imageInput.value = url;
        previewImage(imageInput);
        showToast('Image loaded!', 'success');
    }

    // Sample image URLs for quick selection
    window.useSampleImage = function(category) {
        const sampleImages = {
            laptop: [
                'https://laptoptld.com/wp-content/uploads/2023/05/Screenshot-2023-05-19-101017.png',
                'https://cdn.tgdd.vn/Products/Images/44/282827/apple-macbook-air-m2-2022-01-750x500.jpg',
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmxbzhG6fw0b8w6aVz75aJk7dfvjPY2ALhfg&s',
                'https://www.hp.com/gb-en/shop/Html/Merch/Images/A2SA8EA-ABU_1750x1285.jpg',
                'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500',
                'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500',
                'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=500'
            ],
            mouse: [
                'https://resource.logitech.com/content/dam/gaming/en/products/g305/g305-mint-gallery-1.png',
                'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSfW3A7dmS0ZIkQE9YJxZsQox6kclsSL_Rp2x6u_0yItmDU1Ysbp7jWNpi0bJrRPWN4KoOZ9nDsVYho1T3XVQ8VaVRU6Wjx6mck1tF2Jb9J4Y6H3nj0Hg6xu-8',
                'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500',
                'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500'
            ],
            keyboard: [
                'https://resource.logitech.com/content/dam/gaming/en/products/g915/g915-gallery/us-g915-wireless-gallery-topdown.png',
                'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRBFht9us42hXs3oX4K6udZSWtD87P3qk6L5EEE5V4tDgGj1_bj2YqxUsuC9Rh26b3rLAxZdnVtlkFwyg0jJwn7_b04J71n5CdY7ZHgyeFp4pwl2N63Mgjgxg',
                'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=500',
                'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500'
            ],
            headphone: [
                'https://resource.logitechg.com/w_692,c_lpad,ar_4:3,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/gaming/en/products/g733/gallery/g733-white-gallery-1.png?v=1',
                'https://i5.walmartimages.com/seo/Apple-AirPods-Max-Wireless-Over-Ear-Headphones-Sky-Blue-MGYL3AM-A_a3c12352-69d2-4eb1-972b-f49bad518210.aac6348b4b2fcd16bd5e7ff1fbdc5804.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF',
                'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
                'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500',
                'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500'
            ],
            general: [
                'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=500',
                'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
                'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
                'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500'
            ]
        };

        const imageInput = document.getElementById('productImage');
        const categorySelect = document.getElementById('productCategory');
        const selectedCategory = categorySelect.value.toLowerCase();
        
        // Use category-specific images if available, otherwise use general
        const categoryImages = sampleImages[selectedCategory] || sampleImages.general;
        const randomImage = categoryImages[Math.floor(Math.random() * categoryImages.length)];
        
        imageInput.value = randomImage;
        previewImage(imageInput);
        showToast('Sample image loaded!', 'success');
    }

    // Initialize the product table
    renderProducts();

    // Common Chart.js options
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

    // --- CRUD PAGE CHARTS ---

    // 1. Top Selling Products Chart
    const topSellingCtx = document.getElementById('topSellingChart').getContext('2d');
    new Chart(topSellingCtx, {
        type: 'bar',
        data: {
            labels: ['ASUS ROG G14', 'MacBook Air M2', 'Logitech G305', 'G733 Headset', 'Razer Huntsman'],
            datasets: [{
                label: 'Units Sold',
                data: [85, 120, 210, 95, 68],
                backgroundColor: '#3b82f6',
                borderColor: '#2563eb',
                borderWidth: 1
            }]
        },
        options: { ...chartOptions, indexAxis: 'y' } // Horizontal bar chart
    });

    // 2. Inventory Levels Chart
    const inventoryLevelsCtx = document.getElementById('inventoryLevelsChart').getContext('2d');
    new Chart(inventoryLevelsCtx, {
        type: 'bar',
        data: {
            labels: ['ASUS ROG G14', 'MacBook Air M2', 'Dell XPS 13', 'Logitech G305', 'G733 Headset', 'Razer Huntsman', 'AirPods Max'],
            datasets: [{
                label: 'Stock Quantity',
                data: [15, 8, 12, 35, 18, 6, 4],
                backgroundColor: [
                    '#22c55e', // Green (good stock)
                    '#ef4444', // Red (low stock)
                    '#22c55e', // Green 
                    '#22c55e', // Green
                    '#22c55e', // Green
                    '#ef4444', // Red (low stock)
                    '#ef4444'  // Red (low stock)
                ],
                borderWidth: 1
            }]
        },
        options: chartOptions
    });
    
    // 3. Conversion Rate by Product Chart
    const conversionRateCtx = document.getElementById('conversionRateChart').getContext('2d');
    new Chart(conversionRateCtx, {
        type: 'bar',
        data: {
            labels: ['Laptops', 'Gaming Mice', 'Keyboards', 'Headphones'],
            datasets: [{
                label: 'Conversion Rate (%)',
                data: [18.5, 12.8, 15.2, 14.7],
                backgroundColor: 'rgba(139, 92, 246, 0.8)', // Violet
                borderColor: 'rgba(139, 92, 246, 1)',
                borderWidth: 1,
                borderRadius: 5
            }]
        },
        options: chartOptions
    });

    // 4. Product Ratings Chart
    const productRatingsCtx = document.getElementById('productRatingsChart').getContext('2d');
    new Chart(productRatingsCtx, {
        type: 'pie',
        data: {
            labels: ['5 Stars', '4 Stars', '3 Stars', '2 Stars', '1 Star'],
            datasets: [{
                label: 'Number of Ratings',
                data: [320, 180, 45, 15, 8],
                backgroundColor: [
                    '#22c55e', // Green
                    '#a3e635', // Lime
                    '#facc15', // Yellow
                    '#f97316', // Orange
                    '#ef4444'  // Red
                ],
                hoverOffset: 4
            }]
        },
        options: { ...chartOptions, plugins: { legend: { position: 'right' } } }
    });
});
