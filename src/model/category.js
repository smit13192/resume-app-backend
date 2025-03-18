const { model, Schema } = require("mongoose");

const categorySchema = new Schema(
    {
        name: {
            type: String,
            default: null,
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

const CategoryModel = model("categories", categorySchema);

module.exports = { CategoryModel };