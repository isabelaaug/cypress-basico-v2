// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// -- This is a parent command --
Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(nome) { 
    cy.get('input[id="firstName"]').type(nome)
    cy.get('input[id="lastName"]').type('Souza')
    cy.get('input[id="email"]').type('isa.souza@gmail.com')
    cy.get('textarea[id="open-text-area"]').type('tudo excelente')
    cy.get('button[type="submit"]').click() 
 })

