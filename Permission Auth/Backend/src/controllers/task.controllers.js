import { asyncHandler } from "../utils/assyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"




const readFile = asyncHandler(async (req, res) => {

    const data = "i am big data"

    return res
        .status(200)
        .json(new ApiResponse(200, {data}, "data fetched successfully"))


})

const writeFile = asyncHandler(async (req, res) => {

    const data = "i am new big data"

    return res
        .status(200)
        .json(new ApiResponse(200, {data}, "data write successfully"))


})

const modifyFile = asyncHandler(async (req, res) => {

    const data = "i am modifyed big data"

    return res
        .status(200)
        .json(new ApiResponse(200, {data}, "data modifyed successfully"))


})

const deleteFile = asyncHandler(async (req, res) => {


    const data = "i am modifyed big data"

    return res
        .status(200)
        .json(new ApiResponse(200, {data}, "data modifyed successfully"))


})

export {
    readFile,
    writeFile,
    modifyFile,
    deleteFile

}