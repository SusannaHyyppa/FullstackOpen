const app = require('./app') // varsinainen Express-sovellus
const config = require('./utils/config')



//const Blog = mongoose.model('Blog', blogSchema)

//mongoose.connect(mongoUrl)s

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})