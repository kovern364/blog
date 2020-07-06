module.exports = (req, res) => {
    //删除session
    req.session.destroy(function() {
        //删除cookie
        res.clearCookie('connect.sid');
        //重定向到前台页面
        res.redirect('/home/');
        //清除模板中的用户详细
        req.app.locals.userInfo = null;
    })
};