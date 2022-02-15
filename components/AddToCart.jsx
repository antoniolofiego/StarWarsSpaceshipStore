import { useCart } from '../context/cart';

export const AddToCart = ({ id, price, name }) => {
  const { cart, handleAddToCart, handleSubractFromCart } = useCart();

  console.log(handleAddToCart);

  const isInCart = (id) => {
    return cart.findIndex((product) => product.id === id) > -1;
  };

  return (
    <>
      {isInCart(id) ? (
        <div className='flex justify-between space-x-4'>
          <button
            className='w-12 px-4 py-2 bg-gray-500 rounded-lg disabled:bg-gray-800 text-slate-50 disabled:text-slate-400'
            disabled={price.toLocaleString() === 'NaN'}
            onClick={() => handleSubractFromCart(id, name)}
          >
            -
          </button>
          <button
            className='w-12 px-4 py-2 bg-gray-500 rounded-lg disabled:bg-gray-800 text-slate-50 disabled:text-slate-400'
            disabled={price.toLocaleString() === 'NaN'}
            onClick={() => handleAddToCart(id, price, name)}
          >
            +
          </button>
        </div>
      ) : (
        <button
          className='w-32 px-4 py-2 bg-gray-500 rounded-lg disabled:bg-gray-800 text-slate-50 disabled:text-slate-400'
          disabled={price.toLocaleString() === 'NaN'}
          onClick={() => handleAddToCart(id, price, name)}
        >
          Add to Cart
        </button>
      )}
    </>
  );
};
