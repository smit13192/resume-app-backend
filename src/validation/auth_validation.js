const { GOOGLE_LOGIN, FACEBOOK_LOGIN, APPLE_LOGIN, EMAIL_LOGIN, ANDROID_PLATFORM, IOS_PLATFORM } = require("../config/string");
const Joi = require("joi");

const socialLoginValidation = Joi.object({
    email: Joi.string().required().email(),
    name: Joi.string(),
    platform: Joi.string().allow(ANDROID_PLATFORM, IOS_PLATFORM).required(),
    loginType: Joi.string().allow(GOOGLE_LOGIN, FACEBOOK_LOGIN, APPLE_LOGIN, EMAIL_LOGIN).required(),
    fcmToken: Joi.string().required(),
});

module.exports = {
    socialLoginValidation,
};