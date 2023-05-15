const login = () => {
  cy.visit('http://localhost:3000/login')
  cy.get('input[name=username]').type('test')
  cy.get('input[name=password]').type('password')
  cy.get('form').submit()
}

const logout = () => {
  cy.contains('Logout').click()
}

describe('Dashboard', () => {
  it('Puzzle One', () => {
    login()
    cy.url().should('include', '/dashboard')
    cy.get('a[href="/puzzle/1"]').click()
    cy.url().should('include', '/puzzle/1')
    cy.get('input[name="answer"]').type('firstday')
    cy.get('form').submit()
    cy.contains('95234499').should('exist')
    logout()
  })

  it('Puzzle Two', () => {
    login()
    cy.url().should('include', '/dashboard')
    cy.get('a[href="/puzzle/2"]').click()
    cy.url().should('include', '/puzzle/2')
    cy.get('input[name="answer"]').type('a')
    cy.get('form').submit()
    cy.contains('80123448').should('exist')
    logout()
  })

  it('Puzzle Three', () => {
    login()
    cy.url().should('include', '/dashboard')
    cy.get('a[href="/puzzle/3"]').click()
    cy.url().should('include', '/puzzle/3')
    cy.get('input[name="answer"]').type('4')
    cy.get('form').submit()
    cy.contains('52').should('exist')
    logout()
  })

  it('Puzzle Four', () => {
    login()
    cy.url().should('include', '/dashboard')
    cy.get('a[href="/puzzle/4"]').click()
    cy.url().should('include', '/puzzle/4')
    cy.get('input[name="answer"]').type('john')
    cy.get('form').submit()
    cy.contains('43234').should('exist')
    logout()
  })

  it('Puzzle Five', () => {
    login()
    cy.url().should('include', '/dashboard')
    cy.get('a[href="/puzzle/5"]').click()
    cy.url().should('include', '/puzzle/5')
    cy.get('input[name="answer"]').type('flag{1_4m_4_b0t}', { parseSpecialCharSequences: false })
    cy.get('form').submit()
    cy.contains('234243').should('exist')
    logout()
  })

})
