import './style.css';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SceneManager } from './scene';
import { FINISH_SPECS } from './utils/materials';
import { CATEGORIES, PRODUCTS } from './products/catalogData.js';

gsap.registerPlugin(ScrollTrigger);

// Initialize Scene
let sm; // SceneManager instance
const loaderFill = document.getElementById('loader-fill');
const loadingScreen = document.getElementById('loading-screen');

// Initialize website
function init() {
  console.log('Init starting...');
  
  try {
    console.log('Creating SceneManager...');
    sm = new SceneManager('webgl-container');
    console.log('SceneManager created:', sm);
    
    if (!sm || !sm.pullHandle) {
      console.warn('Scene Manager container not found. Disabling 3D viewport features.');
    }
    
    console.log('Init cursor...');
    // Custom Cursor
    initCursor();
    
    console.log('Init UI...');
    // UI Interactive Events
    initUI();
    
    console.log('Init featured products...');
    // Initialize Featured Products
    initFeaturedProducts();

    console.log('Init catalog...');
    // Initialize Catalog
    initCatalog();

    console.log('Init scroll animations...');
    // Scroll Timelines
    initScrollAnimations();
    
    console.log('Simulate loading...');
    // Finish Loading
    simulateLoading();
    
    console.log('Init completed successfully');
  } catch (error) {
    console.error('Initialization error:', error);
    console.error('Error stack:', error.stack);
    hideLoadingScreen();
  }
}

function hideLoadingScreen() {
  if (loadingScreen) {
    loadingScreen.style.opacity = 0;
    setTimeout(() => {
      loadingScreen.style.display = 'none';
    }, 600);
  }
}

// Custom Cursor parallax & scale effects - DISABLED for minimal design
function initCursor() {
  // Removed custom cursor for cleaner, more minimal experience
  return;
}

// Scroll Storytelling Setup
function initScrollAnimations() {
  // Capture scroll velocity to affect particle speed
  let lastScrollTop = 0;
  window.addEventListener('scroll', () => {
    const st = window.pageYOffset || document.documentElement.scrollTop;
    const diff = Math.abs(st - lastScrollTop);
    if (sm && sm.container) {
      sm.scrollVelocity = Math.min(diff, 100);
    }
    lastScrollTop = st <= 0 ? 0 : st;
  }, { passive: true });

  // 1. SECTION ACTIVES PIP & HEADER SYNC
  const sections = document.querySelectorAll('.scroll-section');
  const navItems = document.querySelectorAll('.nav-item');
  const pips = document.querySelectorAll('.pip');
  const finishHud = document.getElementById('global-finish-hud');

  sections.forEach((sec, idx) => {
    ScrollTrigger.create({
      trigger: sec,
      start: 'top center',
      end: 'bottom center',
      onEnter: () => updateActiveNav(sec.id),
      onEnterBack: () => updateActiveNav(sec.id)
    });
  });

  function updateActiveNav(id) {
    navItems.forEach(item => {
      item.classList.toggle('active', item.dataset.sec === id);
    });
    pips.forEach(pip => {
      pip.classList.toggle('active', pip.dataset.sec === id);
    });
    
    // Only show the finish configuration HUD inside the configurator section
    if (finishHud) {
      if (id === 'configurator') {
        finishHud.classList.remove('hidden');
      } else {
        finishHud.classList.add('hidden');
      }
    }
  }

  // Shared variable for explosion animations in UI controls
  window.explodeTweenObj = { progress: 0 };
}

// Procedural scanning keypad LED highlights
function animateKeypadScanning() {
  if (!sm.smartLock) return;
  
  // Sequential glowing effect on numeric pads
  const lights = sm.smartLock.keypadLights;
  gsap.killTweensOf(lights);
  
  // Reset all lights
  lights.forEach(l => l.material.color.set('#00b7ff').multiplyScalar(1.5));
  
  // Cascade animation
  gsap.fromTo(lights.map(l => l.material.color), 
    { r: 0.0, g: 0.7, b: 1.0 }, 
    {
      r: 0.0, g: 1.0, b: 1.0,
      stagger: {
        each: 0.05,
        grid: [4, 3],
        from: 'start'
      },
      duration: 0.4,
      repeat: 3,
      yoyo: true
    }
  );
}

