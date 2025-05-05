import {
  addIngredient,
  removeIngredient,
  upIngredient,
  downIngredient,
  clearBurgerConstructor,
  initialState
} from '../src/services/slices/burgerConstructorSlice';

import reducer from '../src/services/slices/burgerConstructorSlice';

const bunMockData = {
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
};

const ingredient1MockData = {
  _id: '643d69a5c3f7b9001cfa093e',
  id: '1234567890',
  name: 'Филе Люминесцентного тетраодонтимформа',
  type: 'main',
  proteins: 44,
  fat: 26,
  carbohydrates: 85,
  calories: 643,
  price: 988,
  image: 'https://code.s3.yandex.net/react/code/meat-03.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
  __v: 0
};

const ingredient2MockData = {
  _id: '643d69a5c3f7b9001cfa093e',
  id: '0987654321',
  name: 'Филе Люминесцентного тетраодонтимформа',
  type: 'main',
  proteins: 44,
  fat: 26,
  carbohydrates: 85,
  calories: 643,
  price: 988,
  image: 'https://code.s3.yandex.net/react/code/meat-03.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
  __v: 0
};

describe('builderReducer', () => {
    test('addIngredient (bun)', () => {
      const state = reducer(
        initialState,
        addIngredient(bunMockData)
      );

      const updatedObject = { ...state.burgerConstructor.bun } as Record<string, any>;
      delete updatedObject['id'];

      expect(updatedObject).toEqual(bunMockData);
      expect(state.burgerConstructor.ingredients).toHaveLength(0);
    });

    test('addIngredient (not bun)', () => {
      const state = reducer(
        initialState,
        addIngredient(ingredient1MockData)
      );

      expect(state.burgerConstructor.ingredients).toHaveLength(1);

      const updatedObject = { ...state.burgerConstructor.ingredients[0] } as Record<string, any>;
      delete updatedObject['id'];

      const initialObject = { ...ingredient1MockData } as Record<string, any>;
      delete initialObject['id'];

      expect(updatedObject).toEqual(initialObject);
      expect(state.burgerConstructor.bun).toBeNull();
    });

    test('removeIngredient', () => {
      const _initialState = {
        burgerConstructor: {
          bun: null,
          ingredients: [ingredient1MockData, ingredient2MockData]
        },
        error: null
      };

      const state = reducer(
        _initialState,
        removeIngredient(ingredient1MockData)
      );

      expect(state.burgerConstructor.ingredients).toHaveLength(1);
      expect(state.burgerConstructor.ingredients[0]).toEqual(ingredient2MockData);
      expect(state.burgerConstructor.bun).toBeNull();
    });

      test('downIngredient', () => {
        const _initialState = {
          burgerConstructor: {
            bun: null,
            ingredients: [ingredient1MockData, ingredient2MockData]
          },
          error: null
        };

        const state = reducer(
          _initialState,
          downIngredient(0)
        );

        expect(state.burgerConstructor.ingredients).toHaveLength(2);
        expect(state.burgerConstructor.ingredients[0]).toEqual(ingredient2MockData);
        expect(state.burgerConstructor.ingredients[1]).toEqual(ingredient1MockData);
        expect(state.burgerConstructor.bun).toBeNull();
      });

      test('upIngredient', () => {
        const _initialState = {
          burgerConstructor: {
            bun: null,
            ingredients: [ingredient1MockData, ingredient2MockData]
          },
          error: null
        };

        const state = reducer(
          _initialState,
          upIngredient(1)
        );

        expect(state.burgerConstructor.ingredients).toHaveLength(2);
        expect(state.burgerConstructor.ingredients[0]).toEqual(ingredient2MockData);
        expect(state.burgerConstructor.ingredients[1]).toEqual(ingredient1MockData);
        expect(state.burgerConstructor.bun).toBeNull();
      });

  test('clearBurgerConstructor', () => {
      const _initialState = {
        burgerConstructor: {
          bun: null,
          ingredients: [ingredient1MockData, ingredient2MockData]
        },
        error: null
      };

    const state = reducer(_initialState, clearBurgerConstructor());

    expect(state.burgerConstructor.ingredients).toHaveLength(0);
    expect(state.burgerConstructor.bun).toBeNull();
  });
});