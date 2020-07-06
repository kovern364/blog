const { Article } = require('../../model/article');
module.exports = async(req, res) => {
    //标识 标识当前访问的是文章管理页面
    req.app.locals.currentLink = 'article';
    //获取地址中的id参数
    const { id } = req.query;
    console.log(id);
    if (id) {
        //修改操作
        let article = await Article.findOne({ _id: id }).populate('author');
        console.log(article);
        res.render('admin/article-edit', {
            article: article,
            link: '/admin/article-modify?id=' + id,
            button: '修改'
        });
    } else {
        //添加操作
        res.render('admin/article-edit', {
            link: '/admin/article-add',
            button: '添加'
        });
    }
};