// Setup Studio Panel Controls & Floating HUD Interactions
function initUI() {
  // 1. Pip/Nav Navigation Smooth Scroll
  const scrollElements = document.querySelectorAll('.pip, .nav-item, .logo');
  scrollElements.forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = el.getAttribute('href') || `#${el.dataset.sec}`;
      if (targetId === '#' || targetId === '#hero') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
          targetSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  // 2. Interactive Finish HUD (Global Selector)
  const finishButtons = document.querySelectorAll('.finish-btn');
  finishButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const finish = btn.dataset.finish;
      
      // Update HUD active states
      finishButtons.forEach(b => b.classList.toggle('active', b === btn));
      
      // Update Three.js model materials
      sm.updateHardwareFinish(finish);
      
      // Simple CSS update - no fancy accent transitions
      const spec = FINISH_SPECS[finish];
      
      // Update Customizer Specification list - simplified animation
      const corrosion = document.getElementById('spec-corrosion');
      const base = document.getElementById('spec-base');
      const coating = document.getElementById('spec-coating');
      
      if (corrosion && base && coating) {
        corrosion.textContent = finish === 'steel' ? 'Grade 5 (Maximum)' : finish === 'gold' ? 'Grade 5 (High Sea)' : 'Grade 4 (Standard)';
        base.textContent = spec.base;
        coating.textContent = spec.coating;
      }
    });
  });

  // 3. Configurator Model Selectors
  const modelButtons = document.querySelectorAll('.model-select-btn');
  modelButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetProduct = btn.dataset.product;
      
      // Toggle button active states
      modelButtons.forEach(b => b.classList.toggle('active', b === btn));
      
      // Toggle product visibility and transition positions
      transitionConfiguratorModel(targetProduct);
    });
  });

  // Helper function to open product drawer from gallery sections
  const gallerySelectBtns = document.querySelectorAll('.select-product-btn');
  gallerySelectBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const productType = btn.dataset.product;
      let productId = 'smart-lock-bio-01'; // fallback/default
      if (productType === 'pull') productId = 'pull-handle-brass-01';
      if (productType === 'lever') productId = 'lever-handle-ss-01';
      
      const product = PRODUCTS.find(p => p.id === productId);
      if (product) {
        window.location.href = `product.html?id=${product.id}`;
      }
    });
  });

  // 4. Customizer Action Buttons
  const explodeBtn = document.getElementById('btn-explode-toggle');
  let customizerExploded = false;
  
  if (explodeBtn) {
    explodeBtn.addEventListener('click', () => {
      // Determine which product is active in configurator
      const activeModel = document.querySelector('.model-select-btn.active').dataset.product;
      
      if (activeModel === 'pull' && sm && sm.pullHandle) {
        customizerExploded = !customizerExploded;
        explodeBtn.textContent = customizerExploded ? 'Reassemble Assembly' : 'Deconstruct Assembly';
        
        gsap.to(explodeTweenObj, {
          progress: customizerExploded ? 1.0 : 0.0,
          duration: 1.0,
          ease: 'power3.inOut',
          onUpdate: () => sm.pullHandle.explode(explodeTweenObj.progress)
        });
      } else if (activeModel === 'lever' && sm && sm.leverHandle) {
        // Simulate latch handle pull
        explodeBtn.disabled = true;
        gsap.timeline()
          .to(sm.leverHandle.leverGroup.rotation, { z: -Math.PI / 5, duration: 0.4, ease: 'power2.out' })
          .to(sm.leverHandle.leverGroup.rotation, { z: 0, duration: 0.6, ease: 'elastic.out(1, 0.3)' })
          .call(() => { explodeBtn.disabled = false; });
      } else if (activeModel === 'smart' && sm && sm.smartLock) {
        // Simulate biometric unlock sequence
        explodeBtn.disabled = true;
        sm.smartLock.setBiometricState('success');
        
        // Flash green keypad lights
        const lights = sm.smartLock.keypadLights;
        gsap.timeline()
          .to(lights.map(l => l.material.color), { r: 0.2, g: 1.0, b: 0.1, duration: 0.2, overwrite: true })
          .to(sm.smartLock.leverGroup.rotation, { z: -Math.PI / 4, duration: 0.5, ease: 'power2.out' })
          .to(sm.smartLock.leverGroup.rotation, { z: 0, duration: 0.7, ease: 'power2.inOut', delay: 1.0 })
          .call(() => {
            sm.smartLock.setBiometricState('active'); // reset scanner cyan
            lights.forEach(l => l.material.color.set('#00b7ff').multiplyScalar(1.5));
            explodeBtn.disabled = false;
          });
      }
    });
  }

  // Reset customizer action button label based on model tab select
  function resetActionButtonLabel(product) {
    if (!sm || !sm.container) return;
    customizerExploded = false;
    sm.pullHandle.explode(0);
    sm.leverHandle.setRotation(0);
    sm.smartLock.setRotation(0);
    
    if (explodeBtn) {
      if (product === 'pull') {
        explodeBtn.textContent = 'Deconstruct Assembly';
      } else if (product === 'lever') {
        explodeBtn.textContent = 'Actuate Latch Lever';
      } else if (product === 'smart') {
        explodeBtn.textContent = 'Simulate Biometric Scan';
      }
    }
  }

  // Model swap handler inside Customizer
  let currentActiveProduct = 'pull';
  
  function transitionConfiguratorModel(product) {
    if (product === currentActiveProduct) return;
    
    const duration = 0.8;
    const ease = 'power2.inOut';
    
    const getProductGroup = (name) => {
      if (name === 'smart') return sm.smartLock.group;
      return sm[name + 'Handle'].group;
    };
    const activeGroup = getProductGroup(currentActiveProduct);
    const newGroup = getProductGroup(product);
    
    // Slide out current active model
    gsap.to(activeGroup.position, {
      x: currentActiveProduct === 'pull' ? -5 : currentActiveProduct === 'lever' ? 5 : -5,
      z: -3,
      duration: duration,
      ease: ease,
      onComplete: () => {
        activeGroup.visible = false;
      }
    });
    gsap.to(activeGroup.rotation, {
      y: currentActiveProduct === 'pull' ? Math.PI/2 : currentActiveProduct === 'lever' ? -Math.PI/4 : Math.PI/4,
      duration: duration,
      ease: ease
    });
    
    // Reset buttons/state
    resetActionButtonLabel(product);
    currentActiveProduct = product;
    
    // Slide in new model
    newGroup.visible = true;
    gsap.fromTo(newGroup.position,
      { x: product === 'pull' ? -5 : product === 'lever' ? 5 : -5, z: -3 },
      { x: 0, y: 0, z: 0, duration: duration, ease: ease }
    );
    gsap.fromTo(newGroup.rotation,
      { y: product === 'pull' ? -Math.PI/2 : product === 'lever' ? -Math.PI/2 : Math.PI/2 },
      { y: product === 'pull' ? 0 : product === 'lever' ? 0.4 : -0.3, duration: duration, ease: ease }
    );
  }

  // 5. Spec Sheets modal triggers
  const downloadSpecBtn = document.getElementById('btn-request-spec');
  const specModal = document.getElementById('spec-modal');
  const closeModalBtn = document.getElementById('close-modal');
  const confirmModalBtn = document.getElementById('modal-confirm-btn');
  const modalFilename = document.getElementById('modal-spec-filename');

  if (downloadSpecBtn && specModal && modalFilename) {
    downloadSpecBtn.addEventListener('click', () => {
      // Set appropriate filename in modal
      let fname = 'MANTIS_Kronos_PullHandle_Technical.pdf';
      if (currentActiveProduct === 'lever') fname = 'MANTIS_M472_LeverHandle_Specs.zip';
      if (currentActiveProduct === 'smart') fname = 'MANTIS_Helios_SmartLock_CAD_Drawing.zip';
      modalFilename.textContent = fname;
      
      specModal.classList.add('active');
    });
  }

  const hideModal = () => specModal && specModal.classList.remove('active');
  if (closeModalBtn) closeModalBtn.addEventListener('click', hideModal);
  if (confirmModalBtn) confirmModalBtn.addEventListener('click', hideModal);
  if (specModal) {
    specModal.addEventListener('click', (e) => {
      if (e.target === specModal) hideModal();
    });
  }
  
  // Audio HUD removed for minimal design
  
  // 6. Contact Form Submission Handler
  const contactForm = document.getElementById('main-contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const card = contactForm.closest('.interactive-card');
      if (!card) return;
      
      // Animate card transition
      gsap.to(card, {
        opacity: 0,
        y: 10,
        duration: 0.3,
        onComplete: () => {
          card.innerHTML = `
            <div class="card-tag">Inquiry Received</div>
            <h2 class="card-title">Thank You</h2>
            <p class="card-desc">
              Your inquiry has been successfully transmitted to Mantis Studio. One of our architectural design consultants will review your specifications and contact you within 24 hours.
            </p>
            <div class="micro-note" style="color: var(--color-accent); font-weight: 600;">Reference ID: MNT-${Math.floor(100000 + Math.random() * 900000)}</div>
          `;
          
          gsap.to(card, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: 'power2.out'
          });
        }
      });
    });
  }

  // 3D Mouse Tilt Tracker for About Image
  const aboutWrapper = document.querySelector('.about-image-wrapper');
  const aboutImg = document.querySelector('.about-image-wrapper img');
  
  if (aboutWrapper && aboutImg) {
    aboutWrapper.addEventListener('mousemove', (e) => {
      const rect = aboutWrapper.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      // Calculate rotation (-12deg to 12deg tilt)
      const rotateX = ((centerY - y) / centerY) * 12;
      const rotateY = ((x - centerX) / centerX) * 12;
      
      gsap.to(aboutImg, {
        rotateX: rotateX,
        rotateY: rotateY,
        scale: 1.05,
        boxShadow: '0 20px 45px rgba(0, 0, 0, 0.12)',
        duration: 0.3,
        ease: 'power2.out'
      });
    });
    
    aboutWrapper.addEventListener('mouseleave', () => {
      gsap.to(aboutImg, {
        rotateX: 0,
        rotateY: 0,
        scale: 1.0,
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
        duration: 0.7,
        ease: 'power2.out'
      });
    });
  }
}

