import { Router } from "express"
import {
    readFile,
    writeFile,
    modifyFile,
    deleteFile
} from "../controllers/task.controllers.js"

import { verifyPermission } from "../middlewares/permission.middleware.js"


const router = Router()

router.route("/readFile").get(verifyPermission("/readFile"), readFile)
router.route("/addfile").post(verifyPermission("/addfile"), writeFile)
router.route("/modifyfile").patch(verifyPermission("/modifyfile"), modifyFile)
router.route("/deletefile").delete(verifyPermission("/deletefile"), deleteFile)


export default router
