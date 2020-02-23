/* eslint-disable */

import * as ctx from  '../../../../quasar.conf.js'
import config from '../../../../config/config'

describe('Login Flow', function () {
  beforeEach(() => {
    if (Cypress.env('LOCAL') === 'TRUE') {
      Cypress.baseURL = 'http://localhost:8080'
    } else {
      Cypress.baseURL = `https://${config.domainsStg[0]}`
    }
    cy.visit(Cypress.baseURL)
  })

  it('email login', function () {
    cy.get('#auth-btn').click()
    cy.get('#login-btn').click()

    const id = Cypress.env('E2E_LOGIN_ID')
    cy.get('.input-email')
      .type(id, { log: false })

    const pass = Cypress.env('E2E_LOGIN_PASS')
    cy.get('.input-password')
      .type(pass, { log: false })

    cy.get('#email-login-btn').click()

    cy.wait(5000)

    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/')
    })
  })
  // it('show tab page', function () {
  //   cy.visit(`${Cypress.baseURL}/?order=popular`)
  //   cy.visit(`${Cypress.baseURL}/?order=newer`)
  //   cy.visit(`${Cypress.baseURL}/bookmarks`)
  // })
})
