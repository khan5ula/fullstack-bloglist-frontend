describe('Blog app', function () {
  beforeEach(function () {
    /* Delete blog posts and users */
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)

    /* Create and post new user */
    const user = {
      name: 'John Doe',
      username: 'johndoe',
      password: 'salasana'
    }

    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)

    /* Navigate to main page */
    cy.visit('')
  })

  it('front page can be opened', function () {
    cy.contains('Log in to application')
  })

  it('login form is shown', function () {
    cy.get('#username-form')
    cy.get('#password-form')
    cy.contains('login')
  })

  describe('login', function () {
    it('succeeds with correct credentials', function () {

      /* Submit correct user info */
      cy.get('#username-form').type('johndoe')
      cy.get('#password-form').type('salasana')
      cy.get('#login-button').click()

      /* Expect success */
      cy.contains('John Doe logged in')
    })

    it('fails with wrong credentials', function () {

      /* Submit invalid username */
      cy.get('#username-form').type('janedoe')
      cy.get('#password-form').type('salasana')
      cy.get('#login-button').click()

      /* Expect failure */
      cy.contains('wrong username or password')

      /* Submit invalid password */
      cy.get('#username-form').clear()
      cy.get('#username-form').type('johndoe')
      cy.get('#password-form').clear()
      cy.get('#password-form').type('password')
      cy.get('#login-button').click()

      /* Expect failure */
      cy.contains('wrong username or password')
    })
  })
})