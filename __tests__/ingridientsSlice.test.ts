import {
    getIngredientsThunk,
    initialState
  } from '../src/services/slices/ingredientsSlice';
  
  import reducer from '../src/services/slices/ingredientsSlice';
  
  const ingredientsMockData = [
    {
      _id: '643d69a5c3f7b9001cfa093c',
      name: 'Краторная булка N-200i',
      type: 'bun',
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: 'https://code.s3.yandex.net/react/code/bun-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
      __v: 0
    }
  ];
  
  describe('ingredientsReducer', () => {
    describe('getIngredientsThunk', () => {
      test('pending', () => {
        const state = reducer(
          initialState,
          getIngredientsThunk.pending('pending')
        );
  
        expect(state.isIngredientsLoading).toBeTruthy();
        expect(state.error).toBeNull();
      });
  
      test('fulfilled', () => {
        const state = reducer(
          initialState,
          getIngredientsThunk.fulfilled(ingredientsMockData, 'fulfilled')
        );
  
        expect(state.isIngredientsLoading).toBeFalsy();
        expect(state.error).toBeNull();
        expect(state.ingredients).toEqual(ingredientsMockData);
      });
  
      test('rejected', () => {
        const error = 'fetchIngredients.rejected';
  
        const state = reducer(
          initialState,
          getIngredientsThunk.rejected(new Error(error), 'rejected')
        );
  
        expect(state.isIngredientsLoading).toBeFalsy();
        expect(state.error).toEqual(error);
      });
    });
  });
  