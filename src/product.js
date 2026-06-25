import { PRODUCTS } from './products/catalogData.js';

const params = new URLSearchParams(window.location.search);
const productId = params.get('id');

const product = PRODUCTS.find(p => p.id === productId);

if (product) {
  document.getElementById('drawer-category').textContent = product.category || '';
  document.getElementById('drawer-title').textContent = product.name || '';
  document.getElementById('drawer-subcategory').textContent = product.subcategory || '';
  document.getElementById('drawer-image').src = product.image || '';
  document.getElementById('drawer-desc').textContent = product.description || '';

  document.getElementById('drawer-material').textContent =
    product.material || '-';

  document.getElementById('drawer-finishes').textContent =
    product.finishes?.join(', ') || '-';

  document.getElementById('drawer-colors').textContent =
    product.colors?.join(', ') || '-';

  document.getElementById('drawer-sizes').textContent =
    product.sizes?.join(', ') || '-';
}