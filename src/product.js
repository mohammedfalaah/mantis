import './style.css';
import './shop.css';
import { PRODUCTS } from './products/catalogData.js';

console.log('Product.js loaded');
console.log('Total products:', PRODUCTS.length);

// Get product ID from URL
const params = new URLSearchParams(window.location.search);
const productId = params.get('id');

console.log('Product ID from URL:', productId);

// Find the product
const product = PRODUCTS.find(p => p.id === productId);

console.log('Found product:', product);

if (!product) {
  // Show error message instead of immediate redirect for debugging
  console.error('Product not found with ID:', productId);
  document.getElementById('drawer-desc').textContent = `Product with ID "${productId}" not found. Redirecting to shop...`;
  setTimeout(() => {
    window.location.href = '/shop.html';
  }, 2000);
} else {
  console.log('Loading product:', product.name);
  
  // Update page title
  const pageTitle = document.getElementById('page-title');
  if (pageTitle) {
    pageTitle.textContent = `${product.name} — MANTIS Hardware`;
  }
  
  // Update breadcrumbs
  const breadcrumbCategory = document.getElementById('breadcrumb-category');
  const breadcrumbProduct = document.getElementById('breadcrumb-product');
  if (breadcrumbCategory) breadcrumbCategory.textContent = product.category;
  if (breadcrumbProduct) breadcrumbProduct.textContent = product.name;
  
  // Update product details
  const categoryEl = document.getElementById('drawer-category');
  const titleEl = document.getElementById('drawer-title');
  const subcategoryEl = document.getElementById('drawer-subcategory');
  const imageEl = document.getElementById('drawer-image');
  const descEl = document.getElementById('drawer-desc');
  const materialEl = document.getElementById('drawer-material');
  const finishesEl = document.getElementById('drawer-finishes');
  const colorsEl = document.getElementById('drawer-colors');
  const sizesEl = document.getElementById('drawer-sizes');
  
  if (categoryEl) categoryEl.textContent = product.category || '';
  if (titleEl) titleEl.textContent = product.name || '';
  if (subcategoryEl) subcategoryEl.textContent = product.subcategory || '';
  if (imageEl) {
    imageEl.src = product.image || '';
    imageEl.alt = product.name || '';
  }
  if (descEl) descEl.textContent = product.description || '';
  if (materialEl) materialEl.textContent = product.material || '-';
  if (finishesEl) finishesEl.textContent = product.finishes?.join(', ') || '-';
  if (colorsEl) colorsEl.textContent = product.colors?.join(', ') || '-';
  if (sizesEl) sizesEl.textContent = product.sizes?.join(', ') || '-';
  
  console.log('All elements updated');
  
  // Setup inquiry button
  const inquireBtn = document.getElementById('inquire-btn');
  if (inquireBtn) {
    inquireBtn.addEventListener('click', () => {
      // Scroll to contact section on home page or open email
      const subject = encodeURIComponent(`Inquiry about ${product.name}`);
      const body = encodeURIComponent(`Hello,\n\nI am interested in learning more about the ${product.name} (${product.category}).\n\nPlease provide more information.\n\nThank you.`);
      window.location.href = `mailto:info@mantishardware.com?subject=${subject}&body=${body}`;
    });
  }
  
  // Setup share button
  const shareBtn = document.getElementById('share-btn');
  if (shareBtn) {
    shareBtn.addEventListener('click', async () => {
      const shareData = {
        title: product.name,
        text: `Check out ${product.name} from MANTIS Hardware`,
        url: window.location.href
      };
      
      // Check if Web Share API is supported
      if (navigator.share) {
        try {
          await navigator.share(shareData);
        } catch (err) {
          // User cancelled or error occurred
          copyToClipboard(window.location.href);
        }
      } else {
        // Fallback: copy to clipboard
        copyToClipboard(window.location.href);
      }
    });
  }
  
  console.log('Product page fully loaded');
}

// Helper function to copy to clipboard
function copyToClipboard(text) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => {
      alert('Product link copied to clipboard!');
    }).catch(() => {
      fallbackCopy(text);
    });
  } else {
    fallbackCopy(text);
  }
}

function fallbackCopy(text) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  try {
    document.execCommand('copy');
    alert('Product link copied to clipboard!');
  } catch (err) {
    alert('Failed to copy link');
  }
  document.body.removeChild(textarea);
}