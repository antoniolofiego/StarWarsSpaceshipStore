import { AddToCart } from '../components';

export const Starship = ({ starship }) => {
  const id = starship.url.split('/')[starship.url.split('/').length - 2];
  const price = parseInt(starship.cost_in_credits);

  return (
    <div key={starship.name} className='flex items-center justify-between'>
      <div className='p-2 mx-2 space-y-2'>
        <h2 className='text-xl'>{starship.name}</h2>
        <h3 className='text-lg'>{starship.model}</h3>
      </div>
      <div className='flex flex-col items-end justify-end'>
        <p>
          {isNaN(price) ? (
            'Unavailable'
          ) : (
            <span className='flex items-center font-star'>
              $ {price.toLocaleString()}
            </span>
          )}
        </p>
        <AddToCart id={id} price={price} name={starship.name} />
      </div>
    </div>
  );
};
