const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");

const single = '/uploads/SinglePr';
const multi = '/uploads/MultiPr';

const ProductSchema = mongoose.Schema({
    Cat_id: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
    SubCat_id: { type: mongoose.Schema.Types.ObjectId, ref: "SubCategory", required: true },
    ExCat_id: { type: mongoose.Schema.Types.ObjectId, ref: "ExCat", required: true },
    Brand_id: { type: mongoose.Schema.Types.ObjectId, ref: "Brand", required: true },
    Type_id: { type: mongoose.Schema.Types.ObjectId, ref: "Type", required: true },
    product_name: { type: String, required: true },
    product_price: { type: String, required: true },
    product_old_price: { type: String, required: true },
    description: { type: String, required: true },
    rating: { type: String, required: true },
    singlePr: { type: String, required: true },
    multiPr: { type: Array, required: true },
    isActive: { type: Boolean, default: true, required: true },
    createdAt: { type: String, required: true },
    updatedAt: { type: String, required: true },
});

const storage = multer.diskStorage({
    destination: async (req, file, cb) => {
        if (file.fieldname == "multiPr") {
            await cb(null, path.join(__dirname, '..', multi))
        } else {
            await cb(null, path.join(__dirname, '..', single));
        }
    },
    filename: async (req, file, cb) => {
        await cb(null, file.fieldname + Math.round(Math.random() * 10000) + Date.now());
    }
})

ProductSchema.statics.uploadedAvatar = multer({ storage: storage }).fields([{ name: "singlePr", maxCount: 1 }, { name: "multiPr", maxCount: 10 }]);
ProductSchema.statics.singlePath = single;
ProductSchema.statics.multiPath = multi;

const Product = mongoose.model('Product', ProductSchema);
module.exports = Product