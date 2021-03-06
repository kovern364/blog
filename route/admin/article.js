//导入mongoose-sex-page模块
const pagination = require('mongoose-sex-page');
//将文章集合的构造函数导入到当前文件中
const { Article } = require('../../model/article');
module.exports = async(req, res) => {
    //接受客户端传递过来的页码
    const page = req.query.page;
    //标识 标识当前访问的是文章管理页面
    req.app.locals.currentLink = 'article';
    //查询所有文章数据
    let articles = await pagination(Article).find().page(page).size(3).display(2).populate('author').exec();
    //res.send(articles);
    //渲染文章列表页面模板
    res.render('admin/article.art', {
        articles: articles
    });
}