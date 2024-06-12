import { Router } from "express"
import { addPermission } from "../controllers/permission.controllers.js"

const router = Router()

router.route("/addpermission").patch(addPermission)

export default router
