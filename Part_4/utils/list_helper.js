const lodash = require('lodash')

const dummy = (blogs) => {
    return 1
}
const totalLikes = (blogs) => {
    let total = 0
    blogs.forEach(blog => {
        total += blog.likes
    });
    return total
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
        return {}
    }
    let max = 0
    blogs.forEach(blog => {
        if (blog.likes > max) {max = blog.likes}
    });
    return max

}


const mostBlogs = (blogs) => {
    const groupedBlogs =  Object.entries(lodash.groupBy(blogs, 'author'))
    let mostBlogs = groupedBlogs[0]
    if (groupedBlogs.length === 0) {
        return {}
    }

    groupedBlogs.forEach(tuple => {
        if (tuple[1].length > mostBlogs[1].length) {
            mostBlogs = tuple
        }
    })
    return {
        author: mostBlogs[0],
        blogs: mostBlogs[1].length}

}


const mostLikes = (blogs) => {
    const groupedBlogs =  Object.entries(lodash.groupBy(blogs, 'author'))
    let mostlikes = groupedBlogs[0]
    if (groupedBlogs.length === 0) {
        return {}
    }
    groupedBlogs.forEach(tuple => {
        if (totalLikes(tuple[1]) > totalLikes(mostlikes[1])) {
            mostlikes = tuple
        }
    })
    return {
        author: mostlikes[0],
        likes: totalLikes(mostlikes[1])
    }
}

module.exports = {
    dummy, 
    totalLikes, 
    favoriteBlog, 
    mostBlogs, 
    mostLikes
}