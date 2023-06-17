const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const blogs = require('./blogs')
const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    const blogObject = blogs.map(blog => new Blog(blog))
    const promiseArray = blogObject.map(blog => blog.save())
    await Promise.all(promiseArray)
})

test('there are 6 blogs', async () => {
    const response = await api
    .get('/api/blogs')
    .expect('Content-Type', /application\/json/)
    expect(response.body).toHaveLength(6)
})


test('there is a field called id', async () => {
    const response = await api 
        .get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
})

test('after adding a blog the number of blogs increases', async () => {
    const newBlog = {
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
    }

    const res1 = await api.get('/api/blogs')
    expect(res1.body).toHaveLength(6)

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(7)
  })



test('value of likes is set to zero if no value is given', async () => {
  const newBlog = {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
  }

  const res1 = await api.get('/api/blogs')
  expect(res1.body).toHaveLength(6)

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  expect(response.body[6].likes).toEqual(0)
})

test('blog without title is not added', async () => {
    
    const newBlog = {
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
      }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
})

test('blog without url is not added', async () => {
 
  const newBlog = {
      title: "React patterns",
      author: "Michael Chan",
    }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

})

test('delete a blog', async () => {
  
  const response = await api.get('/api/blogs')
  const id = response.body[0].id

  await api
    .delete(`/api/blogs/${id}`)
    .expect(204)

  const res = await api.get('/api/blogs')
  expect(res.body).toHaveLength(5)
})


test('update a blog', async () => {
  const response = await api.get('/api/blogs')
  const id = response.body[0].id

  const newBlog = {
    likes: 10
  }


  await api
    .put(`/api/blogs/${id}`)
    .send(newBlog)
  
  
  const res = await api.get('/api/blogs')
  expect(res.body[0]).toEqual({
    id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 10,
  })
})
  

afterAll(() => {
    mongoose.connection.close()
})
