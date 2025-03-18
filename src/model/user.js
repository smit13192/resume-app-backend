const { model, Schema } = require("mongoose");
const { ANDROID_PLATFORM, IOS_PLATFORM, GOOGLE_LOGIN, FACEBOOK_LOGIN, EMAIL_LOGIN, APPLE_LOGIN } = require("../config/string");

const userSchema = new Schema(
    {
        name: {
            type: String,
            default: null,
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            immutable: true,
            lowercase: true,
            trim: true,
            match: [
                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                "Please enter a valid email address"
            ],
        },
        image: {
            type: String,
            default: null,
        },
        userRole: {
            type: String,
            required: true,
            enum: ["user", "admin"],
            default: "user",
            immutable: true,
        },
        loginType: {
            type: String,
            required: true,
            enum: [GOOGLE_LOGIN, FACEBOOK_LOGIN, APPLE_LOGIN, EMAIL_LOGIN],
            immutable: true,
        },
        platform: {
            type: String,
            required: true,
            enum: [ANDROID_PLATFORM, IOS_PLATFORM],
        },
        fcmToken: {
            type: String,
            default: null,
        },
        categories: {
            type: [Schema.Types.ObjectId],
            ref: "categories",
            default: [],
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
        deletedAt: {
            type: Date,
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

const UserModel = model("users", userSchema);

const userSelectedFields = {
    name: 1,
    email: 1,
    image: 1,
    categories: 1,
    createdAt: 1,
    updatedAt: 1,
};

const userPipeline = [
    {
        $lookup: {
            from: "categories",
            localField: "categories",
            foreignField: "_id",
            as: "categories",
        }
    },
    {
        $project: userSelectedFields
    }
];


module.exports = { UserModel, userSelectedFields, userPipeline };