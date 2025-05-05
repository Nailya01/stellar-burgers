import {
  clearOrder,
  orderBurgerThunk,
  OrderState,
  initialState
} from '../src/services/slices/orderSlice';

import reducer from '../src/services/slices/orderSlice';
import { TOrder } from '../src/utils/types';

const mockOrder: TOrder = {
  _id: '6815fd63e8e61d001cec5c3d',
  status: 'done',
  name: 'Флюоресцентный био-марсианский бургер',
  createdAt: "2025-05-03T11:26:27.912Z",
  updatedAt: "2025-05-03T11:26:28.644Z",
  number: 76138,
  ingredients: [
    '643d69a5c3f7b9001cfa093d',
    '643d69a5c3f7b9001cfa0941',
    '643d69a5c3f7b9001cfa093d'
  ]
};

const mockResponse = {
  success: true,
  order: mockOrder,
  name: mockOrder.name
};

describe('ordersReducer', () => {
  test('clearOrder', () => {
    const _initialState: OrderState = {
      isOrderLoading: true,
      order: null,
      error: null,
    };

    const state = reducer(_initialState, clearOrder());

    expect(state.error).toBeNull();
    expect(state.order).toBeNull();
    expect(state.isOrderLoading).toBeFalsy();
  });

  describe('orderBurgerThunk', () => {
    test('pending', () => {
      const state = reducer(initialState, orderBurgerThunk.pending('pending', []));

      expect(state.isOrderLoading).toBeTruthy();
      expect(state.error).toBeNull();
    });

    test('fulfilled', () => {
      const state = reducer(
        initialState,
        orderBurgerThunk.fulfilled(mockResponse, 'fulfilled', [])
      );

      expect(state.isOrderLoading).toBeFalsy();
      expect(state.error).toBeNull();
      expect(state.order).toEqual(mockOrder);
    });

    test('rejected', () => {
      const error = 'orderBurgerThunk.rejected';

      const state = reducer(
        initialState,
        orderBurgerThunk.rejected(new Error(error), 'rejected', [])
      );

      expect(state.isOrderLoading).toBeFalsy();
      expect(state.error).toEqual(error);
    });
  });
});