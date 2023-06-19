describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)

    const user = {
      name: 'John Doe',
      username: 'johndoe',
      password: 'salasana'
    }

    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)

    cy.visit('')
  })

  it('front page can be opened', function () {
    cy.contains('Log in to application')
  })

  it('login form is shown', function() {
    cy.get('#username-form')
    cy.get('#password-form')
    cy.contains('login')
  })
})