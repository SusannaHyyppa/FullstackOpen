const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
require('express-async-errors')



blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', {name: 1, username: 1})
    response.json(blogs)
  })

  
blogsRouter.post('/', async (request, response) => {
  const body = request.body 
  if (!body.title || !body.url) {
    return response.status(400).json({error: "no title or url"})
  } 

  const user = await User.findById(request.user.id)
  const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0,
      user: user._id
  })


  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog)
})


blogsRouter.delete('/:id', async (request, response) => {
  try {
    const user = request.user
    console.log(user)
    const blog = await Blog.findById(request.params.id)
    
    if ( blog.user.toString() !== user.id.toString() ) {
      return response.status(401).json({error: "unauthorized"})
    }
    console.log("?????")
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } 
  catch (exception) {
    console.log(exception)
    response.status(400).json({error: "bad id"})
  }
})


blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body

  const blog = {
    likes: body.likes
  }
  try {
    const res = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json(res)
  }
  catch (exception){
    response.status(400).end()
  }
  
})

module.exports = blogsRouter
  