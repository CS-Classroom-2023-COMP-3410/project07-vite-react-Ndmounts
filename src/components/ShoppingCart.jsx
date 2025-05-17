import Button from './Button';
import { useCart } from '../context/CartContext';

function ShoppingCart({ variant = 'summary', onCheckout }) {
  const { cart, totalItems, totalPrice, removeOne } = useCart();

  if (variant === 'summary') {
    //  show nothing if empty –– fulfils “Only display it if items > 0”
    if (totalItems === 0) return null;
    return (
      <div style={{
        padding: '10px', background: '#f8f9fa', borderRadius: '8px',
        margin: '20px 0', display: 'flex', justifyContent: 'space-between'
      }}>
        <span><strong>{totalItems}</strong> items • ${totalPrice}</span>
        <Button onClick={onCheckout} variant="success">Go to Cart</Button>
      </div>
    );
  }

  /* full cart (used in CartPage) */
  return (
    <div style={{ maxWidth: 500, margin: '0 auto' }}>
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {cart.map(item => (
              <li key={item.id} style={{
                display: 'flex', justifyContent: 'space-between',
                borderBottom: '1px solid #ddd', padding: '8px 0'
              }}>
                <div>
                  <strong>{item.title}</strong> × {item.quantity}<br />
                  ${item.price * item.quantity}
                </div>
                <Button variant="danger" onClick={() => removeOne(item.id)}>−</Button>
              </li>
            ))}
          </ul>
          <div style={{
            margin: '10px 0', paddingTop: 10, borderTop: '2px solid #ddd',
            display: 'flex', justifyContent: 'space-between'
          }}>
            <strong>Total:</strong>
            <strong>${totalPrice}</strong>
          </div>
          <Button variant="success" style={{ width: '100%' }}
                  onClick={onCheckout}>Checkout</Button>
        </>
      )}
    </div>
  );
}

export default ShoppingCart;
