const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const AVATAR_PATH = '/uploads/Admin';

const AdminSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    hobby: {
        type: Array,
        required: true,
    },
    avatar: {
        type: String,
        required: true,
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true,
    },
    isLogin: {
        type: Boolean,
        required: true,
        default: true,
    },
    role: {
        type: String,
        required: true,
        default: "Admin",
    },
    createdAt: {
        type: String,
        required: true,
    },
    updatedAt: {
        type: String,
        required: true,
    }
}
);


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '..', AVATAR_PATH));
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now());
    }
});


AdminSchema.statics.uploadedAvatar = multer({ storage: storage }).single('Admin');
AdminSchema.statics.avatarPath = AVATAR_PATH;

const Admin = mongoose.model('Admin', AdminSchema);
module.exports = Admin;