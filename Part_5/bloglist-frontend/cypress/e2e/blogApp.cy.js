describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    const user = {
      name: 'Tester test',
      username: 'Tester',
      password: 'test123'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user) 
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('Tester')
      cy.get('#password').type('test123')
      cy.get('#login-button').click()

      cy.contains('blogs')
      cy.contains('Tester test logged in ')
      cy.contains('login succesful!')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('test')
      cy.get('#password').type('123')
      cy.get('#login-button').click()

      cy.contains('Log in to application')
      cy.contains('wrong credentials')
    })
  })


  describe('When user is logged in', function() {
    beforeEach(function() {
      // log in user here
      cy.get('#username').type('Tester')
      cy.get('#password').type('test123')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function() {
      cy.get('.toggle-button').click()
      cy.get('#title').type('test')
      cy.get('#author').type('authh')
      cy.get('#url').type('123')
      cy.get('#blog-button').click()

      cy.contains('test')
      cy.contains('authh')

    })

    describe('When a blog has been created', function() {
      beforeEach(function() {
        cy.get('.toggle-button').click()
        cy.get('#title').type('test')
        cy.get('#author').type('authh')
        cy.get('#url').type('123')
        cy.get('#blog-button').click()
      })

      it('A blog is liked', function() {
        cy.get('.view-button').click()
        cy.contains('likes: 0')
        
        cy.get('.like-button').click()
  
        cy.contains('likes: 1')  
      })
      it('A blog is removed', function() {
        cy.get('.view-button').click()
        cy.get('.remove-button').click()
        cy.contains('test authh').should('not.exist')
        cy.contains('Blog removed')

 
      })


      it('remove-button can only be seen by an user that has added that blog', function() {
        // the user that has created the blog can remove it
        //cy.get('.view-button').click()

        cy.get('#logout-button').click()
        cy.visit('http://localhost:3000')

        // now, we create a new user that tries to remove the blog
        cy.request('POST','http://localhost:3003/api/users/', {
          "name": "Tester test 2",
          "username": "Tester 2",
          "password": "test456"

        })
        
        
        cy.get('#username').type('Tester 2')
        cy.get('#password').type('test456')
        cy.get('#login-button').click()
        
        cy.get('.view-button').click()
        cy.contains('123')
        cy.get('.delete-div').should('have.css', 'display', 'none')
        
      })

      it('Blogs are ordered based on the number of likes', function() {
        cy.get('.toggle-button').click()
        cy.get('#title').type('test 2')
        cy.get('#author').type('authh 2')
        cy.get('#url').type('345')
        cy.get('#blog-button').click()

        cy.contains('test 2 authh 2')


        cy.get('.big-div').eq(0).should('contain', 'test authh')

        // Now, lets add a like to the second one
        cy.get('.view-button').eq(1).click()
        cy.get('.like-button').eq(1).click()
        

        cy.get('.big-div').eq(1).should('contain', 'test 2 authh 2')
      })

    })
  })


})