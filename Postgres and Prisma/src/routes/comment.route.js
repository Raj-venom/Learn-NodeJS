import { Router } from "express";

import { createComment, getComment, deleteComment, getAllComment } from "../controllers/comment.controller.js";

const router = Router()

router.route("/").post(createComment)
router.route("/:id").get(getComment)
router.route("/:id").delete(deleteComment)
router.route("/").get(getAllComment)



export default router