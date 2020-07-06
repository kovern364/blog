const formidable = require('formidable');
const path = require('path');
const { Article } = require('../../model/article');

module.exports = async(req, res) => {
    //接收客户端传递过来的请求参数

    //即将要修改用户的id
    const id = req.query.id;
    //查询用户
    let article = await Article.findOne({ _id: id });
    console.log(article);
    //res.send(article);
    //1.创建表单解析对象
    const form_md = new formidable.IncomingForm();
    //2.配置上传文件的存放位置
    form_md.uploadDir = path.join(__dirname, '../', '../', 'public', 'uploads');
    //3.保存上传文件的后缀
    form_md.keepExtensions = true;
    //4.解析表单
    form_md.parse(req, async(err, fields, files) => {
        //1.err错误对象 失败存储错误信息 成功为null
        //2.fields对象类型 保存普通表单信息
        //3.files 对象类型 保存了和上传文件相关的数据
        //res.send(fields);
        //console.log(fields);
        let rusult = await Article.updateOne({ _id: id }, {
            title: fields.title,
            author: fields.author,
            publishDate: fields.publishDate,
            cover: files.cover.path.split('public')[1],
            content: fields.content
        });
        res.redirect('/admin/article');
    })

}