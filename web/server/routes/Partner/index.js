const express=require('express')
const partnerController=require('../../controllers/Partner/index.js')
const router=express.Router()

//index page
router.post('/create',partnerController.createPartner)
router.put('/update',partnerController.updatePartner)
router.get('/info',partnerController.getPartnerInfo)
//settings page
router.post('/page-previewing',partnerController.pagePreviewing)
router.post('/settings',partnerController.settings)
module.exports=router