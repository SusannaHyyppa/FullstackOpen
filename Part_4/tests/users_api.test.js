const mongoose = require('mongoose')
const supertest = require('supertest')
const User = require('../models/user')
const app = require('../app')

const api = supertest(app)

const users = [
    {
        username: "tester1",
        password: "password1",
        name: "test1",
    },
    {
        username: "tester2",
        password: "password2",
        name: "test2",
      },
]

beforeEach(async () => {
    await User.deleteMany({})
    const userObject = users.map(user => new User(user))
    const promiseArray = userObject.map(user => user.save())
    await Promise.all(promiseArray)
})

test('number of users doesnt increase when posting invalid user', async () => {
    const newUser1 = {
        username: "t", 
        password: "123",
        name: "test1"
    }

    await api
        .post('/api/users')
        .send(newUser1)
        .expect(400)
        .expect('Content-Type', /application\/json/)

    const newUser2 = {
        password: "456",
        name: "test2"
    }

    await api
        .post('/api/users')
        .send(newUser2)
        .expect(400)
        .expect('Content-Type', /application\/json/)
    
    const newUser3 = {
        username: "test3", 
        name: "test3"
    }

    await api
        .post('/api/users')
        .send(newUser2)
        .expect(400)
        .expect('Content-Type', /application\/json/)


    const newUser4 = {
        username: "tester1",
        password: "password1",
        name: "test4",
    }

    await api
        .post('/api/users')
        .send(newUser4)
        .expect(400)
        .expect('Content-Type', /application\/json/)

    
    const response = await api
        .get('/api/users')
        .expect('Content-Type', /application\/json/)
    
    expect(response.body).toHaveLength(2)
})

test('posting a valid user increases the number of users', async() => {
    const newUser5 = {
        username: "tester3",
        password: "password3",
        name: "test3",
    }
    await api
        .post('/api/users')
        .send(newUser5)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await api
    .get('/api/users')
    .expect('Content-Type', /application\/json/)

    expect(response.body).toHaveLength(3)

})

