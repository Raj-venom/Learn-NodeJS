import { asyncHandler } from "../utils/assyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { User } from "../models/user.model.js"

// const per23 = ["read", "write", "edit", "delete" ]


const addPermission = asyncHandler(async (req, res) => {

    const { permission, email } = req.body

    if (!permission) {
        throw new ApiError(400, "permission required")
    }

    const user = await User.findOne({ email })

    if (!user) {
        throw new ApiError(401, "User not found")
    }

    user.permission.push(permission)
    await user.save({ validateBeforeSave: false })

    return res
        .status(200)

        .json(
            new ApiResponse(200, {}, "permission updated sucessfylly")
        )

})


export {
    addPermission
}