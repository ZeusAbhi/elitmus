const login = () => {
  cy.visit('http://localhost:3000/login')
  cy.get('input[name=username]').type('test')
  cy.get('input[name=password]').type('password')
  cy.get('form').submit()
}
const logout = () => {
  cy.contains('Logout').click()
}

describe('Login', () => {
  it('Login', () => {
    login()
    cy.url().should('include', '/dashboard')
  })
})

describe('Logout', () => {
  it('Logout', () => {
    login()
    logout()
    cy.url().should('include', '/login')
  })
})

