import { Router } from "express";
import {
    registerUser,
    loginUser,
    refreshAccessToken,
    getCurrentUser,
    verifyOtp
} from "../controllers/user.controller.js"

import { verifyJWT } from "../middlewares/auth.middleware.js"

const router = Router()

router.route("/register").post(registerUser);
router.route("/login").post(loginUser)
router.route("/current-user").get(verifyJWT, getCurrentUser)
router.route("/refresh-token").post(refreshAccessToken)
router.route("/verify-otp").post(verifyOtp)

export default router