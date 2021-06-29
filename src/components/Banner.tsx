import { Carousel } from 'react-responsive-carousel';
import Image from 'next/image';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

interface Props {}

const Banner = (props: Props) => {
  return (
    <div className="relative">
      <div className="absolute w-full h-52 bg-gradient-to-t from-gray-100 to-transparent bottom-1 z-20 content" />
      <Carousel
        autoPlay
        infiniteLoop
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        interval={5000}
      >
        <div>
          <Image
            src="https://links.papareact.com/gi1"
            alt="Banner 1"
            width={4000}
            height={1600}
          />
        </div>
        <div>
          <Image
            src="https://links.papareact.com/6ff"
            alt="Banner 1"
            width={4000}
            height={1600}
          />
        </div>
        <div>
          <Image
            src="https://links.papareact.com/gi1"
            alt="Banner 1"
            width={4000}
            height={1600}
          />
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;
