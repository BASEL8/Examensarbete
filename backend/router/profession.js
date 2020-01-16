const express = require('express');
const router = express.Router()
const { create, list, update, adminRemoveProfession, listRelated, listSearch } = require('../controller/profession')
const { requiresignin, adminMiddleware } = require('../controller/auth')

router.post('/profession', requiresignin, adminMiddleware, create)
router.get('/profession', requiresignin, adminMiddleware, list)
router.delete('/profession/adminRemoveProfession', requiresignin, adminMiddleware, adminRemoveProfession)
//router.delete('/blog/userRemoveProfession/:slug', requiresignin, userRemoveProfession)
router.put('/profession/:_id', requiresignin, update)
router.get('/profession/search', listSearch);
router.post('/profession/related', listRelated);

module.exports = router;