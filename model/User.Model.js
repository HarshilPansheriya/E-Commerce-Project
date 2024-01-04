const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true, default: "User" },
    isActive: { type: Boolean, default: true, required: true },
    createdAt: { type: String, required: true },
    updatedAt: { type: String, required: true },
})

const User = mongoose.model('User', UserSchema);
module.exports = User;