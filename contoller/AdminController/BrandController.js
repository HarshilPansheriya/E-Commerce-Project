const Brand = require('../../model/Brand.Model');
const ExCat = require('../../model/ExCate.Model');
const Cat = require('../../model/Category.Model');
const SubCat = require('../../model/SubCategory.Model');

module.exports.addBrand = async (req, res) => {
    let cat = await Cat.find();
    return res.render('AdminPanel/addBrand', { cat: cat })
}

module.exports.insertBrand = async (req, res) => {
    const nDate = new Date().toLocaleString('en-US', {
        timeZone: 'Asia/Calcutta'
    });
    req.body.createdAt = nDate
    req.body.updatedAt = nDate

    let data = await Brand.create(req.body);
    if (data) {
        return res.redirect('/');
    } else {
        return res.redirect('back');``
    }
}