import Banner from '@components/Banner';
import Header from '@components/Header';
import ProductFeed from '@components/ProductFeed';
import { ProductType } from '@enum/product';
import { getProducts } from '@services';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';

type HomeProps = {
  products: ProductType[];
};

export default function Home({ products }: HomeProps) {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Head>
        <title>Shop - Home</title>
      </Head>

      <Header />

      <main className="max-w-screen-2xl mx-auto">
        {/* Banner */}
        <Banner />

        {/* Product Feed */}
        <ProductFeed products={products} />
      </main>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const products = await getProducts();

  return {
    props: {
      products: products || null,
    },
  };
}
