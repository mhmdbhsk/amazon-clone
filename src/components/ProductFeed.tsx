import { ProductType } from '@enum/product';
import Image from 'next/image';
import ProductCard from './ProductCard';

type ProductFeedProps = {
  products: ProductType[];
};

const ProductFeed = ({ products }: ProductFeedProps) => {
  return (
    <div className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-52 mx-auto">
      {products.slice(0, 4).map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}

      <div className="md:col-span-full">
        <Image
          src="https://links.papareact.com/dyz"
          alt="ads"
          width={4000}
          height={800}
          objectFit="fill"
        />
      </div>

      <div className="md:col-span-2 h-100">
        {products.slice(4, 5).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {products.slice(5, products.length).map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductFeed;
