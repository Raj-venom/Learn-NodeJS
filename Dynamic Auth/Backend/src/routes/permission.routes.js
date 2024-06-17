import { Router } from "express"
import { addPermission, removePermission, createPermission } from "../controllers/permission.controllers.js"


const router = Router()


router.route("/addPermission").post(addPermission);
router.route("/removePermission").post(removePermission);
router.route("/createPermission").post(createPermission);

export default router
