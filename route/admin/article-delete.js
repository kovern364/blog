const { Article } = require('../../model/article');

module.exports = async(req, res) => {
    //获取要删除的文章id
    //res.send(req.query);
    const isDelete = await Article.findOneAndDelete({ _id: req.query.id });
    //将页面重定向到用户列表页面
    res.redirect('/admin/article');
}