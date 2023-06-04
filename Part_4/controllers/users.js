const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')


usersRouter.post('/', async (request, response) => {
    const body = request.body

    if (body.password === undefined) {
        return response.status(400).json({ error: 'password missing' })
    }
    else if (body.password.length < 3) {
        return response.status(400).json({ error: 'the length of password should be at least 3' })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)


    const user = new User ({
        username: body.username,
        passwordHash: passwordHash,
        name: body.name
    })
    try {
        const savedUser = await user.save()
        response.status(201).json(savedUser)
    }
    catch (exception){
        return response.status(400).json({error: 'invalid user'})
    }
})

usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs', { url: 1, title: 1, author: 1 })
    response.json(users)
})

module.exports = usersRouter