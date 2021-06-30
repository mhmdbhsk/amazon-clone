export type ProductType = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  total?: number;
  totalPrice?: number;
  hasPrime?: boolean;
  rating?: number;
};
