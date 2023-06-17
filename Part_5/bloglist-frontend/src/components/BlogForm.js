import { useState } from 'react'
import PropTypes from 'prop-types'


const BlogForm = ( { addBlog } ) => {
  const [url, setUrl] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')


  const handleBlog = async (event) => {
    event.preventDefault()
    await addBlog({ author, title, url })
    setAuthor('')
    setUrl('')
    setTitle('')
  }


  return (
    <form onSubmit={handleBlog}>
      <div>
              title:
        <input
          id="title"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
              author:
        <input
          id="author"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
              url:
        <input
          id="url"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button id="blog-button" type="submit">create</button>
    </form>
  )
}
BlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired,
}
export default BlogForm