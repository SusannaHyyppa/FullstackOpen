import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'



const Text = ({ message, color }) => {
  if (message === null) {
    return null
  }

  const style =  {
    color: color,
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  return (
    <div style={style}>
      {message}
    </div>

  )
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const color = 'green'

  const blogFormRef = useRef()

  const sortBlogsByLikes = (blgs) => {
    return blgs.sort((x, y) => y.likes - x.likes)
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( sortBlogsByLikes(blogs) )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLike = async (blog) => {
    await blogService.update(blog.id, blog)
    const blogs = await blogService.getAll()
    setBlogs(sortBlogsByLikes(blogs))
  }

  const handleRemove = async (id) => {
    await blogService.remove(id)
    setErrorMessage('Blog  removed')
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)

    setBlogs(sortBlogsByLikes(blogs.filter(b => b.id !== id)))
  }

  const addBlog = async (blogToAdd) => {
    const blog = await blogService.create(blogToAdd)
    const blogs = await blogService.getAll()
    blogFormRef.current.toggleVisibility()
    setBlogs(sortBlogsByLikes(blogs))
    setErrorMessage(`Blog ${blog.title} by ${blog.author} added succesfully!`)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)

  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)

      setUser(user)
      setUsername('')
      setPassword('')
      setErrorMessage('login succesful!')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }


  if (user === null) {
    return (
      <div>
        <Text message={errorMessage} color={color} />
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
        username
            <input
              id="username"
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
        password
            <input
              id="password"
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id="login-button" type="submit">login</button>
        </form>
      </div>
    )
  }
  else {
    return (
      <div>
        <Text message={errorMessage} color={color} />
        <h2>blogs</h2>
        {user.name} logged in <button id='logout-button'onClick={() => {
          window.localStorage.removeItem('loggedBlogappUser')
          blogService.setToken(null)
        }}>logout</button>

        <h2>create new</h2>
        <Togglable buttonLabel='new blog' ref={blogFormRef} >
          <BlogForm addBlog={addBlog}  />
        </Togglable>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} handleLike={handleLike} handleRemove={handleRemove} user={user} />
        )}
      </div>
    )
  }

}



/*
const App = () => {
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  return (
    <div>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App

*/

export default App