const express = require('express');
const router = express.Router()
const { users, user, publish, updateUser, deleteMyProfile, AdminRemoveUser, listUsers, companyJustForYou, rejectRequest, acceptRequest } = require('../controller/user')
const { requiresignin, authMiddleware, adminMiddleware } = require('../controller/auth')

router.get('/user', requiresignin, authMiddleware, user)
router.put('/user/publish?', requiresignin, authMiddleware, publish)
router.put('/user/update?', requiresignin, authMiddleware, updateUser)
router.get('/users', requiresignin, authMiddleware, users)
router.get('/user/companyJustForYou', requiresignin, authMiddleware, companyJustForYou)
router.post('/users', requiresignin, listUsers)
router.post('/user/reject', requiresignin, authMiddleware, rejectRequest)
router.post('/user/accept', requiresignin, authMiddleware, acceptRequest)
router.delete('/delete-my-account', requiresignin, authMiddleware, deleteMyProfile)
router.delete('/remove-user/:userId', requiresignin, authMiddleware, adminMiddleware, AdminRemoveUser)
module.exports = router;