const express = require('express');
const router = express.Router()
const { requiresignin, companyAuthMiddleware } = require('../controller/auth')
const { company, updateCompany, createAnnounce } = require('../controller/company')


router.get('/company', company)
router.put('/company', updateCompany)
router.post('/company/announce', requiresignin, companyAuthMiddleware, createAnnounce)


module.exports = router;