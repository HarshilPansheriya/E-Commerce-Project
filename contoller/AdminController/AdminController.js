const Admin = require('../../model/Admin.Model');

module.exports.login = async (req, res) => {
    if (req.isAuthenticated()) {
        return res.redirect('/dashboard')
    } else {
        return res.render('AdminPanel/login')
    }
}

module.exports.dashboard = async (req, res) => {
    return res.render('AdminPanel/dashboard')
}

module.exports.checkLogin = async (req, res) => {
    return res.redirect('/dashboard');
}

module.exports.logout = async (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return res.redirect('back');
        }
        next();
    })
    return res.redirect('/');
}

module.exports.addAdmin = async (req, res) => {
    return res.render('AdminPanel/addAdmin');
}

module.exports.insertAdmin = async (req, res) => {
    const nDate = new Date().toLocaleString('en-US', {
        timeZone: 'Asia/Calcutta'
    });

    let imgPath = '';
    if (req.file) {
        imgPath = Admin.avatarPath + '/' + req.file.filename;
    }

    req.body.avatar = imgPath
    req.body.createdAt = nDate;
    req.body.updatedAt = nDate;
    req.body.name = req.body.fname + ' ' + req.body.lname

    let data = await Admin.create(req.body);
    if (data) {
        return res.redirect('/');
    } else {
        return res.redirect('back');
    }
}

module.exports.showAdmin = async (req, res) => {
    let data = await Admin.find({})
    return res.render('AdminPanel/showAdmin', { data: data });
}