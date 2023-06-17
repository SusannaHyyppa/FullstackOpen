import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, handleLike, handleRemove, user }) => {
  const [likes, setLikes] = useState(blog.likes)

  const [visible, setVisible] = useState(false)
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }
  const showIfUser = { display: user.id === blog.user[0].id ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const likeBlog = async () => {
    const updateObject = {
      ...blog,
      likes: blog.likes + 1
    }

    await handleLike(updateObject)
    setLikes(likes + 1)
  }

  const removeBlog = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      await handleRemove(blog.id)
    }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  //dont know why the user is inside an array, probably something wrong with backend but cant find it
  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible} className='small-div'>
        {blog.title} {blog.author}
        <button className="view-button"onClick={toggleVisibility} >view</button>
      </div>
      <div style={showWhenVisible} className='big-div'>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility} >hide</button>
        <div>{blog.url}</div>
        <div>likes: {blog.likes} <button className="like-button" onClick={likeBlog} >like</button></div>
        <div>{blog.user[0].name}</div>
        <div style={showIfUser} className='delete-div' >
          <button className="remove-button" onClick={removeBlog} >remove</button>
        </div>
      </div>
    </div>
  )}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleLike: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}
export default Blog