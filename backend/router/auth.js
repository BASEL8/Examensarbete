const express = require('express');
const router = express.Router()
const { preSignup, signup, signin, signOut, forgetPassword, resetPassword } = require('../controller/auth')

router.post('/pre-signup', preSignup)
router.post('/signup', signup)
router.post('/signin', signin)
router.get('/signout', signOut)
router.put('/forget-password', forgetPassword)
router.put('/reset-password', resetPassword)


module.exports = router;