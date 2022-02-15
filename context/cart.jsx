import { useState, createContext, useContext } from 'react';
import { toast } from 'react-hot-toast';

const Context = createContext({
  cart: [],
  setCart: () => {},
  handleAddToCart: (id, price, name) => {},
  handleSubtractFromCart: (id, name) => {},
  handleRemoveFromCart: (id, name) => {},
  clearCart: () => {},
});

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const handleAddToCart = (id, price, name) => {
    const products = [...cart];
    const productIndex = products.findIndex((product) => product.id === id);

    if (productIndex < 0) {
      products.push({ id: id, quantity: 1, price: price, name: name });
    } else {
      products[productIndex].quantity++;
    }

    toast.success(`Added ${name} to cart`);
    setCart(() => products);
  };

  const handleSubtractFromCard = (id, name) => {
    let products = [...cart];
    const productIndex = products.findIndex((product) => product.id === id);

    if (productIndex < 0) {
      setCart(() => products);
    } else {
      products[productIndex].quantity--;
    }

    if (products[productIndex].quantity === 0) {
      products = products.filter((product) => product.id !== id);
      toast.error(`Removed ${name} from cart`);
      setCart(() => products);
      return;
    }

    toast.error(`Removed 1 ${name} from cart`);
    setCart(() => products);
  };

  const handleRemoveFromCart = (id, name) => {
    let products = [...cart];
    const productIndex = products.findIndex((product) => product.id === id);

    if (productIndex < 0) {
      setCart(() => products);
    }

    products = products.filter((product) => product.id !== id);
    toast.error(`Removed all ${name} ships from cart`);
    setCart(() => products);
    return;
  };

  const clearCart = () => {
    setCart(() => []);
    toast.error(`Removed all ships from cart`);
  };

  const exposed = {
    cart,
    setCart,
    handleAddToCart,
    handleSubtractFromCard,
    handleRemoveFromCart,
    clearCart,
  };

  return <Context.Provider value={exposed}>{children}</Context.Provider>;
};

export const useCart = () => {
  return useContext(Context);
};

export default CartProvider;