// Loading percentage bar simulation
function simulateLoading() {
  // Simplified loading - just hide after a short delay
  setTimeout(() => {
    if (loaderFill) loaderFill.style.width = '100%';
    
    setTimeout(() => {
      if (loadingScreen) {
        loadingScreen.style.opacity = '0';
        
        setTimeout(() => {
          if (loadingScreen) {
            loadingScreen.style.display = 'none';
          }
          
          // Trigger Entrance Animations for Hero
          triggerHeroEntrance();
        }, 600);
      }
    }, 300);
  }, 500);
}

// Elegant initial load layout slide ins - simplified
function triggerHeroEntrance() {
  try {
    // Simple fade-in for pull handle
    if (sm && sm.pullHandle && sm.pullHandle.group) {
      gsap.fromTo(sm.pullHandle.group.position,
        { y: -1, z: 0 },
        { y: 0, z: 0, duration: 1.0, ease: 'power2.out' }
      );
    }
    
    // Minimal text animations
    gsap.from('.hero-cta-section', { opacity: 0, y: 15, duration: 0.8, ease: 'power2.out', delay: 0.6 });
    gsap.from('.global-header', { opacity: 0, duration: 0.8, ease: 'power2.out', delay: 0.3 });
    gsap.from('.scroll-pip-tracker', { opacity: 0, duration: 0.8, ease: 'power2.out', delay: 0.6 });
    gsap.from('#global-finish-hud', { opacity: 0, y: 15, duration: 0.8, ease: 'power2.out', delay: 0.6 });
  } catch (error) {
    console.error('Hero entrance animation error:', error);
  }
}

