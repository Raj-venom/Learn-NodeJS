import { asyncHandler } from "../utils/assyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { User } from "../models/user.model.js"
import { Permission } from "../models/permission.model.js"


const addPermission = asyncHandler(async (req, res) => {

    const { permission, email } = req.body

    if (!permission) {
        throw new ApiError(400, "permission required")
    }

    const user = await User.findOne({ email })

    if (!user) {
        throw new ApiError(401, "User not found")
    }

    if (!user.permission.includes(permission)) {
        user.permission.push(permission)
        await user.save({ validateBeforeSave: false })

    }

    return res
        .status(200)

        .json(
            new ApiResponse(200, {}, "permission updated sucessfylly")
        )

})

const removePermission = asyncHandler(async (req, res) => {

    const { permission, email } = req.body

    if (!permission) {
        throw new ApiError(400, "Permission required");
    }

    const user = await User.findOne({ email });

    if (!user) {
        throw new ApiError(401, "User not found");
    }

    user.permission = user.permission.filter((item) => item !== permission)
    await user.save({ validateBeforeSave: false })


    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Permission removed successfully"))

})

const createPermission = asyncHandler(async (req, res) => {

    const { name, description, method } = req.body;

    if (
        [name, description, method].some((field) => field?.trim() === "" || field?.trim() == undefined)
    ) {
        throw new ApiError(400, "Name, description, and method are required")
    }

    const existingPermission = await Permission.findOne({ name })

    if (existingPermission) {
        throw new ApiError(400, "Permission already exists")
    }

    const permission = await Permission.create({
        name,
        description,
        method
    })

    if (!permission) {
        throw new ApiError(500, "something went wrong while creating Permission")
    }

    return res
        .status(200)
        .json(new ApiResponse(201, {}, "Permission created successfully"))


})

export {
    addPermission,
    removePermission,
    createPermission
}