import * as orderFixture from '../fixtures/order.json';

describe('E2E тест конструктора бургеров', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients' });

    cy.visit('/');
  });

  it('Список ингредиентов доступен для выбора', () => {
    cy.get('[data-ingredient="bun"]').should('have.length.at.least', 1);
    cy.get('[data-ingredient="main"],[data-ingredient="sauce"]').should(
      'have.length.at.least',
      1
    );
  });

  describe('Тестирование работы модальных окон с описаниями ингредиентов', () => {
    describe('Проверка открытия модальных окон', () => {
      it('Открытие модального окна по клику на карточку ингредиента', () => {
        cy.get('[data-ingredient="bun"]:first-of-type').click();
        cy.get('#modals').children().should('have.length', 2);
      });
    });

    describe('Проверка закрытия модальных окон', () => {
      it('Закрытие через нажатие на крестик', () => {
        cy.get('[data-ingredient="bun"]:first-of-type').click();
        cy.get('#modals button:first-of-type').click();
        cy.wait(500);
        cy.get('#modals').children().should('have.length', 0);
      });

      it('Закрытие через нажатие на оверлей', () => {
        cy.get('[data-ingredient="bun"]:first-of-type').click();
        cy.get('#modals>div:nth-of-type(2)').click({ force: true });
        cy.wait(500);
        cy.get('#modals').children().should('have.length', 0);
      });

      it('Закрытие через нажатие клавиши Escape', () => {
        cy.get('[data-ingredient="bun"]:first-of-type').click();
        cy.get('body').type('{esc}');
        cy.wait(500);
        cy.get('#modals').children().should('have.length', 0);
      });
    });
  });

  describe('Процесс оформления заказа', () => {
    beforeEach(() => {
      cy.setCookie('accessToken', 'EXAMPLE_ACCESS_TOKEN');
      localStorage.setItem('refreshToken', 'EXAMPLE_REFRESH_TOKEN');

      cy.intercept('GET', 'api/auth/user', { fixture: 'user' });
      cy.intercept('POST', 'api/orders', { fixture: 'order' });
      cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients' });

      cy.visit('/');
    });

    it('Процедура оформления после авторизации', () => {
      // Проверка работы конструктора: кнопка оформления отключена, пока не выбраны хотя бы 1 ингредиент и булка
      cy.get('[data-order-button]').should('be.disabled');
      cy.get('[data-ingredient="bun"]:first-of-type button').click();
      cy.get('[data-order-button]').should('be.disabled');
      cy.get('[data-ingredient="main"]:first-of-type button').click();
      cy.get('[data-order-button]').should('be.enabled');

      cy.get('[data-order-button]').click();

      // После успешной отправки данных на сервер должно быть открыто модальное окно с оформлением заказа
      cy.get('#modals').children().should('have.length', 2);

      // Новое модальное окно должно содержать номер заказа
      cy.get('#modals h2:first-of-type').should(
        'have.text',
        orderFixture.order.number
      );

      // Закрытие модального окна и проверка успешности закрытия
      cy.get('#modals button:first-of-type').click();
      cy.wait(500);
      cy.get('#modals').children().should('have.length', 0);

      // Проверка, что конструктор пуст
      cy.get('[data-cy=burger-constructor]').within(() => {
        cy.get('[data-cy=no-buns-top]').should('exist');
        cy.get('[data-cy=no-ingredients]').should('exist');
      });

      cy.get('[data-order-button]').should('be.disabled');
    });

    afterEach(() => {
      cy.clearCookie('accessToken');
      localStorage.removeItem('refreshToken');
    });
  });
});
