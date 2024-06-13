import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/assyncHandler.js";
import jwt from "jsonwebtoken";



const readTask = asyncHandler(async (req, res, next) => {

    try {
        const permission = req.permission;

        let access = false;

        permission.map((item) => {
            if (item === "read") {
                next()
                return
            }
        })

        if (!access) {
            throw new ApiError(403, "unauthorized access")
        }


    } catch (error) {
        throw new ApiError(403, "unauthorized access")

    }
})


const writeTask = asyncHandler(async (req, res, next) => {

    try {
        const permission = req.permission;

        let access = false;

        permission.map((item) => {
            if (item === "write") {
                next()
                return
            }
        })

        if (!access) {
            throw new ApiError(403, "unauthorized access")
        }


    } catch (error) {
        throw new ApiError(403, "unauthorized access")

    }
})

const editTask = asyncHandler(async (req, res, next) => {

    try {
        const permission = req.permission;

        let access = false;

        permission.map((item) => {
            if (item === "edit") {
                next()
                return
            }
        })
    
        if (!access) {
            throw new ApiError(403, "unauthorized access")
        }


    } catch (error) {
        throw new ApiError(403, "unauthorized access")

    }
})

const deleteTask = asyncHandler(async (req, res, next) => {

    try {
        const permission = req.permission;

        let access = false;

        permission.map((item) => {
            if (item === "delete") {
                next()
                return
            }
        })
    
        if (!access) {
            throw new ApiError(403, "unauthorized access")
        }


    } catch (error) {
        throw new ApiError(403, "unauthorized access")

    }
})


export {
    readTask,
    writeTask,
    editTask,
    deleteTask
}