// --- E-Commerce Catalog State ---
let catalogState = {
  activeCategory: null,
  searchQuery: '',
  filters: {
    material: [],
    finish: [],
    color: [],
    size: [],
    application: []
  },
  sortBy: 'name-asc'
};

// Selected product options in drawer for WhatsApp inquiry
let activeDrawerProduct = null;
let selectedInquiryOptions = {
  finish: '',
  color: '',
  size: '',
  application: ''
};

function initCatalog() {
  renderSidebarCategories();
  renderFilters();
  renderCatalog();
  setupCatalogEvents();
}

// Initialize Featured Products Section on Home Page
function initFeaturedProducts() {
  const featuredGrid = document.getElementById('featured-products-grid');
  if (!featuredGrid) return;
  
  // Select 6 featured products (mix of categories) using actual product IDs from catalogData.js
  const featuredProducts = [
    PRODUCTS.find(p => p.id === 'p-01'), // Kronos Brass Pull
    PRODUCTS.find(p => p.id === 'm-03'), // Helios SS-304 Mortise
    PRODUCTS.find(p => p.id === 'h-02'), // Endura Brass Bearing Hinge
    PRODUCTS.find(p => p.id === 'p-03'), // Onyx SS Pull
    PRODUCTS.find(p => p.id === 'dc-01'), // AeroGlide Door Closer
    PRODUCTS.find(p => p.id === 'da-03')  // Fortress SS Eye Viewer
  ].filter(Boolean); // Remove any undefined products
  
  // If we don't have exact IDs, just take first 6 products
  const productsToShow = featuredProducts.length >= 6 ? featuredProducts : PRODUCTS.slice(0, 6);
  
  featuredGrid.innerHTML = productsToShow.map(product => `
    <div class="featured-product-card" data-product-id="${product.id}">
      <div class="featured-product-image">
        <img src="${product.image}" alt="${product.name}" loading="lazy" />
      </div>
      <div class="featured-product-info">
        <div class="featured-product-category">${product.subcategory}</div>
        <h3 class="featured-product-name">${product.name}</h3>
        <div class="featured-product-meta">
          <span>${product.material}</span>
          <span>${product.sizes[0]}</span>
        </div>
      </div>
    </div>
  `).join('');
  
  // Add click handlers to open product drawer
  featuredGrid.querySelectorAll('.featured-product-card').forEach(card => {
    card.addEventListener('click', () => {
      const productId = card.dataset.productId;
      const product = PRODUCTS.find(p => p.id === productId);
      if (product) {
        window.location.href = `product.html?id=${id}`;
      }
    });
  });

  // Stagger animate header, product cards, and CTA button as they scroll into view
  const featuredHeader = document.querySelector('#featured-products .featured-header');
  const featuredCards = featuredGrid.querySelectorAll('.featured-product-card');
  const featuredCta = document.querySelector('#featured-products .featured-cta');
  
  if (featuredHeader && featuredCards.length > 0 && featuredCta) {
    // Set initial state to hidden
    gsap.set([
      featuredHeader.querySelector('.card-tag'),
      featuredHeader.querySelector('.featured-title'),
      featuredHeader.querySelector('.featured-subtitle'),
      featuredCards,
      featuredCta
    ], { opacity: 0, y: 30 });
    
    // Create native IntersectionObserver to trigger animation once visible
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          console.log('IntersectionObserver TRIGGER: Futured Products visible');
          
          const tl = gsap.timeline();
          
          tl.to(featuredHeader.querySelector('.card-tag'), {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out'
          })
          .to(featuredHeader.querySelector('.featured-title'), {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power2.out'
          }, '-=0.4')
          .to(featuredHeader.querySelector('.featured-subtitle'), {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out'
          }, '-=0.4')
          .to(featuredCards, {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.8,
            ease: 'power3.out'
          }, '-=0.3')
          .to(featuredCta, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out'
          }, '-=0.4');
          
          // Disconnect observer after animation plays
          observer.disconnect();
        }
      });
    }, { 
      threshold: 0.1,  // Trigger as soon as 10% of the section is visible
      rootMargin: '0px 0px -50px 0px' // offset threshold slightly for smoother entrance
    });
    
    observer.observe(document.getElementById('featured-products'));
  }

  // Force ScrollTrigger to refresh all computed layout triggers
  ScrollTrigger.refresh();
}

