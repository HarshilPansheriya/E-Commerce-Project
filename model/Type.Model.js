const mongoose = require('mongoose');

const TypeSchema = mongoose.Schema({
    Cat_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    SubCat_id: { type: mongoose.Schema.Types.ObjectId, ref: 'SubCategory', required: true },
    ExCat_id: { type: mongoose.Schema.Types.ObjectId, ref: 'ExCat', required: true },
    Type: { type: String, required: true },
    isActive: { type: Boolean, required: true, default: true },
    createdAt: { type: String, required: true },
    updatedAt: { type: String, required: true },
})

const Type = mongoose.model('Type', TypeSchema);
module.exports = Type;