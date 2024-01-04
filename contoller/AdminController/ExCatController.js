const ExCat = require('../../model/ExCate.Model');
const Cat = require('../../model/Category.Model');
const SubCat = require('../../model/SubCategory.Model');

module.exports.addExCat = async (req, res) => {
    let cat = await Cat.find();
    return res.render('AdminPanel/addExCat', { cat: cat });
}

module.exports.insertExCat = async (req, res) => {
    const nDate = new Date().toLocaleString('en-US', {
        timeZone: 'Asia/Calcutta'
    });

    req.body.createdAt = nDate;
    req.body.updatedAt = nDate;

    let data = await ExCat.create(req.body);
    if (data) {
        return res.redirect('/');
    } else {
        return res.redirect('back');
    }
}

module.exports.getexCatData = async (req, res) => {
    let extraData = await ExCat.find({ SubCat_id: req.body.subCatId });

    let optionData = `<option value="">Select Extra Category</option>`;
    for (ed of extraData) {
        optionData += `<option value="${ed.id}">${ed.ExCat_name}</option>`;
    }

    return res.json(optionData);
}