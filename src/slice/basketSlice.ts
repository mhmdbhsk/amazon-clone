import { ProductType } from '@enum/product';
import { createSlice, Slice } from '@reduxjs/toolkit';

type stateType = {
  basket: initialStateType;
};

type initialStateType = {
  items: ProductType[];
  basketUpdated: boolean;
  price: number;
};

const initialState: initialStateType = {
  items: [],
  basketUpdated: false,
  price: 0,
};

export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      const item = {
        ...action.payload,
        total: 1,
        totalPrice: action.payload.price,
      };
      state.items = [...state.items, item];
      localStorage.setItem('basket', JSON.stringify(state.items));
      basketSlice.caseReducers.calculatePrice(state, {
        payload: state.items,
        type: 'CALCULATE_BASKET',
      });
      console.log('New Item Added');
    },
    removeFromBasket: (state, action) => {
      const index = state.items.findIndex(
        (basketItem) => basketItem.id === action.payload.id
      );

      let newBasket = [...state.items];

      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn(
          `Cant remove product (id ${action.payload.id}) as its not in the basket`
        );
      }

      state.items = newBasket;
      localStorage.setItem('basket', JSON.stringify(state.items));
      basketSlice.caseReducers.calculatePrice(state, {
        payload: state.items,
        type: 'CALCULATE_BASKET',
      });
      console.log('Item Removed');
    },
    increaseItems: (state, action) => {
      const index = state.items.findIndex(
        (basketItem) => basketItem.id === action.payload.id
      );
      let newBasket = state.items;
      (newBasket[index].total as number) += 1;
      newBasket[index].totalPrice =
        (newBasket[index].total as number) * newBasket[index].price;
      state.items = newBasket;
      basketSlice.caseReducers.calculatePrice(state, {
        payload: state.items,
        type: 'CALCULATE_BASKET',
      });
      localStorage.setItem('basket', JSON.stringify(state.items));
      console.log('Item Increased');
    },
    decreaseItems: (state, action) => {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      let newBasket = state.items;
      if ((newBasket[index].total as number) > 1) {
        (newBasket[index].total as number) -= 1;
        newBasket[index].totalPrice =
          (newBasket[index]?.total as number) * newBasket[index].price;
        state.items = newBasket;
        basketSlice.caseReducers.calculatePrice(state, {
          payload: state.items,
          type: 'CALCULATE_BASKET',
        });
        localStorage.setItem('basket', JSON.stringify(state.items));
        console.log('Item Decreased');
      } else {
        const newBasket = state.items.filter(
          (item) => item.id !== action.payload.id
        );
        console.log(newBasket);
        state.items = newBasket;
        basketSlice.caseReducers.calculatePrice(state, {
          payload: state.items,
          type: 'CALCULATE_BASKET',
        });
        localStorage.setItem('basket', JSON.stringify(state.items));
      }
    },
    restoreBasket: (state, action) => {
      const basket = localStorage.getItem('basket');
      const price = localStorage.getItem('price');
      if (basket) {
        state.items = [...JSON.parse(basket)];
        state.price = Number(price);
      }
    },
    clearBasket: (state, action) => {
      state.items = [];
      state.price = 0;
      localStorage.setItem('basket', JSON.stringify(state.items));
      localStorage.setItem('basket', JSON.stringify(state.price));
      console.log('Basket Cleared');
    },
    calculatePrice: (state, action) => {
      if (action.payload.length > 0) {
        const sum = (item: any) => item.reduce((x: number, y: number) => x + y);
        let total = sum(
          action.payload.map((product: any) => Number(product.totalPrice))
        );
        state.price = total;
        localStorage.setItem('price', total);
        state.basketUpdated = !state.basketUpdated;
      } else {
        state.price = 0;
        localStorage.setItem('price', JSON.stringify(0));
        state.basketUpdated = !state.basketUpdated;
      }
    },
  },
});

export const {
  addToBasket,
  removeFromBasket,
  restoreBasket,
  clearBasket,
  increaseItems,
  decreaseItems,
} = basketSlice.actions;

export const selectItems = (state: stateType) => state.basket.items;
export const basketUpdated = (state: stateType) => state.basket.basketUpdated;
export const price = (state: stateType) => state.basket.price;

export default basketSlice.reducer;
