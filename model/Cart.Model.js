const mongoose = require('mongoose');

const CartSchema = mongoose.Schema({
    product_id: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    quantity: { type: String, default: 1, required: true },
    isActive: { type: Boolean, default: true, required: true },
    createdAt: { type: String, required: true },
    updatedAt: { type: String, required: true },
})

const Cart = mongoose.model("Cart", CartSchema);
module.exports = Cart