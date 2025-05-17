import ShoppingCart from '../components/ShoppingCart';

function CartPage() {
  return (
    <div>
      <h1>Cart</h1>
      <ShoppingCart variant="full" onCheckout={() => alert('Checkout complete!')} />
    </div>
  );
}

export default CartPage;
