const bcrypt = require('bcrypt');
//生成随机字符串

async function run() {
    const salt = await bcrypt.genSalt(10);
    //对密码进行加密
    const result = await bcrypt.hash('123456', salt);
    console.log(salt);
    console.log(result);
}
run();