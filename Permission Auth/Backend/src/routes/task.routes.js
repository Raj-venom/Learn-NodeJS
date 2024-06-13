import { Router } from "express"
import {
    readFile,
    writeFile,
    modifyFile,
    deleteFile
} from "../controllers/task.controllers.js"

import { verifyPermission } from "../middlewares/permission.middleware.js"
import {
    readTask,
    writeTask,
    editTask,
    deleteTask

} from "../middlewares/access.middleware.js"


const router = Router()

router.use(verifyPermission)

router.route("/readFile").get(readFile)
router.route("/addfile").post(writeFile)
router.route("/modifyfile").patch(modifyFile)
router.route("/deletefile").delete(deleteFile)


export default router
