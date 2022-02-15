import Image from 'next/image';

import { useCart } from '../context/cart';

export const Cart = () => {
  const { cart, handleAddToCart, handleSubractFromCart, handleRemoveFromCart } =
    useCart();

  const total = () => {
    let total = 0;
    cart.map((item) => (total += item.price * item.quantity));
    return total;
  };

  const totalQuantity = () => {
    let total = 0;
    cart.map((item) => (total += item.quantity));
    return total;
  };

  return (
    <div className='flex flex-col justify-center w-full space-y-2'>
      {cart.length > 0 ? (
        <>
          <div className='pb-2 space-y-2 border-b-2 border-black'>
            {cart.map((product) => {
              return (
                <div
                  key={product.id}
                  className='grid items-center grid-cols-8 justify-items-center'
                >
                  <button
                    className='col-span-1 px-4 py-2 bg-gray-500 rounded-lg text-slate-50'
                    onClick={() =>
                      handleRemoveFromCart(product.id, product.name)
                    }
                  >
                    x
                  </button>
                  <p className='col-span-2'>{product.name}</p>
                  <div className='flex col-span-2 space-x-2'>
                    <span>{product.quantity} x</span>
                    <span className='flex items-center'>
                      <Image
                        src='/images/credit.png'
                        alt='Star Wars Credit'
                        height='16px'
                        width='12px'
                      />
                      {product.price.toLocaleString()}
                    </span>
                  </div>
                  <div className='col-span-2'>
                    <span className='flex items-center'>
                      <Image
                        src='/images/credit.png'
                        alt='Star Wars Credit'
                        height='16px'
                        width='12px'
                      />
                      {(product.price * product.quantity).toLocaleString()}
                    </span>
                  </div>
                  <div className='flex justify-between space-x-4'>
                    <button
                      className='w-12 px-4 py-2 bg-gray-500 rounded-lg disabled:bg-gray-800 text-slate-50 disabled:text-slate-400'
                      disabled={product.price.toLocaleString() === 'NaN'}
                      onClick={() =>
                        handleSubractFromCart(product.id, product.name)
                      }
                    >
                      -
                    </button>
                    <button
                      className='w-12 px-4 py-2 bg-gray-500 rounded-lg disabled:bg-gray-800 text-slate-50 disabled:text-slate-400'
                      disabled={product.price.toLocaleString() === 'NaN'}
                      onClick={() =>
                        handleAddToCart(product.id, product.price, product.name)
                      }
                    >
                      +
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          <div className='grid items-center grid-cols-8 justify-items-center'>
            <p className='col-span-1'></p>
            <p className='col-span-2'>TOTAL</p>
            <div className='flex col-span-2 space-x-2'>
              {totalQuantity()} spaceships
            </div>
            <div className='col-span-2'>
              <span className='flex items-center'>
                <Image
                  src='/images/credit.png'
                  alt='Star Wars Credit'
                  height='16px'
                  width='12px'
                />
                {total().toLocaleString()}
              </span>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};
