import userReducer, { 
  initialState, 
  UserState, 
  clearErrors, 
  getOrdersThunk, 
  loginUserThunk, 
  logoutUserThunk, 
  getUserThunk, 
  registerUserThunk, 
  updateUserThunk 
} from '../src/services/slices/userSlice';
import { TOrder } from '../src/utils/types';

  const registerMockData = {
    email: 'example@example.ru',
    name: 'Example',
    password: '1234qwerty'
  };
  
  const loginMockData = {
    email: 'example@example.ru',
    password: '1234qwerty'
  };

const userOrders: TOrder[] = [
    {
      _id: 'testid1',
      status: 'done',
      name: 'test order 1',
      createdAt: '2025-05-03T11:26:27.902Z',
      updatedAt: '2025-05-03T11:26:28.402Z',
      number: 1,
      ingredients: [
        'a1b2c3d4-e5f6-4a5b-8c7d-9e8f7a6b5c4d',
        'c3d4e5f6-a7b8-6c7d-0e1f-2a3b4c5d6e7f',
        'a1b2c3d4-e5f6-4a5b-8c7d-9e8f7a6b5c4d'
      ]
    },
    {
      _id: 'testid2',
      status: 'done',
      name: 'test order 2',
      createdAt: '2025-05-03T11:36:27.902Z',
      updatedAt: '2025-05-03T11:36:28.402Z',
      number: 2,
      ingredients: [
        'a1b2c3d4-e5f6-4a5b-8c7d-9e8f7a6b5c4d',
        'b2c3d4e5-f6a7-5b6c-9d8e-0f1a2b3c4d5e',
        'a1b2c3d4-e5f6-4a5b-8c7d-9e8f7a6b5c4d'
      ]
    },
    {
      _id: 'testid3',
      status: 'done',
      name: 'test order 3',
      createdAt: '2025-05-03T11:46:27.902Z',
      updatedAt: '2025-05-03T11:26:28.402Z',
      number: 3,
      ingredients: [
        'a1b2c3d4-e5f6-4a5b-8c7d-9e8f7a6b5c4d',
        'b2c3d4e5-f6a7-5b6c-9d8e-0f1a2b3c4d5e',
        'c3d4e5f6-a7b8-6c7d-0e1f-2a3b4c5d6e7f',
        'a1b2c3d4-e5f6-4a5b-8c7d-9e8f7a6b5c4d'
      ]
    },
  ];

