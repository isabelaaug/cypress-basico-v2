/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {

    // Executa antes de cada teste
    beforeEach(function() {
      cy.visit('./src/index.html')
    })
    
    it('verifica o título da aplicação', function() {
      cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function() {

      const commentText = 'tudo excelente'

      cy.get('input[id="firstName"]')
        .should('be.visible')
        .type('Isabela')
        .should('have.value', 'Isabela')

      cy.get('input[id="lastName"]')
        .should('be.visible')
        .type('Souza')
        .should('have.value', 'Souza')

      cy.get('input[id="email"]')
        .should('be.visible')
        .type('isa.souza@gmail.com')
        .should('have.value', 'isa.souza@gmail.com')

      cy.get('textarea[id="open-text-area"]')
        .should('be.visible')
        .type(commentText, {delay: 500})

      cy.get('button[type="submit"]')
        .should('be.visible')
        .click() 

      cy.get('.success').should('be.visible')  
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {

      cy.get('input[id="firstName"]').type('Isabela')
      cy.get('input[id="lastName"]').type('Souza')
      cy.get('input[id="email"]').type('isa.souza@gmail,com')
      cy.get('textarea[id="open-text-area"]').type('tudo certo', {delay: 500})
      cy.get('button[type="submit"]').click() 

      cy.get('.error').should('be.visible', 'Valide os campos obrigatórios!') 
    })   

    it('campo telefone permanece vazio ao digitar valor não-numérico', function() {

      cy.get('input[id="firstName"]').type('Isabela')
      cy.get('input[id="lastName"]').type('Souza')
      cy.get('input[id="email"]').type('isa.souza@gmail,com')
      cy.get('#phone').type('abcde').should('not.have.value')
    })  

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {

      cy.get('input[id="firstName"]').type('Isabela')
      cy.get('input[id="lastName"]').type('Souza')
      cy.get('input[id="email"]').type('isa.souza@gmail.com')
      cy.get('#phone-checkbox').click()
      cy.get('textarea[id="open-text-area"]').type('tudo certo', {delay: 500})
      cy.get('button[type="submit"]').click() 

      cy.get('.error').should('be.visible', 'Valide os campos obrigatórios!') 
    })  

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function() {

      cy.get('input[id="firstName"]')
        .type('Isabela')
        .should('have.value', 'Isabela')
        .clear()
        .should('have.value', '')

      cy.get('input[id="lastName"]')
        .type('Souza')
        .should('have.value', 'Souza')
        .clear()
        .should('have.value', '')

      cy.get('input[id="email"]')
        .type('isa.souza@gmail.com')
        .should('have.value', 'isa.souza@gmail.com')
        .clear()
        .should('have.value', '')

      cy.get('#phone')
      .type('999998888')
      .should('have.value', '999998888')
      .clear()
      .should('not.have.value')
    }) 
    
    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
      cy.get('button[type="submit"]').click() 
      cy.get('.error').should('be.visible') 
    }) 

    it.skip('envia o formuário com sucesso usando um comando customizado', function() {
      cy.fillMandatoryFieldsAndSubmit()
      cy.get('.success').should('be.visible')  
    }) 

    it('envia o formuário com sucesso usando um comando customizado 2', function() {
      cy.fillMandatoryFieldsAndSubmit('Isabela')
      cy.get('.success').should('be.visible')  
    })

    it('envia o formuário com sucesso usando um comando customizado 3', function() {
      cy.get('input[id="firstName"]').type('Isabela')
      cy.get('input[id="lastName"]').type('Souza')
      cy.get('input[id="email"]').type('isa.souza@gmail.com')
      cy.get('textarea[id="open-text-area"]').type('tudo excelente')
      cy.contains('button', 'Enviar').click()
      // cy.contains('Enviar').click() 
      cy.get('.success').should('be.visible')  
    })

    it('seleciona um produto (YouTube) por seu texto', function() {
      cy.get('#product').select('YouTube').should('have.value', 'youtube')
    })

    it('seleciona um produto (Mentoria) por seu valor', function() {
      cy.get('#product').select('mentoria').should('have.value', 'mentoria')
    })

    it('seleciona um produto (Blog) por seu indice', function() {
      cy.get('#product').select(1).should('have.value', 'blog')
    })

    it('marca o tipo de atendimento "Feedback"', function() {
      cy.get('input[type="radio"][value="feedback"]').check().should('have.value', 'feedback')
      cy.get('input[type="radio"][value="feedback"]').check().should('be.checked')
    })

    it('marca o tipo de atendimento', function() {
      cy.get('input[type="radio"]')
        .should('have.length', 3)
        .each(function($radio){
          cy.wrap($radio).check()
          cy.wrap($radio).should('be.checked')
        })
    })

    it('marca ambos checkboxes, depois desmarca o último', function() {
      cy.get('input[type="checkbox"]')
        .check()
        .should('be.checked')
        .last()
        .uncheck()
        .should('not.be.checked')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido 2', function() {

      cy.get('input[id="firstName"]').type('Isabela')
      cy.get('input[id="lastName"]').type('Souza')
      cy.get('input[id="email"]').type('isa.souza@gmail.com')
      cy.get('#phone-checkbox').check()
      cy.get('textarea[id="open-text-area"]').type('tudo certo', {delay: 500})
      cy.get('button[type="submit"]').click() 

      cy.get('.error').should('be.visible') 
    }) 

    it('seleciona um arquivo da pasta fixtures', function() {
      
      cy.get('#file-upload')
        .selectFile('cypress/fixtures/example.json')
        .should(function(input) {
          expect(input[0].files[0].name).to.equal('example.json')
        })   
    }) 

    it('seleciona um arquivo simulando um drag-and-drop', function() {
      
      cy.get('input[type="file"]')
        .selectFile('cypress/fixtures/example.json', {action: 'drag-drop'})
        .should(function(input) {
          expect(input[0].files[0].name).to.equal('example.json')
        })     
    }) 

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function() {
      
      cy.fixture('example.json', {encoding: null}).as('exampleFile')
      cy.get('#file-upload')
        .selectFile('@exampleFile', {action: 'drag-drop'})
        .then(input => {
          expect(input[0].files[0].name).to.equal('example.json')
        })
    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function() {

      cy.get('a[href="privacy.html"]').should('have.attr', 'target', '_blank')
    })

    it('acessa a página da política de privacidade removendo o target e então clicando no link', function() {

      cy.get('#privacy a').invoke('removeAttr', 'target').click()
      cy.contains('CAC TAT - Política de privacidade').should('be.visible') 
    })

   
})
 
 
