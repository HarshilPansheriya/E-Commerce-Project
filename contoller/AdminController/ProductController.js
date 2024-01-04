const Product = require('../../model/Product.Model');
const Cat = require('../../model/Category.Model');
const Brand = require('../../model/Brand.Model');
const Type = require('../../model/Type.Model');

module.exports.addProduct = async (req, res) => {
    let cat = await Cat.find({});
    return res.render('AdminPanel/addProduct', { cat: cat });
}

module.exports.getBtData = async (req, res) => {
    let Cat_id = req.body.Cat_id;
    let SubCat_id = req.body.SubCat_id;
    let ExCat_id = req.body.ExCat_id;

    let brand = await Brand.find({ Cat_id: Cat_id, SubCat_id: SubCat_id, ExCat_id: ExCat_id });
    let type = await Type.find({ Cat_id: Cat_id, SubCat_id: SubCat_id, ExCat_id: ExCat_id });

    return res.render('AdminPanel/brandTypeData', { brand: brand, type: type });
}

module.exports.insertProduct = async (req, res) => {
    const nDate = new Date().toLocaleString('en-US', {
        timeZone: 'Asia/Calcutta'
    });

    let singlePr = '';
    if (req.files.singlePr) {
        singlePr = Product.singlePath + '/' + req.files.singlePr[0].filename;
    }
    let multiPr = [];
    if (req.files.multiPr) {
        for (var i = 0; i < req.files.multiPr.length; i++) {
            multiPr.push(Product.multiPath + '/' + req.files.multiPr[i].filename);
        }
    }

    req.body.createdAt = nDate;
    req.body.updatedAt = nDate;
    req.body.singlePr = singlePr;
    req.body.multiPr = multiPr;


    let data = await Product.create(req.body);
    if (data) {
        return res.redirect('/');
    } else {
        return res.redirect('back')
    }
}

