import { useState, createContext, useContext } from 'react';
import { toast } from 'react-hot-toast';

const Context = createContext({
  cart: [],
  setCart: () => {},
  handleAddToCart: (id, price, name) => {},
  handleRemoveFromCart: (id, name) => {},
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

  const handleRemoveFromCart = (id, name) => {
    const products = [...cart];
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

  const exposed = {
    cart,
    setCart,
    handleAddToCart,
    handleRemoveFromCart,
  };

  return <Context.Provider value={exposed}>{children}</Context.Provider>;
};

export const useCart = () => {
  return useContext(Context);
};

export default CartProvider;
