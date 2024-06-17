import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/assyncHandler.js";
import jwt from "jsonwebtoken";
import { permissionSchema } from "../schema/permissionSchema.js"
import { z } from "zod";
import { Permission } from "../models/permission.model.js";



export const verifyPermission = (path) => asyncHandler(async (req, res, next) => {

    try {

        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")

        if (!token) {
            throw new ApiError(401, "Unauthorized request")
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")

        if (!user) {
            throw new ApiError(401, "Invalid Access Token")
        }


        const parsedPermissions = permissionSchema.parse({ permissions: user.permission })


        const requiredPermission = await Permission.findOne({ path })

        if (!requiredPermission) {
            throw new ApiError(403, "Permission not defined ")
        }

        if (parsedPermissions.permissions.includes(requiredPermission.name)) {
            next()
        } else {
            throw new ApiError(403, "Unauthorized access")
        }

    } catch (error) {
        next(error)
    }
})