# MANTIS Hardware - React Version

## 🚀 Quick Start

### Development Server (React Version)
```bash
npm run dev:react
```

### Development Server (Original Vanilla JS)
```bash
npm run dev
```

### Build for Production
```bash
npm run build:react
```

## 📁 Project Structure

```
aura-hardware/
├── src/                          # Original Vanilla JS code (preserved)
│   ├── products/
│   │   └── catalogData.js        # Shared product data
│   ├── utils/
│   └── style.css                 # Shared global styles
│
├── src-react/                    # New React application
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.jsx
│   │   │   └── LoadingScreen.jsx
│   │   ├── products/
│   │   │   ├── FeaturedProducts.jsx
│   │   │   ├── CategorySidebar.jsx
│   │   │   ├── FilterPanel.jsx
│   │   │   ├── ProductGrid.jsx
│   │   │   └── ProductDrawer.jsx
│   │   ├── 3d/
│   │   │   ├── Scene3D.jsx
│   │   │   ├── Lighting.jsx
│   │   │   ├── Environment.jsx
│   │   │   └── models/
│   │   │       ├── PullHandleModel.jsx
│   │   │       ├── LeverHandleModel.jsx
│   │   │       └── SmartLockModel.jsx
│   │   └── ui/
│   ├── contexts/
│   │   └── ProductContext.jsx    # Global state management
│   ├── hooks/
│   │   ├── useGSAP.js            # Animation hooks
│   │   └── useHardwareMaterial.js # Material system
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   └── ShopPage.jsx
│   ├── App.jsx
│   └── main.jsx
│
├── public/                       # Static assets (images, logos)
├── index-react.html              # React entry point
├── index.html                    # Original entry point
└── vite.config.js                # Vite configuration
```

## 🎨 Key Features

### ✅ Completed React Migration

1. **Component Architecture**
   - Functional components with hooks
   - React Router for navigation
   - Context API for state management

2. **3D Visualization**
   - React Three Fiber integration
   - Interactive product models (Pull Handle, Lever Handle, Smart Lock)
   - Mouse parallax effects
   - Material system with finish variations

3. **E-Commerce Features**
   - Product catalog with filtering
   - Category navigation
   - Search functionality
   - Product detail drawer
   - Responsive design

4. **Animations**
   - GSAP ScrollTrigger integration
   - Smooth page transitions
   - Interactive product animations
   - Scroll-driven effects

## 🛠️ Technology Stack

- **React 19** - UI framework
- **React Router 7** - Client-side routing
- **React Three Fiber** - 3D rendering
- **@react-three/drei** - 3D helpers
- **GSAP** - Animations
- **Three.js** - 3D engine
- **Vite** - Build tool

## 📦 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start original vanilla JS version |
| `npm run dev:react` | Start React version |
| `npm run build` | Build original version |
| `npm run build:react` | Build React version for production |
| `npm run preview` | Preview production build |

## 🎯 State Management

### ProductContext
Manages global product state including:
- Active category filter
- Search queries
- Material/finish/color/size filters
- Sort order
- Active product drawer

### Usage Example
```jsx
import { useProducts } from '../contexts/ProductContext'

function MyComponent() {
  const { 
    getFilteredProducts, 
    setCategory, 
    updateFilters 
  } = useProducts()
  
  // Use the context...
}
```

## 🎨 Styling

The React version uses the existing CSS from `src/style.css` and `src/shop.css` for consistency with the original design. All styles are preserved to maintain the minimal, elegant aesthetic.

## 🔄 Migration Notes

### What's Different?
- **Declarative 3D**: Three.js code converted to React Three Fiber components
- **State Management**: jQuery/vanilla JS state replaced with React Context
- **Animations**: GSAP animations adapted to React lifecycle
- **Routing**: Multi-page app with React Router

### What's Preserved?
- Original CSS styling
- Product catalog data
- Image assets
- Design system
- User experience

## 🚧 Future Enhancements

- [ ] Add shopping cart functionality
- [ ] Implement product comparison
- [ ] Add user authentication
- [ ] Backend API integration
- [ ] Payment gateway integration
- [ ] Admin dashboard for product management
- [ ] Performance optimizations (code splitting, lazy loading)
- [ ] PWA support
- [ ] Analytics integration

## 📝 Notes

- Both versions (vanilla JS and React) coexist in the project
- Product data in `src/products/catalogData.js` is shared between both versions
- The React version uses `index-react.html` as entry point
- Original version remains accessible via `index.html`

## 🤝 Contributing

When contributing to the React version:
1. Follow React best practices
2. Use functional components with hooks
3. Maintain TypeScript-ready code structure
4. Keep components small and focused
5. Add prop-types or TypeScript for type safety (future)

## 📄 License

Private project for MANTIS Hardware
