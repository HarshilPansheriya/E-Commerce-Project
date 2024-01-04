const mongoose = require('mongoose');


const SubCatSchema = mongoose.Schema({
    Cat_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    SubCat_name: { type: String, required: true },
    isActive: { type: Boolean, required: true, default: true },
    createdAt: { type: String, required: true },
    updatedAt: { type: String, required: true },
});



const SubCat = mongoose.model('SubCategory', SubCatSchema);
module.exports = SubCat;
