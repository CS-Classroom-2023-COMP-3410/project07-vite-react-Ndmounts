import { useState } from 'react';
import { CartProvider } from './context/CartContext';
import ShoppingCart from './components/ShoppingCart';

import Header       from './components/Header';
import HomePage     from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProfilePage  from './pages/ProfilePage';
import CartPage     from './pages/CartPage';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const handleNavigate = (pageId) => setCurrentPage(pageId);

  const renderPage = () => {
    switch (currentPage) {
      case 'products': return <ProductsPage />;
      case 'profile':  return <ProfilePage />;
      case 'cart':     return <CartPage />;
      case 'home':
      default:         return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <CartProvider>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: 20 }}>
        <Header currentPage={currentPage} onNavigate={handleNavigate} />

        {/* cart summary visible on every page */}
        <ShoppingCart
          variant="summary"
          onCheckout={() => setCurrentPage('cart')}
        />

        <main>{renderPage()}</main>

        <footer style={{
          marginTop: 50, padding: 20, borderTop: '1px solid #eee',
          textAlign: 'center', color: '#666'
        }}>
          <p>React Multi‑Page Application</p>
        </footer>
      </div>
    </CartProvider>
  );
}

export default App;
