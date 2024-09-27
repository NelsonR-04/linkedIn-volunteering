import express from "express"
import { getLinkedInProfileData, getLinkedInProfileInfo, getLinkedInProfile, generateQR } from "../controller/index.js"

const router = express.Router()

router.get('/', getLinkedInProfileInfo)
router.get('/generate-qr', generateQR)

router.get('/add-linkedin-volunteering', getLinkedInProfileData)
router.get('/profile', getLinkedInProfile)

export default router