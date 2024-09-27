import express from "express"
import { getLinkedInProfileData, getLinkedInProfileInfo, getLinkedInProfile } from "../controller/index.js"

const router = express.Router()

router.get('/', getLinkedInProfileInfo)

router.get('/add-linkedin-volunteering', getLinkedInProfileData)
router.get('/profile', getLinkedInProfile)

export default router