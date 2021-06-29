import { ProductType } from '@enum/product';
import Image from 'next/image';
import { useState } from 'react';
import { StarIcon } from '@heroicons/react/solid';
import Currency from 'react-currency-formatter';

type ProductCardProps = {
  product: ProductType;
};

const MIN_RATING = 1;
const MAX_RATING = 5;

const ProductCard = ({ product }: ProductCardProps) => {
  const { id, title, price, description, category, image } = product;
  const [rating] = useState(
    Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING
  );

  const [hasPrime] = useState(Math.random() < 0.5);

  return (
    <div className="relative flex flex-col m-5 bg-white z-30 p-10">
      <p className="absolute top-2 right-2 text-xs italic text-gray-400">
        {category}
      </p>

      <Image
        src={image}
        alt={title}
        height={200}
        width={200}
        objectFit="contain"
      />

      <h4 className="my-3">{title}</h4>

      <div className="flex">
        {Array(rating)
          .fill(rating)
          .map((_, index) => (
            <StarIcon className="h-5 text-yellow-500" key={index} />
          ))}
      </div>

      <p className="text-xs my-2 line-clamp-2">{description}</p>

      <div className="mb-5">
        <Currency quantity={price} currency="USD" />
      </div>

      {hasPrime && (
        <div className="flex items-center space-x-2 -mt-5 mb-2">
          <Image
            src="https://links.papareact.com/fdw"
            alt="Prime Delivery"
            width={48}
            height={48}
          />
          <p className="text-xs text-gray-500">FREE Next-Day Delivery</p>
        </div>
      )}

      <button className="mt-auto button">Add To Basket</button>
    </div>
  );
};

export default ProductCard;