describe('userReducer', () => {
    describe('loginUserThunk', () => {
        test('pending', async () => {
          const newState = userReducer(
            initialState,
            loginUserThunk.pending('pending', loginMockData)
          );
    
          expect(newState.loginUserRequest).toBeTruthy();
          expect(newState.error).toBeNull();
        });

      test('rejected', async () => {
        const error: Error = {
          name: 'rejected',
          message: 'Ошибка при входе в аккаунт'
        };

        const newState = userReducer(
          initialState,
          loginUserThunk.rejected(error, 'rejected', loginMockData)
        );
  
        expect(newState.loginUserRequest).toBeFalsy();
        expect(newState.error).toEqual(error.message);
      });
      
      test('fulfilled', async () => {
        const newState = userReducer(
          initialState,
          loginUserThunk.fulfilled(loginMockData, 'fulfilled', loginMockData)
        );
  
        expect(newState.isAuthenticated).toBeTruthy();
        expect(newState.loginUserRequest).toBeFalsy();
        expect(newState.user).toEqual(loginMockData);
        expect(newState.error).toBeNull();
      });
    });

      describe('logoutUserThunk', () => {
          test('pending', async () => {
            const newState = userReducer(
              initialState,
              logoutUserThunk.pending('pending')
            );
      
            expect(newState.user).toBeNull();
            expect(newState.loginUserRequest).toBeFalsy();
            expect(newState.isAuthenticated).toBeFalsy();
          });
        });
      
      describe('getUserThunk', () => {
          test('pending', async () => {
            const newState = userReducer(
              initialState,
              getUserThunk.pending('pending')
            );
      
            expect(newState.loginUserRequest).toBeTruthy();
          });

        test('rejected', async () => {
            const error: Error = {
              name: 'rejected',
              message: 'Ошибка при получении пользователя'
            };

          const newState = userReducer(
            initialState,
            getUserThunk.rejected(error, 'rejected')
          );
    
          expect(newState.loginUserRequest).toBeFalsy();
          expect(newState.user).toBeNull();
          expect(newState.error).toEqual(error.message);
        });

        test('fulfilled', async () => {
          const newState = userReducer(
            initialState,
            getUserThunk.fulfilled(loginMockData, 'fulfilled')
          );
    
          expect(newState.loginUserRequest).toBeFalsy();
          expect(newState.isAuthenticated).toBeTruthy();
        });
      });
      
      describe('registerUserThunk', () => {
          test('pending', async () => {
            const newState = userReducer(
              initialState,
              registerUserThunk.pending('pending', registerUserThunk)
            );
      
            expect(newState.loginUserRequest).toBeTruthy();
            expect(newState.isAuthenticated).toBeFalsy();
          });

        test('rejected', async () => {
            const error: Error = {
              name: 'rejected',
              message: 'Ошибка при регистрации пользователя'
            };

          const newState = userReducer(
            initialState,
            registerUserThunk.rejected(error, 'rejected', registerMockData)
          );
    
          expect(newState.loginUserRequest).toBeFalsy();
          expect(newState.isAuthenticated).toBeFalsy();
          expect(newState.error).toEqual(error.message);
        });

        test('fulfilled', async () => {
          const newState = userReducer(
            initialState,
            registerUserThunk.fulfilled(registerMockData, 'fulfilled', registerMockData)
          );
    
          expect(newState.loginUserRequest).toBeFalsy();
          expect(newState.isAuthenticated).toBeTruthy();
          expect(newState.user).toEqual(registerMockData);
        });
      });
      
      describe('updateUserThunk', () => {
          test('pending', async () => {
            const newState = userReducer(
              initialState,
              updateUserThunk.pending('pending', registerUserThunk)
            );
      
            expect(newState.loginUserRequest).toBeTruthy();
          });

        test('rejected', async () => {
            const error: Error = {
              name: 'rejected',
              message: 'Ошибка при регистрации пользователя'
            };

          const newState = userReducer(
            initialState,
            updateUserThunk.rejected(error, 'rejected', registerMockData)
          );
    
          expect(newState.loginUserRequest).toBeFalsy();
          expect(newState.isAuthenticated).toBeFalsy();
          expect(newState.error).toEqual(error.message);
        });

        test('fulfilled', async () => {
          const newState = userReducer(
            initialState,
            updateUserThunk.fulfilled(registerMockData, 'fulfilled', registerMockData)
          );
    
          expect(newState.loginUserRequest).toBeFalsy();
          expect(newState.isAuthenticated).toBeTruthy();
        });
      });
});

describe('Тесты синхронных экшенов', () => {
  test('clearErrors', () => {
    const initialState: UserState = {
      isAuthenticated: false,
      loginUserRequest: false,
      user: null,
      orders: [],
      ordersRequest: false,
      error: 'some error'
    };

    const newOrder = userReducer(initialState, clearErrors());
    expect(newOrder.error).toBeNull();
  });
});

describe('Тесты асинхронных экшенов', () => {
  describe('getOrdersThunk', () => {
    test('pending', async () => {
      const initialState: UserState = {
        isAuthenticated: false,
        loginUserRequest: false,
        user: null,
        orders: [],
        ordersRequest: false,
        error: null
      };
      const newState = userReducer(
        initialState,
        getOrdersThunk.pending('pending')
      );

      expect(newState.ordersRequest).toBeTruthy();
      expect(newState.error).toBeNull();
    });
    test('rejected', async () => {
      const initialState: UserState = {
        isAuthenticated: false,
        loginUserRequest: false,
        user: null,
        orders: [],
        ordersRequest: true,
        error: null
      };

      const error: Error = {
        name: 'rejected',
        message: 'Ошибка получения заказов пользователя'
      };
      const newState = userReducer(
        initialState,
        getOrdersThunk.rejected(error, 'rejected')
      );

      expect(newState.ordersRequest).toBeFalsy();
      expect(newState.error).toBe(error.message);
    });
    test('fulfilled', async () => {
      const initialState: UserState = {
        isAuthenticated: false,
        loginUserRequest: false,
        user: null,
        orders: [],
        ordersRequest: true,
        error: null
      };
    
      const newState = userReducer(
        initialState,
        getOrdersThunk.fulfilled(userOrders, 'fulfilled')
      );

      expect(newState.orders).toEqual(userOrders);
      expect(newState.ordersRequest).toBeFalsy();
      expect(newState.error).toBeNull();
    });
  });
});