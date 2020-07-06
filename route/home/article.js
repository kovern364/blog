//导入文章集合构造函数
const { Article } = require('../../model/article');
//导入评论集合构造函数
const { Comment } = require('../../model/comment');
module.exports = async(req, res) => {
    //标识 标识当前访问的是文章页面
    req.app.locals.currentLink = 'article';
    //根据id查找文章详细信息
    let article = await Article.findOne({ _id: req.query.id }).populate('author');
    //console.log(article);
    //查询当前文章所对应的评论信息
    let comments = await Comment.find({ aid: req.query.id }).populate('uid');
    res.render('./home/article.art', {
        article: article,
        comments: comments
    })
};