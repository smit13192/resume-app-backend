const { UserModel, userSelectedFields, userPipeline } = require("../model/user");
const { ApiError } = require("../utils/api_error");
const { asyncHandler } = require("../utils/async_handler");
const { generateToken } = require("../utils/generate_token");
const { SuccessResponse } = require("../utils/response");

const login = asyncHandler(async (req, res, _next) => {
    let { email, name, loginType, platform, fcmToken } = req.body;

    let findUser = await UserModel.findOne({ email });
    if (findUser) {
        if (findUser.isDeleted) {
            throw new ApiError(400, "Account is deleted. Please contact support for more information.");
        }
        if (findUser.loginType !== loginType) {
            throw new ApiError(400, "Mismatch: Please use your registered login method.");
        }
        findUser.platform = platform;
        findUser.fcmToken = fcmToken;
        await findUser.save();
        const token = generateToken(findUser._id);
        findUser = await UserModel.aggregate([
            {
                $match: {
                    _id: findUser._id
                }
            },
            ...userPipeline
        ]);
        return res.status(200).json(new SuccessResponse({
            statusCode: 200,
            message: "Logged in successfully. Let's get started! 🚀",
            data: {
                token,
                user: findUser
            }
        }))
    }

    let user = new UserModel({ email, name, loginType, platform, fcmToken });
    await user.save();
    const token = generateToken({ id: user._id });
    user = await UserModel.aggregate([
        {
            $match: {
                _id: user._id
            }
        },
        ...userPipeline
    ]);
    return res.status(201).json(new SuccessResponse({
        statusCode: 201,
        message: "Account created successfully. Let's get started! 🚀",
        data: {
            token,
            user
        }
    }));
});

module.exports = {
    login,
};