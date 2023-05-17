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

module.exports = {
    dummy, 
    totalLikes, 
    favoriteBlog
}