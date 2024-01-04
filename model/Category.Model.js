const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const AVATAR_PATH = '/uploads/Category';


const CatSchema = mongoose.Schema({
    Category_Name: { type: String, required: true },
    Category_Image: { type: String, required: true },
    isActive: { type: Boolean, required: true, default: true },
    createdAt: { type: String, required: true },
    updatedAt: { type: String, required: true },
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '..', AVATAR_PATH));
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now());
    }
});

CatSchema.statics.uploadedAvatar = multer({ storage: storage }).single('Category');
CatSchema.statics.avatarPath = AVATAR_PATH;

const Category = mongoose.model('Category', CatSchema);
module.exports = Category
