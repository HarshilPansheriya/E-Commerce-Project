const Cat = require('../../model/Category.Model');

module.exports.addCategory = async (req, res) => {
    return res.render('AdminPanel/addCategory')
}

module.exports.insertCategory = async (req, res) => {
    const nDate = new Date().toLocaleString('en-US', {
        timeZone: 'Asia/Calcutta'
    });

    let imgPath = '';
    if (req.file) {
        imgPath = Cat.avatarPath + '/' + req.file.filename;
    }

    req.body.Category_Image = imgPath;
    req.body.createdAt = nDate;
    req.body.updatedAt = nDate;

    let data = await Cat.create(req.body);
    if (data) {
        return res.redirect('/');
    } else {
        return res.redirect('back');
    }
}