// Render nested categories list in sidebar
function renderSidebarCategories() {
  const catList = document.getElementById('catalog-categories-list');
  if (!catList) return;
  
  let html = '';
  
  // "All Products" link
  const allCount = PRODUCTS.length;
  html += `
    <li class="category-item ${catalogState.activeCategory === null ? 'active' : ''}" data-cat="all">
      <span>All Collection</span>
      <span class="category-count">${allCount}</span>
    </li>
  `;
  
  // Loop categories
  CATEGORIES.forEach(cat => {
    const catCount = PRODUCTS.filter(p => p.category === cat.name).length;
    
    html += `
      <li class="category-item main-cat ${catalogState.activeCategory === cat.name ? 'active' : ''}" data-cat="${cat.name}">
        <span>${cat.name}</span>
        <span class="category-count">${catCount}</span>
      </li>
    `;
    
    cat.subcategories.forEach(sub => {
      const subCount = PRODUCTS.filter(p => p.subcategory === sub).length;
      if (subCount > 0) {
        html += `
          <li class="category-item sub-cat ${catalogState.activeCategory === sub ? 'active' : ''}" data-cat="${sub}" style="padding-left: 24px; font-size: 0.75rem; opacity: 0.85;">
            <span>&bull; ${sub.replace(cat.name, '').trim() || sub}</span>
            <span class="category-count">${subCount}</span>
          </li>
        `;
      }
    });
  });
  
  catList.innerHTML = html;
  
  catList.querySelectorAll('.category-item').forEach(item => {
    item.addEventListener('click', () => {
      const cat = item.dataset.cat;
      catalogState.activeCategory = cat === 'all' ? null : cat;
      catList.querySelectorAll('.category-item').forEach(i => i.classList.toggle('active', i === item));
      renderCatalog();
    });
  });
}

