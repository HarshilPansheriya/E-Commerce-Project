const Cat = require('../../model/Category.Model');
const SubCat = require('../../model/SubCategory.Model');
const ExCat = require('../../model/ExCate.Model');
const Product = require('../../model/Product.Model');
const User = require('../../model/User.Model');
const Cart = require('../../model/Cart.Model');

module.exports.dashboard = async (req, res) => {
    let cat = await Cat.find({});
    let subCat = await SubCat.find({});
    let exCat = await ExCat.find({});
    let product = await Product.find({}).populate("SubCat_id").populate("Cat_id");
    let cart = 0;
    if (req.user) {

        cart = await Cart.find({ user_id: req.user.id }).countDocuments();
        // console.log(cart);
    }

    return res.render('UserPanel/User_dashboard', { cat: cat, subCat: subCat, exCat: exCat, product: product, cartItem: cart });
}

module.exports.catFilter = async (req, res) => {
    let cat = await Cat.find({});
    let subCat = await SubCat.find({});
    let exCat = await ExCat.find({});

    let Cat_id = req.params.id;
    let SubCat_id = req.params.sd;
    let ExCat_id = req.params.ed;

    let cart = 0;
    if (req.user) {

        cart = await Cart.find({ user_id: req.user.id }).countDocuments();
        // console.log(cart);
    }

    let product = await Product.find({ Cat_id: Cat_id, SubCat_id: SubCat_id, ExCat_id: ExCat_id }).populate("SubCat_id").populate("Cat_id");

    res.render('UserPanel/Cat_Filter', { cat: cat, subCat: subCat, exCat: exCat, product: product, cartItem: cart })
}

module.exports.product_detail = async (req, res) => {
    let cat = await Cat.find({});
    let subCat = await SubCat.find({});
    let exCat = await ExCat.find({});
    let cart = 0;
    if (req.user) {

        cart = await Cart.find({ user_id: req.user.id }).countDocuments();
        // console.log(cart);
    }
    // console.log(req.params);
    let product = await Product.findById(req.params.id);
    return res.render('UserPanel/Single_product', { cat: cat, subCat: subCat, exCat: exCat, product: product, cartItem: cart })
}

module.exports.register = async (req, res) => {
    return res.render('UserPanel/User_Register')
}

module.exports.insertUser = async (req, res) => {
    console.log(req.body);
    const nDate = new Date().toLocaleString('en-US', {
        timeZone: 'Asia/Calcutta'
    });
    req.body.createdAt = nDate
    req.body.updatedAt = nDate

    let data = await User.findOne({ email: req.body.email });
    if (data) {
        return res.redirect('back');
    } else {
        let data = await User.create(req.body);
        if (data) {
            return res.redirect('/user/login');
        } else {
            return res.redirect('back');
        }
    }
}

module.exports.login = async (req, res) => {
    return res.render('UserPanel/User_Login');
}

module.exports.checkLogin = async (req, res) => {
    // console.log(req.user);
    return res.redirect('/user')
}

module.exports.addCart = async (req, res) => {
    let cat = await Cat.find({});
    let subCat = await SubCat.find({});
    let exCat = await ExCat.find({});
    // console.log(req.body);
    const nDate = new Date().toLocaleString('en-US', {
        timeZone: 'Asia/Calcutta'
    });
    req.body.createdAt = nDate
    req.body.updatedAt = nDate
    let checkData = await Cart.findOne({ user_id: req.body.user_id, product_id: req.body.product_id });
    // console.log(checkData);
    if (checkData) {
        return res.redirect('back')
    } else {
        const data = await Cart.create(req.body);
        if (data) {
            return res.redirect('/user');

        } else {
            // console.log(err);
            return false;
        }
    }



}

module.exports.cart = async (req, res) => {
    let cat = await Cat.find({});
    let subCat = await SubCat.find({});
    let exCat = await ExCat.find({});
    let cart = 0;
    if (req.user) {

        cart = await Cart.find({ user_id: req.user.id }).countDocuments();
        // console.log(cart);
    }

    let cartData = await Cart.find({ user_id: req.user.id }).populate("product_id");
    if (cartData) {
        totalData = cartData.length
        return res.render('UserPanel/Cart', { cat: cat, subCat: subCat, exCat: exCat, cartItem: cart, cartData: cartData, totalData: totalData })
    } else {
        return res.redirect('back')
    }
}

module.exports.prQuantity = async (req, res) => {
    let product = await Cart.findOne({ product_id: req.body.prId, user_id: req.user.id });
    // console.log(product);
    if (product) {
        if (req.body.quantity > 0) {
            let upPr = await Cart.findByIdAndUpdate(product.id, { quantity: req.body.quantity });
            // console.log(upPr);
            if (upPr) {
                return res.json({ msg: `Quantity Updated`, qua: upPr.quantity });
            } else {
                return res.json({ msg: `Something Wrong` });
            }
        } else{
            return res.redirect('back')
        }

    } else {
        return res.redirect('back')
    }

}