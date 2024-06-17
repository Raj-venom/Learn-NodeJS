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

    const { name, description, path } = req.body;

    if (
        [name, description, path].some((field) => field?.trim() === "" || field?.trim() == undefined)
    ) {
        throw new ApiError(400, "Name, description, and path are required")
    }

    const existingPermission = await Permission.findOne({ name })

    if (existingPermission) {
        throw new ApiError(400, "Permission already exists")
    }

    const permission = await Permission.create({
        name,
        description,
        path
    })

    if (!permission) {
        throw new ApiError(500, "something went wrong while creating Permission")
    }

    return res
        .status(200)
        .json(new ApiResponse(201, {}, "Permission created successfully"))


})


const getAllRoutes = (app) => asyncHandler(async (req, res) => {
    const routes = [];
    app._router.stack.forEach((middleware) => {
        if (middleware.route) {
            // Routes registered directly on the app
            const route = middleware.route;
            const methods = Object.keys(route.methods).map(method => method.toUpperCase());
            routes.push({ path: route.path, methods });
        } else if (middleware.name === 'router') {
            // Router middleware
            middleware.handle.stack.forEach((handler) => {
                if (handler.route) {
                    const route = handler.route;
                    const methods = Object.keys(route.methods).map(method => method.toUpperCase());
                    routes.push({ path: route.path, methods });
                }
            });
        }
    });
    return res.status(200).json(new ApiResponse(200, routes, "All routes fetched successfully "));
});


export {
    addPermission,
    removePermission,
    createPermission,
    getAllRoutes
}