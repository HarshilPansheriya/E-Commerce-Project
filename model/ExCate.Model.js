const mongoose = require('mongoose');


const ExCatSchema = mongoose.Schema({
    Cat_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    SubCat_id: { type: mongoose.Schema.Types.ObjectId, ref: 'SubCategory', required: true },
    ExCat_name: { type: String, required: true },
    isActive: { type: Boolean, required: true, default: true },
    createdAt: { type: String, required: true },
    updatedAt: { type: String, required: true },
});



const ExCat = mongoose.model('ExCat', ExCatSchema);
module.exports = ExCat;
