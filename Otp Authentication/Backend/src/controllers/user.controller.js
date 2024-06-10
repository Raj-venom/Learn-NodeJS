import { asyncHandler } from "../utils/assyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { User } from "../models/user.model.js"
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer"


const options = {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
}

const sendOtp = asyncHandler(async (email, otp) => {


    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.SERVER_EMAIL,
            pass: process.env.SERVER_EMAIL_PASSKEY

        }
    });


    const mailOptions = {
        from: 'demo.email.test07@gmail.com',
        to: email,

        subject: 'verify login',
        text: `otp `,
        html: `<b>otp is ${otp}</b>`
    };



    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });

})

const generateAccessAndRefereshTokens = async (userId) => {
    try {
        const user = await User.findById(userId)
        if (!user) {
            throw new ApiError(404, "user not found")
        }
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return { accessToken, refreshToken }


    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating referesh and access token")
    }
}

const registerUser = asyncHandler(async (req, res) => {

    const { fullName, email, password } = req.body

    if (
        [fullName, email, password].some((field) => field?.trim() === "" || field?.trim() == undefined)
    ) {
        throw new ApiError(400, "All field are required")
    }

    const existedUser = await User.findOne({ email })

    if (existedUser) {
        throw new ApiError(400, "User with email already exists")
    }
    const otp = Math.floor(100000 + Math.random() * 900000);
    sendOtp(email, otp)

    const user = await User.create(
        {
            fullName,
            email,
            password,
            otp
        }
    )

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken -opt -verifiedUser"
    )

    if (!createdUser) {
        throw new ApiError(500, "something went wrong while registering the user")
    }

    return res
        .status(201)
        .json(new ApiResponse(201, {}, "Opt send sucessfylly"))

})

const loginUser = asyncHandler(async (req, res) => {

    const { email, password } = req.body;

    if (
        [email, password].some((field) => field?.trim() === "" || field?.trim() == undefined)
    ) {
        throw new ApiError(400, "email or password is required")
    }

    const user = await User.findOne(
        {
            email
        }
    )

    if (!user) {
        throw new ApiError(401, "User not found")
    }

    if (!user.verifiedUser) {
        throw new ApiError(401, "verify email to login")
    }

    const isPasswordValid = await user.isPasswordCorrect(password)


    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid user credentials")
    }

    const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedInUser, accessToken, refreshToken
                },
                "User logged In Successfully"
            )
        )

})


const refreshAccessToken = asyncHandler(async (req, res) => {

    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if (!incomingRefreshToken) {
        throw new ApiError(401, "Unauthorized request")
    }

    try {
        const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET)

        const user = await User.findById(decodedToken?._id)

        if (!user) {
            throw new ApiError(401, "Invalid refresh token")
        }


        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(401, "Refresh token expired or used")
        }


        const { accessToken, refreshToken: newRefreshToken } = await generateAccessAndRefereshTokens(user?._id)

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", newRefreshToken, options)
            .json(
                new ApiResponse(
                    200,
                    { accessToken, refreshToken: newRefreshToken },
                    "Access token refreshed"
                )
            )

    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid refresh token")
    }

})

const getCurrentUser = asyncHandler(async (req, res) => {

    return res
        .status(200)
        .json(new ApiResponse(
            200,
            req.user,
            "User fetched successfully"
        ))
})

const verifyOtp = asyncHandler(async (req, res) => {

    const { email, otp } = req.body

    if (
        [email, otp].some((field) => field?.trim() === "" || field?.trim() == undefined)
    ) {
        throw new ApiError(400, "email and otp is required")
    }

    const user = await User.findOne(
        {
            email
        }
    )
    if (!user) {
        throw new ApiError(401, "User not found")
    }


    const updatedAt = new Date(user.updatedAt);
    const currentTime = Date.now();
    const expiryTime = 5 * 60 * 1000;

    if (currentTime - updatedAt.getTime() > expiryTime) {
        const otp = Math.floor(100000 + Math.random() * 900000);
        sendOtp(email, otp);
        user.otp = otp
        await user.save({ validateBeforeSave: false })
        throw new ApiError(401, "OTP expired, please enter a new OTP");
    }

    if (user.otp != otp) {
        throw new ApiError(401, "opt not matched")
    }



    user.verifiedUser = true
    user.otp = undefined
    await user.save({ validateBeforeSave: false })


    // const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(user._id)

    // const loggedInUser = await User.findById(user._id).select("-password -refreshToken -otp")

    return res
        .status(200)

        .json(
            new ApiResponse(200, {}, "user verifyed sucessfylly")
        )

})




export {
    registerUser,
    loginUser,
    refreshAccessToken,
    getCurrentUser,
    verifyOtp
}