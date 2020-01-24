const express = require('express');
const router = express.Router()
const { requiresignin, companyAuthMiddleware } = require('../controller/auth')
const { company, updateCompany, createAnnounce, removeAnnounce } = require('../controller/company')


router.get('/company', requiresignin, companyAuthMiddleware, company)
router.put('/company/update', requiresignin, companyAuthMiddleware, updateCompany)
router.post('/company/announce', requiresignin, companyAuthMiddleware, createAnnounce)
router.delete('/company/announce/remove', requiresignin, companyAuthMiddleware, removeAnnounce)


module.exports = router;