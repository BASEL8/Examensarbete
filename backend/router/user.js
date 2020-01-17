const express = require('express');
const router = express.Router()
const { users, user, publish, updateUser, deleteMyProfile, AdminRemoveUser, listUsers } = require('../controller/user')
const { requiresignin, authMiddleware, adminMiddleware } = require('../controller/auth')

router.get('/users', requiresignin, authMiddleware, users)
router.get('/user/:_id', requiresignin, authMiddleware, user)
router.put('/user/publish', requiresignin, authMiddleware, publish)
router.put('/user/update', requiresignin, authMiddleware, updateUser)
router.post('/users', requiresignin, listUsers)
router.delete('/delete-my-account', requiresignin, authMiddleware, deleteMyProfile)
router.delete('/remove-user/:userId', requiresignin, authMiddleware, adminMiddleware, AdminRemoveUser)
module.exports = router;