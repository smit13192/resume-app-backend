const { ApiError } = require("../utils/api_error");
const { asyncHandler } = require("../utils/async_handler");
const { SuccessResponse } = require("../utils/response");
const { CategoryModel } = require("../model/category");

const createCategory = asyncHandler(async (req, res, next) => {
    const { name } = req.body;
    const categoryExist = await CategoryModel.findOne({ name });
    if (categoryExist) {
        throw new ApiError(400, "⚠️ This category already exists. Please choose a different name. 🚀");
    }
    const category = new CategoryModel({ name });
    await category.save();
    res.status(201).json(new SuccessResponse({
        statusCode: 201,
        message: "Category created successfully! ✅",
        data: category
    }));
});

const getAllCategory = asyncHandler(async (_req, res, _next) => {
    const categories = await CategoryModel.find();
    res.status(200).json(new SuccessResponse({
        statusCode: 200,
        message: "Categories fetched successfully! ✅",
        data: categories
    }));
});

const updateCategory = asyncHandler(async (req, res, _next) => {
    const { id } = req.params;
    const { name } = req.body;
    let category = await CategoryModel.findById(id);
    if (!category) {
        throw new ApiError(400, "Category not found. Please check the category ID. 🚀");
    }
    category = await CategoryModel.findOneAndUpdate(
        { _id: id },
        { name },
        { new: true }
    );
    res.status(200).json(new SuccessResponse({
        statusCode: 200,
        message: "Category updated successfully! ✅",
        data: category
    }));
});

const deleteCategory = asyncHandler(async (req, res, _next) => {
    const { id } = req.params;

    let category = await CategoryModel.findByIdAndDelete(id);
    if (!category) {
        throw new ApiError(400, "Category not found. Please check the category ID. 🚀")
    };

    res.status(200).json(new SuccessResponse({
        statusCode: 200,
        message: "Category deleted successfully! ✅",
        data: category
    }));
});

module.exports = { createCategory, getAllCategory, updateCategory, deleteCategory };