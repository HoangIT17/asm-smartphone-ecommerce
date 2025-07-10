// Product data
const products = {
  laptop: [
      {
          id: 'laptop1',
          name: 'Acer Aspire 3',
          price: '11.990.000 ₫',
          image: 'https://cdn.ankhang.vn/media/product/24631_laptop_acer_aspire_3_a314_36m_34ap_nx_kmrsv_001_1.jpg'
      },
      {
          id: 'laptop2',
          name: 'HP Pavilion 15 i7',
          price: '18.490.000 ₫',
          image: 'https://www.hp.com/gb-en/shop/Html/Merch/Images/A2SA8EA-ABU_1750x1285.jpg'
      },
      {
          id: 'laptop3',
          name: 'Dell Inspiron 15',
          price: '15.990.000 ₫',
          image: 'https://smnet.vn/wp-content/uploads/2024/09/dell-inspiron-15-3530-1.jpg'
      },
      {
          id: 'laptop4',
          name: 'Lenovo IdeaPad 3',
          price: '12.990.000 ₫',
          image: 'https://m.media-amazon.com/images/I/71bMludZW3L._UF894,1000_QL80_.jpg'
      },
      {
          id: 'laptop5',
          name: 'ASUS VivoBook 15',
          price: '14.990.000 ₫',
          image: 'https://cdn.ankhang.vn/media/product/21246_laptop_asus_vivobook_15_x515ep_bq529w_1.jpg'
      },
      {
          id: 'laptop6',
          name: 'MSI Modern 15',
          price: '16.990.000 ₫',
          image: 'https://product.hstatic.net/200000680839/product/msi-modern-15-b12mo-i7-487vn-thumb-600x600_61081f4ef796464ba4c6acc305d1c600_grande.jpg'
      },
      {
          id: 'laptop7',
          name: 'Acer Swift 3',
          price: '17.990.000 ₫',
          image: 'https://m.media-amazon.com/images/I/718X51-OjBL.jpg'
      },
      {
          id: 'laptop8',
          name: 'HP Envy 13',
          price: '19.990.000 ₫',
          image: 'https://lapvip.vn/upload/products/thumb_800x0/hp-envy-13-2020-windows-10-1601712506.jpg'
      },
      {
          id: 'laptop9',
          name: 'Apple MacBook Air M2',
          price: '25.990.000 ₫',
          image: 'https://cdn.tgdd.vn/Products/Images/44/282827/apple-macbook-air-m2-2022-01-750x500.jpg'
      },
      {
          id: 'laptop10',
          name: 'ASUS ROG Zephyrus G14',
          price: '32.990.000 ₫',
          image: 'https://laptoptld.com/wp-content/uploads/2023/05/Screenshot-2023-05-19-101017.png'
      },
      {
          id: 'laptop11',
          name: 'Dell XPS 13',
          price: '29.990.000 ₫',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmxbzhG6fw0b8w6aVz75aJk7dfvjPY2ALhfg&s'
      },
      {
          id: 'laptop12',
          name: 'HP Spectre x360',
          price: '27.990.000 ₫',
          image: 'https://boutique.heathrow.com/dw/image/v2/BDNX_PRD/on/demandware.static/-/Sites-retailer_in-motion-master-catalog/default/dw7c5dc8b6/images/hi-res/in-motion/03658857.jpeg'
      },
      {
          id: 'laptop13',
          name: 'Lenovo ThinkPad X1 Carbon',
          price: '34.990.000 ₫',
          image: 'https://microless.com/cdn/product_description/3740060_1615121170.png'
      },
      {
          id: 'laptop14',
          name: 'MSI GF63 Thin',
          price: '18.990.000 ₫',
          image: 'https://gamalaptop.vn/wp-content/uploads/2021/09/MSI-GF63-Thin-9SC-i7-9750H-GTX-1650Ti-01-1200x900.jpg'
      },
      {
          id: 'laptop15',
          name: 'Acer Nitro 5',
          price: '21.990.000 ₫',
          image: 'https://laptopbaoloc.vn/wp-content/uploads/2024/08/acer_nitro_5__4__3eeed926d80f4252b0720f96190a35ae_78a604ac9a324bae967a6164bde207f6_1024x1024.webp'
      },
      {
          id: 'laptop16',
          name: 'Gigabyte AERO 16',
          price: '39.990.000 ₫',
          image: 'https://hqg.vn/wp-content/uploads/2022/12/34-233-520-V01.jpg'
      }
  ],
  mouse: [
      {
          id: 'mouse1',
          name: 'Logitech G102 Gen 2',
          price: '420.000 ₫',
          image: 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcS4qy3HoDVOStNFq4lIPQ8bZVMLsdD0RLolCiutgWZYzF8V1jCdZC2LuAZ7DClbAgq-wtSugRFnn15457cKfXGmZXYhuObZZsYi08EWwl5MOuWCqyJ9K_2RUZY'
      },
      {
          id: 'mouse2',
          name: 'Genius DX',
          price: '1.290.000 ₫',
          image: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSR0LvsrWo_CyH-druKsnymgSjh1XyMhCbL_uIaY1gpXx_DdDasA33OMeNScF7m38ekzbTu0vylu9CVRAcNPn6U-Kze-urpCfiBZaqxMhoQVCRYRiVTeJRj'
      },
      {
          id: 'mouse3',
          name: 'Microsoft Surface Mouse ',
          price: '890.000 ₫',
          image: 'https://surfaceviet.vn/wp-content/uploads/2020/03/Bluetooth-Mouse.jpg'
      },
      {
          id: 'mouse4',
          name: 'Logitech G305',
          price: '1.590.000 ₫',
          image: 'https://resource.logitech.com/content/dam/gaming/en/products/g305/g305-mint-gallery-1.png'
      },
      {
          id: 'mouse5',
          name: 'Logitech G Pro X',
          price: '2.190.000 ₫',
          image: 'https://nguyencongpc.vn/media/product/17157-logitech-g-pro-hero-wireless-1.JPG'
      },
      {
          id: 'mouse6',
          name: 'Razer Viper Mini',
          price: '690.000 ₫',
          image: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSfW3A7dmS0ZIkQE9YJxZsQox6kclsSL_Rp2x6u_0yItmDU1Ysbp7jWNpi0bJrRPWN4KoOZ9nDsVYho1T3XVQ8VaVRU6Wjx6mck1tF2Jb9J4Y6H3nj0Hg6xu-8'
      },
      {
          id: 'mouse7',
          name: 'SteelSeries Prime',
          price: '1.890.000 ₫',
          image: 'https://product.hstatic.net/200000722513/product/thumbchuot_0adff005264844b6af283c0b2b50ee9a_a486a2679d764157954ec5cf5de255fc.png'
      },
      {
          id: 'mouse8',
          name: 'Genius NX-7010',
          price: '790.000 ₫',
          image: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTIPZATrQbDwt_-bSfS1xoaG6QoMU0UDnhruludtKugepPyQiMjOvJI1T_V8XbdQPxH-qxrWLOCs2AWOzbBmjb8OPqU0LnX3cdqsy8wnl_vjsxA-2M85DhFlbQ'
      }
  ],
  keyboard: [
      {
          id: 'keyboard1',
          name: 'Logitech G Pro',
          price: '2.990.000 ₫',
          image: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQhaECT7B3cmbJnUU4e3xbbzhrHvN-tBW-l074OmkAmBTb-CRQ8Enp_QOciWwo9GCo79y5I9-iYBYTBtn01EZmn-lttWRQWAYgR40npBrsjWm4mMc3cIQxq7w'
      },
      {
          id: 'keyboard2',
          name: 'Ducky One 2 Tuxedo TKL',
          price: '3.990.000 ₫',
          image: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcS96tNtUivVD6aaRotu8OsVp3BIiGw7UFjc3BTalEgRypK3PkoJ-c_q90jELGXuZGg2kxb38a8-Tb_DicJX0D1r8UTnaGYnkHHN0wgau-7LbA2Or8BFjE823Y4'
      },
      {
          id: 'keyboard3',
          name: 'Razer Huntsman',
          price: '4.990.000 ₫',
          image: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRBFht9us42hXs3oX4K6udZSWtD87P3qk6L5EEE5V4tDgGj1_bj2YqxUsuC9Rh26b3rLAxZdnVtlkFwyg0jJwn7_b04J71n5CdY7ZHgyeFp4pwl2N63Mgjgxg'
      },
      {
          id: 'keyboard4',
          name: 'AKKO 3087 RF One Piece',
          price: '3.590.000 ₫',
          image: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSonsC04o_MaHMRjVclILosqgaOMo7lqDnWHXO17831Ze8GBiXlSvqQgw_tTAYTXp_slJ6kqcbkEliElc6XYAULJmKUxFdRiOHBQ-IwwGZoSuFXvpjGogkrMg'
      },
      {
          id: 'keyboard5',
          name: 'Logitech G915',
          price: '5.990.000 ₫',
          image: 'https://resource.logitech.com/content/dam/gaming/en/products/g915/g915-gallery/us-g915-wireless-gallery-topdown.png'
      },
      {
          id: 'keyboard6',
          name: 'Ducky One 3 Fullsize Fuji',
          price: '4.590.000 ₫',
          image: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQ8bzFS8EYIBuGRoc2bhLUdWeorGdJPHHuTddS9vt7pOfW2z1GPGijC0ucbRPDeu90LRPMQTyXMoGdIus0s511jpvfGQmGWvywy4XTkBtBhmMV3EcmN6TrWoQ'
      },
      {
          id: 'keyboard7',
          name: 'SteelSeries Apex 7',
          price: '3.890.000 ₫',
          image: 'https://minhancomputercdn.com/media/product/10349_steelseries_apex_7_blue_switch_3.jpg'
      },
      {
          id: 'keyboard8',
          name: 'Topre Realforce R2 TKL',
          price: '6.990.000 ₫',
          image: 'https://m.media-amazon.com/images/I/81haPkHfGiL._UF894,1000_QL80_.jpg'
      }
  ],
  headphone: [
      {
          id: 'headphone1',
          name: 'Logitech G733',
          price: '2.690.000 ₫',
          image: 'https://resource.logitechg.com/w_692,c_lpad,ar_4:3,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/gaming/en/products/g733/gallery/g733-white-gallery-1.png?v=1'
      },
      {
          id: 'headphone2',
          name: 'Apple AirPods Max',
          price: '2.990.000 ₫',
          image: 'https://i5.walmartimages.com/seo/Apple-AirPods-Max-Wireless-Over-Ear-Headphones-Sky-Blue-MGYL3AM-A_a3c12352-69d2-4eb1-972b-f49bad518210.aac6348b4b2fcd16bd5e7ff1fbdc5804.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF'
      },
      {
          id: 'headphone3',
          name: 'SteelSeries Arctis 7',
          price: '2.790.000 ₫',
          image: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQmKVfkhp75CfBr-_bE6n0aN6hmJr2Y_9BUHwUa5qVVBU03-rQekFpg4oRundyD0O6trnZsjP-stvHZRamQ_7ghHhl9Mo4dmaeCNBgl1-xaMbWGNX1y4b-qfQ'
      },
      {
          id: 'headphone4',
          name: 'Corsair HS65 Surround',
          price: '2.490.000 ₫',
          image: 'https://product.hstatic.net/1000233206/product/untitled-2_2f37395d2ea74976ad106eab7772820d.png'
      },
      {
          id: 'headphone5',
          name: 'Logitech G335',
          price: '2.690.000 ₫',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0QQyYnkJaEm5-7oLsf2TAXa7o3qDg1MzYbQ&s'
      },
      {
          id: 'headphone6',
          name: 'Apple Beats Bluetooth',
          price: '2.390.000 ₫',
          image: 'https://www.westcoast.co.uk/Images/Product/Default/medium/75766652_0097461088.jpg'
      },
      {
          id: 'headphone7',
          name: 'SteelSeries Arctis 3',
          price: '1.990.000 ₫',
          image: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQN63ZC-ONQdwPmRfscF6CNmTuNbmR2AZPDkq9GwA7Kpn68zS86mW37kstAvivmj8i4NKVwqnoF7MnPKiKsEJPm8nFZyNFFJ1OqyJuzce8pneJjC7XpBDgU'
      },
      {
          id: 'headphone8',
          name: 'Corsair HS50 Pro',
          price: '1.790.000 ₫',
          image: 'https://product.hstatic.net/200000722513/product/-9011216-na-gallery-hs50-pro-green-01_f3b66c0572d54556be68fc8132d3a355_09424939be0e468bb810ff704eb8a1ef.png'
      }
  ]
};

