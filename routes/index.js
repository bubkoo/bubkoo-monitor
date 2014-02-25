module.exports = function (app) {

    var hook = require('./githubhook');

    // 首页
    app.get('/', function (req, res) {
        res.render('index', {
            title: 'bubkoo monitor'
        });
    });

    app.get('/users', function (req, res) {
        res.send("respond with a resource");
    });

    // githubhook
    app.post('/deploy', hook.githubhook);

    // 测试用，请删除 get 路由
    app.get('/deploy', function (req, res) {
        res.send("[get] is not allowed. Just for testing.");
    });

    app.get('/m.gif', function (req, res) {
        var data = req.query.d;
        res.sendfile('blank.gif', {root: 'public/images/'}, function (err) {
            if (data) {
                console.log(data);
                // TODO:解析 json 数据并存数据库
                console.log('monitor data Saved.');
            }
        });
    });
};