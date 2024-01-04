const Type = require('../../model/Type.Model');
const Cat = require('../../model/Category.Model');

module.exports.addType = async (req, res) => {
    let cat = await Cat.find({});
    return res.render('AdminPanel/addType', { cat: cat });
}

module.exports.insertType = async (req, res) => {
    const nDate = new Date().toLocaleString('en-US', {
        timeZone: 'Asia/Calcutta'
    });

    req.body.createdAt = nDate;
    req.body.updatedAt = nDate;

    let data = await Type.create(req.body);
    if (data) {
        return res.redirect('/');
    } else {
        return res.redirect('back');
    }
}