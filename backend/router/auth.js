const express = require('express');
const router = express.Router()
const { preSignup, signup, signin, signOut, forgetPassword, resetPassword, preSignupCompany, signupCompany, signinCompany } = require('../controller/auth')

router.post('/pre-signup', preSignup)
router.post('/signup', signup)
router.post('/signin', signin)
router.get('/signout', signOut)
router.put('/forget-password', forgetPassword)
router.put('/reset-password', resetPassword)
router.post('/company/pre-signup', preSignupCompany)
router.post('/company/signup', signupCompany)
router.post('/company/signin', signinCompany)

module.exports = router;