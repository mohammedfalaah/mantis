import './style.css';
import './shop.css';
import { CATEGORIES, PRODUCTS } from './products/catalogData.js';

// Shop State
let shopState = {
  activeCategory: null,
  searchQuery: '',
  filters: {
    material: [],
    finish: [],
    color: []
  },
  sortBy: 'name-asc'
};

// Initialize shop
function initShop() {
  // Check URL for category filter
  const urlParams = new URLSearchParams(window.location.search);
  const categoryParam = urlParams.get('category');
  
  if (categoryParam) {
    // Convert URL format to display format
    const categoryMap = {
      'pull-handles': 'Pull Handles',
      'lever-handles': 'Lever Handles',
      'smart-locks': 'Smart Locks',
      'door-hinges': 'Door Hinges',
      'door-closers': 'Door Closers',
      'accessories': 'Accessories'
    };
    shopState.activeCategory = categoryMap[categoryParam] || null;
  }
  
  renderCategories();
  renderFilters();
  renderProducts();
  setupEvents();
}

// Render categories sidebar
function renderCategories() {
  const catList = document.getElementById('shop-categories-list');
  if (!catList) return;
  
  let html = '';
  
  // All Products
  const allCount = PRODUCTS.length;
  html += `
    <li class="category-item ${shopState.activeCategory === null ? 'active' : ''}" data-cat="all">
      <span>All Products</span>
      <span class="category-count">${allCount}</span>
    </li>
  `;
  
  // Categories
  CATEGORIES.forEach(cat => {
    const catCount = PRODUCTS.filter(p => p.category === cat.name).length;
    html += `
      <li class="category-item ${shopState.activeCategory === cat.name ? 'active' : ''}" data-cat="${cat.name}">
        <span>${cat.name}</span>
        <span class="category-count">${catCount}</span>
      </li>
    `;
  });
  
  catList.innerHTML = html;
  
  // Add click events
  catList.querySelectorAll('.category-item').forEach(item => {
    item.addEventListener('click', () => {
      const cat = item.dataset.cat;
      shopState.activeCategory = cat === 'all' ? null : cat;
      
      // Update active state
      catList.querySelectorAll('.category-item').forEach(i => 
        i.classList.toggle('active', i === item)
      );
      
      renderProducts();
    });
  });
}

// Render filter options
function renderFilters() {
  const materials = [...new Set(PRODUCTS.map(p => p.material))].sort();
  const finishes = [...new Set(PRODUCTS.flatMap(p => p.finishes))].sort();
  const colors = [...new Set(PRODUCTS.flatMap(p => p.colors))].sort();
  
  // Materials
  const materialsDiv = document.getElementById('filter-materials');
  if (materialsDiv) {
    materialsDiv.innerHTML = materials.map(mat => `
      <button class="filter-tag" data-filter-type="material" data-value="${mat}">${mat}</button>
    `).join('');
  }
  
  // Finishes
  const finishesDiv = document.getElementById('filter-finishes');
  if (finishesDiv) {
    finishesDiv.innerHTML = finishes.map(fin => `
      <button class="filter-tag" data-filter-type="finish" data-value="${fin}">${fin}</button>
    `).join('');
  }
  
  // Colors
  const colorsDiv = document.getElementById('filter-colors');
  if (colorsDiv) {
    const colorHexMap = {
      'Silver': '#c0c0c0',
      'Gold': '#cca456',
      'Rose Gold': '#b76e79',
      'Black': '#121212',
      'Antique Brass': '#ab7a22',
      'Gun Metal': '#43464b',
      'Copper': '#b87333'
    };
    
    colorsDiv.innerHTML = colors.map(col => {
      const hex = colorHexMap[col] || '#888';
      return `
        <button class="color-swatch" 
                data-filter-type="color" 
                data-value="${col}" 
                style="background-color: ${hex};" 
                title="${col}"></button>
      `;
    }).join('');
  }
  
  // Add filter click events
  document.querySelectorAll('.filter-tag, .color-swatch').forEach(btn => {
    btn.addEventListener('click', () => {
      const type = btn.dataset.filterType;
      const val = btn.dataset.value;
      
      const index = shopState.filters[type].indexOf(val);
      if (index === -1) {
        shopState.filters[type].push(val);
        btn.classList.add('active');
      } else {
        shopState.filters[type].splice(index, 1);
        btn.classList.remove('active');
      }
      
      renderProducts();
    });
  });
}

