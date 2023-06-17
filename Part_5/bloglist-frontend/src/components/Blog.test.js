import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

//the test will complain about propTypes but the test still passes.

test('renders title and author but not likes and url', () => {
  const blog = {
    title: 'testTitle',
    author: 'testAuthor',
    likes: 5,
    url: 'testurl',
    user: [{
        username: 'tester',
        name: 'testname'
    }]
  }

  const { container } = render(<Blog blog={blog} />)

  const element = container.querySelector('.small-div')
  expect(element).toHaveTextContent('testTitle')
  expect(element).toHaveTextContent('testAuthor')
  expect(element).not.toHaveTextContent('testurl')
  expect(element).not.toHaveTextContent('likes: ')
  expect(element).not.toHaveStyle('display: none')
})

test('url, likes and author shown when view clicked', async () => {
    const blog = {
      title: 'testTitle',
      author: 'testAuthor',
      likes: 5,
      url: 'testurl',
      user: [{
          username: 'tester',
          name: 'testname'
      }]
    }
  
    const { container } = render(<Blog blog={blog} />)
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const smallDiv = container.querySelector('.small-div')
    const bigDiv = container.querySelector('.big-div')
    expect(smallDiv).toHaveStyle('display: none')
    expect(bigDiv).not.toHaveStyle('display: none')
    expect(bigDiv).toHaveTextContent('testTitle')
    expect(bigDiv).toHaveTextContent('testAuthor')
    expect(bigDiv ).toHaveTextContent('testurl')
    expect(bigDiv ).toHaveTextContent('likes: ')

  })


test('Like twice', async () => {
const blog = {
    title: 'testTitle',
    author: 'testAuthor',
    likes: 5,
    url: 'testurl',
    user: [{
        username: 'tester',
        name: 'testname'
    }]
}
const mockHandler = jest.fn()

const { container } = render(<Blog blog={blog} handleLike={mockHandler} />)
const user = userEvent.setup()
const button = screen.getByText('view')
await user.click(button)

const like = screen.getByText('like')
await user.click(like)
await user.click(like)

expect(mockHandler.mock.calls).toHaveLength(2)

})

