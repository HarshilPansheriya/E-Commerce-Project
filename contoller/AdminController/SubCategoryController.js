const SubCat = require('../../model/SubCategory.Model');
const Cat = require('../../model/Category.Model');

module.exports.addSubCat = async (req, res) => {
    let cat = await Cat.find();
    return res.render('AdminPanel/addSubCategory', { cat: cat });
}

module.exports.insertSubCat = async (req, res) => {
    const nDate = new Date().toLocaleString('en-US', {
        timeZone: 'Asia/Calcutta'
    });

    req.body.createdAt = nDate;
    req.body.updatedAt = nDate;

    let data = await SubCat.create(req.body);
    if (data) {
        return res.redirect('/');
    } else {
        return res.redirect('back');
    }
}

module.exports.getSubCatData = async (req, res) => {
    // console.log(req.body.categoryId);
    let subData = await SubCat.find({ Cat_id: req.body.categoryId });
    let optionData = `<option value="">Select Sub Category</option>`;
    for (var sd of subData) {
        optionData += `<option value="${sd.id}">${sd.SubCat_name}</option>`
    }

    return res.json(optionData);
}