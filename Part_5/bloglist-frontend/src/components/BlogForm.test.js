import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'


test('renders title and author but not likes and url', async () => {
  const user = userEvent.setup()
  const mockHandler = jest.fn()
  const { container } = render(<BlogForm addBlog={mockHandler} />)
  const inputs = screen.getAllByRole('textbox')
  await user.type(inputs[0], 'test')
  await user.type(inputs[1], 'authh')
  await user.type(inputs[2], '123')
  const button = screen.getByText('create')
  await user.click(button)
  expect(mockHandler.mock.calls[0][0].url).toBe('123')
  expect(mockHandler.mock.calls[0][0].author).toBe('authh')
  expect(mockHandler.mock.calls[0][0].title).toBe('test')
})
