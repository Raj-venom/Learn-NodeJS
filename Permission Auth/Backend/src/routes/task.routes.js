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

router.route("/readFile").get(readTask, readFile)
router.route("/addfile").post(writeTask, writeFile)
router.route("/modifyfile").patch(editTask, modifyFile)
router.route("/deletefile").delete(deleteTask, deleteFile)


export default router
