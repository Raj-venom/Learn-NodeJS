import { Router } from "express";
import { createPost, getPost, updatePost, deletePost, getAllPost, getPostByUser, searchPost } from "../controllers/post.controller.js";
const router = Router()



router.route("/search").get(searchPost)
router.route("/").post(createPost)
router.route("/:id").get(getPost)
router.route("/:id").put(updatePost)
router.route("/:id").delete(deletePost)
router.route("/").get(getAllPost)
router.route("/user/:userId").get(getPostByUser)





export default router