// Render products grid
function renderProducts() {
  const grid = document.getElementById('shop-products-grid');
  const countBar = document.getElementById('shop-results-count');
  if (!grid || !countBar) return;
  
  // Filter products
  let filtered = PRODUCTS.filter(prod => {
    // Category filter
    if (shopState.activeCategory && prod.category !== shopState.activeCategory) {
      return false;
    }
    
    // Search filter
    if (shopState.searchQuery) {
      const query = shopState.searchQuery.toLowerCase();
      const inName = prod.name.toLowerCase().includes(query);
      const inDesc = prod.description.toLowerCase().includes(query);
      if (!inName && !inDesc) return false;
    }
    
    // Material filter
    if (shopState.filters.material.length > 0) {
      if (!shopState.filters.material.includes(prod.material)) return false;
    }
    
    // Finish filter
    if (shopState.filters.finish.length > 0) {
      const hasFinish = prod.finishes.some(f => shopState.filters.finish.includes(f));
      if (!hasFinish) return false;
    }
    
    // Color filter
    if (shopState.filters.color.length > 0) {
      const hasColor = prod.colors.some(c => shopState.filters.color.includes(c));
      if (!hasColor) return false;
    }
    
    return true;
  });
  
  // Sort products
  if (shopState.sortBy === 'name-asc') {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  } else if (shopState.sortBy === 'name-desc') {
    filtered.sort((a, b) => b.name.localeCompare(a.name));
  } else if (shopState.sortBy === 'category') {
    filtered.sort((a, b) => a.category.localeCompare(b.category));
  }
  
  // Update count
  countBar.textContent = `${filtered.length} ${filtered.length === 1 ? 'product' : 'products'}`;
  
  // Render products
  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="no-results">
        <p>No products found matching your criteria.</p>
      </div>
    `;
    return;
  }
  
  grid.innerHTML = filtered.map(prod => `
    <div class="product-card" data-id="${prod.id}">
      <div class="product-image">
        <img src="${prod.image}" alt="${prod.name}" loading="lazy" />
      </div>
      <div class="product-info">
        <span class="product-category">${prod.category}</span>
        <h3 class="product-name">${prod.name}</h3>
        <p class="product-meta">${prod.material} • ${prod.sizes[0]}</p>
      </div>
      <button class="product-btn">View Details</button>
    </div>
  `).join('');
  
  // Add click events
  grid.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', () => {
      const id = card.dataset.id;
      const product = PRODUCTS.find(p => p.id === id);
      if (product) {
  window.location.href = `product.html?id=${id}`;
}
    });
  });
}

// Setup event listeners
function setupEvents() {
  // Search
  const searchInput = document.getElementById('shop-search');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      shopState.searchQuery = e.target.value.trim();
      renderProducts();
    });
  }
  
  // Sort
  const sortSelect = document.getElementById('shop-sort');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      shopState.sortBy = e.target.value;
      renderProducts();
    });
  }
  
  // Clear filters
  const clearBtn = document.getElementById('clear-filters-btn');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      shopState.filters = {
        material: [],
        finish: [],
        color: []
      };
      
      document.querySelectorAll('.filter-tag, .color-swatch').forEach(btn => {
        btn.classList.remove('active');
      });
      
      renderProducts();
    });
  }
  
  // Close drawer
  const closeBtn = document.getElementById('close-drawer-btn');
  const overlay = document.getElementById('product-drawer-overlay');
  
  if (closeBtn) closeBtn.addEventListener('click', closeProductDrawer);
  if (overlay) {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeProductDrawer();
    });
  }
}

// Open product drawer
function openProductDrawer(product) {
  const overlay = document.getElementById('product-drawer-overlay');
  
  document.getElementById('drawer-category').textContent = product.category;
  document.getElementById('drawer-title').textContent = product.name;
  document.getElementById('drawer-subcategory').textContent = product.subcategory;
  document.getElementById('drawer-desc').textContent = product.description;
  document.getElementById('drawer-material').textContent = product.material;
  document.getElementById('drawer-finishes').textContent = product.finishes.join(', ');
  document.getElementById('drawer-colors').textContent = product.colors.join(', ');
  document.getElementById('drawer-sizes').textContent = product.sizes.join(', ');
  
  const drawerImage = document.getElementById('drawer-image');
  drawerImage.src = product.image;
  drawerImage.alt = product.name;
  
  overlay.classList.add('active');
}

// Close product drawer
function closeProductDrawer() {
  const overlay = document.getElementById('product-drawer-overlay');
  overlay.classList.remove('active');
}

// Start
initShop();
