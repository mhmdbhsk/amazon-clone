import axios from 'axios';

export const getProducts = async () => {
  try {
    return await axios
      .get('https://fakestoreapi.com/products')
      .then((response) => response?.data)
      .catch((error) => console.error(error));
  } catch (error) {
    console.error(error);
    throw new Error();
  }
};
