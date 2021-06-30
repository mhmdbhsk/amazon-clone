import { ProductType } from '@enum/product';
import { StarIcon } from '@heroicons/react/solid';
import Image from 'next/image';
import Currency from 'react-currency-formatter';
import { useDispatch, useSelector } from 'react-redux';
import {
  basketUpdated,
  decreaseItems,
  increaseItems,
  removeFromBasket,
  selectItems,
} from '@slice/basketSlice';
import { useEffect, useState } from 'react';

type CheckoutProductCardProps = {
  product: ProductType;
};

const CheckoutProductCard = ({ product }: CheckoutProductCardProps) => {
  const {
    id,
    title,
    price,
    description,
    category,
    image,
    total,
    hasPrime,
    rating,
  } = product;
  const [quantity, setQuantity] = useState(0);
  const dispatch = useDispatch();
  const items = useSelector(selectItems);
  const isBasketUpdated = useSelector(basketUpdated);

  useEffect(() => {
    const item = items.find((item) => item.id === product.id);

    if (item) {
      setQuantity(item.total as number);
    } else {
      setQuantity(0);
    }
  }, [isBasketUpdated, product, items]);

  const decreaseItemInBasket = () => {
    const item = {
      ...product,
      hasPrime,
      rating,
    };
    dispatch(decreaseItems(item));
  };
  const increaseItemInBasket = () => {
    const item = {
      ...product,
      hasPrime,
      rating,
    };
    dispatch(increaseItems(item));
  };

  const removeItemFromBasket = () => {
    dispatch(removeFromBasket({ id }));
  };

  return (
    <div className="grid grid-cols-5">
      <Image
        src={image}
        alt={title}
        width={200}
        height={200}
        objectFit="contain"
      />

      <div className="col-span-3 mx-5">
        <p>{title}</p>
        <div className="flex">
          {Array(rating)
            .fill(rating)
            .map((_, i) => (
              <StarIcon className="h-5 text-yellow-500" key={i} />
            ))}
        </div>
        <p className="text-xs my-2 line-clamp-3">{description}</p>
        <Currency quantity={price} currency="USD" />
        {hasPrime && (
          <div className="flex items-center space-x-2">
            <Image
              src="https://links.papareact.com/fdw"
              alt="Prime"
              width={48}
              height={48}
            />
            <p className="text-sm text-gray-500">Free Next-Day Delivery</p>
          </div>
        )}
      </div>
      <div className="flex flex-col space-y-2 my-auto justify-end">
        <div className="flex items-end flex-grow">
          <div className="grid grid-cols-3 flex-grow items-center">
            <button className="button" onClick={decreaseItemInBasket}>
              -
            </button>
            <p className="font-bold text-center">{quantity}</p>
            <button className="button" onClick={increaseItemInBasket}>
              +
            </button>
          </div>
        </div>
        <button className="button" onClick={removeItemFromBasket}>
          Remove from Basket
        </button>
      </div>
    </div>
  );
};

export default CheckoutProductCard;
