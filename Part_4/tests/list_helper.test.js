const listHelper = require('../utils/list_helper')
const blogs = require('./blogs')



test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})


describe('total likes', () => {
  test('with empty list', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })

  test('with one blog', () => {
    const result = listHelper.totalLikes([blogs[2]])
    expect(result).toBe(blogs[2].likes)
  })
  test('when list has many blogs', () => {
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(36)
  })
})

describe('favourite blog', () => {
  const b = []
 
  //console.log(blogs[12])
  test('with empty list', () => {
    expect(listHelper.favoriteBlog(b)).toEqual({});
  })

  test('with one blog', () => {
    const result = listHelper.favoriteBlog([blogs[2]])
    expect(result).toEqual(blogs[2].likes)
  })

  test('with many blogs', () => {
    expect(listHelper.favoriteBlog(blogs)).toEqual(blogs[2].likes);
  })
 
})


describe('most blogs', () => {
  const b = []
 
  test('with empty list', () => {
    expect(listHelper.mostBlogs(b)).toEqual({});
  })

  test('with one blog', () => {
    const result = listHelper.mostBlogs([blogs[2]])
    expect(result).toEqual({author: blogs[2].author, blogs: 1})
  })


  test('with many blogs', () => {
    expect(listHelper.mostBlogs(blogs)).toEqual({author: "Robert C. Martin", blogs: 3});
  })
 
})


describe('most likes', () => {
  const b = []
 
  test('with empty', () => {
    expect(listHelper.mostLikes(b)).toEqual({});
  })

  test('with one blog', () => {
    const result = listHelper.mostLikes([blogs[0]])
    expect(result).toEqual({author: blogs[0].author, likes: 7})
  })


  test('with many blogs', () => {
    expect(listHelper.mostLikes(blogs)).toEqual({author: "Edsger W. Dijkstra", likes: 17});
  })
 
})
