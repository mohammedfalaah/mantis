# Testing Guide - Product Detail Navigation

## ✅ What Should Work

### From Shop Page:
1. Go to `/shop` page
2. See grid of products with "View Details" button
3. **Click anywhere on a product card** OR **Click "View Details" button**
4. Should navigate to `/product/{product-id}`
5. Product detail page should load with all information

### From Home Page:
1. Go to `/` (home page)
2. Scroll to "Featured Products" section
3. **Click on any featured product card**
4. Should navigate to `/product/{product-id}`
5. Product detail page should load

## 🔍 Debugging Steps

### Step 1: Check if Shop page is loading
- Open browser console (F12)
- Go to `/shop`
- You should see products displayed

### Step 2: Click a product
- Click on any product card
- Check browser console for: `"Product clicked: [ProductName] [product-id]"`
- URL should change to: `/product/[product-id]`

### Step 3: Verify Product Detail Page
- Product image should display
- Product name, category, description should show
- Specifications table should show
- "Inquire" and "Share" buttons should be visible
- "Back to Shop" link should work

## 🚨 If It's Not Working

### Issue 1: Click does nothing
**Check:**
- Open browser console (F12)
- Click a product
- Do you see "Product clicked: ..." message?
  - ✅ YES → Navigation is the issue
  - ❌ NO → Click handler not working

### Issue 2: Navigation doesn't work
**Check:**
- Does the URL change when you click?
  - ✅ YES → ProductDetailPage not loading
  - ❌ NO → React Router issue

### Issue 3: Product page shows "Loading..." forever
**Check:**
- Open browser console
- Look for errors
- Check if product ID in URL matches a product in catalogData.js

## 🧪 Manual Test

### Test URL directly:
1. Open browser
2. Type: `http://localhost:5173/product/p-01`
3. Should see a product detail page

### If direct URL works but clicks don't:
- The ProductDetailPage component works ✅
- The navigation/routing has an issue ❌

## 📝 Expected Console Output

When clicking a product, you should see:
```
Product clicked: Brass Pull Handle 300mm p-01
```

Then the page should navigate.

## 🔧 Quick Fix Checklist

- [ ] `npm run dev` is running
- [ ] No console errors in browser
- [ ] `/shop` page shows products
- [ ] Products have "View Details" button
- [ ] Clicking product logs to console
- [ ] URL changes when clicking
- [ ] `/product/:id` route is in App.jsx
- [ ] ProductDetailPage.jsx exists in src-react/pages/

## 🎯 Test Each Route

1. **Home → Product**
   - Go to `/`
   - Click featured product
   - Should go to `/product/{id}`

2. **Shop → Product**
   - Go to `/shop`
   - Click any product
   - Should go to `/product/{id}`

3. **Product → Back**
   - On product page
   - Click "Back to Shop"
   - Should go to `/shop`

4. **Browser Back Button**
   - Navigate: Home → Shop → Product
   - Click browser back button
   - Should go: Product → Shop → Home

All navigation should be **instant** with no page reload (SPA behavior).
