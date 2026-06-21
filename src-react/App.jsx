import { Routes, Route } from 'react-router-dom'
import { ProductProvider } from './contexts/ProductContext'
import HomePage from './pages/HomePage'
import ShopPage from './pages/ShopPage'
import './App.css'

function App() {
  return (
    <ProductProvider>
      <div className="app">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
        </Routes>
      </div>
    </ProductProvider>
  )
}

export default App
