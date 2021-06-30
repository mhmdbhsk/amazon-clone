import Header from '@components/Header';
import { price, selectItems } from '@slice/basketSlice';
import Head from 'next/head';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import CheckoutProductCard from '../components/CheckoutProductCard';
import Currency from 'react-currency-formatter';
import { useSession } from 'next-auth/client';

interface Props {}

const Checkout = (props: Props) => {
  const items = useSelector(selectItems);
  const totalPrice = useSelector(price);
  const [session] = useSession();

  return (
    <div className="bg-gray-100 min-h-screen">
      <Head>
        <title>Shop - Checkout</title>
      </Head>

      <Header />

      <main className="lg:flex max-w-screen-2xl mx-auto">
        {/* Left */}
        <div className="flex-grow m-5 shadow-sm">
          <Image
            src="https://links.papareact.com/ikj"
            alt="Ads"
            width={1020}
            height={250}
            objectFit="contain"
          />

          <div className="flex flex-col p-5 space-y-10 bg-white">
            <h1 className="text-3xl border-b pb-4">
              {items.length === 0
                ? 'Your Basket is Empty'
                : 'Your Shopping Basket'}
            </h1>

            {items.map((item, index) => (
              <CheckoutProductCard product={item} key={index} />
            ))}
          </div>
        </div>

        {/* Right */}
        <div className="flex flex-col bg-white p-10 shadow-md">
          {items.length > 0 ? (
            <>
              <h2 className="whitespace-nowrap">
                Subtotal ({items.length} items) :{' '}
                <span className="font-bold">
                  <Currency quantity={totalPrice} currency="USD" />
                </span>
              </h2>

              <button
                disabled={!session}
                className={`button mt-2 ${
                  !session &&
                  'from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed'
                }`}
              >
                {!session ? 'Sign In to Chekcout' : 'Proceed to Checkout'}
              </button>
            </>
          ) : (
            <>
              <h2>Your Basket is Empty</h2>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Checkout;
