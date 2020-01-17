const express = require('express');
const router = express.Router()
const { company, updateCompany } = require('../controller/company')


router.get('/company', company)
router.put('/company', updateCompany)


module.exports = router;