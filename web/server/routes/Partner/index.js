const express=require('express')
const partnerController=require('../../controllers/Partner/index.js')
const router=express.Router()

router.post('/create',partnerController.createPartner)
router.put('/update',partnerController.updatePartner)
router.get('/info',partnerController.getPartnerInfo)
module.exports=router