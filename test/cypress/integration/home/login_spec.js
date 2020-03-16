/* eslint-disable */

import * as ctx from  '../../../../quasar.conf.js'
import variables from '../../../../config/variables'

describe('Login Flow', function () {
  beforeEach(() => {
    if (Cypress.env('LOCAL') === 'TRUE') {
      Cypress.baseURL = 'http://localhost:8080'
    } else {
      Cypress.baseURL = `https://${variables.domainsStg[0]}`
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
})
