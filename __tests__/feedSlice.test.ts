import { 
  getFeedsThunk, 
  initialState, 
  getOrderByNumberThunk, 
  FeedState 
} from '../src/services/slices/feedSlice';
import { TFeedsResponse, TOrderResponse } from '../src/utils/burger-api.ts';

import reducer from '../src/services/slices/feedSlice';

export const feedsMockData : TFeedsResponse = {
  orders: [],
  total: 1,
  totalToday: 1,
  success: true,
};

const orderMockData = {
  _id: 'idtest',
  status: 'done',
  name: 'test order',
  createdAt: '2025-05-03T11:26:27.902Z',
  updatedAt: '2025-05-03T11:26:28.402Z',
  number: 1,
  ingredients: [
    'a1b2c3d4-e5f6-4a5b-8c7d-9e8f7a6b5c4d',
    'c3d4e5f6-a7b8-6c7d-0e1f-2a3b4c5d6e7f',
    'a1b2c3d4-e5f6-4a5b-8c7d-9e8f7a6b5c4d'
  ]
};

describe('feedsReducer', () => {
  describe('getFeedsThunk', () => {
    test('pending', () => {
      const state = reducer(initialState, getFeedsThunk.pending('pending'));

      expect(state.isFeedsLoading).toBeTruthy();
      expect(state.error).toBeNull();
    });

    test('fulfilled', () => {
      const state = reducer(
        initialState,
        getFeedsThunk.fulfilled(feedsMockData, 'fulfilled')
      );

      expect(state.isFeedsLoading).toBeFalsy();
      expect(state.error).toBeNull();
    });

    test('rejected', () => {
      const error = 'getFeedsThunk.rejected';

      const state = reducer(
        initialState,
        getFeedsThunk.rejected(new Error(error), 'rejected')
      );

      expect(state.isFeedsLoading).toBeFalsy();
      expect(state.error).toEqual(error);
    });
  });

  describe('getOrderByNumberThunk', () => {
    test('pending', () => {
        const initialState: FeedState = {
          orders: [],
          isFeedsLoading: false,
          order: null,
          isOrderLoading: false,
          total: 0,
          totalToday: 0,
          error: null
        };
  
        const newState = reducer( initialState, getOrderByNumberThunk.pending('pending', 1));
  
        expect(newState.isOrderLoading).toBeTruthy();
        expect(newState.error).toBeNull();
    });

    test('fulfilled', () => {
        const initialState: FeedState = {
          orders: [],
          isFeedsLoading: false,
          order: null,
          isOrderLoading: true,
          total: 0,
          totalToday: 0,
          error: null
        };
  
        const orders: TOrderResponse = {
          orders: [orderMockData],
          success: true
        };
  
        const newState = reducer(
          initialState,
          getOrderByNumberThunk.fulfilled(orders, 'fulfilled', 1)
        );
  
        expect(newState.order).toEqual(orderMockData);
        expect(newState.isOrderLoading).toBeFalsy();
        expect(newState.error).toBeNull();
    });

    test('rejected', () => {
      const error = 'getOrderByNumberThunk.rejected';

      const state = reducer(
        initialState,
        getOrderByNumberThunk.rejected(new Error(error), 'rejected', 0)
      );

      expect(state.isFeedsLoading).toBeFalsy();
      expect(state.error).toEqual(error);
    });
  });
});