import { useState } from 'react';
import Card   from '../components/Card';
import Button from '../components/Button';
import { useCart } from '../context/CartContext';

function ProductsPage() {
  // ------------------------------------------------------------------
  //  local product catalogue (keeps track of per‑item stock only)
  // ------------------------------------------------------------------
  const initialProducts = [
    {
      id: 1,
      title: 'Smartphone',
      description: 'Latest model with advanced features',
      price: 699,
      stock: 15,
      imageUrl: 'https://via.placeholder.com/300x150?text=Smartphone'
    },
    {
      id: 2,
      title: 'Laptop',
      description: 'Powerful laptop for work and gaming',
      price: 1299,
      stock: 8,
      imageUrl: 'https://via.placeholder.com/300x150?text=Laptop'
    },
    {
      id: 3,
      title: 'Headphones',
      description: 'Noise‑cancelling wireless headphones',
      price: 249,
      stock: 23,
      imageUrl: 'https://via.placeholder.com/300x150?text=Headphones'
    },
    {
      id: 4,
      title: 'Smartwatch',
      description: 'Fitness tracking and notifications',
      price: 199,
      stock: 12,
      imageUrl: 'https://via.placeholder.com/300x150?text=Smartwatch'
    }
  ];

  const [products, setProducts] = useState(initialProducts);
  const [sortBy,   setSortBy]   = useState('default');

  // ---------- cart hooks --------------------------------------------
  const { cart, totalItems, addToCart, removeOne } = useCart();

  // ---------- derived data ------------------------------------------
  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === 'price-low')  return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'name')       return a.title.localeCompare(b.title);
    return a.id - b.id; // default
  });

  // ------------------------------------------------------------------
  //  handlers
  // ------------------------------------------------------------------
  const handleAdd = (product) => {
    const p = products.find(pr => pr.id === product.id);
    if (!p || p.stock === 0) return;

    // decrease local stock
    setProducts(products.map(pr =>
      pr.id === product.id ? { ...pr, stock: pr.stock - 1 } : pr
    ));

    // add to global cart
    addToCart(product);
  };

  const handleRemove = (productId) => {
    const item = cart.find(i => i.id === productId);
    if (!item) return;

    // restore one unit of stock
    setProducts(products.map(pr =>
      pr.id === productId ? { ...pr, stock: pr.stock + 1 } : pr
    ));

    // remove one unit from global cart
    removeOne(productId);
  };

  // ------------------------------------------------------------------
  //  render
  // ------------------------------------------------------------------
  return (
    <div>
      <h1>Products</h1>

      {/* top bar ------------------------------------------------------ */}
      <div style={{
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', marginBottom: 20
      }}>
        <div>
          <label htmlFor="sort-select" style={{ marginRight: 10 }}>Sort by:</label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            style={{ padding: 5 }}
          >
            <option value="default">Default</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="name">Name</option>
          </select>
        </div>

        <strong>{totalItems} item{totalItems !== 1 ? 's' : ''} in cart</strong>
      </div>

      {/* product grid ------------------------------------------------- */}
      <div style={{
        display: 'flex', flexWrap: 'wrap', gap: 20
      }}>
        {sortedProducts.map(product => (
          <Card
            key={product.id}
            title={product.title}
            description={`${product.description} — $${product.price}`}
            imageUrl={product.imageUrl}
            actions={[
              {
                label: `Add to Cart ($${product.price})`,
                onClick: () => handleAdd(product),
                variant: product.stock > 0 ? 'primary' : 'secondary',
                disabled: product.stock === 0
              },
              ...(cart.some(i => i.id === product.id)
                  ? [{
                      label: 'Remove One',
                      onClick: () => handleRemove(product.id),
                      variant: 'danger'
                    }]
                  : [])
            ]}
          >
            <p>In stock: {product.stock}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default ProductsPage;