// Render checkbox options / buttons dynamically from product variables
function renderFilters() {
  const materials = [...new Set(PRODUCTS.map(p => p.material))].sort();
  const finishes = [...new Set(PRODUCTS.flatMap(p => p.finishes))].sort();
  const colors = [...new Set(PRODUCTS.flatMap(p => p.colors))].sort();
  const sizes = [...new Set(PRODUCTS.flatMap(p => p.sizes))].sort();
  const applications = [...new Set(PRODUCTS.flatMap(p => p.applications))].sort();
  
  // Render Materials
  const materialsDiv = document.getElementById('filter-materials');
  if (materialsDiv) {
    materialsDiv.innerHTML = materials.map(mat => `
      <button class="filter-tag" data-filter-type="material" data-value="${mat}">${mat}</button>
    `).join('');
  }
  
  // Render Finishes
  const finishesDiv = document.getElementById('filter-finishes');
  if (finishesDiv) {
    finishesDiv.innerHTML = finishes.map(fin => `
      <button class="filter-tag" data-filter-type="finish" data-value="${fin}">${fin}</button>
    `).join('');
  }
  
  // Render Colors (Swatches)
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
      const isBlack = col.toLowerCase() === 'black';
      return `
        <button class="color-swatch-btn ${isBlack ? 'color-black' : ''}" 
                data-filter-type="color" 
                data-value="${col}" 
                style="background-color: ${hex};" 
                title="${col}"></button>
      `;
    }).join('');
  }
  
  // Render Sizes
  const sizesDiv = document.getElementById('filter-sizes');
  if (sizesDiv) {
    sizesDiv.innerHTML = sizes.map(sz => `
      <button class="filter-tag" data-filter-type="size" data-value="${sz}">${sz}</button>
    `).join('');
  }
  
  // Render Applications
  const applicationsDiv = document.getElementById('filter-applications');
  if (applicationsDiv) {
    applicationsDiv.innerHTML = applications.map(app => `
      <button class="filter-tag" data-filter-type="application" data-value="${app}">${app}</button>
    `).join('');
  }
  
  // Hook click events to all filter buttons
  const filterButtons = document.querySelectorAll('.filter-tag, .color-swatch-btn');
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const type = btn.dataset.filterType;
      const val = btn.dataset.value;
      
      const index = catalogState.filters[type].indexOf(val);
      if (index === -1) {
        catalogState.filters[type].push(val);
        btn.classList.add('active');
      } else {
        catalogState.filters[type].splice(index, 1);
        btn.classList.remove('active');
      }
      
      renderCatalog();
    });
  });
}

// Hook up search, sorting, clearing events
function setupCatalogEvents() {
  const searchInput = document.getElementById('catalog-search');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      catalogState.searchQuery = e.target.value.toLowerCase().trim();
      renderCatalog();
    });
  }
  
  const sortSelect = document.getElementById('catalog-sort');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      catalogState.sortBy = e.target.value;
      renderCatalog();
    });
  }
  
  const clearBtn = document.getElementById('clear-filters-btn');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      catalogState.filters = {
        material: [],
        finish: [],
        color: [],
        size: [],
        application: []
      };
      
      document.querySelectorAll('.filter-tag, .color-swatch-btn').forEach(btn => {
        btn.classList.remove('active');
      });
      
      renderCatalog();
    });
  }
  
  // Drawer functionality removed - products now navigate to dedicated page
  // const closeBtn = document.getElementById('close-drawer-btn');
  // const overlay = document.getElementById('product-drawer-overlay');
  
  // if (closeBtn) closeBtn.addEventListener('click', closeProductDrawer);
  // if (overlay) {
  //   overlay.addEventListener('click', (e) => {
  //     if (e.target === overlay) closeProductDrawer();
  //   });
  // }
  
  // Support cursor hovers on catalog dynamic elements
  document.addEventListener('mouseover', (e) => {
    const el = e.target.closest('.product-card, .filter-tag, .color-swatch-btn, .close-drawer-btn, .selector-tag, .whatsapp-cta');
    if (el) {
      document.body.classList.add('cursor-hover');
    }
  });
  
  document.addEventListener('mouseout', (e) => {
    const el = e.target.closest('.product-card, .filter-tag, .color-swatch-btn, .close-drawer-btn, .selector-tag, .whatsapp-cta');
    if (el) {
      document.body.classList.remove('cursor-hover');
    }
  });
}