// Pagination settings
const itemsPerPage = 8;
let currentPage = 1;
let currentCategory = 'all'; // Thêm biến toàn cục lưu category hiện tại

// Function to display products with pagination
function displayProducts(category) {
  currentCategory = category; // Cập nhật category hiện tại
  const productsGrid = document.getElementById('productsGrid');
  const pagination = document.querySelector('.pagination');
  let productsToShow = [];

  // Clear existing products
  productsGrid.innerHTML = '';
  pagination.innerHTML = '';

  // Get products based on category
  if (category === 'all') {
      // Combine all products and shuffle them
      productsToShow = [
          ...products.laptop,
          ...products.mouse,
          ...products.keyboard,
          ...products.headphone
      ];
      shuffleArray(productsToShow);
  } else {
      productsToShow = products[category];
  }

  // Calculate pagination
  const totalPages = Math.ceil(productsToShow.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = productsToShow.slice(startIndex, endIndex);

  // Display products with animation
  currentProducts.forEach((product, index) => {
      const productCard = document.createElement('div');
      productCard.className = 'col-md-3 animate__animated animate__fadeIn';
      productCard.style.animationDelay = `${index * 0.1}s`;
      productCard.innerHTML = `
          <div class="product-card" style="cursor:pointer;">
              <div class="product-image">
                  <img src="${product.image}" alt="${product.name}" class="img-fluid product-img-click" style="cursor:pointer;">
              </div>
              <div class="product-info p-3">
                  <h5 class="product-title">${product.name}</h5>
                  <p class="product-price">${product.price}</p>
                  <button class="btn btn-primary btn-add-cart w-100" data-product='${JSON.stringify(product)}'>
                      Add to Cart
                  </button>
              </div>
          </div>
      `;
      // Click vào ảnh sẽ mở modal chi tiết
      productCard.querySelector('.product-img-click').onclick = function (e) {
          showProductModal(product);
          e.stopPropagation();
      };
      // Nút Add to Cart vẫn hoạt động như cũ
      productCard.querySelector('.btn-add-cart').onclick = function (e) {
          e.stopPropagation();
          const name = product.name;
          const price = product.price;
          const image = product.image;
          // Tạo id duy nhất cho mỗi sản phẩm (ưu tiên product.id, nếu không có thì name+price)
          let id = product.id || (name + '-' + price);
          const productObj = { id, name, price, image, quantity: 1 };
          addToCartWithQty(productObj, 1);
          updateCartDisplay();
          if (typeof showToast === 'function') {
              showToast('', 'success', name);
          }
      };
      productsGrid.appendChild(productCard);
  });

  // Update pagination with animation
  for (let i = 1; i <= totalPages; i++) {
      const li = document.createElement('li');
      li.className = `page-item ${i === currentPage ? 'active' : ''} animate__animated animate__fadeIn`;
      li.style.animationDelay = `${i * 0.1}s`;
      li.innerHTML = `
          <a class="page-link" href="#" onclick="changePage(${i})">${i}</a>
      `;
      pagination.appendChild(li);
  }

  // Update active category button
  document.querySelectorAll('.category-btn').forEach(btn => {
      btn.classList.remove('active');
      if (btn.textContent.toLowerCase().includes(category)) {
          btn.classList.add('active');
      }
  });
}

// Function to shuffle array (for random product display)
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Function to change page
function changePage(page) {
  currentPage = page;
  displayProducts(currentCategory); // Luôn dùng category hiện tại
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Function to filter products by category
function filterProducts(category) {
  currentPage = 1;
  currentCategory = category; // Cập nhật category hiện tại
  const buttons = document.querySelectorAll('.category-btn');
  buttons.forEach(btn => {
      btn.classList.remove('active');
      if (btn.textContent.toLowerCase().includes(category)) {
          btn.classList.add('active', 'animate__animated', 'animate__pulse');
          setTimeout(() => btn.classList.remove('animate__pulse'), 1000);
      }
  });
  displayProducts(category);
  updateURL(category);
}

// Initialize with animation
document.addEventListener('DOMContentLoaded', function () {
  const category = new URLSearchParams(window.location.search).get('category') || 'all';
  currentCategory = category; // Khởi tạo category hiện tại
  displayProducts(category);

  // Add animation to cart badge
  const cartBadge = document.getElementById('cartBadge');
  if (cartBadge) {
      cartBadge.classList.add('animate__animated', 'animate__bounceIn');
  }
});

function updateCartDisplay() {
  const cartBadge = document.getElementById('cartBadge');
  if (cartBadge) {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
      cartBadge.textContent = totalItems;
  }
}