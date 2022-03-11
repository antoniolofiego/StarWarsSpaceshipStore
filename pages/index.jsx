import { useState, useEffect } from 'react';
import useSWR from 'swr';
import { useTheme } from 'next-themes';

import { Cart, Starship } from '../components';

import { useWithToast } from '../hooks';

const Home = () => {
  const [pageIndex, setPageIndex] = useState(1);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  const { data, isLoading } = useWithToast(
    useSWR(`https://swapi.dev/api/starships?page=${pageIndex}`)
  );

  const MAX_PAGES = Math.round(data?.count / 10, 0) - 1;
  const MIN_PAGES = 1;

  if (!mounted) return null;

  const ThemeSwitcher = () => {
    return (
      <>
        {resolvedTheme === 'dark' ? (
          <button
            name='light-theme'
            className='fixed top-0 right-0 p-4 text-5xl'
            onClick={() => setTheme('light')}
          >
            ☀️
          </button>
        ) : (
          <button
            name='dark-theme'
            className='fixed top-0 right-0 p-4 text-5xl'
            onClick={() => setTheme('dark')}
          >
            🌚
          </button>
        )}
      </>
    );
  };

  return (
    <>
      <ThemeSwitcher />
      <main className='flex items-center justify-center'>
        <div className='space-y-8'>
          <h1 className='py-4 text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-br dark:from-white from-black to-yellow-600 font-star'>
            Star Wars Starship Store
          </h1>
          {isLoading && <p>Loading</p>}
          <div className='grid grid-cols-2 gap-4'>
            {data &&
              data.results.map((starship) => {
                return <Starship key={starship.id} starship={starship} />;
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
    </>
  );
};

export default Home;
