//导入分页模块
const pagination = require('mongoose-sex-page');

const { Article } = require('../../model/article');

module.exports = async(req, res) => {
    //标识 标识当前访问的是首页页面
    req.app.locals.currentLink = 'index';
    //获取当前页
    let page = req.query.page;
    //从数据库中查询数据
    let result = await pagination(Article).page(page).size(2).display(5).find().populate('author').exec();
    //console.log(result);
    //return;
    //渲染模板并传递数据
    res.render('./home/default.art', {
        result: result
    });
};