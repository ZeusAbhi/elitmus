const login = (username = "test", password = "password") => {
  cy.visit('http://localhost:3000/login')
  cy.get('input[name=username]').type(username)
  cy.get('input[name=password]').type(password)
  cy.get('form').submit()
}
const logout = () => {
  cy.contains('Logout').click()
}
const randomString = (length) => {
  let result = ''
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() *
      charactersLength))
  }
  return result
}

describe('Login/Logout', () => {
  it('Login', () => {
    login()
    cy.url().should('include', '/dashboard')
    logout()
    cy.url().should('include', '/login')
  })
  it('Login with wrong password', () => {
    login('test', 'wrongpassword')
    cy.contains('Password does not match').should('exist')
  })
  it('Login with wrong username', () => {
    login(randomString(110), 'password')
    cy.contains('User not found').should('exist')
  })
})


describe('Register', () => {
  it('Register already registered user', () => {
    cy.visit('http://localhost:3000/login')
    cy.get('li').contains('Register').click()
    cy.get('input[name=username]').type('test')
    cy.get('input[name=password]').type('password')
    cy.get('form').submit()
    cy.contains('Username already exists').should('exist')
  })
  it('Register new user', () => {
    cy.visit('http://localhost:3000/login')
    cy.get('li').contains('Register').click()
    cy.get('input[name=username]').type(randomString(20))
    cy.get('input[name=password]').type(randomString(21))
    cy.get('form').submit()
    cy.url().should('include', '/dashboard')
    logout()
  })
})
