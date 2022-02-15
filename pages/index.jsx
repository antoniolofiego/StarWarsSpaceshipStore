import { useState } from 'react';
import useSWR from 'swr';
import Image from 'next/image';

import { Cart, AddToCart } from '../components';

import { useWithToast } from '../hooks';

const Home = () => {
  const [pageIndex, setPageIndex] = useState(1);

  const { data, isLoading } = useWithToast(
    useSWR(`https://swapi.dev/api/starships?page=${pageIndex}`)
  );

  const MAX_PAGES = Math.round(data?.count / 10, 0) - 1;
  const MIN_PAGES = 1;

  return (
    <main className='flex items-center justify-center'>
      <div className='space-y-8'>
        <h1 className='text-4xl text-center'>Star Wars Starship Store</h1>
        {isLoading && <p>Loading</p>}
        <div className='grid grid-cols-2 gap-4'>
          {data &&
            data.results.map((starship) => {
              const id =
                starship.url.split('/')[starship.url.split('/').length - 2];
              const price = parseInt(starship.cost_in_credits);
              return (
                <div
                  key={starship.name}
                  className='flex items-center justify-between'
                >
                  <div className='p-2 mx-2 space-y-2'>
                    <h2 className='text-xl'>{starship.name}</h2>
                    <h3 className='text-lg'>{starship.model}</h3>
                  </div>
                  <div className='flex flex-col items-end justify-end'>
                    <p>
                      {isNaN(price) ? (
                        'Unavailable'
                      ) : (
                        <span className='flex items-center'>
                          <Image
                            src='/images/credit.png'
                            alt='Star Wars Credit'
                            height='16px'
                            width='12px'
                          />
                          {price.toLocaleString()}
                        </span>
                      )}
                    </p>
                    <AddToCart id={id} price={price} name={starship.name} />
                  </div>
                </div>
              );
            })}
        </div>
        <div className='flex items-center justify-center space-x-3'>
          <button
            disabled={pageIndex === MIN_PAGES}
            className='disabled:text-gray-400'
            onClick={() => setPageIndex(MIN_PAGES)}
          >
            Go to first
          </button>

          <button
            disabled={pageIndex === MIN_PAGES}
            className='disabled:text-gray-400'
            a
            onClick={() => setPageIndex((pageIndex) => pageIndex - 1)}
          >
            Previous
          </button>

          <button
            disabled={pageIndex === MAX_PAGES}
            className='disabled:text-gray-400'
            onClick={() => setPageIndex((pageIndex) => pageIndex + 1)}
          >
            Next
          </button>
          <button
            disabled={pageIndex === MAX_PAGES}
            className='disabled:text-gray-400'
            onClick={() => setPageIndex(MAX_PAGES)}
          >
            Go to last
          </button>
        </div>
        <Cart />
      </div>
    </main>
  );
};

export default Home;