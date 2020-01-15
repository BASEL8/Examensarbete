const express = require('express');
const router = express.Router()
const { users, user, publish, updateUser, deleteMyProfile, AdminRemoveUser } = require('../controller/user')
router.get('/users', users)
router.get('/user/:username', user)
router.post('/user/publish', publish)
router.put('/user/update', updateUser)
router.delete('/delete-my-account', deleteMyProfile)
router.delete('/remove-user/:userId', AdminRemoveUser)
module.exports = router;