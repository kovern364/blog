const bcrypt = require('bcrypt');
//导入用户集合构造函数
const { User } = require('../../model/user');

module.exports = async(req, res) => {
    const { email, password } = req.body;
    //如果用户没有输入邮件地址
    //if (email.trim().length == 0 || password.trim().length == 0) return res.status(400).send('<h4>邮件地址或密码错误</4>');
    if (email.trim().length == 0 || password.trim().length == 0) return res.status(400).render('admin/error', { msg: '邮件地址或密码错误' });
    //根据邮箱地址查询用户信息
    //如果查询到用户 user变量的值是对象类型，对象中存储的是用户信息
    //如果没有查询到用户 uer变量为空
    let user = await User.findOne({ email });
    if (user) {
        //将客户端传来的密码和用户信息中的加密密码进行比对
        let isValid = await bcrypt.compare(password, user.password)
        if (isValid) {
            if (user.state == '0') {
                //登录成功
                //将用户名存储在session请求对象中
                req.session.username = user.username;
                //将用户角色存储在session请求对象中
                req.session.role = user.role;
                //将用户名存储在请求对象中
                req.app.locals.userInfo = user;
                if (user.role == 'admin') {
                    //重定向到用户列表页面
                    res.redirect('/admin/user');
                } else {
                    //重定向到用户列表页面
                    res.redirect('/home/');
                }
            } else {
                res.status(400).render('admin/error', { msg: '账户已经被禁用' });
            }

        } else {
            res.status(400).render('admin/error', { msg: '邮箱地址或者密码错误' });
        }
    } else {
        //没有查询到用户
        res.status(400).render('admin/error', { msg: '邮箱地址或者密码错误' });
    }
};