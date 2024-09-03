import { Router } from "express";
import { registereUser, getUser, updateUser, deleteUser,filterUser, getAllUsers } from "../controllers/user.controler.js";


const router = Router()



router.route("/filter").get(filterUser); 
router.route("/").post(registereUser)
router.route("/:id").get(getUser)
router.route("/:id").put(updateUser)
router.route("/:id").delete(deleteUser)
router.route("/").get(getAllUsers)





export default router