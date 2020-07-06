//引入mongoose模块
const mongoose = require('mongoose');
//引用config模块
const config = require('config');
//连接数据库
mongoose.connect(`mongodb://${config.get('db.host')}/${config.get('db.name')}`, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('数据库连接成功'))
    .catch(() => console.log('连接数据库失败'))