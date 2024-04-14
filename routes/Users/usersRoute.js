const express = require('express')
const { UserRegister, UserLogin, UserProfile, UserUpdate, UserDelete } = require('../../controller/User/UserCntrl')
const isLogin = require('../../middleware/isLogin')
const userRoutes = express.Router()

userRoutes.post('/register', UserRegister)
userRoutes.post('/login', UserLogin)

userRoutes.get('/profile', isLogin, UserProfile)
//update/api/vi/users/:id
userRoutes.put('/', isLogin, UserUpdate)
//delete/api/vi/users/login
userRoutes.delete('/', isLogin, UserDelete)
module.exports = userRoutes