// Main filter & sort logic + DOM injection
function renderCatalog() {
  const grid = document.getElementById('catalog-products-grid');
  const countBar = document.getElementById('catalog-results-count');
  if (!grid || !countBar) return;
  
  let filtered = PRODUCTS.filter(prod => {
    if (catalogState.activeCategory) {
      if (prod.category !== catalogState.activeCategory && prod.subcategory !== catalogState.activeCategory) {
        return false;
      }
    }
    
    if (catalogState.searchQuery) {
      const inName = prod.name.toLowerCase().includes(catalogState.searchQuery);
      const inDesc = prod.description.toLowerCase().includes(catalogState.searchQuery);
      if (!inName && !inDesc) return false;
    }
    
    if (catalogState.filters.material.length > 0) {
      if (!catalogState.filters.material.includes(prod.material)) return false;
    }
    
    if (catalogState.filters.finish.length > 0) {
      const hasFinish = prod.finishes.some(f => catalogState.filters.finish.includes(f));
      if (!hasFinish) return false;
    }
    
    if (catalogState.filters.color.length > 0) {
      const hasColor = prod.colors.some(c => catalogState.filters.color.includes(c));
      if (!hasColor) return false;
    }

    if (catalogState.filters.size.length > 0) {
      const hasSize = prod.sizes.some(s => catalogState.filters.size.includes(s));
      if (!hasSize) return false;
    }

    if (catalogState.filters.application.length > 0) {
      const hasApp = prod.applications.some(a => catalogState.filters.application.includes(a));
      if (!hasApp) return false;
    }
    
    return true;
  });
  
  if (catalogState.sortBy === 'name-asc') {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  } else if (catalogState.sortBy === 'name-desc') {
    filtered.sort((a, b) => b.name.localeCompare(a.name));
  } else if (catalogState.sortBy === 'category') {
    filtered.sort((a, b) => a.category.localeCompare(b.category));
  }
  
  countBar.textContent = `Showing ${filtered.length} of ${PRODUCTS.length} products`;
  
  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; padding: 60px 0; text-align: center; color: var(--color-text-secondary); font-size: 0.9rem; letter-spacing: 0.1em; text-transform: uppercase;">
        No products match the selected criteria.
      </div>
    `;
    return;
  }
  
  grid.innerHTML = filtered.map(prod => `
    <div class="product-card" data-id="${prod.id}">
      <div class="product-image-frame">
        <img src="${prod.image}" alt="${prod.name}" loading="lazy" />
      </div>
      <div>
        <div class="product-category">${prod.subcategory}</div>
        <h4 class="product-title">${prod.name}</h4>
      </div>
      <div class="product-meta">
        <span>${prod.material}</span>
        <span>${prod.sizes[0]} +</span>
      </div>
      <button class="product-btn-inquire">View Specs Sheet</button>
    </div>
  `).join('');
  
  // Add click handlers to all product cards
  grid.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', () => {
      const id = card.dataset.id;
      // Navigate to product detail page instead of opening drawer
      window.location.href = `/product.html?id=${id}`;
    });
  });
}

// Product drawer functions removed - products now navigate to /product.html?id={id}
// Keeping the function definitions commented out in case needed for reference
/*
function openProductDrawer(product) {
  activeDrawerProduct = product;
  
  selectedInquiryOptions = {
    finish: product.finishes[0] || '',
    color: product.colors[0] || '',
    size: product.sizes[0] || '',
    application: product.applications[0] || ''
  };
  
  document.getElementById('drawer-category').textContent = product.category;
  document.getElementById('drawer-title').textContent = product.name;
  document.getElementById('drawer-subcategory').textContent = product.subcategory;
  document.getElementById('drawer-desc').textContent = product.description;
  document.getElementById('drawer-material').textContent = product.material;
  
  const imgEl = document.getElementById('drawer-image');
  if (imgEl) {
    imgEl.src = product.image;
    imgEl.alt = product.name;
  }
  
  // Render Finish selectors
  const finishSelect = document.getElementById('drawer-finish-select');
  if (finishSelect) {
    finishSelect.innerHTML = product.finishes.map((f, idx) => `
      <button class="selector-tag ${idx === 0 ? 'active' : ''}" data-type="finish" data-val="${f}">${f}</button>
    `).join('');
  }
  
  // Render Color selectors
  const colorSelect = document.getElementById('drawer-color-select');
  if (colorSelect) {
    colorSelect.innerHTML = product.colors.map((c, idx) => `
      <button class="selector-tag ${idx === 0 ? 'active' : ''}" data-type="color" data-val="${c}">${c}</button>
    `).join('');
  }
  
  // Render Size selectors
  const sizeSelect = document.getElementById('drawer-size-select');
  if (sizeSelect) {
    sizeSelect.innerHTML = product.sizes.map((s, idx) => `
      <button class="selector-tag ${idx === 0 ? 'active' : ''}" data-type="size" data-val="${s}">${s}</button>
    `).join('');
  }

  // Render Application selectors
  const appSelect = document.getElementById('drawer-app-select');
  if (appSelect) {
    appSelect.innerHTML = product.applications.map((a, idx) => `
      <button class="selector-tag ${idx === 0 ? 'active' : ''}" data-type="application" data-val="${a}">${a}</button>
    `).join('');
  }
  
  const drawerSelectors = document.querySelectorAll('.spec-drawer .selector-tag');
  drawerSelectors.forEach(btn => {
    btn.addEventListener('click', () => {
      const type = btn.dataset.type;
      const val = btn.dataset.val;
      
      selectedInquiryOptions[type] = val;
      
      btn.parentElement.querySelectorAll('.selector-tag').forEach(b => {
        b.classList.toggle('active', b === btn);
      });
      
      updateWhatsAppLink();
    });
  });
  
  const overlay = document.getElementById('product-drawer-overlay');
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
  
  updateWhatsAppLink();
}
*/

/*
function closeProductDrawer() {
  const overlay = document.getElementById('product-drawer-overlay');
  if (overlay) overlay.classList.remove('active');
  
  document.body.style.overflow = 'auto';
  activeDrawerProduct = null;
}

// Generate the prefilled inquiry text pointing to WhatsApp number
function updateWhatsAppLink() {
  const whatsappBtn = document.getElementById('whatsapp-inquiry-btn');
  if (!whatsappBtn || !activeDrawerProduct) return;
  
  // WhatsApp phone number (change this to your business number)
  const phone = '9895544007'; // Format: country code + number (without + or -)
  
  const msg = `Hello MANTIS Hardware,

I am interested in inquiring about the following hardware product:

Product Name: ${activeDrawerProduct.name}
Category: ${activeDrawerProduct.category}
Subcategory: ${activeDrawerProduct.subcategory}
Base Material: ${activeDrawerProduct.material}

My configured specification:
- Selected Finish: ${selectedInquiryOptions.finish}
- Selected Color: ${selectedInquiryOptions.color}
- Selected Size: ${selectedInquiryOptions.size}
- Door Application: ${selectedInquiryOptions.application}

Please provide catalog details, lead time, and pricing quotation for my project.`;

  const encodedMsg = encodeURIComponent(msg);
  whatsappBtn.href = `https://wa.me/${phone}?text=${encodedMsg}`;
  
  console.log('WhatsApp link updated for product:', activeDrawerProduct.name);
}
*/
// Start everything when DOM is loaded
window.addEventListener('DOMContentLoaded', init);


// Start the application
// Add a fallback timeout to hide loading screen
setTimeout(() => {
  if (loadingScreen && loadingScreen.style.display !== 'none') {
    console.warn('Loading timeout - forcing hide');
    hideLoadingScreen();
  }
}, 5000);

// Header scroll effect
window.addEventListener('scroll', () => {
  const header = document.querySelector('.global-header');
  if (header) {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
});

init();
