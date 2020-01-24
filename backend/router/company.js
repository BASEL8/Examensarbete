const express = require('express');
const router = express.Router()
const { requiresignin, companyAuthMiddleware } = require('../controller/auth')
const { company, updateCompany, createAnnounce, removeAnnounce, justForYourCompany, sendContactRequest } = require('../controller/company')


router.get('/company', requiresignin, companyAuthMiddleware, company)
router.put('/company/update', requiresignin, companyAuthMiddleware, updateCompany)
router.post('/company/announce', requiresignin, companyAuthMiddleware, createAnnounce)
router.delete('/company/announce/remove', requiresignin, companyAuthMiddleware, removeAnnounce)
router.get('/company/justForYouCompany', requiresignin, companyAuthMiddleware, justForYourCompany)
router.post('/company/contactUser', requiresignin, companyAuthMiddleware, sendContactRequest)


module.exports = router;